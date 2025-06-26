const { generateWAMessageFromContent, proto } = require("baileys");
const fs = require("fs");
const os = require("os");
const chalk = require("chalk");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const speed = require("performance-now");
const imgbb = require("imgbb-uploader");
const moment = require("moment-timezone");
const { color } = require("./lib/color");
const { performance } = require("perf_hooks");
const ind = require("./language/ind");
const eng = require("./language/eng");
const calculateMQ = require("./lib/MQcalculator");
const {
  getBuffer,
  getRandom,
  formatp,
  runtime,
} = require("./lib/general-function");
const { pinterest } = require("./lib/downloader");

//Setting your language
lang = ind;

/* Database */
let Create_Update;
let Read;
let Delete;
if (global.mongoDB === true) {
  Create_Update = require("./mongoDB/create-update");
  Read = require("./mongoDB/read");
  Delete = require("./mongoDB/delete");
} else {
  Create_Update = require("./db/create-update");
  Read = require("./db/read");
  Delete = require("./db/delete");
}

//set your Timezone in tz()
var currentTime = moment().tz("Asia/Jakarta").format("HH:mm");

//Consigment Function
const separate = (int) => {
  price = int.toString();

  reversed = price.split("").reverse().join("");
  dotReserve = reversed.match(/.{1,3}/g).join(".");
  reverses = dotReserve.split("").reverse().join("");

  return reverses;
};

module.exports = core = async (client, m, chatUpdate) => {
  var body =
    (m.mtype === "conversation")
      ? m.message.conversation
      : (m.mtype == "imageMessage")
      ? m.message.imageMessage.caption
      : (m.mtype == "videoMessage")
      ? m.message.videoMessage.caption
      : (m.mtype == "extendedTextMessage")
      ? m.message.extendedTextMessage.text
      : (m.mtype == "buttonsResponseMessage")
      ? m.message.buttonsResponseMessage.selectedButtonId
      : (m.mtype == "listResponseMessage")
      ? m.message.listResponseMessage.singleSelectReply.selectedRowId
      : (m.mtype == "templateButtonReplyMessage")
      ? m.message.templateButtonReplyMessage.selectedId 
      : (m.mtype == 'interactiveResponseMessage') 
      ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id 
      : (m.mtype == 'templateButtonReplyMessage') 
      ? m.msg.selectedId
      : (m.mtype === "messageContextInfo")
      ? (m.message.buttonsResponseMessage?.selectedButtonId ||
        m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
        m.text)
      : "";
  const prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
  const command = body
    .replace(prefix, "")
    .trim()
    .split(/ +/)
    .shift()
    .toLowerCase();
  const isUrl = (url) => {
    return url.match(
      new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
        "gi"
      )
    );
  };
  const mik = m.quoted || m;
  const quoted =
    mik.mtype == "buttonsMessage"
      ? mik[Object.keys(mik)[1]]
      : mik.mtype == "templateMessage"
      ? mik.hydratedTemplate[Object.keys(mik.hydratedTemplate)[1]]
      : mik.mtype == "product"
      ? mik[Object.keys(mik)[0]]
      : m.quoted
      ? m.quoted
      : m;
  const args = body.trim().split(/ +/).slice(1);
  const isCmd = body.startsWith(prefix);
  const pushname = m.pushName || "No Name";
  const botNumber = await client.decodeJid(client.user.id);
  const itsMe = m.sender == botNumber ? true : false;
  let text = (q = args.join(" "));
  const budy = typeof m.text == "string" ? m.text : "";
  const qms = quoted.msg || quoted;
  const mime = qms.mimetype || "";
  const mek = chatUpdate.messages[0];
  const content = JSON.stringify(m.message);
  const sender = m.sender;
  const from = m.chat;
  const reply = m.reply;

  //Database instance
  let check = new Read();
  let create = new Create_Update();
  let remove = new Delete();

  //security
  const isGroup = m.isGroup;
  const groupMetadata = m.isGroup
    ? await client.groupMetadata(m.chat).catch((e) => {})
    : "";
  const getGroupAdmins = (participants) => {
    admins = [];
    for (let i of participants) {
      i.admin ? admins.push(i.id) : "";
    }
    return admins;
  };
  const groupName = m.isGroup ? groupMetadata.subject : "";
  const groupId = m.isGroup ? groupMetadata.id : "";
  const groupMembers = m.isGroup ? groupMetadata.participants : "";
  const groupAdmins = m.isGroup ? getGroupAdmins(groupMembers) : "";
  const isOwner = global.owner.includes(sender.split("@")[0]) || false;
  const botAdmin = groupAdmins.includes(botNumber) || false;
  const isGroupAdmins = groupAdmins.includes(sender) || false;

  //Media init
  const isMedia = m.mtype === "imageMessage" || m.mtype === "videoMessage";
  const isQuotedImage =
    m.mtype === "extendedTextMessage" && content.includes("imageMessage");
  const isQuotedSticker =
    m.mtype === "extendedTextMessage" && content.includes("stickerMessage");
  const isQuotedVideo =
    m.mtype === "extendedTextMessage" && content.includes("videoMessage");

  //Save every Message to JSON
  let infoMSG = JSON.parse(fs.readFileSync("./db/message.json"));
  infoMSG.push(JSON.parse(JSON.stringify(mek)));
  fs.writeFileSync("./db/message.json", JSON.stringify(infoMSG, null, 2));
  const amount_message = infoMSG.length;
  if (amount_message === 5000) {
    infoMSG.splice(0, 4300);
    fs.writeFileSync("./db/message.json", JSON.stringify(infoMSG, null, 2));
  }
  //Proccess
  const progress = (reaction) => {
    const reactions = {
      react: {
        text: reaction,
        key: m.key,
      },
    };
    client.sendMessage(from, reactions);
  };

  //auto read incoming message
  await client.readMessages([m.key]);

  //mongoDB Error Handler
  if (
    global.mongoDB == true &&
    global.mongoString === "Enter Your Connection String!!"
  ) {
    return console.log(
      color(
        "Be sure your connection mongoDB string is corrrect!!\nCheck it on setting.js Line : 13",
        "red"
      )
    );
  }

  //Message Detector
  if (!isCmd && !isGroup && !itsMe) {
    if (body && !isOwner) {
      template = `
      ${global.botName} has new message
      Message ID: ${m.key.id}
      Sender: ${sender}
      Name: ${pushname}
      Text: ${body}`;
      client.sendText(global.owner[0] + "@s.whatsapp.net", template);
    }

    //forward message replied by owner
    if (
      sender.includes(global.owner[0]) &&
      m.quoted &&
      qms.text.includes(`${global.botName} has new message`)
    ) {
      messageMatch = qms.text.match(/Message ID: ([A-Z0-9]+)/);
      messageID = messageMatch ? messageMatch[1] : null;
      if (messageID === null) return;
      for (let mess of infoMSG) {
        if (mess.key.id === messageID) {
          quotedMessage = mess.message.extendedTextMessage;
          imgMessage = mess.message.imageMessage;
          vidMessage = mess.message.videoMessage;
          defaultMessage = mess.message.conversation;
          teksTemplate = `
        *Reply from owner*
        ${body}
        `;
          client.sendMessage(
            mess.key.remoteJid,
            { text: teksTemplate },
            { quoted: mess }
          );
        }
      }
    }
  }

  //antilink
  if (
    budy.match(
      /\b((https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([\s\S]*?)?)\b/gm
    ) &&
    m.isGroup &&
    !isCmd
  ) {
    if (!isGroup && !isOwner) return;
    if (isGroupAdmins) return;
    if (itsMe) return;

    checking = await check.checkRestrict(groupMetadata.id);
    restricted = checking.antilink;

    if (restricted) {
      await client.sendMessage(from, {
        delete: {
          remoteJid: from,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant,
        },
      });
    }
  }

  //AntilinkGC
  if (budy.match("chat.whatsapp.com") && m.isGroup) {
    if (!botAdmin) return;
    if (isGroupAdmins) return;
    if (itsMe) return;

    checking = await check.checkRestrict(groupMetadata.id);
    restricted = checking.antilinkgc;

    if (restricted) {
      await client.sendMessage(from, {
        delete: {
          remoteJid: from,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant,
        },
      });
    }
  }

  // ON/OFF BOT
  if (isCmd && m.isGroup) {
    checking = await check.checkRestrict(groupMetadata.id);
    opened = checking.open;

    if (!opened && !isGroupAdmins) return;
  }

  // Push Message To Console
  let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

  if (isCmd && !isGroup) {
    console.log(
      chalk.black(chalk.bgWhite("[ LOGS ]")),
      color(argsLog, "turquoise"),
      chalk.magenta("From"),
      chalk.green(pushname),
      chalk.yellow(`[ ${sender.replace("@s.whatsapp.net", "")} ]`),
      chalk.black.bgYellow(`[ ${currentTime} ]`)
    );
  } else if (isCmd && m.isGroup) {
    console.log(
      chalk.black(chalk.bgWhite("[ LOGS ]")),
      color(argsLog, "turquoise"),
      chalk.magenta("From"),
      chalk.green(pushname),
      chalk.yellow(`[ ${sender.replace("@s.whatsapp.net", "")} ]`),
      chalk.blueBright("IN"),
      chalk.green(groupName),
      chalk.black.bgYellow(`[ ${currentTime} ]`)
    );
  }

  //Command Handler
  if (isCmd) {
    switch (command) {
      case "menu":
        m.reply(lang.menu(prefix));
        break;

      /* ================ Toram Online Menu ================ */
      case "watk":
        if (!q) return reply(lang.format(prefix, command));
        int = parseInt(q);
        proc = eval((int * 110) / 100 + 10);
        str = proc.toString();
        m.reply(str);
        break;

      case "cdmg":
        if (!q) return reply(lang.format(prefix, command));
        if (!q.includes("/"))
          return reply(
            'use "/" as separator!\nex: total STR/total STR on eq/total cd percent/cd flat/LV of skill critical UP\nOr:\n/cdmg 250/5/20/40/10\nDon\'t use space!\n\nPenjelasan:\n- Total Str di personal status\n- Total STR di equipment/avatar\n- Total critical damage % di eq/avatar\n- Total critical damage di eq/avatar\n Level skill Crit. UP(Di skill tempur'
          );
        str = q.split("/")[0];
        strP = q.split("/")[1];
        eq = q.split("/")[2];
        xtall = q.split("/")[3];
        skill = q.split("/")[4];
        strength = parseInt(str);
        strengthPers = parseInt(strP);
        percent = parseInt(eq);
        flat = parseInt(xtall);
        crit = parseInt(skill);
        //RUMUS
        base = 150 + strength / 5;
        cdPers = (base * percent) / 100;
        pasif = (crit / 2 / 100) * 200;
        strPer = (strength * strengthPers) / 100 / 5;
        total = base + cdPers + pasif + strPer + flat;
        rounded = Math.floor(total);
        result = rounded.toString();
        reply(result);
        break;

      case "cb-novip":
        if (!text) return;
        dotPrice = text.replace(/\./g, "");
        price = parseInt(dotPrice);
        fee = Math.floor(price * 0.1);
        profit = price - fee;

        //Indonesia Server
        taxIn = price * 0.2;
        indo = price + taxIn;

        //Chinesse Server 0 tax
        taxCh = price * 0;
        china = price + taxCh;

        //Japan Server
        taxJp = price * 0.03;
        japan = price + taxJp;

        result = `
*Result*: 
Harga: \`\`\`${separate(price)}\`\`\`
Fee: \`\`\`${separate(fee)}\`\`\`
Profit: \`\`\`${separate(profit)}\`\`\`
Global Price: 
- Indonesia: \`\`\`${separate(indo)}\`\`\`
- China: \`\`\`${separate(china)}\`\`\`
- Japan: \`\`\`${separate(japan)}\`\`\`
      `;
        client.sendText(from, result, mek);
        break;

      case "cb-vip":
        if (!text) return;
        dotPrice = text.replace(/\./g, "");
        price = parseInt(dotPrice);
        fee = Math.floor(price * 0.1 * 0.6);

        profit = price - fee;

        //Indonesia Server
        taxIn = price * 0.2;
        indo = price + taxIn;

        //Chinesse Server 0 tax
        taxCh = price * 0;
        china = price + taxCh;

        //Japan Server
        taxJp = price * 0.03;
        japan = price + taxJp;

        result = `
*Result*: 
Harga: \`\`\`${separate(price)}\`\`\`
Fee: \`\`\`${separate(fee)}\`\`\`
Profit: \`\`\`${separate(profit)}\`\`\`
Global Price: 
- Indonesia: \`\`\`${separate(indo)}\`\`\`
- China: \`\`\`${separate(china)}\`\`\`
- Japan: \`\`\`${separate(japan)}\`\`\`
      `;
        client.sendText(from, result, mek);
        break;

      case "cb":
        if (!text) return reply("please input the price!");
        if (isNaN(text)) return reply("Price should be number!");
        teks = "Do you have 30-Day Tickets/VIP?\nOpen button bellow ⬇";
        await client.sendButtonMsg(
          from,
          {
            text: teks,
            footer: global.botName,
            mentions: [m.sender],
            contextInfo: {
              forwardingScore: 10,
              isForwarded: true,
            },
            buttons: [
              {
                buttonId: `${prefix}cb-vip ${text}`,
                buttonText: { displayText: "Yes ✅" },
                type: 1,
              },
              {
                buttonId: `${prefix}cb-novip ${text}`,
                buttonText: { displayText: "No ❌" },
                type: 1,
              },
            ],
          },
          { quoted: m }
        );
        break;

      case "calculate":
        {
          lvl = parseInt(text.split("|")[0]);
          exp = parseInt(text.split("|")[1].split(" ")[0]);
          startEps = text.split(" ")[1];
          endEps = text.split(" ")[2];
          startMQ = parseInt(startEps.replace("eps", ""));
          endMQ = parseInt(endEps.replace("eps", ""));
          if (isNaN(exp)) return reply(lang.format(prefix, command));
          if (startMQ > endMQ) {
            return reply(
              "can't calculate because the end chapter is too low than the beginning MQ!"
            );
          }
          mqData = JSON.parse(
            fs.readFileSync("./language/Toram-DB/mq-db-eng.json")
          );
          //kondisi !mq 260|38 eps58 eps125
          let lv, percentage;
          [lv, percentage] = calculateMQ(lvl, exp, startMQ, endMQ);
          teksTemplate = `
- *Toram MQ Calculator* -
Start: CH ${mqData[startMQ - 1].chapter}: ${mqData[startMQ - 1].title}
End: CH ${mqData[endMQ - 1].chapter}: ${mqData[endMQ - 1].title}

After doing MQ from *${startEps}* to *${endEps}* you will reach to level ${lv} with ${percentage}%
`;
          reply(teksTemplate);
        }
        break;

      case "mq":
        {
          if (!text) return reply(lang.format(prefix, command));
          lvl = text.split("|")[0];
          if (isNaN(lvl)) return reply(lang.format(prefix, command));
          exp = text.split("|")[1];
          if (!exp) {
            exp = 0;
          }
          MQstart = q.split(" ")[1];
          MQend = q.split(" ")[2];
          let MQmsg;
          let MQcmd = command;
          if (!MQstart) {
            MQmsg = "Select where MQ to *Start*";
          }
          if (MQstart && !MQend) {
            MQmsg = "Select where MQ to *End*";
            MQcmd = "calculate";
          }
          //Hitung kalkulasi exp yang didapat dari start sampai selesai MQ

          const sections = [
            {
              title: `Chapter 1: The Begining of Chaos`,
              highlight_label: `Chapter 1`,
              rows: [
                {
                  title: "EPS1: First Time Visit",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps1`,
                },
                {
                  title: "EPS2: Straye Brother and Sister",
                  description: "Boss: Boss Colon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps2`,
                },
                {
                  title: "EPS3: A Golem on a Rampage",
                  description: "Boss: Excavated Golem",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps3`,
                },
                {
                  title: "EPS4: The Goddess of Wisdom",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps4`,
                },
                {
                  title: "EPS5: The Dragon's Den",
                  description: "Boss: Eerie Crystal",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps5`,
                },
                {
                  title: "EPS6: The Ruined Temple",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps6`,
                },
                {
                  title: "EPS7: The First Magic Stone",
                  description: "Boss: Minotaur",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps7`,
                },
                {
                  title: "EPS8: Purification Incense",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps8`,
                },
                {
                  title: "EPS9: The Dragon and Black Crystal",
                  description: "Boss: Brutal Dragon Decel",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps9`,
                },
              ],
            },
            {
              title: `Chapter 2: Look for Holly Gems!`,
              highlight_label: `Chapter 2`,
              rows: [
                {
                  title: "EPS10: The Merchant Girl",
                  description: "Boss: Mochelo",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps10`,
                },
                {
                  title: "EPS11: Where Are the Gems?",
                  description: "Boss: Flare Volg",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps11`,
                },
                {
                  title: "EPS12: Who is the Black Knight?!",
                  description: "Boss: Ooze",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps12`,
                },
                {
                  title: "EPS13: Trials in the Palace",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps13`,
                },
                {
                  title: "EPS14: The Moon Wizard",
                  description: "Boss: Mauez",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps14`,
                },
                {
                  title: "EPS15: The Follower and Hater",
                  description: "Boss: Ganglef & Demons Gate",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps15`,
                },
                {
                  title: "EPS16: The Wizard's Cave",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps16`,
                },
                {
                  title: "EPS17: The Star Wizard",
                  description: "Boss: Boss Roga",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps17`,
                },
              ],
            },
            {
              title: `Chapter 3: Battle With the Ancient God`,
              highlight_label: `Chapter 3`,
              rows: [
                {
                  title: "EPS18: The Invincible... Enemy??",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps18`,
                },
                {
                  title: "EPS19: The Ancient Empress",
                  description: "Boss: Ancient Empress",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps19`,
                },
                {
                  title: "EPS20: The Culprit",
                  description: "Boss: Masked Warrior",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps20`,
                },
                {
                  title: "EPS21: Fate of the Fortress",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps21`,
                },
                {
                  title: "EPS22: Memory in the Lost Town",
                  description: "Boss: Pillar Golem",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps22`,
                },
                {
                  title: "EPS23: The Stolen Sorcery Gem",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps23`,
                },
                {
                  title: "EPS24: Living with a Dragon",
                  description: "Boss: Grass Dragon Yelb",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps24`,
                },
                {
                  title: "EPS25: Monsters from Outerworld",
                  description: "Boss: Nurethoth",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps25`,
                },
              ],
            },
            {
              title: `Chapter 4: The Creeping Shadows`,
              highlight_label: `Chapter 4`,
              rows: [
                {
                  title: "EPS26: The Mage Diels",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps26`,
                },
                {
                  title: "EPS27: Journey for Reconstruction",
                  description: "Boss: Goldoon (MQ only)",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps27`,
                },
                {
                  title: "EPS28: The Sacred Gem in Akaku",
                  description: "Boss: Goouva",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps28`,
                },
                {
                  title: "EPS29: The King of Darkan",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps29`,
                },
                {
                  title: "EPS30: The Lurking Evil",
                  description: "Boss: Scrader",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps30`,
                },
                {
                  title: "EPS31: Find the False Black Knight!",
                  description: "Boss: Black Knight of Delusion",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps31`,
                },
                {
                  title: "EPS32: Technista's Movement",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps32`,
                },
                {
                  title: "EPS33: The Falling Feather of Death",
                  description: "Boss: Evil Crystal Beast",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps33`,
                },
              ],
            },
            {
              title: `Chapter 5: The Storm in the Darkness`,
              highlight_label: `Chapter 5`,
              rows: [
                {
                  title: "EPS34: In The Unknown Darkness",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps34`,
                },
                {
                  title: "EPS35: The Charm",
                  description: "Boss: Cerberus",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps35`,
                },
                {
                  title: "EPS36: Parching Dark Mirror",
                  description: "Boss: Zolban",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps36`,
                },
                {
                  title: "EPS37: Fierce Battle in the Garden",
                  description: "Boss: Aranea",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps37`,
                },
                {
                  title: "EPS38: A Light in the Darkness",
                  description: "Boss: Bexiz",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps38`,
                },
                {
                  title: "EPS39: The Ones Nesting in the Manor",
                  description: "Boss: Imitator",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps39`,
                },
                {
                  title: "EPS40: The Dark Castle",
                  description: "Boss: Imitacia",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps40`,
                },
                {
                  title: "EPS41: To The Living World",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps41`,
                },
              ],
            },
            {
              title: `Chapter 6: The Two Technistas`,
              highlight_label: `Chapter 6`,
              rows: [
                {
                  title: "EPS42: Demi Machina",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps42`,
                },
                {
                  title: "EPS43: The Town of Pax Faction",
                  description: "Boss: Iconos",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps43`,
                },
                {
                  title: "EPS44: Mechanical Heart",
                  description: "Boss: Ifrid",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps44`,
                },
                {
                  title: "EPS45: Black Knights of Lyark",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps45`,
                },
                {
                  title: "EPS46: The Mysterious Artifact",
                  description: "Boss: Proto Leon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps46`,
                },
                {
                  title: "EPS47: Truth of the Artifact",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps47`,
                },
                {
                  title: "EPS48: The Price of Treachery",
                  description: "Boss: York",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps48`,
                },
                {
                  title: "EPS49: The Blasphemous Factory",
                  description: "Boss: Tyrant Machina",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps49`,
                },
                {
                  title: "EPS50: Mystery of the Black Knights",
                  description: "Boss: Mozto Machina",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps50`,
                },
              ],
            },
            {
              title: `Chapter 7: Upheaval in Ultimea`,
              highlight_label: `Chapter 7`,
              rows: [
                {
                  title: "EPS51: Monster's Forest",
                  description: "Boss: Lalvada",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps51`,
                },
                {
                  title: "EPS52: The Underground Town",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps52`,
                },
                {
                  title: "EPS53: The Elves in Lyark",
                  description: "Boss: Zahhak Machina",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps53`,
                },
                {
                  title: "EPS54: The Mad Laboratory",
                  description: "Boss: Guignol",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps54`,
                },
                {
                  title: "EPS55: Tragedy in the Jail",
                  description: "Boss: Gwaimol",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps55`,
                },
                {
                  title: "EPS56: Calamity in Droma Square",
                  description: "Boss: Ultimate Machina",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps56`,
                },
                {
                  title: "EPS57: Head for Ultimea Palace",
                  description: "Boss: Ornlarf",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps57`,
                },
                {
                  title: "EPS58: The Chaotic Truth",
                  description: "Boss: Venena Coenubia",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps58`,
                },
              ],
            },
            {
              title: `Chapter 8: Road to Eldenbaum`,
              highlight_label: `Chapter 8`,
              rows: [
                {
                  title: "EPS59: The Mine Where Monsters Lurk",
                  description: "Boss: Shampy",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps59`,
                },
                {
                  title: "EPS60: The Mysterious Shadow",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps60`,
                },
                {
                  title: "EPS61: The New Diel Country",
                  description: "Boss: Crystal Titan",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps61`,
                },
                {
                  title: "EPS62: The Ruins of the Gods",
                  description: "Boss: Mom Fluck",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps62`,
                },
                {
                  title: "EPS63: The Former God of Justice",
                  description: "Boss: Zelbuse",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps63`,
                },
                {
                  title: "EPS64: The Remaining Thrones in the Shrine",
                  description: "Boss: Mardula",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps64`,
                },
                {
                  title: "EPS65: Gods' Whereabouts",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps65`,
                },
                {
                  title: "EPS66: The Wait at Specia's Shrine",
                  description: "Boss: Seele Zauga",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps66`,
                },
                {
                  title: "EPS67: The Warden of Ice & Snow",
                  description: "Boss: King Piton",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps67`,
                },
                {
                  title: "EPS68: At Mountains End",
                  description: "Boss: Finstern the Dark Dragon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps68`,
                },
              ],
            },
            {
              title: "Chapter 9: Recapturing Eldenbaum",
              highlight_label: "Chapter 9",
              rows: [
                {
                  title: "EPS69: Deadly Road to Eldenbaum",
                  description: "Boss: Tuscog",
                  id: `${prefix}${MQcmd} ${lvl}|${exp}eps69`,
                },
                {
                  title: "EPS70: Unforseen Trap",
                  description: "Boss: Eroded Pilz",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps70`,
                },
                {
                  title: "EPS71: Traces of Technological Progress",
                  description: "Boss: Pyxtica",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps71`,
                },
                {
                  title: "EPS72: An Unexpected Acquaintance",
                  description: "Boss: Kuzto",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps72`,
                },
                {
                  title: "EPS73: Front Line Base Operation",
                  description: "Boss: Sapphire Roga",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps73`,
                },
                {
                  title: "EPS74: Strategy to Redeem the Treetop Harbor",
                  description: "Boss: Gravicep",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps74`,
                },
                {
                  title: "EPS75: The Teleporter Left Behind",
                  description: "Boss: Repthon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps75`,
                },
                {
                  title: "EPS76: The Man Who Seeks Death",
                  description: "Boss: Vulture",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps76`,
                },
                {
                  title: "EPS77: The Battle to Recapture Eldenbaum",
                  description: "Boss: Venena Meta Coenubia",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps77`,
                },
                {
                  title: "EPS78: A New Beginning",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps78`,
                },
              ],
            },
            {
              title: "Chapter 10: The Lost God's Ship",
              highlight_label: "Chapter 10",
              rows: [
                {
                  title: "EPS79: Off to the Fateful Land",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps79`,
                },
                {
                  title: "EPS80: The Inhabitants Under the Cliff",
                  description: "Boss: Pisteus",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps80`,
                },
                {
                  title: "EPS81: The Nightmare Returns",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps81`,
                },
                {
                  title: "EPS82: The Whereabouts of the Missing Monks",
                  description: "Boss: Arachnidemon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps82`,
                },
                {
                  title: "EPS83: The Goddess of Courage and the Squatters",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps83`,
                },
                {
                  title: "EPS84: Navigator of the Ark",
                  description: "Boss: Black Shadow",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps84`,
                },
                {
                  title: "EPS85: Witch in the Woods",
                  description: "Boss: Hexter",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps85`,
                },
                {
                  title: "EPS86: The Duel in Nov Diela",
                  description: "Boss: Irestida",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps86`,
                },
              ],
            },
            {
              title: "Chapter 11: Off to Toram",
              highlight_label: "Chapter 11",
              rows: [
                {
                  title: "EPS87: Flying the Ark",
                  description: "Boss: Reliza",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps87`,
                },
                {
                  title: "EPS88: Land of the Unknown",
                  description: "Boss: Gemma",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps88`,
                },
                {
                  title: "EPS89: The Strolling Forest",
                  description: "Boss: Ferzen the Rock Dragon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps89`,
                },
                {
                  title: "EPS90: Eumanos the Forest Dwellers",
                  description: "Boss: Junior Dragon Zyvio",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps90`,
                },
                {
                  title: "EPS91: A Sproutling is Born",
                  description: "Boss: War Dragon Turba",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps91`,
                },
                {
                  title: "EPS92: The Blessing-Bearer",
                  description: "Boss: Vlam the Flame Dragon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps92`,
                },
                {
                  title: "EPS93: Intense Battle in Coenubla's Stronghold",
                  description: "Boss: Velum",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps93`,
                },
                {
                  title: "EPS94: The Shadow of a Smoky Mountain",
                  description: "Boss: Oculagsinio",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps94`,
                },
                {
                  title: "EPS95: The Weredragons & the Underground World",
                  description: "Boss: Gordel",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps95`,
                },
              ],
            },
            {
              title: "Chapter 12: The Weredragons' Vital Point",
              highlight_label: "Chapter 12",
              rows: [
                {
                  title: "EPS96: The Sky with a Ceiling",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps96`,
                },
                {
                  title: "EPS97: Rivalry Between Dragons and Weredragons",
                  description: "Boss: Burning Dragon Igneus",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps97`,
                },
                {
                  title: "EPS98: Weredragon Couple and a Baby",
                  description: "Boss: Trickster Dragon Mimyugon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps98`,
                },
                {
                  title: "EPS99: Weredragons Vital Point",
                  description: "Boss: Filrocas",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps99`,
                },
                {
                  title: "EPS100: Intense Battle in Propulsion System",
                  description: "Boss: Wicked Dragon Fazzino",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps100`,
                },
                {
                  title: "EPS101: Discovering a New Technology",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps101`,
                },
                {
                  title: "EPS102: Ark Repair",
                  description: "Boss: Walican",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps102`,
                },
                {
                  title: "EPS103: Weredragon Dispute",
                  description: "Boss: Brass Dragon Reguita",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps103`,
                },
                {
                  title: "EPS104: Cocoon in the Ice Wall",
                  description: "Boss: Dominaredor",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps104`,
                },
              ],
            },
            {
              title: "Chapter 13: The Water Tribe and Coenubia",
              highlight_label: "Chapter 13",
              rows: [
                {
                  title: "EPS105: Underwater Inhabitants",
                  description: "Boss: Zapo",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps105`,
                },
                {
                  title: "EPS106: Water Dome",
                  description: "Boss: Red Ash Dragon Rudish",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps106`,
                },
                {
                  title: "EPS107: Underwater City",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps107`,
                },
                {
                  title: "EPS108: The Thing in the Abandoned District",
                  description: "Boss: Don Profundo",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps108`,
                },
                {
                  title: "EPS109: Shadow from the Abyss",
                  description: "Boss: Vatudo",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps109`,
                },
                {
                  title: "EPS110: The Ruthless Council",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps110`,
                },
                {
                  title: "EPS111: Mysterious Entity in the Little Shrine",
                  description: "Boss: Ragging Dragon Bovinari",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps111`,
                },
                {
                  title: "EPS112: The Great Battle Underwater",
                  description: "Boss: Humida & Torexesa",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps112`,
                },
              ],
            },
            {
              title: "Chapter 14: Mainland Toram",
              highlight_label: "Chapter 14",
              rows: [
                {
                  title: "EPS113: Crisis in the Sky",
                  description: "Boss: Mulgoon",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps113`,
                },
                {
                  title: "EPS114: The Surviving Siblings",
                  description: "Boss: Deformis",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps114`,
                },
                {
                  title: "EPS115: Chaotic Situation",
                  description: "Boss: -",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps115`,
                },
                {
                  title: "EPS116: The Bitter Truth",
                  description: "Boss: Menti",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps116`,
                },
                {
                  title: "EPS117: The Uncouth Rana Prince",
                  description: "Boss: Biskyva",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps117`,
                },
                {
                  title: "EPS118: Mutant Coenubia Village",
                  description: "Boss: Piscruva",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps118`,
                },
                {
                  title: "EPS119: Fierce Battle with Mutant Lixis",
                  description: "Boss: Supreme Evil Crystal Beast",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps119`,
                },
              ],
            },
            {
              title: "Chapter 15: Coenubia's Awakening",
              highlight_label: "Chapter 15",
              rows: [
                {
                  title: "EPS120: Ark Crisis",
                  description: "Boss: Bakuzan",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps120`,
                },
                {
                  title: "EPS121: Coastal Clash",
                  description: "Boss: Rondine",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps121`,
                },
                {
                  title: "EPS122: Unda's Rescue Operation",
                  description: "Boss: Gula the Gourmet",
                  id: `${prefix}${MQcmd} ${lvl}|${exp} eps122`,
                }
              ],
            },
          ];

          const listMessage = {
            title: "List MQ",
            sections,
          };

          const templateButton = {
            text: MQmsg,
            footer: `_*- ${global.botName} -*_`,
            mentions: [m.sender],
            contextInfo: {
              forwardingScore: 300,
              isForwarded: true,
            },
            buttons: [
              {
                buttonId: "list_button",
                buttonText: {
                  displayText: "List MQ",
                },
                nativeFlowInfo: {
                  name: "single_select",
                  paramsJson: JSON.stringify(listMessage),
                },
                type: 2,
              },
            ],
          };

          await client.sendButtonMsg(from, templateButton, {quoted: m});
        }
        break;

      case "lv":
      case "lvl":
      case "lvling":
      case "leveling":
        //return reply("Fitur sedang dalam perbaikan!")
        try {
          lvl = q.split("|")[0];
          bexp = q.split("|")[1];
          if (!lvl) return m.reply(lang.format(prefix, command));
          if (q.toLowerCase() == "bs") return reply(lang.bs());
          if (!bexp) {
            bexp = "0";
          }
          if (isNaN(lvl)) return m.reply(lang.format(prefix, command));
          if (isNaN(bexp)) return m.reply(lang.format(prefix, command));
          progress("⏳");

          axios
            .get(
              `https://coryn.club/leveling.php?lv=${lvl}&gap=7&bonusEXP=${bexp}`
            )
            .then((response) => {
              if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                const array = [];
                $(".level-row").each(function (i, elem) {
                  /*array[i] = {
                      level: $(this).find('.level-col-1 > b').text().trim(),
                      boss: $(this).find('.level-col-2 > p:nth-child(1) > b > a').text().trim(),
                      location: $(this).find('.level-col-2 > p:nth-child(2)').text().trim(),
                    }*/
                  level = $(this).find(".level-col-1 > b").text().trim();
                  boss = $(this)
                    .find(".level-col-2 > p:nth-child(1) > b > a")
                    .text()
                    .trim();
                  location = $(this)
                    .find(".level-col-2 > p:nth-child(2)")
                    .text()
                    .trim();
                  fullBreak = $(this)
                    .find(".level-col-3 > p:nth-child(1) > b")
                    .text()
                    .trim();
                  allBreak = $(this)
                    .find(".level-col-3 > p:nth-child(1)> small")
                    .text()
                    .trim();
                  secondBreak = $(this)
                    .find(".level-col-3 > p:nth-child(2)")
                    .text()
                    .trim();
                  twoBreak = $(this)
                    .find(".level-col-3 > p:nth-child(2) > small")
                    .text()
                    .trim();
                  firstBreak = $(this)
                    .find(".level-col-3 > p:nth-child(3)")
                    .text()
                    .trim();
                  oneBreak = $(this)
                    .find(".level-col-3 > p:nth-child(3) > small")
                    .text()
                    .trim();
                  noBreak = $(this)
                    .find(".level-col-3 > p:nth-child(4)")
                    .text()
                    .trim();
                  zeroBreak = $(this)
                    .find(".level-col-3 > p:nth-child(4)> small")
                    .text()
                    .trim();

                  if (fullBreak && oneBreak) {
                    array.push({
                      level,
                      boss,
                      location,
                      exp: {
                        fullBreak,
                        secondBreak: secondBreak ? secondBreak : " - ",
                        firstBreak: firstBreak ? firstBreak : " - ",
                        noBreak: noBreak ? noBreak : " - ",
                      },
                      star: {
                        allBreak,
                        twoBreak: twoBreak ? twoBreak : " - ",
                        oneBreak: oneBreak ? oneBreak : " - ",
                        zeroBreak: zeroBreak ? zeroBreak : " - ",
                      },
                    });
                  }
                });
                let gb = `*Leveling lvl ${lvl} & bonus exp ${bexp}%*\n`;
                for (let i = 0; i < array.length; i++) {
                  gb += `-------------------------------\nBoss: ${array[i].boss}\nBoss Level: ${array[i].level}\nLocation: ${array[i].location}\nEXP:\n- Full Break: ${array[i].exp.fullBreak} ${array[i].star.allBreak}\n- Two Break: ${array[i].exp.secondBreak}\n- One Break: ${array[i].exp.firstBreak}\n- No Break: ${array[i].exp.noBreak} \n`;
                }
                client.sendText(from, gb, mek);
                progress("✔");
              }
            });
        } catch (err) {
          progress("❌");
          m.reply(lang.error(err));
        }
        break;
        
        case "mt":
         url = "https://id.toram.jp/?type_code=update#contentArea"
          axios.get(url)
            .then((response) => {
              if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                mtNow = $(".news_border > a").attr("href");
                axios.get("https://id.toram.jp/" + mtNow)
                .then((response) => {
                  if (response.status === 200) {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    container = $("#news > div").text().trim();
                    textSample = container.split("Kembali ke atas")[0]
                    textTemplate = textSample.split("Tweet")[1].trim();
                    reply(textTemplate)
                  } else {
                    m.reply("Official Website can't be accessed!");
                  }
                })
              }
            })
            .catch(() => m.reply("Official Website can't be accessed!"));
        break

      case "food":
        client.sendText(
          from,
          `
*List EXP Food Buff*
lv = Exp Needed
1 = 1
2 = 3
3 = 9
4 = 21
5 = 45
6 = 93
7 = 189
8 = 381
9 = 765
10 = 1533`,
          mek
        );
        break;

      case "mqmats":
        mq = lang.mq();
        client.sendText(from, mq, mek);
        break;

      case "maze":
        maze = text;
        if (!maze)
          return reply(
            "masukan query! contoh :\n /maze guide\n/maze build\n/maze drop"
          );
        dbs = await lang.maze(maze);
        client.sendText(from, dbs, mek);
        break;

      case "ailment":
        ail = await lang.ailment();
        client.sendText(from, ail, mek);
        break;

      case "bag":
        bag = await lang.bag();
        client.sendText(from, bag, mek);
        break;
      /* ================ Toram Online Menu ================ */
      /* ================ Converter Menu ================ */
      case "sticker":
      case "s":
      case "stickergif":
      case "sgif":
      case "stiker":
        try {
          ipackName = false;
          iauthor = false;
          if (q.split("|")[0]) {
            ipackName = q.split("|")[0];
          }
          if (q.split("|")[1]) {
            iauthor = q.split("|")[1];
          }
          progress("⏳");
          if (/image/.test(mime)) {
            let media = await client.downloadMediaMessage(qms);
            let encmedia = await client.sendImageAsSticker(
              from,
              media,
              m,
              text.toLowerCase() == "original" ? true : false,
              {
                packname: q.split("|")[0] ? ipackName : global.packName,
                author: q.split("|")[1] ? iauthor : global.author,
              }
            );
            fs.unlinkSync(encmedia);
            progress("✔");
          } else if (/video/.test(mime)) {
            if (qms.seconds > 11) return reply("Max 10 second!");
            let media = await client.downloadMediaMessage(qms);
            let encmedia = await client.sendVideoAsSticker(from, media, m, {
              packname: q.split("|")[0] ? ipackName : global.packName,
              author: q.split("|")[1] ? iauthor : global.author,
            });
            fs.unlinkSync(encmedia);
            progress("✔");
          } else {
            m.reply(lang.unsupported());
          }
        } catch (err) {
          progress("❌");
          console.log(err);
        }

        break;

      case "smeme":
      case "stickmeme":
        try {
          if (!text) return m.reply(lang.format(prefix, command));
          progress("⏳");
          top = encodeURIComponent(q.split("|")[0]);
          bottom = encodeURIComponent(q.split("|")[1]);

          if (
            ((isMedia && !m.message.videoMessage) ||
              isQuotedImage ||
              isQuotedSticker) &&
            args.length > 0
          ) {
            ranp = getRandom("54");
            owgi = await client.downloadAndSaveMediaMessage(qms, ranp);
            options = {
              apiKey: global.imgbb, // MANDATORY

              imagePath: owgi, // OPTIONAL: pass a local file (max 32Mb)

              name: ranp, // OPTIONAL: pass a custom filename to imgBB API

              expiration: 3600 /* OPTIONAL: pass a numeric value in seconds.
  It must be in the 60-15552000 range.
  Enable this to force your image to be deleted after that time. */,
            };

            anu = await imgbb(options);

            teks = `${anu.display_url}`;
            anu1 = `https://api.memegen.link/images/custom/${
              text.split("|")[1] ? top : " "
            }/${text.split("|")[1] ? bottom : top}.png?background=${teks}`;
            encmedia = await client.sendImageAsSticker(
              from,
              `${anu1}`,
              m,
              false,
              { packname: global.packName, author: global.author }
            );
            fs.unlinkSync(owgi);
            fs.unlinkSync(encmedia);
            progress("✔");
          } else {
            m.reply("please use image/sticker!");
          }
        } catch (err) {
          progress("❌");
          console.log(err);
        }
        break;

      //Proccess MQ
      case "process":
        break;

      /* ================ Media Menu ================ */

      case "pixiv":
        if (!text) return reply(lang.format(prefix, command));
        try {
          progress("⏳");
          res = await axios({
            method: "get",
            url: `https://api.lolicon.app/setu/v2?keyword=${encodeURIComponent(
              text
            )}`,
            headers: {
              DNT: 1,
              "Upgrade-Insecure-Request": 1,
            },
            responseType: "json",
          });
          if (res.data.error) return progress("❌");
          if (res.data.data.length === 0) return reply("Not Found!");
          textTemplate = `*Detail:*\n- Title: ${res.data.data[0].title}\n- Author: ${res.data.data[0].author}\nTags:`;
          for (let i = 0; i < res.data.data[0].tags.length; i++) {
            textTemplate += `\n- ${i + 1}. ${res.data.data[0].tags[i]}`;
          }
          client.sendImage(
            from,
            res.data.data[0].urls.original,
            textTemplate,
            mek
          );
          progress("✔");
        } catch (err) {
          progress("❌");
          console.log(err);
        }
        break;

      case "pin":
      case "pinterest":
        if (!text) return reply(lang.format(prefix, command));
        try {
          progress("⏳");
          fetcher = await pinterest(encodeURIComponent(text));
          res = fetcher[Math.round(Math.random() * fetcher.length)];
          client.sendImage(from, res, text, mek);
          progress("✔");
        } catch (err) {
          progress("❌");
          console.log(err);
        }
        break;

      case "anime":
        try {
          progress("⏳");
          response = await axios.get(
            "https://loli-api.glitch.me/api/v1/twintails"
          );
          client.sendImage(from, response.data.url, " ", mek);
          progress("✔");
        } catch (err) {
          progress("❌");
          console.log(err);
        }
        break;

      case "loli":
        try {
          progress("⏳");
          res = await axios({
            method: "get",
            url: `https://api.lolicon.app/setu/v2?tag=萝莉&r18=${
              text == "nsfw" ? "1" : "0"
            }`,
            headers: {
              DNT: 1,
              "Upgrade-Insecure-Request": 1,
            },
            responseType: "json",
          });
          teks = `*Detail:*\n- Title: ${res.data.data[0].title}\n- Author: ${res.data.data[0].author}\nTags:`;
          for (let i = 0; i < res.data.data[0].tags.length; i++) {
            teks += `\n- ${i + 1}. ${res.data.data[0].tags[i]}`;
          }
          client.sendImage(from, res.data.data[0].urls.original, teks, mek);
          progress("✔");
        } catch (err) {
          progress("❌");
          console.log(err);
        }
        break;

      case "milf":
        try {
          progress("⌛");
          let milfs = (
            await axios.get(
              `https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json`
            )
          ).data;
          let milf = milfs[Math.floor(Math.random() * milfs.length)];
          let res = await getBuffer(milf);
          client.sendImage(from, res, "", mek);
          progress("✔");
        } catch (err) {
          progress("❌");
          console.log(err);
        }
        break;

      case "brat":
        if (!text) return reply(lang.format(prefix, command));
        try {
          progress("⏳");
          buffer = await getBuffer(
            `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(
              text
            )}&isVideo=false&delay=500`
          );
          client.sendImageAsSticker(from, buffer, mek, false, {
            packname: global.packName,
            author: global.author,
          });
          progress("✔");
        } catch (err) {
          console.error(err);
          progress("❌");
        }
        break;

      /* ================ Media Menu ================ */

      /* ================ Group Menu ================ */
      case "metadata":
        if (!m.isGroup) return reply(lang.onGroup());
        timeUnix = (timeStamp) => {
          months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          date = new Date(timeStamp * 1000);
          year = date.getFullYear();
          month = months[date.getMonth()];
          day = date.getDate();
          hour = date.getHours();
          minute = date.getMinutes();
          second = date.getSeconds();
          time = `${day} ${month} ${year} ${hour}:${minute}:${second}`;
          return time;
        };
        checking = await check.checkRestrict(groupMetadata.id);
        infoGroup = `*- Group Metadata Info -*\n\n*Group ID:* ${
          groupMetadata.id
        }\n*Group Name:* ${groupName}\n*Name Since:* ${timeUnix(
          groupMetadata.subjectTime
        )}\n*Group Creation:* ${timeUnix(
          groupMetadata.creation
        )}\n*Owner Group:* ${
          groupMetadata.owner !== undefined
            ? client.getName(groupMetadata.owner)
            : "-"
        }\n*Members:* ${groupMetadata.size} member.\n*Join Approval:* ${
          groupMetadata.joinApprovalMode ? "Yes" : "No"
        }.\n*Member Add Mode:* ${
          groupMetadata.memberAddMode ? "Yes" : "No"
        }.\n*Antilinkgc:* ${checking.antilinkgc ? "Yes" : "No"}.\n*Bot open:* ${
          checking.open ? "Yes" : "No"
        }.\n*Disappearing Message:* ${
          groupMetadata.ephemeralDuration !== undefined
            ? groupMetadata.ephemeralDuration / (24 * 60 * 60) + " Days"
            : "OFF"
        }.\n*Description:*\n${groupMetadata.desc}`;
        reply(infoGroup);
        break;

      case "join":
        if (!isUrl(text))
          return reply(
            "Example:\n\n!join https://chat.whatsapp.com/GhGhNeX8p3MKwc8KsmaWph"
          );
        try {
          progress("⌛");
          groupLink = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
          await client.groupAcceptInvite(groupLink);
          progress("✔");
        } catch (e) {
          progress("❌");
          console.log(e);
        }
        break;

      case "hidetag":
        if (!m.isGroup) return reply(lang.onGroup());
        if (!isGroupAdmins) return reply(lang.onAdmin());
        if (!q) return reply(lang.format(prefix, command));
        group = await client.groupMetadata(from);
        members = group.participants;
        mem = [];
        await members.map(async (adm) => {
          mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
        });
        client.sendMessage(from, { text: q, mentions: mem });
        break;

      case "tagall":
        if (!m.isGroup) return reply(lang.onGroup());
        if (!isGroupAdmins) return reply(lang.onAdmin());
        members = groupMetadata.participants;
        mem = [];
        textTemplate = `${text ? text : "Tag all!!"}\n\n`;
        for (let member of members) {
          mem.push(member.id);
          textTemplate += `- @${member.id.split("@")[0]}\n`;
        }
        client.sendMessage(
          from,
          { text: textTemplate, mentions: mem },
          { quoted: m }
        );
        break;

      case "add":
        if (!m.isGroup) return reply(lang.onGroup());
        if (!botAdmin) return reply(lang.botAdmin());
        if (!isGroupAdmins && !groupMetadata.memberAddMode)
          return reply(lang.onAdmin());
        if (!text) return reply(lang.format(prefix, command));
        if (isNaN(text)) return reply("use number!");
        await client.groupParticipantsUpdate(
          from,
          [`${text}@s.whatsapp.net`],
          "add"
        );
        break;

      case "kick":
        if (!m.isGroup) return reply(lang.onGroup());
        if (!botAdmin) return reply(lang.botAdmin());
        if (!isGroupAdmins) return reply(lang.onAdmin());
        if (m.mentionedJid.length > 0) {
          removePPL = m.mentionedJid;
          await client
            .groupParticipantsUpdate(from, removePPL, "remove")
            .then(() => {
              client.sendText(from, "success✔", mek);
            });
        } else if (m.quoted) {
          removePPL = [m.quoted.sender];
          await client
            .groupParticipantsUpdate(from, removePPL, "remove")
            .then(() => {
              client.sendText(from, "success✔", mek);
            });
        } else {
          reply("tag/reply member!");
        }
        break;

      case "promote":
        if (!m.isGroup) return reply(lang.onGroup());
        if (!botAdmin) return reply(lang.botAdmin());
        if (!isGroupAdmins) return reply(lang.onAdmin());
        if (m.mentionedJid.length > 0) {
          promotePPL = m.mentionedJid;
          await client
            .groupParticipantsUpdate(from, promotePPL, "promote")
            .then(() => {
              client.sendText(from, "success✔", mek);
            });
        } else if (m.quoted) {
          promotePPL = [m.quoted.sender];
          await client
            .groupParticipantsUpdate(from, promotePPL, "promote")
            .then(() => {
              client.sendText(from, "success✔", mek);
            });
        } else {
          reply("tag/reply member!");
        }

        break;

      case "demote":
        if (!m.isGroup) return reply(lang.onGroup());
        if (!botAdmin) return reply(lang.botAdmin());
        if (!isGroupAdmins) return reply(lang.onAdmin());
        if (m.mentionedJid.length > 0) {
          demotePPL = m.mentionedJid;
          await client
            .groupParticipantsUpdate(from, demotePPL, "demote")
            .then(() => {
              client.sendText(from, "success✔", mek);
            });
        } else if (m.quoted) {
          demotePPL = [m.quoted.sender];
          await client
            .groupParticipantsUpdate(from, demotePPL, "demote")
            .then(() => {
              client.sendText(from, "success✔", mek);
            });
        } else {
          reply("tag/reply member!");
        }

        break;

      case "antilink":
        if (!text) return reply("ON/OFF?");
        if (!m.isGroup) return reply(lang.onGroup());
        if (!isGroupAdmins) return reply(lang.onAdmin());
        if (!botAdmin) return reply(lang.botAdmin());
        progress("⏳");
        checking = await check.checkRestrict(groupMetadata.id);
        if (text.toLowerCase() === "on") {
          create.addRestrict(
            groupMetadata.id,
            true,
            checking.antilinkgc,
            checking.open,
            m
          );
        }
        if (text.toLowerCase() === "off") {
          create.addRestrict(
            groupMetadata.id,
            false,
            checking.antilinkgc,
            checking.open,
            m
          );
        }
        progress("✔");
        break;

      case "antilinkgc":
        if (!text) return reply("ON/OFF?");
        if (!m.isGroup) return reply(lang.onGroup());
        if (!isGroupAdmins) return reply(lang.onAdmin());
        if (!botAdmin) return reply(lang.botAdmin());
        progress("⏳");
        checking = await check.checkRestrict(groupMetadata.id);
        if (text.toLowerCase() === "on") {
          create.addRestrict(
            groupMetadata.id,
            checking.antilink,
            true,
            checking.open,
            m
          );
        }
        if (text.toLowerCase() === "off") {
          create.addRestrict(
            groupMetadata.id,
            checking.antilink,
            false,
            checking.open,
            m
          );
        }
        progress("✔");
        break;

      case "bot":
        if (!text)
          return reply(
            `bot active!\nsince ${runtime(
              process.uptime()
            )} ago\n\n${prefix}bot open - for all member\n${prefix}bot close - for admin only`
          );
        if (!m.isGroup) return reply(lang.onGroup());
        if (!isGroupAdmins) return reply(lang.onAdmin());
        progress("⏳");
        checking = await check.checkRestrict(groupMetadata.id);
        if (text.toLowerCase() === "open") {
          create.addRestrict(
            groupMetadata.id,
            checking.antilink,
            checking.antilinkgc,
            true,
            m
          );
        }
        if (text.toLowerCase() === "close") {
          create.addRestrict(
            groupMetadata.id,
            checking.antilink,
            checking.antilinkgc,
            false,
            m
          );
        }
        progress("✔");
        break;

      /* ================ Group Menu ================ */

      /* ================ Other Menu ================ */
      case "owner":
        reply(lang.ownerContact());
        break;

      case "donasi":
      case "donate":
        client.sendImage(
          from,
          fs.readFileSync("./assets/donate-me.jpg"),
          lang.donate(),
          mek
        );
        break;

      case "ping":
      case "botstatus":
      case "statusbot":
      case "info":
        const used = process.memoryUsage();
        const cpus = os.cpus().map((cpu) => {
          cpu.total = Object.keys(cpu.times).reduce(
            (last, type) => last + cpu.times[type],
            0
          );
          return cpu;
        });
        const cpu = cpus.reduce(
          (last, cpu, _, { length }) => {
            last.total += cpu.total;
            last.speed += cpu.speed / length;
            last.times.user += cpu.times.user;
            last.times.nice += cpu.times.nice;
            last.times.sys += cpu.times.sys;
            last.times.idle += cpu.times.idle;
            last.times.irq += cpu.times.irq;
            return last;
          },
          {
            speed: 0,
            total: 0,
            times: {
              user: 0,
              nice: 0,
              sys: 0,
              idle: 0,
              irq: 0,
            },
          }
        );
        let timestamp = speed();
        let latensi = speed() - timestamp;
        neww = performance.now();
        oldd = performance.now();
        bio = await client.fetchStatus(botNumber);
        respon = `
  - *${global.botName}* -
  
  _*INFO*_
  *Name:* ${global.botName}.
  *Bio:* ${bio[0].status.status}.
  *last update Bio:* ${moment
    .utc(bio[0].status.setAt)
    .tz("Asia/Jakarta")
    .format("YYYY-MM-DD HH:mm:ss")}.
  *Owner:* ${global.ownerName}.
  *Contact:* wa.me/${global.owner[0]}
  *Private Usage:* ${global.db.private_usage}.
  *Group Usage:* ${global.db.private_usage}.
  *Total usage:* ${global.db.private_usage + global.db.private_usage}.
  *Total user:* ${global.db.user.length}.
  
  Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${
          oldd - neww
        } _miliseconds_\n\nRuntime : ${runtime(process.uptime())}
  
  💻 Info Server
  RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
  
  _NodeJS Memory Usage_
  ${Object.keys(used)
    .map(
      (key, _, arr) =>
        `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatp(
          used[key]
        )}`
    )
    .join("\n")}
  
  ${
    cpus[0]
      ? `_Total CPU Usage_
  ${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times)
          .map(
            (type) =>
              `- *${(type + "*").padEnd(6)}: ${(
                (100 * cpu.times[type]) /
                cpu.total
              ).toFixed(2)}%`
          )
          .join("\n")}
  _CPU Core(s) Usage (${cpus.length} Core CPU)_
  ${cpus
    .map(
      (cpu, i) =>
        `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(
          cpu.times
        )
          .map(
            (type) =>
              `- *${(type + "*").padEnd(6)}: ${(
                (100 * cpu.times[type]) /
                cpu.total
              ).toFixed(2)}%`
          )
          .join("\n")}`
    )
    .join("\n\n")}`
      : ""
  }
                  `.trim();
        reply(respon);

        break;

      /* ================ Other Menu ================ */

      /* ================ Owner Menu ================ */
      case "reset":
        {
          if (!isOwner) return reply(lang.owner());
          progress("⏳");
          allDB = global.db.user;
          for (let i = 0; i < allDB.length; i++) {
            allDB[i].latest = false;
          }
          progress("✔");
        }
        break;

      case "clear":
        if (!isOwner) return reply(lang.owner());
        fs.readdir("./tmp", (err, files) => {
          if (err) return console.error(err);
          reply("delete" + files.length + "files.");
          files.forEach((file, index) => {
            fs.unlink(path.join("./tmp", file), (err) => {
              if (err) console.error(err);
              console.log(`File ${file} deleted`);
            });
          });
          progress("✔");
        });
        break;

      default: {
        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith("broadcast")) return;
          if (m.isBaileys) return;
          if (!budy.toLowerCase()) return;
          if (argsLog || (isCmd && !isGroup)) {
            console.log(
              chalk.black(chalk.bgRed("[ ERROR ]")),
              color("command", "turquoise"),
              color(`${prefix}${command}`, "turquoise"),
              color("tidak tersedia", "turquoise")
            );
          } else if (argsLog || (isCmd && isGroup)) {
            console.log(
              chalk.black(chalk.bgRed("[ ERROR ]")),
              color("command", "turquoise"),
              color(`${prefix}${command}`, "turquoise"),
              color("tidak tersedia", "turquoise")
            );
          }
        }
      }
    }

    if (command !== "deleteuser") {
      //Push Database to MongoDB
      senderType = m.isGroup ? groupMetadata.id : sender;
      user = global.db.user.findIndex((user) => user.id === senderType);
      if (user === -1) {
        obj = {
          id: senderType,
          latest: true,
          date: new Date(),
        };
        global.db.user.push(obj);
        reply(lang.update(pushname));
      } else if (!global.db.user[user].latest) {
        global.db.user[user].latest = true;
        reply(lang.update(pushname));
      }
      if (senderType.includes("s.whatsapp.net")) {
        global.db.private_usage++;
      }
      if (senderType.includes("g.us")) {
        global.db.group_usage++;
      }
    }
  }

  if (budy.startsWith(">")) {
    if (!isOwner) return;
    try {
      console.log("[eval] " + body);
      let evaled = await eval(budy.slice(2));
      if (typeof evalved !== "string") evaled = require("util").inspect(evaled);
      await m.reply(evaled);
    } catch (error) {
      await m.reply(String(error));
    }
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
