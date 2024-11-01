require('./setting')
const {
  default: sansekaiConnect,
  useSingleFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
  PHONENUMBER_MCC,
  jidDecode,
  areJidsSameUser,
  proto,
  getContentType,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const Rcon = require("rcon")

const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const figlet = require("figlet");
const readline = require("readline");
const NodeCache = require("node-cache");
const moment = require("moment-timezone")
const _ = require("lodash");
const cpath = require("path");
const fileType = require("file-type");
const PhoneNumber = require("awesome-phonenumber");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, toImage, stickerToGif } = require('./lib/exif');
const { ind } = require("./language")
const inRaid = JSON.parse(fs.readFileSync('./lib/guild.json'));
const welkom = JSON.parse(fs.readFileSync('./db/welcome.json'));
const { getSizeMedia } = require("./lib/utils")
let phoneNumber = "6289329820760"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

//Auto Delete Trash function
/*function remove(root, extention) {
  fs.readdir(root, (err, files) => {
      if(err) console.error("Tidak dapat membaca direktor!")
      const filteredFile = files.filter(file => cpath.extname(file) === extention);
    
      filteredFile.forEach(file => {
          const filePath = cpath.join(root, file);
          fs.unlink(filePath, err => {
              if(err) console.error(`Tidak dapat menghapus ${filePath}`)
              else console.log(`Berhasil menghapus ${filePath}`)
          })
      })
      console.log(`${filteredFile.length} Files as ${extention} file deleted!`)
  })
}*/

function smsg(conn, m, store) {
  if (!m) return m;
  let M = proto.WebMessageInfo;
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith("@g.us");
    m.sender = conn.decodeJid((m.fromMe && conn.user.id) || m.participant || m.key.participant || m.chat || "");
    if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || "";
  }
  if (m.message) {
    m.mtype = getContentType(m.message);
    m.msg = (m.mtype == "viewOnceMessage" ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype]);
    m.body =
      m.message.conversation ||
      m.msg.caption || 
      m.msg.text || 
      (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || 
      (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || 
      (m.mtype == 'viewOnceMessage') && m.msg.caption ||
      m.text
    let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
    m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
    if (m.quoted) {
      let type = Object.keys(m.quoted)[0];
      m.quoted = m.quoted[type];
      if (["productMessage"].includes(type)) {
        type = Object.keys(m.quoted)[0];
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === "string")
        m.quoted = {
          text: m.quoted,
        };
      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo.stanzaId;
      m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16 : false;
      m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id);
      m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || "";
      m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };
      let vM = (m.quoted.fakeObj = M.fromObject({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id,
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {}),
      }));

      /**
       *
       * @returns
       */
      m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key });

      /**
       *
       * @param {*} jid
       * @param {*} forceForward
       * @param {*} options
       * @returns
       */
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options);

      /**
       *
       * @returns
       */
      m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
    }
  }
  if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg);
  m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || "";
  /**
   * Reply to this message
   * @param {String|Object} text
   * @param {String|false} chatId
   * @param {Object} options
   */
  m.reply = (text, chatId = m.chat, options = {}) => (Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, "file", "", m, { ...options }) : conn.sendText(chatId, text, m, { ...options }));
  /**
   * Copy this message
   */
  m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));

  return m;
}


async function startHisoka() {
  const { state, saveCreds } = await useMultiFileAuthState(`./${global.sessionName ? global.sessionName : "session"}`);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  console.log(
    color(
      figlet.textSync("Vertibus", {
        font: "Standard",
        horizontalLayout: "default",
        vertivalLayout: "default",
        whitespaceBreak: false,
      }),
      "green"
    )
  );
  const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"

  /* =========Rcon Minecraft connection========= */
  rcon = new Rcon(global.rconHost, global.rconPort, global.rconPassword);
  if (global.rcon === true) {
    rcon.connect()
  }
  /* =========Rcon Minecraft connection========= */

  const client = sansekaiConnect({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: !pairingCode,
    mobile: useMobile, // mobile api (prone to bans)
    browser: [ "Ubuntu", "Firefox", "20.0.04" ],
    auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
        if (store) {
          let jid = jidNormalizedUser(key.remoteJid)
          let msg = await store.loadMessage(jid, key.id)

          return msg.message || ""
        }
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
  });

  store.bind(client.ev);

  // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !client.authState.creds.registered) {
    const phoneNumber = await question('Enter your bot number startswith your region code :\n');
    const code = await client.requestPairingCode(phoneNumber.trim())
    console.log(`🎁  Pairing Code : ${code}`)

}
  


  client.ev.on("messages.upsert", async (chatUpdate) => {
    //console.log(JSON.stringify(chatUpdate, undefined, 2))
    try {
      mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
      if (mek.key && mek.key.remoteJid === "status@broadcast") return;
      if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
      if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
      m = smsg(client, mek, store);
      require("./core")(client, m, chatUpdate, store, rcon);
    } catch (err) {
      console.log(err);
    }
  });

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
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    } else return jid;
  };

  client.ev.on("contacts.update", (update) => {
    let obj = {};
    for (let contact of update) {
        obj[contact.id] = obj[contact.id] || {};
        Object.assign(obj[contact.id], contact)
    }
    /*for (let contact of update) {
      let id = client.decodeJid(contact.id);
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }*/
  });

  client.getName = (jid, withoutContact = false) => {
    id = client.decodeJid(jid);
    withoutContact = client.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
        resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === client.decodeJid(client.user.id)
          ? client.user
          : store.contacts[id] || {};
    return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
  };

  client.setStatus = (status) => {
    client.query({
      tag: "iq",
      attrs: {
        to: "@s.whatsapp.net",
        type: "set",
        xmlns: "status",
      },
      content: [
        {
          tag: "status",
          attrs: {},
          content: Buffer.from(status, "utf-8"),
        },
      ],
    });
    return status;
  };

  client.public = true;

  client.serializeM = (m) => smsg(client, m, store);
  client.ev.on("connection.update", async (update) => {

    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        startHisoka();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        setTimeout(startHisoka(), 10000)
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Delete Session file client.json and Scan Again.`);
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        startHisoka();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        startHisoka();
      } else {
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        startHisoka();
      }
    } else if (connection === "open") {
      console.log(color("Bot success conneted to server", "green"));
      console.log(color("Type /menu to see menu"));
      client.sendMessage(global.owner[0] + "@s.whatsapp.net", { text: `Bot started!\n\njangan lupa support ya bang :)\n${global.donet}` });
    }
    // console.log('Connected...', update)
  });

  /* =========Rcon Minecraft connection========= */


  rcon.on('auth', function() {
    // You must wait until this event is fired before sending any commands,
    // otherwise those commands will fail.
    console.log("RCON Minecraft Connected!");
    global.authenticated = true
  }).on('response', function(str) {
    client.sendMessage(m.chat, { text: `Server:\n${str.replace(/§e|§f|§7|§6|§r|§o/g, "")}`}, { m })
  }).on('error', function(err) {
    console.log("Error: " + err);
  }).on('end', function() {
    console.log("Connection closed");
    global.authenticated = false
    process.exit();
  });

  
  /* =========Rcon Minecraft connection========= */

  client.ev.on("creds.update", saveCreds);
  
 
  //Group Update
/*client.ev.on('group-participants.update', async (anu) => {
const welc = await welkom
if (!welc.includes(anu.id)) return
console.log(anu)
try {
let metadata = await client.groupMetadata(anu.id)
let participants = anu.participants
date = moment().tz("Asia/Jakarta").format("DD/MM/YYYY")
hours = moment().tz("Asia/Jakarta").format("HH:mm")

for (let num of participants) {

//Message Saat Ada User Yang Masuk Ke Grup
if (anu.action == 'add') {
tekswell = `Welcome @${num.split('@')[0]} 👋

📛 User : @${num.split('@')[0]}
☎️ Nomer : ${num.split('@')[0]}
🎎 Group : ${metadata.subject}
👫 Member : ${metadata.participants.length} Members

📣 Perkenalkan diri anda ✌
Nama: 
IGN: 
Gender: 
Umur: 
Buff: 
Tanggal: ${date} ${hours}
`
client.sendMessage(anu.id, {text: tekswell, mentions: anu.participants})
//Message Saat Ada User Yang Keluar Dari Grup
} else if (anu.action == 'remove') {
teksbye = `Sayonaraa @${num.split("@")[0]} 👋

📛 User : @${num.split('@')[0]}
☎️ Nomer : ${num.split('@')[0]}
🎎 Group : ${metadata.subject}
👫 Member : ${metadata.participants.length} Members

📣 Selamat tinggal Semoga harimu menyenangkan
${date} ${hours}
`
client.sendMessage(anu.id, {text: teksbye, mentions: anu.participants})
//Message Saat Ada Yang Naik Jabatan
}
}

} catch (err) {
console.log(err)
}
})*/


  const getBuffer = async (url, options) => {
    try {
      options ? options : {};
      const res = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (err) {
      return err;
    }
  };

  //REMINDER
  const hidetag = async (target, text) => {
    group = await client.groupMetadata(target)
    members = group.participants
    mem = []
    await members.map( async adm => {
          mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
    /*options = {
          text: text,
          contextInfo: { mentionedJid: mem }
          }*/
      client.sendMessage(target, {text: text, mentions: mem})
  }

  /*setInterval( async function() {
    now = moment().tz("Asia/Jakarta").format("HH:mm")
    day = moment().tz('Asia/Jakarta').format('dddd')
    //onRaid = await inRaid.raid
    
    if (global.reminder == true && now == "06:15") {
      client.sendMessage(global.owner + "@s.whatsapp.net", { text: `Time to Cooking buff on Toram Online\n\n${now}` });
      hidetag('120363023056066862@g.us', `*Jangan Lupa untuk memasak buff*\nReminder ini muncul setiap 12 jam\n\n- ${global.botName} -\n${now}`)
    }
    if (global.reminder == true && now == "18:15") {
      client.sendMessage(global.owner + "@s.whatsapp.net", { text: `Time to Cooking buff on Toram Online\n\n${now}` })
      hidetag('120363023056066862@g.us', `*Jangan Lupa untuk memasak buff*\nReminder ini muncul setiap 12 jam\n\n- ${global.botName} -\n${now}`)
    }

    //RAID GUILD
    if (onRaid == true && day == "Saturday" && now == "15:00") {
      hidetag('120363023056066862@g.us', ind.raid());
    }
    if (onRaid == true && day == "Saturday" && now == "18:30") {
      hidetag('6289675651966-1611471388@g.us', ind.raid());
    }
    if (onRaid == false && day == "Saturday" && now == "23.00") {
      inRaid = true
      fs.writeFileSync('./lib/guild.json', JSON.stringify(inRaid));
      client.sendMessage("6289675651966-1611471388@g.us", { text: "Raid telah di set ON otomatis" })
    }

      if(now == "05:00" || now == "12:00" || now == "18:00") {
        setTimeout(() => {
          remove('./', ".jpg")
          remove('./', '.png')
          remove('./', '.mp4')
          remove('./', '.webp')
        }, 1000)
        
        setTimeout(() => {
          remove('./tmp', ".pdf")
          remove('./tmp', '.mp3')
        }, 3000)
        client.sendMessage(global.owner[0] + "@s.whatsapp.net", {text: "Auto delete trash complete!"}
        )
      }
  }, 30000)*/

  client.toImage = async (jid, path, quoted = "") => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
      buffer = await toImage(buff)
      return await client.sendMessage(jid, { image: buffer }, { quoted });
  }

  client.stickerToGif = async (jid, path, quoted = "") => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
      buffer = await stickerToGif(buff)
      return await client.sendMessage(jid, { video: buffer, gifPlayback: true}, { quoted });
  }


  client.sendImage = async (jid, path, caption = "", quoted = "", options) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    return await client.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted });
  };

  client.getFile = async (PATH, save) => {
    let res
    let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
    let type = await fileType.fromBuffer(data) || {
    mime: 'application/octet-stream',
    ext: '.bin'}
    filename = cpath.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
    if (data && save) fs.promises.writeFile(filename, data)
    return {
    res,
    filename,
    size: await getSizeMedia(data),
    ...type,
    data}}

  client.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await client.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

  client.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await client.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

  /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    client.sendImageAsSticker = async (jid, path, quoted, resolution, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options, resolution)
        } else {
            buffer = await imageToWebp(buff, resolution)
        }

        await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

        client.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
  }
        
  return buffer
     }
 

    /**
* 
* @param {*} message 
* @param {*} filename 
* @param {*} attachExtension 
* @returns 
*/
client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await fileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

  client.sendText = (jid, text, quoted = "", options) => client.sendMessage(jid, { text: text, ...options }, { quoted });

  client.cMod = (jid, copy, text = "", sender = client.user.id, options = {}) => {
    //let copy = message.toJSON()
    let mtype = Object.keys(copy.message)[0];
    let isEphemeral = mtype === "ephemeralMessage";
    if (isEphemeral) {
      mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
    }
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
    let content = msg[mtype];
    if (typeof content === "string") msg[mtype] = text || content;
    else if (content.caption) content.caption = text || content.caption;
    else if (content.text) content.text = text || content.text;
    if (typeof content !== "string")
      msg[mtype] = {
        ...content,
        ...options,
      };
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
    else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
    if (copy.key.remoteJid.includes("@s.whatsapp.net")) sender = sender || copy.key.remoteJid;
    else if (copy.key.remoteJid.includes("@broadcast")) sender = sender || copy.key.remoteJid;
    copy.key.remoteJid = jid;
    copy.key.fromMe = sender === client.user.id;

    return proto.WebMessageInfo.fromObject(copy);
  };

  return client;
}

startHisoka();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});

/*Uptime Replit 24 Hours*/
require("http").createServer((_, res) => res.end("Uptime!")).listen(5000)