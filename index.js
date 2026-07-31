import "./setting.js";
import {
  makeWASocket,
  Browsers,
  fetchLatestWaWebVersion,
  fetchLatestBaileysVersion,
  DisconnectReason,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore
} from "@whiskeysockets/baileys";
import chalk from "chalk"
import NodeCache from "node-cache";
import Pino from "pino"
import figlet from "figlet";
import { Boom } from "@hapi/boom"

//vars
let version;
let reconnectTimer = null;

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const groupCache = new NodeCache({
    stdTTL: 5 * 60,
    useClones: false,
    checkperiod: 120
  })
  try {
    const waWebVersion = await fetchLatestWaWebVersion()
    version = waWebVersion.version
    console.log(`🌐 Live WA Web Version loaded: v${version.join('.')}`);
  } catch (err) {
    const waVersion = await fetchLatestBaileysVersion();
    version = waVersion.version;
    console.log(`⚠️ Fallback Baileys Version loaded: v${version.join('.')}`);
  }

  console.log(chalk.green(
    figlet.textSync("Toram", {
      font: "3-D",
      horizontalLayout: "default",
      verticalLayout: "default",
      whitespaceBreak: true
    })
  ))

  const client = makeWASocket({
    version,
    browser: Browsers.windows("Chrome"),
    printQRInTerminal: false,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: true,
    logger: Pino({level: "debug"}),
    cachedGroupMetadata: async (jid) => groupCache.get(jid),
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, Pino({level: "silent"}))
    }
  })

  if(!client.authState.creds.registered) {
    const number = global.owner[1]
    const code = await client.requestPairingCode(number);
    console.log("Login Code:", chalk.yellowBright(code))
  }

  client.ev.on("creds.update", saveCreds)

  client.ev.on("connection.update", (update) => {
    const {connection, lasDisconnected} = update;
    if (connection === 'close') {
          const reason = lastDisconnect?.error?.output?.statusCode;
          const reasonName = Object.entries(DisconnectReason).find(([, code]) => code === reason)?.[0] || "unknown";
          console.log(chalk.rgb(252, 138, 56)("Connection closed:"), reasonName, reason, lastDisconnect?.error?.message || "");
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
        } else if (connection === 'open') {
            console.log(chalk.greenBright("session connected:"), jidDecode(client?.user?.id)?.user);
        } else if (connection === "connecting") {
          console.log(chalk.yellowBright("Connecting to server..."))
        }
  })

  client.ev.on("messages.upsert", (m) => {
    //buat logika pemrosesann pesan
  })
}