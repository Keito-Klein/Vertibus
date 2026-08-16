import "./setting.js";
import {
  makeWASocket,
  Browsers,
  jidDecode,
  fetchLatestWaWebVersion,
  fetchLatestBaileysVersion,
  DisconnectReason,
  useMultiFileAuthState,
  generateWAMessageContent,
  makeCacheableSignalKeyStore,
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";
import chalk from "chalk"
import NodeCache from "node-cache";
import Pino from "pino"
import figlet from "figlet";
import path from "path";
import os from "os";
import fs from "fs";
import StoreDB from "./database/storeDB.js";
import { Boom } from "@hapi/boom"
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { sleep } from "./lib/general-function.js";
import { Messages } from "./lib/Messages.js";
const require = createRequire(import.meta.url);
const PhoneNumber = require("awesome-phonenumber");

//vars
let version;
let reconnectTimer = null;
let isStarting = false;
const storeDB = new StoreDB();
global.errorLog = chalk.redBright;
global.warningLog = chalk.hex('#FFA500')
global.successLog = chalk.greenBright
global.infoLog = chalk.blueBright;

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

const tempDir = path.resolve("./tmp");
fs.mkdirSync(tempDir, { recursive: true });
process.env.TMPDIR = tempDir;
process.env.TMP = tempDir;
process.env.TEMP = tempDir;
os.tmpdir = () => tempDir;

let core;
const importHandler = async (reload = false) => {
    core = (await import(`./core.js${reload ? `?update=${Date.now()}` : ""}`)).default;
};
await importHandler();

const coreFile = fileURLToPath(new URL("./core.js", import.meta.url));
if (!global.__fileWatchers) global.__fileWatchers = new Set();
if (!global.__fileWatchers.has(coreFile)) {
  global.__fileWatchers.add(coreFile);
  fs.watchFile(coreFile, async () => {
    console.log(infoLog("Updated 'core.js'"));
    try {
      await importHandler(true);
    } catch (err) {
      console.error(errorLog(err));
    }
  });
}

async function start() {
  if(isStarting) return;
  isStarting = true;

  try {
		const storeLoadData = await storeDB.read()
		if (!storeLoadData || Object.keys(storeLoadData).length === 0) {
			global.store = {
				contacts: {},
        contactsGroup: {},
				presences: {},
				messages: {},
				groupMetadata: {},
				...(storeLoadData || {}),
			}
			await storeDB.write(global.store)
		} else {
			global.store = storeLoadData
		}
		
		setInterval(async () => {
			if (global.store) await storeDB.write(global.store)
		}, 30 * 1000)
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
  store.loadMessage = function (remoteJid, id) {
		const messages = store.messages?.[remoteJid]?.array;
		if (!messages) return null;
		return messages.find(msg => msg?.key?.id === id) || null;
	}

  const { state, saveCreds } = await useMultiFileAuthState(`./${global.sessionName || "session"}`);
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
    browser: Browsers.windows('Chrome'),
    printQRInTerminal: false,
    generateHighQualityLinkPreview: false,
    markOnlineOnConnect: true,
    msgRetryCounterCache,
    logger: Pino({level: "fatal"}),
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, Pino({level: "silent"}))
    }
  })

  if(!client.authState.creds.registered) {
    await new Promise(resolve => setTimeout(resolve, 5000))
    const number = global.owner[1]
    const code = await client.requestPairingCode(number, "GRANAT88");
    console.log("Login Code:", code)
  }

  client.ev.on("creds.update", saveCreds)

  client.ev.on("connection.update", async(update) => {
    const {connection, lastDisconnect} = update;
    if (connection === 'close') {
          const reason = lastDisconnect?.error?.output?.statusCode;
          const reasonName = Object.entries(DisconnectReason).find(([, code]) => code === reason)?.[0] || "unknown";
          console.log(warningLog("Connection closed:"), reasonName, reason, lastDisconnected?.error?.message || "");
          if (reason === DisconnectReason.loggedOut) {
            console.log(errorLog("Device Logged out, remove /session to re-login."));
            return;
          }
          if (!reconnectTimer) {
            reconnectTimer = setTimeout(() => {
              reconnectTimer = null;
              start();
            }, 3000);
          }
        } else if (connection === 'open') {
            console.log(successLog("session connected:"), jidDecode(client?.user?.id)?.user);
        } else if (connection === "connecting") {
          console.log(chalk.yellowBright("Connecting to server..."))
        }
  })

  client.ev.on("group.update", async([event]) => {
    try {
      const metadata = await client.groupMetadata(event.id);
      groupCache.set(event.id, metadata);
    } catch (err) {
      console.error("group.update handler error:", err?.message || err);
    }
  })

  // Update contact
  client.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = client.decodeJid(contact.id);
      if (id.endsWith("@lid")){
        if (global.store && global.store.contactsGroup) global.store.contactsGroup[id] = { id, name: contact.notify }
      } else {
        if (global.store && global.store.contacts) global.store.contacts[id] = { id, name: contact.notify }
      }
    }
  });

  client.ev.on ("group-participants.update", async(event) => {
    try {
      const metadata = await client.groupMetadata(event.id);
      groupCache.set(event.id, metadata);
    } catch (err) {
      console.error("group-participants.update handler error:", err?.message || err);
    }
  })

  client.ev.on("call", async(callUpdate) => {
    for (let call of callUpdate) {
        if (call.status === "offer") {
            await client.rejectCall(call.id, call.from);
            console.log(`Rejected call from ${call.from}`);
        }
    }
  })

  client.ev.on("messages.upsert" , async (m) => {
    try{
    if(m.type !== "notify") return;
    const message = Messages(m, client);
    if(!message) return;
    if(message.key && message.key.remoteJid === "status@broadcast") return;
    if(message.key && message.key.remoteJid.includes("@newsletter")) return;
    if(message.mtype === "protocolMessage") return;
    if (message.category === "peer") return;
    const remoteJid = message.key.remoteJid;
    store.messages[remoteJid] ??= {};
    store.messages[remoteJid].array ??= [];
    store.messages[remoteJid].keyId ??= new Set();
    if (!(store.messages[remoteJid].keyId instanceof Set)) {
      store.messages[remoteJid].keyId = new Set(store.messages[remoteJid].array.map(mek => mek.key.id));
    }
    if (store.messages[remoteJid].keyId.has(message.key.id)) return;
    store.messages[remoteJid].array.push(message);
    store.messages[remoteJid].keyId.add(message.key.id);
    if(store.messages[remoteJid].array.length > (parseInt(global.chatLength) || 100)) {
      const removed = store.messages[remoteJid].array.shift();
			store.messages[remoteJid].keyId.delete(removed.key.id);
    }
    if (!store.groupMetadata || Object.keys(store.groupMetadata).length === 0) store.groupMetadata ??= await client.groupFetchAllParticipating().catch(e => ({}));
    //if(message.key.fromMe) return;
      core(m, client, message);
    }catch(err) {
      console.error("error processing message:", err)
    }
  })

  // Handle error
  const unhandledRejections = new Map();
  process.on("unhandledRejection", (reason, promise) => {
    unhandledRejections.set(promise, reason);
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
  });
  process.on("rejectionHandled", (promise) => {
    unhandledRejections.delete(promise);
  });
  process.on("Something went wrong", function (err) {
    console.log("Caught exception: ", err);
  });

  // Setting
  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };

  // Geting name of contact
  client.getName = (jid, withoutContact = false) => {
    let id = client.decodeJid(jid);
    withoutContact = client.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = global.store.contacts[id] || {};
        if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
              "international"
            )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === client.decodeJid(client.user.lid.split(":")[0] + "@lid")
          ? client.user
          : global.store.contacts[id] || global.store.contactsGroup[id];
          console.log(id)
    return (
      (withoutContact ? "" : v.name) ||
      v.name ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };

  client.sendText = (jid, text, quoted = "", options) => client.sendMessage(jid, { text, ...options }, { quoted });
  
  client.sendButtonMsg = async (jid, content = {}, options = {}) => {
		const { text, caption, footer = '', headerType = 1, ai, contextInfo = {}, buttons = [], mentions = [], ...media } = content;
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2,
					},
					buttonsMessage: {
						...(media && typeof media === 'object' && Object.keys(media).length > 0 ? await generateWAMessageContent(media, {
							upload: client.waUploadToServer
						}) : {}),
						contentText: text || caption || '',
						footerText: footer,
						buttons,
						headerType: media && Object.keys(media).length > 0 ? Math.max(...Object.keys(media).map((a) => ({ document: 3, image: 4, video: 5, location: 6 })[a] || headerType)) : headerType,
						contextInfo: {
							...contextInfo,
							...options.contextInfo,
							mentionedJid: options.mentions || mentions,
							...(options.quoted ? {
								stanzaId: options.quoted.key.id,
								remoteJid: options.quoted.key.remoteJid,
								participant: options.quoted.key.participant || options.quoted.key.remoteJid,
								fromMe: options.quoted.key.fromMe,
								quotedMessage: options.quoted.message
							} : {})
						}
					}
				}
			}
		}, {});
		const hasil = await client.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes: [{
				tag: 'biz',
				attrs: {},
				content: [{
					tag: 'interactive',
					attrs: {
						type: 'native_flow',
						v: '1'
					},
					content: [{
						tag: 'native_flow',
						attrs: {
							name: 'quick_reply'
						}
					}]
				}]
			}, ...(ai ? [{ attrs: { biz_bot: '1' }, tag: 'bot' }] : [])]
		})
		return hasil
	}


  isStarting = false;
}

start()

// Process Exit
const cleanup = async (signal) => {
  console.log(`Received ${signal}. Saving database...`)
  if (global.store) await storeDB.write(global.store)
  process.exit(0)
}

process.on('SIGINT', () => cleanup('SIGINT'))
process.on('SIGTERM', () => cleanup('SIGTERM'))