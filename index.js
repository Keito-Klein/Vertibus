import "./setting.js";
import {
  makeWASocket,
  Browsers,
  jidDecode,
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
import { sleep } from "./lib/general-function.js";

//vars
let version;
let reconnectTimer = null;
let isStarting = false;

// ============ RATE LIMIT HANDLER (Initialized once at startup) ============
const groupMetadataCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;
let lastGroupMetadataCall = 0;
const GROUP_REQUEST_DELAY = 500;
let rateLimitBackoffUntil = 0;
let rateLimitBackoffTime = 1000;

const retryWithBackoff = async (fn, maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.data === 429 && attempt < maxRetries) {
        const waitTime = delay * Math.pow(2, attempt - 1);
        console.log(`⚠️  Rate limited (429), retrying in ${waitTime}ms... (Attempt ${attempt}/${maxRetries})`);
        await sleep(waitTime);
      } else {
        throw error;
      }
    }
  }
};

const getGroupMetadataWithRateLimit = async (client, groupId) => {
  try {
    const now = Date.now();
    if (now < rateLimitBackoffUntil) {
      const waitMs = rateLimitBackoffUntil - now;
      console.log(`⏳ Global rate limit active, waiting ${Math.ceil(waitMs / 1000)}s...`);
      await sleep(Math.ceil(waitMs / 1000) * 1000);
    }

    const cached = groupMetadataCache.get(groupId);
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    const timeSinceLastCall = now - lastGroupMetadataCall;
    if (timeSinceLastCall < GROUP_REQUEST_DELAY) {
      await sleep(GROUP_REQUEST_DELAY - timeSinceLastCall);
    }

    lastGroupMetadataCall = Date.now();
    const metadata = await retryWithBackoff(
      () => client.groupMetadata(groupId),
      3,
      1000
    );
    groupMetadataCache.set(groupId, {
      data: metadata,
      timestamp: Date.now()
    });
    rateLimitBackoffTime = 1000;
    return metadata;
  } catch (error) {
    if (error.data === 429) {
      rateLimitBackoffTime = Math.min(rateLimitBackoffTime * 2, 60000); // Max 60s
      rateLimitBackoffUntil = Date.now() + rateLimitBackoffTime;
      console.error(`❌ Rate limit exceeded. Backing off for ${rateLimitBackoffTime}ms`);
    }
    throw error;
  }
};
global.getGroupMetadataWithRateLimit = getGroupMetadataWithRateLimit;

async function start() {
  if(isStarting) return;
  isStarting = true;
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const msgRetryCounterCache = new NodeCache();
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
      font: "Ghost",
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
    msgRetryCounterCache,
    logger: Pino({level: "warn"}),
    cachedGroupMetadata: async (jid) => groupCache.get(jid),
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, Pino({level: "silent"}))
    }
  })

  if(!client.authState.creds.registered) {
    await new Promise(resolve => setTimeout(resolve, 5000))
    const number = global.owner[1]
    const code = await client.requestPairingCode(number);
    console.log("Login Code:", chalk.yellowBright(code))
  }

  client.ev.on("creds.update", saveCreds)

  client.ev.on("connection.update", (update) => {
    const {connection, lastDisconnected} = update;
    if (connection === 'close') {
          const reason = lastDisconnected?.error?.output?.statusCode;
          const reasonName = Object.entries(DisconnectReason).find(([, code]) => code === reason)?.[0] || "unknown";
          console.log(chalk.rgb(252, 138, 56)("Connection closed:"), reasonName, reason, lastDisconnected?.error?.message || "");
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

  client.ev.on("messages.upsert", (mess) => {
    //buat logika pemrosesann pesan
    for(const message of mess.messages) {
      console.log(JSON.stringify(message, undefined, 2))
      if(message.type !== "notify") return
    }
  })
  isStarting = false;
}

start()