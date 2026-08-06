import "./setting.js";
import anyAscii from "any-ascii";
import util from "util";

import Create_Update from "./database/create-update.js";
import Read from "./database/read.js";
import chalk from "chalk";

const core = async(m, client, message) => {
  try {
    let body =
      message.mtype === "conversation"
      ? message.message.conversation
      : message.mtype == "imageMessage"
      ? message.message.imageMessage.caption
      : message.mtype == "videoMessage"
      ? message.message.videoMessage.caption
      : message.mtype == "extendedTextMessage"
      ? message.message.extendedTextMessage.text
      : message.mtype == "buttonsResponseMessage"
      ? message.message.buttonsResponseMessage.selectedButtonId
      : message.mtype == "listResponseMessage"
      ? message.message.listResponseMessage.singleSelectReply.selectedRowId
      : message.mtype == "interactiveResponseMessage"
      ? JSON.parse(message.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id 
      : message.mtype == "templateButtonReplyMessage"
      ? message.message.templateButtonReplyMessage.selectedId
      : message.mtype === "messageContextInfo"
      ? message.message.buttonsResponseMessage?.selectedButtonId ||
        message.message.listResponseMessage?.singleSelectReply.selectedRowId ||
        message.text
      : "";
    const pickMessage = message.quoted || message;
    const quoted =
        pickMessage.mtype == "buttonsMessage"
        ? pickMessage[Object.keys(pickMessage)[1]]
        : pickMessage.mtype == "templateMessage"
        ? pickMessage.hydratedTemplate[Object.keys(pickMessage.hydratedTemplate)[1]]
        : pickMessage.mtype == "product"
        ? pickMessage[Object.keys(pickMessage)[0]]
        : message.quoted
        ? message.quoted
        : message;
    const qms = quoted.msg || quoted;
    const mime = qms.mtype || "";
    if (message.sender === "") return;
    let budy = typeof message.text == 'string' ? message.text : '';
    const t = message.messageTimestamp;
    const verifquoted = message.quoted ? true : false;
    const msg = verifquoted ? { message: message.quoted.message } : { message: message.message };
    const mek = m.messages[0];
    let quotedMsg = message.quoted ? message.quoted : message;
    let specialMsg = ["buttonsResponseMessage", "listResponseMessage", "templateButtonReplyMessage", "interactiveResponseMessage"]
    const cmd = specialMsg.includes(message.mtype) ? body : budy;

    let command;
    if (cmd.startsWith(". ") || cmd.startsWith("! ") || cmd.startsWith("# ") || cmd.startsWith("/ ")) {
    const parts = cmd.toLowerCase().split(" ");
    command = parts[0] + parts[1];
    } else {
    command = cmd.toLowerCase().split(" ")[0] || "";
    }
    command = anyAscii(command).toLowerCase()
    const prefix = /^[.#!]/.test(command) ? command.match(/^[.#!]/gi) : "/"; 
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    let args;
    if (cmd.startsWith(". ") || cmd.startsWith("! ") || cmd.startsWith("# ") || cmd.startsWith("/ ")) {
        args = cmd.trim().split(/ +/).slice(2);
    } else {
    args = cmd.trim().split(/ +/).slice(1);
    }

    let senderLid = message.isGroup ? message.key.participant : message.key.remoteJid;
    let sender = message.isGroup ? message.key.fromMe ? await client.signalRepository.lidMapping.getPNForLID(message.key.participant) : message.key.participantAlt : message.key.remoteJidAlt;
    sender = sender || senderLid || message.sender || message.key.participant || message.key.remoteJid || "unknown@s.whatsapp.net";
    const ownerNumber = global.owner[0] + "@s.whatsapp.net";
    const isImage = message.mtype === "image/jpeg" || message.mtype === "image/png";
    const isVideo = message.mtype === "video/mp4" || message.mtype === "image/gif";
    const isQuotedImage = quotedMsg && (quotedMsg.mtype === "image/jpeg" || quotedMsg.mtype === "image/png");
    const isQuotedVideo = quotedMsg && (quotedMsg.mtype === "video/mp4" || quotedMsg.mtype === "image/gif");
    const isQuotedVandI = quotedMsg && (quotedMsg.mtype === "video/mp4" || quotedMsg.mtype === "image/gif" || quotedMsg.mtype === "image/jpeg" || quotedMsg.mtype === "image/png");
    const isQuotedGif = quotedMsg && quotedMsg.mtype === "video/mp4";
    const isQuotedSticker = quotedMsg && quotedMsg.mtype === "image/webp";
    const isQuotedAudio = quotedMsg && (quotedMsg.mtype === "audio/mpeg" || quotedMsg.mtype === "audio/ogg; codecs=opus" || quotedMsg.mtype === "audio/mp4");
    const isQuotedAudioVn = quotedMsg && quotedMsg.mtype === "audio/mpeg";
    const isQuotedFile = quotedMsg && (quotedMsg.mtype === "video/mp4" || quotedMsg.mtype === "image/jpeg" || quotedMsg.mtype === "image/png");
    const isQuotedText = quotedMsg && quotedMsg.mtype === "conversation";
    const isQuotedpdf = quotedMsg && quotedMsg.mtype === "application/pdf";
    const isCmd = cmd.startsWith(prefix);
    const from = message.chat;
    const q = args.join(" ");
    let text = q;
    const reply = message.reply;
    const isGroup = message.isGroup;
    const isOwner = global.owner.includes(sender.split("@")[0]);

    let check = new Read();
    let create = new Create_Update();
    const isBanned = await check.checkBan(sender);
    let groupMetadata = {};
    if (isGroup) {
      try {
        groupMetadata = await global.getGroupMetadataWithRateLimit(
          client,
          message.chat,
        );
      } catch (error) {
        console.error(global.errorLog("Failed to get group metadata:"), error.message);
        groupMetadata = {};
      }
    }
    const groupName = isGroup ? groupMetadata.subject : "";
    const pushname = message.pushName || sender;
    const botNumber = client.user.id;
    const itsMe = message.key.fromMe || sender === botNumber;
    let isGroupAdmins;
    let isBotGroupAdmins;
    if (isGroup) {
      if (message.key.addressingMode === "lid") {
        isGroupAdmins = groupMetadata.participants
          .filter((participant) => participant.admin)
          .map((participant) => participant.id)
          .includes(senderLid);
        isBotGroupAdmins = groupMetadata.participants
          .filter((participant) => participant.admin)
          .map((participant) => participant.id)
          .includes(client.user.lid.replace(/:\d+/, ""));
      } else {
        isGroupAdmins = groupMetadata.participants
          .filter((participant) => participant.admin)
          .map((participant) => participant.phoneNumber)
          .includes(sender);
        isBotGroupAdmins = groupMetadata.participants
          .filter((participant) => participant.admin)
          .map((participant) => participant.phoneNumber)
          .includes(client.user.id);
      }
    }

    if (budy.startsWith(">")) {
        if (!isOwner) return;
        try {
        console.log("[eval] " + budy.slice(2));
        let evaled = await eval(budy.slice(2));
        if (typeof evalved !== "string") {
            evaled = util.inspect(evaled);
        }
        await message.reply(evaled);
        } catch (error) {
        await message.reply(String(error));
        }
    }

    //antilink
    if (
      budy.match(/\b((https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([\s\S]*?)?)\b/gm) &&
      isGroup &&
      !isCmd
    ) {
      if (isGroupAdmins) return;
      if (!isGroup && !isOwner) return;
      if (!isBotGroupAdmins) return;
      if (itsMe) return;

      let checking = await check.checkRestrict(groupMetadata.id);
      let restricted = checking.antilink;

      if (restricted) {
        await client.sendMessage(from, {
          delete: {
            remoteJid: from,
            fromMe: false,
            id: message.key.id,
            participant: message.key.participant,
          },
        });
        }
    }

      //AntilinkGC
      if (body.match(/chat.whatsapp.com/g) && isGroup) {
        if (!isBotGroupAdmins) return;
        if (isGroupAdmins) return;
        if (itsMe) return;

        let checking = await check.checkRestrict(groupMetadata.id);
        let restricted = checking.antilinkgc;

        if (restricted) {
          await client.sendMessage(from, {
            delete: {
              remoteJid: from,
              fromMe: false,
              id: message.key.id,
              participant: message.key.participant,
            },
          });
        }
      }

      // ON/OFF BOT
      if (isCmd && isGroup) {
        let checking = await check.checkRestrict(groupMetadata.id);
        let opened = checking.open;

        if (!opened && !isGroupAdmins) return;
      }

      const progress = (reaction) => {
          const reacting = {
              react: {
                  text: reaction,
                  key: message.key
              }
          }
          client.sendMessage(from, reacting)
      }

      await client.readMessages([message.key]) // Auto read
      if(isBanned?.banned && command !== prefix + "me") {
        if (isCmd) {
          console.log(global.warningLog("[SKIP]"), chalk.yellowBright(moment(t * 1000).format("DD/MM/YY HH:mm:ss")), global.successLog(`${command} [${args.length}]`), "from", pushname);
          progress("🚫")
          return;
        }
      }
      if (!isCmd && !isGroup) return;
      if (!isCmd && isGroup) return;
      if (isCmd && !isGroup) {
        console.log(global.infoLog("[EXEC]"), chalk.yellowBrigh(moment(t * 1000).format("DD/MM/YY HH:mm:ss")), global.successLog(`${command} [${args.length}]`), "from", global.successLog(pushname));
      }
      if (isCmd && isGroup) {
        console.log(global.infoLog("[EXEC]"), chalk.yellowBrigh(moment(t * 1000).format("DD/MM/YY HH:mm:ss")), global.successLog(`${command} [${args.length}]`), "from", global.successLog(pushname), "in", global.successLog(groupName));
      }

      let senderType = isGroup ? groupMetadata.id : sender;
      let isLid = isGroup ? "isGroup" : senderLid
      let cekUser = await check.checkUser(senderType);
      if (cekUser.user === null || !cekUser.user.latest) {

          await create.addUser(senderType, isLid);
          reply(lang.update(pushname));
        }
      await create.addUsage(isGroup ? "group" : "private");

    //BUAT FITUR
    
  } catch (err) {
    console.error(global.errorLog("[ERROR]"), err)
  }
}

export default core;