import "./setting.js";
import {
  makeWASocket,
  Browsers,
  fetchLatestWaWebVersion,
  fetchLatestBaileysVersion,
  DisconnectReason,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  jidDecode,
} from "@whiskeysockets/baileys";
import chalk from "chalk";
import NodeCache from "node-cache";
import Pino from "pino";
import figlet from "figlet";
import readline from "readline";
import { Boom } from "@hapi/boom";

//vars
let version;
let reconnectTimer = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, (answer) => resolve(answer)));

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const groupCache = new NodeCache({
    stdTTL: 5 * 60,
    useClones: false,
    checkperiod: 120,
  });
  const msgRetryCache = new NodeCache({
    stdTTL: 5 * 60,
    useClones: false,
    checkperiod: 120,
  });
  try {
    const waVersion = await fetchLatestBaileysVersion();
    version = waVersion.version;
    console.log(`🌐 WA Version loaded: v${version.join(".")} (latest: ${waVersion.isLatest})`);
  } catch (err) {
    console.log("⚠️ Failed to load Baileys version, using fallback from package.");
    version = [2, 3000, 0];
  }

  console.log(
    chalk.green(
      figlet.textSync("Toram", {
        font: "3-D",
        horizontalLayout: "default",
        verticalLayout: "default",
        whitespaceBreak: true,
      }),
    ),
  );

  const client = makeWASocket({
    version,
    browser: Browsers.windows("Chrome"),
    connectTimeoutMs: 15000,
    keepAliveIntervalMs: 25000,
    defaultQueryTimeoutMs: 45000,
    retryRequestDelayMs: 250,
    maxMsgRetryCount: 10,
    emitOwnEvents: true,
    fireInitQueries: true,
    markOnlineOnConnect: true,
    syncFullHistory: true,
    patchMessageBeforeSending: (msg) => msg,
    shouldSyncHistoryMessage: (msg) => msg.syncType !== 3,
    shouldIgnoreJid: () => false,
    linkPreviewImageThumbnailWidth: 192,
    generateHighQualityLinkPreview: true,
    enableAutoSessionRecreation: true,
    enableRecentMessageCache: true,
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
    appStateMacVerification: {
      patch: false,
      snapshot: false,
    },
    countryCode: "ID",
    msgRetryCounterCache: msgRetryCache,
    getMessage: async () => undefined,
    logger: Pino({ level: "debug" }),
    cachedGroupMetadata: async (jid) => groupCache.get(jid),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "silent" })),
    },
  });

  let pairingRequested = false;
  let pairingNumber = global.owner[0] || global.owner[1];

  client.ev.process(async (events) => {
    if (events["connection.update"]) {
      const { connection, lastDisconnect, qr } = events["connection.update"];

      if (qr && !client.authState.creds.registered && !pairingRequested) {
        pairingRequested = true;

        if (!pairingNumber) {
          const phone = await ask("📱 Enter phone number (with country code, no +): ");
          pairingNumber = phone.replace(/[^0-9]/g, "");
        }

        if (!pairingNumber) {
          console.log(chalk.redBright("Owner number is required to request pairing code."));
          process.exit(1);
        }

        const code = await client.requestPairingCode(pairingNumber);
        console.log("Login Code:", chalk.yellowBright(code));
      }

      if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode;
        const reasonName =
          Object.entries(DisconnectReason).find(([, code]) => code === reason)?.[0] || "unknown";
        console.log(
          chalk.rgb(252, 138, 56)("Connection closed:"),
          reasonName,
          reason,
          lastDisconnect?.error?.message || "",
        );
        if (reason === DisconnectReason.loggedOut) {
          console.log(chalk.redBright("Device Logged out, remove /session to re-login."));
          return;
        }
        if (!reconnectTimer) {
          reconnectTimer = setTimeout(() => {
            reconnectTimer = null;
            start();
          }, 3000);
        }
      } else if (connection === "open") {
        console.log(chalk.greenBright("session connected:"), jidDecode(client?.user?.id)?.user);
      } else if (connection === "connecting") {
        console.log(chalk.yellowBright("Connecting to server..."));
      }
    }

    if (events["creds.update"]) {
      await saveCreds();
    }

    if (events["messages.upsert"]) {
      //buat logika pemrosesann pesan
    }
  });
}

start();
