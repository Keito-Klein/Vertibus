
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs");
const os = require('os');
const speed = require('performance-now')
const { performance } = require('perf_hooks');
const { runtime, formatp, getBuffer, sleep } = require("./lib/utils.js") 
const util = require("util");
const chalk = require("chalk");
const { Configuration, OpenAIApi } = require("openai");
const cheerio = require("cheerio");
const axios = require("axios");
const ytdl = require('ytdl-core');
const fbdl = require('fbvideos');
const fetch = require('node-fetch');
const neko_modules = require('nekos.life');
const moment = require('moment-timezone');
const Replicate = require("replicate");
const { ocrSpace } = require('ocr-space-api-wrapper');
const { doing } = require('./lib/translate')
const { event } = require("./lib/event.js")
const { processing } = require("./lib/remini")
const { mt } = require("./lib/mt.js")
const { ind } =require("./language")
const { eng } = require("./language")
const { bug } = require('./lib/bug')
const { igDownloader, tiktok, fb, pinterest } = require("./lib/downloader")


var ipackName = false//Don't fill. sett packName on setting.js
var iauthor = false//Don't fill. sett author on setting.js

/*DataBase*/
const guild = JSON.parse(fs.readFileSync('./db/guild.json'));
const inRaid = JSON.parse(fs.readFileSync("./lib/guild.json"));
const welkom = JSON.parse(fs.readFileSync('./db/welcome.json'));
const usage = JSON.parse(fs.readFileSync("./db/usage.json"));
const register = JSON.parse(fs.readFileSync("./db/register.json"));
const akronim = JSON.parse(fs.readFileSync("./db/guide-data/akronim.json"));

/*Change Your Language Here!*/
lang = ind

//Regist Function
const addUser = (id) => {
  let userIndex = register.findIndex(user => user.id === id);
  if (userIndex === -1) {
    const ovj = {
      id,
      latest: true
    }
    register.push(ovj)
  } else {
    if (!register[userIndex].latest) {
      register[userIndex].latest = true
    }
  }
  fs.writeFileSync('./db/register.json' , JSON.stringify(register));
}

//Akronim Function
const acronime = (query) => {
  let position = false
  Object.keys(akronim).forEach((i) => {
                if (akronim[i].akronim === query.toLowerCase()) {
                    position = akronim[i].mean
                }
            })
            return position
        }

//Buff Function
//OK
const addBuff = (name, buff) => {
        const ovj = {id: name, buff: buff}
        guild.push(ovj)
        fs.writeFileSync('./db/guild.json', JSON.stringify(guild))
        }

//OK
const getBuff = (name) => {
    let position = false
    Object.keys(guild).forEach((i) => {
    if (guild[i].id.toLowerCase() === name.toLowerCase()) {
    position = i
    }
})
return guild[position].buff
}

//OK
const multipleBuff = (buff) => {
  let position = ["tidak ada"]
  Object.keys(guild).forEach( (i) =>  {
    if(guild[i].buff.toLowerCase().includes(buff)) {
       position.push(guild[i].id)
    }
  })
  if(position.length > 1) {
    position.splice(0, 1)
    }
       return position
}

//OK
const checkName = (name) => {
  let position = false
  Object.keys(guild).forEach((i) => {
                if (guild[i].id.toLowerCase() === name.toLowerCase()) {
                    position = true
                }
            })
            return position
        }

        const changeName = (name, cname) => {
          let position = false;
  Object.keys(guild).forEach((i) => {
    if(guild[i].id.toLowerCase() == name.toLowerCase()) {
      position = i
    }
  })
  if(position !== false) {
    guild[position].id = cname
    fs.writeFileSync('./db/guild.json', JSON.stringify(guild))
  }
        }

//OK
const changeBuff = (name, lvl) => {
  let position = false;
  Object.keys(guild).forEach((i) => {
    if(guild[i].id.toLowerCase() == name.toLowerCase()) {
      position = i
    }
  })
  if(position !== false) {
    guild[position].buff = lvl
    fs.writeFileSync('./db/guild.json', JSON.stringify(guild))
  }
}

//OK
const delBuff = (name) => {
  let position = false
  Object.keys(guild).forEach((i) => {
    if (guild[i].id.toLowerCase() == name.toLowerCase()) {
      position = i
    }
  })
  if (position !== false) {
    guild.splice(position, 1)
    fs.writeFileSync('./db/guild.json', JSON.stringify(guild))
  }
}



module.exports = sansekai = async (client, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    const type = Object.keys(m.message)[0]
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
    const mik = (m.quoted || m)
    const quoted = (mik.mtype == 'buttonsMessage') ? mik[Object.keys(mik)[1]] : (mik.mtype == 'templateMessage') ? mik.hydratedTemplate[Object.keys(mik.hydratedTemplate)[1]] : (mik.mtype == 'product') ? mik[Object.keys(mik)[0]] : m.quoted ? m.quoted : m
    chats = (type === 'conversation') ? m.message.conversation : (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''


    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];
    const qms = (quoted.msg || quoted)
    const mime = (quoted.msg || quoted).mimetype || ''
    const content = JSON.stringify(m.message)


    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };
      //Ku Nonaktifin
  //   let infoMSG = JSON.parse(fs.readFileSync('./db/msg.data.json'))
  // infoMSG.push(JSON.parse(JSON.stringify(mek)))
  // fs.writeFileSync('./db/msg.data.json', JSON.stringify(infoMSG, null, 2))
  // const urutan_pesan = infoMSG.length
  // if (urutan_pesan === 5000) {
  //     infoMSG.splice(0, 4300)
  //     fs.writeFileSync('./db/msg.data.json', JSON.stringify(infoMSG, null, 2))
  // }

  const getGroupAdmins = (participants) => {
  admins = []
  for (let i of participants) {
    i.admin ? admins.push(i.id) : ''
  }
  return admins
}
  

    // Group
    const myGuild = global.guild
    const ppl = ['6283831853737', '62895329820760', '6289515792657', '6285933664170', '6281944265371', '6282261871729', '628980354156', "62819442653710"]
    const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
    }
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const groupId = m.isGroup ? groupMetadata.id : ''
    const groupMembers = m.isGroup ? groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? getGroupAdmins(groupMembers) : ''
    const isWelkom = m.isGroup ? welkom.includes(from) : false
    const isGroupAdmins = groupAdmins.includes(sender) || false
    const botAdmin = groupAdmins.includes(botNumber) || false
    const isMyGuild = myGuild.includes(groupId) || false
    const isOwner = global.owner.includes(sender.split('@')[0]) || false



    /*Media Init*/
    const isMedia = (m.mtype === 'imageMessage' || m.mtype === 'videoMessage')
    const isQuotedImage = m.mtype === 'extendedTextMessage' && content.includes('imageMessage')
    const isQuotedAudio = m.mtype === 'extendedTextMessage' && content.includes('audioMessage')
    const isQuotedSticker = m.mtype === 'extendedTextMessage' && content.includes('stickerMessage')

    /*Farming Object*/
    let mobs = {
    mats: {
      metal: [{
          monster: 'Goblin{Pedang)',
          lv: '24',
          element: 'Api',
          hp: 'idk',
          exp: 'idk',
          map: 'Gua Ribisco: A3'
      }, 
      {
          monster: 'Stone Soldier',
          lv: '37',
          element: 'Bumi',
          hp: 'idk',
          exp: 'idk',
          map: 'Gua Lutaros: Mulut Gua'
        }, {
          monster: 'Ksatria Terkontrol',
          lv: '93',
          element: 'Gelap',
          hp: 'idk',
          exp: 'idk',
          map: 'Istana Gelap: A2'
        }, {
          monster:'*Malaikat Gelembung(Biru)*',
          lv: '*143*',
          element: '*Air*',
          hp: '*idk*',
          exp: '*idk*',
          map: '*Kuil Dewa Berkah: A2*'
        }, {
          monster: 'Bitum',
          lv: '210',
          element: 'Api',
          hp: '36.600',
          exp: '581',
          map: 'Gunung Vulkani: A3'
        }],

      wood: [{
          monster: 'Shell Mask',
          lv: '27',
          element: 'Bumi',
          hp: 'idk',
          exp: 'idk',
          map: 'Gunung Nisel: Lereng'
        },
        {
          monster: 'Machina Tumbuhan',
          lv: '95',
          element: 'Bumi',
          hp: 'idk',
            exp: 'idk',
            map: 'Pembuangan Peligro'
        }, {
          monster: 'Pohon Parasit',
          lv: '152',
          element: 'Bumi',
          hp: 'idk',
          exp: '94',
          map: 'Distrik Altolae'
        }, {
          monster: '*Ivy*',
          lv: '*150*',
          element: '*Bumi*',
          hp: '*idk*',
          exp: '*195*',
          map: '*Kuil Naga Kegelapan: A2*'
        }],

        beast: [{
          monster: 'Beak',
          lv: '18',
          element: 'Angin',
          hp: 'idk',
          exp: 'idk',
          map: 'Kuil Runtuh: A1'
        }, {
          monster: 'Parasitized Dog',
          lv: '57',
          element: 'Gelap',
          hp: 'idk',
          exp: 'idk',
          map: 'Kota Hilang: Alun-Alun'
        }, {
          monster: '*Venomsch*',
          lv: '*112*',
          element: '*Air*',
          hp: '*7000*',
          exp: '*dk*',
          map: '*Saluran Bawah Tanah Ultimea: Selatan*'
        }, {
          monster: '*Underground Nemico*',
          lv: '*109*',
          element: '*Angin*',
          hp: '*idk*',
          exp: '*idk*',
          map: '*Saluran Bawah Tanah Ultimea: Tenggara*'
        }],

        medic: [{
          monster: '*Jelly Ungu*',
          lv: '*110*',
          element: '*Gelap*',
          hp: '*7000*',
          exp: '*128*',
          map: '*Saluran Bawah Tanah Ultimea: Tenggara*'
        }, {
          monster: 'Lyark Spesialis',
          lv: '119',
          element: 'Gelap',
          hp: '15000',
          exp: '286',
          map: 'Laboratorium Brahe: Gedung 2'
        }, {
          monster: 'Acernix',
          lv: '138',
          element: 'Air',
          hp: '4000',
          exp: '197',
          map: 'Taman Es & Salju'
        }],
        cloth: [{
          monster: 'Rutiro',
          lv: '36',
          element: 'Gelap',
          hp: '1300',
          exp: '48',
          map: 'Menara Kuno Aulada'
        }, {
          monster: 'Cassy',
          lv: '48',
          element: 'Gelap',
          hp: 'idk',
          exp: '72',
          map: 'Makam Ratu Kuno: Area 2'
        }, {
          monster: 'Underground Nemico',
          lv: '109',
          element: 'Angin',
          hp: '6500',
          exp: '103',
          map: 'Saluran Bawah Tanah Ultimea: Tenggara'
        }, {
          monster: 'Potum Semadi',
          lv: '132',
          element: 'cahaya',
          hp: '8465',
          exp: '153',
          map: 'Koridor Haresi'
        }]
    },
  }

  /*Random No.*/
  const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`
}


    //maintenance Toggle
    if (global.maintenance === true && isCmd2 && !isOwner) {
      return reply("Bot is Under Maintenance! 🛠")
    }



    //Proccess
    const proses = (reaction) => {
       const reactions = {
        react: {
          text: reaction,
          key: m.key
        }
       } 
       client.sendMessage(from, reactions)
    }


    //Tag Detector
    if(budy.includes(`@${global.owner}`)) {
      teks = `
      Tag/Reply
      Sender: ${sender}
      Group: ${groupName}
      Text: ${m.quoted ? m.message.extendedTextMessage.contextInfo.quotedMessage.conversation : text}`
      client.sendText(global.owner + "@s.whatsapp.net", teks)
    }

    //Message detector
    /*if(!m.isGroup && !isCmd2 && !itsMe) {
      teks = `
      Bot has New Message!
      Sender: ${pushname}
      Text: ${m.quoted ? m.message.extendedTextMessage.contextInfo.quotedMessage.conversation : text}`
      client.sendText(global.owner + "@s.whatsapp.net", teks)
    }*/


    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (isCmd2 && !m.isGroup) {
      let userIndex = register.findIndex(user => user.id === sender);
      if (userIndex == -1) {
          reply(lang.update(pushname))
          addUser(sender)
      } else if (!register[userIndex].latest) {
        reply(lang.update(pushname))
        addUser(sender)
      }
      usage.usage_private++
      fs.writeFileSync("./db/usage.json", JSON.stringify(usage));
      console.log(chalk.black(chalk.bgWhite("[ LOGS ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
    } else if (isCmd2 && m.isGroup) {
      let userIndex = register.findIndex(user => user.id === groupMetadata.id);
      if (userIndex == -1) {
          reply(lang.update(pushname))
          addUser(groupMetadata.id)
      } else if (!register[userIndex].latest) {
        reply(lang.update(pushname))
        addUser(groupMetadata.id)
      }
      usage.usage_group++
      fs.writeFileSync("./db/usage.json", JSON.stringify(usage));
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("IN"),
        chalk.green(groupName)

      );
    }

    if (isCmd2) {
    switch (command) {
case "help":
case "menu":
  m.reply(lang.menu(prefix))
break;

        

case 'neko' :
  try {
    proses('⏳')
    cons = new neko_modules()
    neko = await cons.neko()
    url = neko.url
    client.sendImage(from, url, " ", mek)
    proses("✔")
  } catch(err) {
    proses("❌")
    }
          
break

case 'wallpaper': 
  cons = new neko_modules()
  neko = await cons.wallpaper()
  url = neko.url
  client.sendImage(from, url, '', mek)
break

          

        case 'anime':
          try {
          proses("⏳")
          url = 'https://loli-api.glitch.me/api/v1/twintails'
          response = await axios.get(url)
          res = await fetch(response.data.url)
          data = await res.buffer()
          client.sendImage(from, data, " ", mek)
          proses("✔")
        } catch(err) {
          proses("❌")
          console.log(err)
        }
          break
          

          case 'loli':
          case 'milf':
            try{
              proses("⏳")
                res = await axios({
                  method: 'get',
                  url: `https://api.lolicon.app/setu/v2?tag=${command == 'loli' ? '萝莉' : 'milf'}&r18=${text == 'nsfw' ? '1' : '0'}`,
                  headers: {
                    'DNT': 1,
                    'Upgrade-Insecure-Request': 1
                  },
                  responseType: 'json'
                })
                teks = `*Detail:*\n- Title: ${res.data.data[0].title}\n- Author: ${res.data.data[0].author}\nTags:`
                for (let i = 0; i < res.data.data[0].tags.length; i++) {
                  teks += `\n- ${i+1}. ${res.data.data[0].tags[i]}`
                }
                client.sendImage(from, res.data.data[0].urls.original, teks, mek)
                proses("✔")
            } catch(err) {
              proses("❌")
              console.log(err)
            }
            break

          case 'pixiv':
            if(!text) return reply(lang.format(prefix, command))
              try{
              proses("⏳")
                res = await axios({
                  method: 'get',
                  url: `https://api.lolicon.app/setu/v2?keyword=${encodeURIComponent(text)}`,
                  headers: {
                    'DNT': 1,
                    'Upgrade-Insecure-Request': 1
                  },
                  responseType: 'json'
                })
                if(res.data.error) return proses("❌")
                if(res.data.data.length === 0) return reply('Not Found!')
                teks = `*Detail:*\n- Title: ${res.data.data[0].title}\n- Author: ${res.data.data[0].author}\nTags:`
                for (let i = 0; i < res.data.data[0].tags.length; i++) {
                  teks += `\n- ${i+1}. ${res.data.data[0].tags[i]}`
                }
                client.sendImage(from, res.data.data[0].urls.original, teks, mek)
                proses("✔")
            } catch(err) {
              proses("❌")
              console.log(err)
            }
            break

          case 'pinterest':
            if(!text) return reply(lang.format(prefix,command))
              try{
                proses("⏳")
                fetcher = await pinterest(encodeURIComponent(text))
                res = fetcher[Math.round(Math.random() * fetcher.length)]
                client.sendImage(from, res, text, mek)
                proses("✔")
              } catch(err) {
                proses("❌")
                console.log(err)
              }
            break


        case 'watk':
          if(!q) return reply(lang.format(prefix, command))
          int = parseInt(q)
          proc = eval(int*110/100+10)
          str = proc.toString()
          m.reply(str)
          break;

        case 'cdmg':
          if(!q)return reply(lang.format(prefix, command))
          if(!q.includes("/")) return reply("use \"/\" as separator!\nex: total STR/total STR on eq/total cd percent/cd flat/LV of skill critical UP\nOr:\n/cdmg 250/5/20/40/10\nDon't use space!\n\nPenjelasan:\n- Total Str di personal status\n- Total STR di equipment/avatar\n- Total critical damage % di eq/avatar\n- Total critical damage di eq/avatar\n Level skill Crit. UP(Di skill tempur")
            str = q.split("/")[0]
            strP = q.split("/")[1]
            eq = q.split("/")[2]
            xtall = q.split("/")[3]
            skill = q.split("/")[4]
            strength = parseInt(str)
            strengthPers = parseInt(strP)
            percent = parseInt(eq)
            flat = parseInt(xtall)
            crit = parseInt(skill);
            //RUMUS
            base = 150 + (strength / 5)
            cdPers = base * percent / 100
            pasif = crit / 2 / 100 * 200
            strPer = strength * strengthPers / 100 / 5
            total = base + cdPers + pasif + strPer + flat
            rounded = Math.floor(total)
            result = rounded.toString()
            reply(result)
            break;


          case 'lv':
          case 'lvl':
          case 'lvling' : 
          case 'leveling':
            try {
         lvl = q.split('|')[0]
         bexp = q.split('|')[1]
         if (!lvl) return m.reply(lang.format(prefix, command))
          if (q.toLowerCase() == 'bs') return reply(lang.bs())
           if (!bexp) {
            bexp = '0'
           }
          if( isNaN(lvl)) return m.reply(lang.format(prefix, command))
            if( isNaN(bexp)) return m.reply(lang.format(prefix, command))
              proses("⏳")
        
    axios.get(`https://toram-id.com/leveling?level=${lvl}&bonusexp=${bexp}&range=5`)
  .then((response) => {
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const array = []
      $('tr.text-danger').each(function(i, elem) {
        array[i] = {
          boss: $(this).find('.px-2 > div').text().trim(),
          location: $(this).find('.text-muted > a').text().trim(),
          exp: $(this).find('.text-primary').text().trim()
        }
      });
      let gb = `*Leveling lvl ${lvl} & bonus exp ${bexp}*\n`
      for(let i = 0; i < array.length; i++) {
          gb += `-------------------------------\nBoss: ${array[i].boss}\nLocation: ${array[i].location}\nEXP: ${array[i].exp}\n`
      }
      client.sendText(from, gb, mek)
      proses("✔")
    }
  })
    } catch (err) {
      proses("❌")
      m.reply(lang.eror(err))
    }
  break;

  case "istilah":
  case "singkatan":
  case "akronim":
  case 'acronym':
    if (q) {
      mean = acronime(q)
      if (mean !== false) {
        client.sendText(from, mean, mek)
      } else if (!mean) {
        reply(`acronym not available, pm owner for added it`)
      }
    } else {
      db = `*Berikut istilah-istilah dalam Toram Online:*\n\n`
      Object.keys(akronim).forEach((i) => {
        db += `*Istilah:* ${akronim[i].akronim}\n*Arti:* ${akronim[i].mean}\n\n` 
      })
      client.sendText(from, db, mek)
    }
    break

  case 'mobs':
case 'boss':
case 'monster':
  try {

  if(!text) return reply(lang.format(prefix,command))
    proses("⏳")

  axios.get(`https://coryn.club/monster.php?name=${text}`)
 .then((response) => {
    if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html)
        array = []
         $(".card-container > div").each(function(i, elem) {
            array[i] = {
                boss: $(this).find("div > .card-title-inverse").text().trim(),
                diff: $(this).find(".monster-no-pic > div > .item-prop > div:nth-child(2) > p:nth-child(2)").text().trim(),
                lv: $(this).find(".monster-no-pic > div > .item-prop > div:nth-child(1) > p:nth-child(2)").text().trim(),
                hp: $(this).find(".monster-no-pic > div > .item-prop > div:nth-child(3) > p:nth-child(2)").text().trim(),
                exp: $(this).find(".monster-no-pic > div > .item-prop > div:nth-child(5) > p:nth-child(2)").text().trim(),
                element: $(this).find(".monster-no-pic > div > .item-prop > div:nth-child(4) > p:nth-child(2)").text().trim(),
                tamable: $(this).find(".monster-no-pic > div > .item-prop > div:nth-child(6) > p:nth-child(2)").text().trim(),
                map: $(this).find(".item-prop > div:nth-child(2) > a").text().trim(),
                drop: $(this).find(`.monster-drop > div > a`).text().trim()
            }
        })
            db = `*detail ${command + text}:*\n\n`
            for (let i = 0; i < array.length; i++) {
              db += `-----------------------------------\nBoss: ${array[i].boss}\nDiff: ${array[i].diff}\nLevel: ${array[i].lv}\nHP: ${array[i].hp}\nEXP: ${array[i].exp}\nElement: ${array[i].element}\nTamable: ${array[i].tamable}\nLocation: ${array[i].map}\nDrop: ${array[i].drop}\n`
            }
            client.sendText(from, db, mek)
            proses("✔")
        }
    
 })
  } catch (err) {
    proses('❌')
    m.reply(lang.eror())
  }
  break

case 'bs':
case 'blacksmith':
  db = await lang.bs()
  reply(db)
  break

case 'food': 
  reply(from, `
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
10 = 1533`, mek)
break

case 'arrow':
case 'panah':
  arrow = await lang.arrow()
  client.sendText(from, arrow, mek)
break

case 'tas':
case 'bag':
  tas = await lang.bag()
  client.sendText(from, tas, mek)
break

case 'ailment':
  ail = await lang.ailment();
  client.sendText(from, ail, mek)
break

case 'maze' :
  maze = args[0]
  if (!maze) return reply("masukan query !\contoh : /maze guide\n/maze build\n/maze drop")
  db = await lang.maze(maze)
 client.sendText(from, db, mek)
  break

case 'mq' :
  mq = lang.mq();
  client.sendText(from, mq, mek)
break

  case 'farm':
  case 'farming':
  if (!text) return reply(lang.format(prefix, command))
    if(text == "logam" || text == "metal") {
      db = await lang.head(text)
      for(let i = 0; i < mobs.mats.metal.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.metal[i].monster}\nLevel: ${mobs.mats.metal[i].lv}\nElement: ${mobs.mats.metal[i].element}\nHP: ${mobs.mats.metal[i].hp}\nEXP: ${mobs.mats.metal[i].exp}\nLokasi: ${mobs.mats.metal[i].map}`
      }
      client.sendText(from, db, mek)
    } else if(text == "kayu" || text == "wood") {
      db = await lang.head(text)
      for(let i = 0; i < mobs.mats.wood.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.wood[i].monster}\nLevel: ${mobs.mats.wood[i].lv}\nElement: ${mobs.mats.wood[i].element}\nHP: ${mobs.mats.wood[i].hp}\nEXP: ${mobs.mats.wood[i].exp}\nLokasi: ${mobs.mats.wood[i].map}`
      }
      client.sendText(from, db, mek)
    } else if(text == 'fauna' || text == "beast") {
      db = await lang.head(text)
      for(let i = 0; i < mobs.mats.beast.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.beast[i].monster}\nLevel: ${mobs.mats.beast[i].lv}\nElement: ${mobs.mats.beast[i].element}\nHP: ${mobs.mats.beast[i].hp}\nEXP: ${mobs.mats.beast[i].exp}\nLokasi: ${mobs.mats.beast[i].map}`
      }
      client.sendText(from, db, mek)
    } else if(text == 'obat' || text == "medic" || text == "medicine") {
      db = await lang.head(text)
      for(let i = 0; i < mobs.mats.medic.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.medic[i].monster}\nLevel: ${mobs.mats.medic[i].lv}\nElement: ${mobs.mats.medic[i].element}\nHP: ${mobs.mats.medic[i].hp}\nEXP: ${mobs.mats.medic[i].exp}\nLokasi: ${mobs.mats.medic[i].map}`
      }
      client.sendText(from, db, mek)
    } else if(text == 'kain' || text == "cloth") {
      db = await lang.head(text)
      for(let i = 0; i < mobs.mats.cloth.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.cloth[i].monster}\nLevel: ${mobs.mats.cloth[i].lv}\nElement: ${mobs.mats.cloth[i].element}\nHP: ${mobs.mats.cloth[i].hp}\nEXP: ${mobs.mats.cloth[i].exp}\nLokasi: ${mobs.mats.cloth[i].map}`
      }
      client.sendText(from, db, mek)
    }
    break;

  case 'logam':
  case 'metal':
     db = await lang.head(command)
      for(let i = 0; i < mobs.mats.metal.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.metal[i].monster}\nLevel: ${mobs.mats.metal[i].lv}\nElement: ${mobs.mats.metal[i].element}\nHP: ${mobs.mats.metal[i].hp}\nEXP: ${mobs.mats.metal[i].exp}\nLokasi: ${mobs.mats.metal[i].map}`
      }
      client.sendText(from, db, mek)
  break;

  case 'kayu':
  case 'wood':
     db = await lang.head(command)
      for(let i = 0; i < mobs.mats.wood.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.wood[i].monster}\nLevel: ${mobs.mats.wood[i].lv}\nElement: ${mobs.mats.wood[i].element}\nHP: ${mobs.mats.wood[i].hp}\nEXP: ${mobs.mats.wood[i].exp}\nLokasi: ${mobs.mats.wood[i].map}`
      }
      client.sendText(from, db, mek)
  break;

case 'fauna':
  case 'beast':
    db = await lang.head(command)
      for(let i = 0; i < mobs.mats.beast.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.beast[i].monster}\nLevel: ${mobs.mats.beast[i].lv}\nElement: ${mobs.mats.beast[i].element}\nHP: ${mobs.mats.beast[i].hp}\nEXP: ${mobs.mats.beast[i].exp}\nLokasi: ${mobs.mats.beast[i].map}`
      }
      client.sendText(from, db, mek)
  break;

  case 'obat':
  case 'medic':
  case 'medicine':
     db = await lang.head(command)
      for(let i = 0; i < mobs.mats.medic.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.medic[i].monster}\nLevel: ${mobs.mats.medic[i].lv}\nElement: ${mobs.mats.medic[i].element}\nHP: ${mobs.mats.medic[i].hp}\nEXP: ${mobs.mats.medic[i].exp}\nLokasi: ${mobs.mats.medic[i].map}`
      }
      client.sendText(from, db, mek)
  break;

case 'kain':
  case 'cloth':
    db = await lang.head(command)
      for(let i = 0; i < mobs.mats.cloth.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.cloth[i].monster}\nLevel: ${mobs.mats.cloth[i].lv}\nElement: ${mobs.mats.cloth[i].element}\nHP: ${mobs.mats.cloth[i].hp}\nEXP: ${mobs.mats.cloth[i].exp}\nLokasi: ${mobs.mats.cloth[i].map}`
      }
      client.sendText(from, db, mek)
  break;

  case 'event': 
    if(!text) return reply(lang.format(prefix,command))
      if(text == "valentine") {
        valen = event(text)
        db = lang.quest(command, text)
        for (let i = 0; i < valen.quest.length; i++) {
          db += `\n------------------\n*${valen.quest[i].name}*\nSyarat: ${valen.quest[i].req}\nNPC: ${valen.quest[i].npc}\nQuest Level: ${valen.quest[i].lv}\nBahan Quest: \n${valen.quest[i].mats}\nBoss: ${valen.quest[i].boss}\nUnsur Boss: ${valen.quest[i].element}\nEXP: \n${valen.quest[i].exp}\nReward: ${valen.quest[i].reward}`
        }
      client.sendText(from, db,mek)
      }
      if (text == "natal" || text == "christmas") {
        cris = event(text)
        client.sendText(from, cris, mek)
      }
      if (text == "hanami") {
        hana = await event(text)
        db = await lang.quest(command, text)
        for (let i = 0; i < hana.quest.length; i++) {
          db += `\n------------------------------\n*${hana.quest[i].name}*\n*Syarat:* ${hana.quest[i].req}\n*Quest:* \n${hana.quest[i].quest}\n*Boss:* ${hana.quest[i].boss}\n*Unsur Boss:* ${hana.quest[i].element}\n*EXP:* \n${hana.quest[i].exp}\n*Reward:* ${hana.quest[i].reward}`
        }
        client.sendText(from, db, mek)
      }
      if (text == "summer" || text == "sumer") {
        sumer = await event(text)
        db = await lang.quest(command, text)
        for (let i = 0; i < sumer.quest.length; i++) {
          db += `\n------------------------------\n*${sumer.quest[i].name}*\n*Syarat:* ${sumer.quest[i].req}\n*Quest:* \n${sumer.quest[i].quest}\n*Boss:* ${sumer.quest[i].boss}\n*Unsur Boss:* ${sumer.quest[i].element}\n*EXP:* \n${sumer.quest[i].exp}\n*Reward:* ${sumer.quest[i].reward}`
        }
        client.sendText(from, db, mek)
      }
      break;

    case 'valentine':
      valen = await event(command)
        db = await lang.quest(command)
        for (let i = 0; i < valen.quest.length; i++) {
          db += `\n------------------\n*${valen.quest[i].name}*\nSyarat: ${valen.quest[i].req}\nNPC: ${valen.quest[i].npc}\nQuest Level: ${valen.quest[i].lv}\nBahan Quest: \n${valen.quest[i].mats}\nBoss: ${valen.quest[i].boss}\nUnsur Boss: ${valen.quest[i].element}\nEXP: \n${valen.quest[i].exp}\nReward: ${valen.quest[i].reward}`
        }
        client.sendText(from, db, mek)
        break

      case 'hanami':
      hana = await event(command)
        db = await lang.quest(command)
        for (let i = 0; i < hana.quest.length; i++) {
          db += `\n------------------\n*${hana.quest[i].name}*\nSyarat: ${hana.quest[i].req}\nQuest: \n${hana.quest[i].quest}\nBoss: ${hana.quest[i].boss}\nUnsur Boss: ${hana.quest[i].element}\nEXP: \n${hana.quest[i].exp}\nReward: ${hana.quest[i].reward}`
        }
        client.sendText(from, db, mek)
        break

      case 'summer':
      case 'sumer':
      sumer = await event(command)
        db = await lang.quest(command)
        for (let i = 0; i < sumer.quest.length; i++) {
          db += `\n------------------\n*${sumer.quest[i].name}*\nSyarat: ${sumer.quest[i].req}\nQuest: \n${sumer.quest[i].quest}\nBoss: ${sumer.quest[i].boss}\nUnsur Boss: ${sumer.quest[i].element}\nEXP: \n${sumer.quest[i].exp}\nReward: ${sumer.quest[i].reward}`
        }
        client.sendText(from, db, mek)
        break


    case 'natal':
    case 'christmas':
      cris = await event(command)
      client.sendText(from, cris, mek)
    break

    case 'maintenance':
    case 'mt':
      maint = await mt()
      client.sendText(from, maint, mek)
    break

  

case 'address':
case 'code':
case 'adres':
case 'addres':
case 'adress':
    reply(lang.buff(q))
  break


  case 'meta':
    se = client.groupMetadata()
    console.log(groupMetadata)
    break

    case 'remini': 
    case 'tohd':
  if (!/image/.test(mime)) return reply('gunakan foto!')
  if (!/image\/(jpe?g|png)/.test(mime)) return reply('Format gambar tidak didukung!')
    if (/image/.test(mime)) {
      proses("⏳")
      let media = await client.downloadMediaMessage(qms)
      let encmedia = await processing(media, 'enhance')
      client.sendImage(from, encmedia, 'Done!', mek)
      proses("✔")
    }
    break

  case 'sticker':
  case 's':
  case 'stickergif':
  case 'sgif': 
  case 'stiker':
    try {
     if(q.split('|')[0]) {
      ipackName = q.split('|')[0]
     }
     if(q.split('|')[1]) {
      iauthor = q.split('|')[1]
     }
     proses("⏳")
             if (/image/.test(mime)) {

                  let media = await client.downloadMediaMessage(qms)
                  let encmedia = await client.sendImageAsSticker(from, media, m, text.toLowerCase() == "asli" ? true : false, { packname: q.split('|')[0] ? ipackName : global.packName, author: q.split('|')[1] ? iauthor : global.author })
                 await fs.unlinkSync(encmedia)
                 proses("✔")
             } else if (/video/.test(mime)) {
                  if (qms.seconds > 11) return reply('Maksimal 10 detik!')
                 let media = await client.downloadMediaMessage(qms)
                 let encmedia = await client.sendVideoAsSticker(from, media, m, { packname: q.split('|')[0] ? ipackName : global.packName, author: q.split('|')[1] ? iauthor : global.author })
                  await fs.unlinkSync(encmedia)
                  proses("✔")
              } else {
                 m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
                 }
               } catch(err) {
                proses("❌")
                console.log(err);
               }
              
              break;

case 'smeme': case 'stickmeme':
  try {

  if (!text) return m.reply(`cara penggunaan ${prefix + command} teks atas|teks bawah`)
    proses("⏳")
top = encodeURIComponent(q.split('|')[0])
bottom = encodeURIComponent(q.split('|')[1])
var imgbb = require('imgbb-uploader')
if ((isMedia && !m.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length > 0) {
ger = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo : m
ranp = getRandom('54')
owgi = await  client.downloadAndSaveMediaMessage(qms,ranp)
 options = {
  apiKey: global.imgbb, // MANDATORY

  imagePath: owgi, // OPTIONAL: pass a local file (max 32Mb)

  name: ranp, // OPTIONAL: pass a custom filename to imgBB API

  expiration: 3600 /* OPTIONAL: pass a numeric value in seconds.
  It must be in the 60-15552000 range.
  Enable this to force your image to be deleted after that time. */,
};

anu = await imgbb(options)

teks = `${anu.display_url}`
anu1 = `https://api.memegen.link/images/custom/${q.split('|')[1] ? top : ' '}/${q.split('|')[1] ? bottom : top}.png?background=${teks}`
encmedia = await client.sendImageAsSticker(from, `${anu1}`, m, false, { packname: global.packName, author: global.author })
fs.unlinkSync(owgi)
fs.unlinkSync(encmedia)
proses("✔")
} else {
m.reply('Gunakan foto/stiker!')
}
} catch(err) {
  proses("❌")
  console.log(err);
}
break

case 'toimg':
  if (!isQuotedSticker) return reply('𝗥𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝘀𝘁𝗶𝗰𝗸𝗲𝗿 !')
  try {

    proses("⏳")
  ran = getRandom("99")
  media = await client.downloadAndSaveMediaMessage(qms, ran)
  modMedia = client.toImage(from, media, m)
  fs.unlinkSync(media)
  proses("✔")
} catch(err) {
  proses("❌")
  console.log(err)
}
break

case 'tomp4': case 'tovideo': 
if (!isQuotedSticker) return reply('𝗥𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝘀𝘁𝗶𝗰𝗸𝗲𝗿 !')
  if (m.msg.contextInfo.quotedMessage.stickerMessage.isAnimated === false) return reply(" Gunakan sticker animated !")
try {
proses("⏳")
if (m.msg.contextInfo.quotedMessage.stickerMessage.isAnimated === true) {
const { toVideo } = require("./lib/exif")
ran = getRandom("98")
media = await client.downloadAndSaveMediaMessage(qms, ran)
let webpToMp4 = await toVideo(media)
await client.sendMessage(from, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, {quoted:m})
await fs.unlinkSync(media)
proses("✔")
}
} catch(err) {
  proses("❌")
  console.log(err);
}
break


/*case 'tovid':
if (!isQuotedSticker) return reply('𝗥𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝘀𝘁𝗶𝗰𝗸𝗲𝗿 !')
  if (m.msg.contextInfo.quotedMessage.stickerMessage.isAnimated === false) return reply(" Gunakan sticker animated !")
    try {
proses("⏳")
if (m.msg.contextInfo.quotedMessage.stickerMessage.isAnimated === true) {
const { tovid } = require("./lib/exif")
ran = getRandom("99")
media = await client.downloadAndSaveMediaMessage(qms, ran)
let webpToMp4 = await toVideo(media, )
await client.sendMessage(from, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, {quoted:m})
await fs.unlinkSync(media)
proses("✔")
}
} catch(err) {
  proses("❌")
  console.log(err);
}
  break*/


  case 'togif':
  if (!isQuotedSticker) return reply('𝗥𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝘀𝘁𝗶𝗰𝗸𝗲𝗿 !')
  ran = getRandom("99")
  media = await client.downloadAndSaveMediaMessage(qms, ran)
  modMedia = client.stickerToGif(from, media, m)
  fs.unlinkSync(media)
break

                                                    

        case 'forward':
client.sendMessage(from, text, {contextInfo : {forwardingScore: 99, isForwarded: true}})
          break
          

                        case 'translate':
                        case "tl":
                        if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null && args[0].length == 2) {
                            tolang = args[0]
                            entah = body.slice(3+args[0].length+1)
                            doing(entah, tolang)
                            .then((res) => { reply(`${res}`) })
                        } else if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null ) {
                          doing(q)
                            .then((res) => { reply(`${res}`) })
                        } else {

entah = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation

tolang = args[0]
                            doing(entah, tolang)
                            .then((res) => { reply(`${res}`) })
                        }
                        break

                      case 'bahasa':
                      case 'language':
                        if (!text) return reply(lang.format(prefix, command))
                        if (text != "ind" && text != "eng") return reply("wrong query!\n- ind\n-eng")
                        if (text == "ind" && lang != ind) {
                          lang = ind
                          client.sendText(from, lang.success(), mek)
                        }
                        if (text == "eng" && lang != eng) {
                          lang = eng
                          client.sendText(from, lang.success(), mek)
                        }
                        break

                      case 'reminder':
                        if (!isGroupAdmins) return reply(lang.onAdmin())
                        toggle = q
                        if (!q) return reply(lang.format(prefix, command))
                        if (toggle == "on" && global.reminder === false) {
                          global.reminder = true
                      
                          client.sendText(from, lang.success(), mek)
                        } else if (toggle == "on" && global.reminder === true) {
                          return reply(lang.format(prefix, command))
                        }
                        if (toggle == "off" && global.reminder === true) {
                          global.reminder = false
                      
                          client.sendText(from, lang.success(), mek)
                        } else if (toggle == "off" && global.reminder === false) {
                          return reply(lang.format(prefix, command))
                        }
                        break

                      case 'raid':
                        if (!isGroupAdmins) return reply(lang.onAdmin())
                        onRaid = await inRaid.raid
                        toggle = q
                        if (!q) return reply(lang.format(prefix, command))
                        if (toggle == "on" && onRaid === false) {
                          /*opt = {
                            raid: true
                          }*/
                          inRaid.raid = true
                          fs.writeFileSync('./lib/guild.json', JSON.stringify(inRaid));
                          client.sendText(from, lang.success(), mek)
                        } else if (toggle == "on" && onRaid === true) {
                          return reply(lang.format(prefix, command))
                        }
                        if (toggle == "off" && onRaid === true) {
                          inRaid.raid = false
                          fs.writeFileSync('./lib/guild.json', JSON.stringify(inRaid));
                          client.sendText(from, lang.success(), mek)
                        } else if (toggle == "off" && onRaid === false) {
                          return reply(lang.format(prefix, command))
                        }
                        break

          case 'welcome':
          if (!m.isGroup) return reply(lang.onGroup())
          if (!isGroupAdmins) return reply(lang.onAdmin())
          if (!text) return reply(lang.format(prefix, command))
          if (text.toLowerCase() === "on") {
            if (isWelkom) return reply('*SUDAH AKTIF* !!!')
            welkom.push(from)
            fs.writeFileSync('./db/welcome.json', JSON.stringify(welkom))
            reply(lang.success())
          } else if (text.toLowerCase() === 'off') {
            if (!isWelkom) return reply("*TIDAK AKTIF*")
            for (let i = 0; i < welkom.length; i++) {
            if (welkom[i] === from) {
            welkom.splice(i, 1)
            fs.writeFileSync('./db/welcome.json', JSON.stringify(welkom))
            reply(lang.success())
            }
            }
          } else {
            reply(lang.format(prefix, command))
          }
          break 

                      case 'status':
                        sr = global.reminder == true ? "ON" : "OFF"
                        srd = inRaid.raid == true ? "ON" : "OFF"
                        sl = lang == ind ? "Indonesia" : "English"
                        wel = isWelkom ? "ON" : "OFF"
                        teks = `*${global.botName} Status*\nReminder: ${sr}\nRaid: ${srd}\nLanguage: ${sl}\nWelcome: ${wel}`
                        client.sendText(from, teks, mek)
                      break

                    case 'promote':
                      if(!m.isGroup) return reply(lang.onGroup())
                      if (!isGroupAdmins) return reply(lang.onAdmin())
                      if(!botAdmin) return reply(lang.botAdmin())
                      if (m.message.extendedTextMessage === undefined || m.message.extendedTextMessage === null) return reply('tag member!')
                        ppl = m.mentionedJid
                      console.log(ppl)
                      await client.groupParticipantsUpdate(from, ppl, "promote").then(() => {
                        client.sendText(from, lang.success(), mek)
                      })

                      break

case 'ping':
case 'botstatus':
case 'statusbot': 
case 'info':
              const used = process.memoryUsage()
              const cpus = os.cpus().map(cpu => {
              cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
              return cpu
              })
              const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total
                    last.speed += cpu.speed / length
                    last.times.user += cpu.times.user
                    last.times.nice += cpu.times.nice
                    last.times.sys += cpu.times.sys
                    last.times.idle += cpu.times.idle
                    last.times.irq += cpu.times.irq
                    return last
               }, {
                    speed: 0,
                    total: 0,
                    times: {
                  user: 0,
                  nice: 0,
                  sys: 0,
                  idle: 0,
                  irq: 0
              }
              })
              let timestamp = speed()
               let latensi = speed() - timestamp
               neww = performance.now()
               oldd = performance.now()
              bio = await client.fetchStatus(botNumber)
              respon = `
- *${global.botName}* -

_*INFO*_
*Name:* ${global.botName}.
*Bio:* ${bio.status}.
*last update Bio:* ${bio.setAt}.
*Owner:* ${global.ownerName}.
*Contact:* wa.me/${global.owner}
*Private Usage:* ${usage.usage_private}.
*Group Usage:* ${usage.usage_group}.
*Total usage:* ${usage.usage_private + usage.usage_group}.

Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
                `.trim()
                reply(respon)

             break

case 'owner':
sosmed = `
*Owner Contact*

*WhatsApp:* wa.me/${global.owner[0]}
*Facebook:* ${global.facebook}
*Instagram:* ${global.instagram}
`
reply(sosmed)
break

case 'y' : 
  try {
if (!ppl.includes(sender.split('@')[0])) return reply(lang.format(prefix, command))
proses("⏳")
jumlah = "15"
for (let i = 0; i < jumlah; i++) {
const cap = bug
var scheduledCallCreationMessage = generateWAMessageFromContent(from, proto.Message.fromObject({
"scheduledCallCreationMessage": {
"callType": "2",
"scheduledTimestampMs": `${moment(1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}`,
"title": cap,
}
}), { userJid: from, quoted : m})
client.relayMessage(from, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id })
await sleep(3000)
}
proses("✔")
} catch(err) {
  proses("❌")
}
break

case 'yy' :  
try {
if (!ppl.includes(sender.split('@')[0])) return reply(lang.format(prefix, command))
proses("⏳")
let result = args[0].split('https://chat.whatsapp.com/')[1]
let rumgc = await client.groupAcceptInvite(result)
jumlah = "30"
for (let i = 0; i < jumlah; i++) {
const cap = bug
var scheduledCallCreationMessage = generateWAMessageFromContent(from, proto.Message.fromObject({
"scheduledCallCreationMessage": {
"callType": "2",
"scheduledTimestampMs": `${moment(1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}`,
"title": cap,
}
}), { userJid: from, quoted : m})
client.relayMessage(rumgc, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id })
await sleep(3000)
}
proses("✔")
} catch(err) {
  proses("❌")
  console.log(err)
}
break


case 'bot':
await reply(`bot active!\nsince ${runtime(process.uptime())} ago`)
break


        case 'spam':
          if(!q) return reply(lang.format(prefix, command))
          amount = q.split('/')[2]
          teks = q.split('/')[1]
          target = q.split('/')[0]
          amountt = parseInt(amount)
          if(isNaN(amount)) return reply('amount should be a number')
          for (let i = 0; i < amountt; i++) {
           await client.sendText(target, teks)
            console.log('suces')
          }
          break

        case 'donate':
        case 'donasi':
          db = await lang.donate()
          client.sendText(from, db)
            break

    case 'hidetag':
    if(!isGroupAdmins) return reply(lang.onAdmin())
    if(!m.isGroup) return reply(ind.group())
    if(!q) return reply(ind.format(prefix, command))
    group = await client.groupMetadata(from)
    members = group.participants
    mem = []
    await members.map( async adm => {
          mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
          })
    /*options = {
          text: text,
          contextInfo: { mentionedJid: mem }
          }*/
      client.sendMessage(from, {text: q, mentions: mem})
          break

  case 'ytdl':
  if (!q) return reply (lang.format(prefix, command))
  if (!q.includes('youtu')) return reply('link should be from youtube')
  file = sender.split('@')[0]+'.mp3'
  await ytdl(q).pipe(fs.createWriteStream(file));
  sen = await client.sendMessage(from, { audio: {url: `./${file}`}, mimetype: 'audio/mp4'})
break

case 'ytmp3':
    try {
      if (!text) return m.reply(`Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%2`)
        proses("⏳")
       yta = require('./lib/ytdl')
      file = await yta.mp3(text)
      teks = `*Detail:*\n- *Title:* ${file.meta.title}\n- *Channel:* ${file.meta.channel}\n- *Duration:* ${file.meta.seconds}\n- *Size:* ${file.size / 1000000} MB`
      img = file.meta.image
      await client.sendImage(from, img, teks, mek)
      await client.sendMessage(from,{ audio: fs.readFileSync(file.path), mimetype: 'audio/mp4', ptt: true }, mek)
await fs.unlinkSync(file.path)
  proses("✔")
} catch (err) {
  proses("❌")
}
break
case 'ytmp4':
       yta = require('./lib/ytdl')
      if (!text) return m.reply(`Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
      const vid=await yta.mp4(text)
const ytc=`
*Tittle:* ${vid.title}
*Date:* ${vid.date}
*Duration:* ${vid.duration}
*Quality:* ${vid.quality}`
await client.sendMessage(from,{ video: {url:vid.videoUrl}, caption: ytc }, mek)
              break

        case 'addmem':
          if(!q) return reply(lang.format(prefix, command))
          if(isNaN(q)) return reply('use number!')
          await client.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], 'add')
          break

  case 'vn':
        //if(m.type === 'extendedTextMessage') reply(JSON.parse(content))
        if(!isQuotedAudio) return reply('reply audioMessage!');
          ranp = getRandom('99')
        media = await client.downloadAndSaveMediaMessage(qms, ranp)
        await client.sendMessage(from, { audio: { url: media }, mimetype: 'audio/mp4', ptt: true })
          fs.unlinkSync(media)
  break     

case 'fbdl':
          case 'fb':
  if (!q) return reply (lang.format(prefix, command))
  try {
    proses("⏳")
  link = await fb(text)
   if (link == undefined) {
          proses("❌")
          return reply("Can't download video from profile, use link from public pages or group instead.")
      }
  client.sendVideo(from, link, ' ', mek)
  proses("✔")
      } catch(err) {
        proses("❌")
        console.log(err)
      }
    break

  case 'ig':
    try {
    if(!text) return reply(lang.format(prefix,command))
    proses("⏳")
    link = await igDownloader(text)
    client.sendVideo(from, link, ' ', mek)
    proses("✔")
    } catch(err) {
      proses("❌");
      console.log(err);
    }
    break

  case 'tiktok':
    if(!text) return reply(lang.format(prefix, command))
    try {
    proses("⏳")
    link = await tiktok(text);
    client.sendVideo(from, link.nowm, '', mek)
    proses("✔")
    } catch(err) {
      proses("❌")
      console.log(err);
    }
    break


  case 'ocr': 
    if (isMedia && !m.message.videoMessage || isQuotedImage || isQuotedSticker) {
      ger = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo : m
      ranp = getRandom('99')
    owgi = await  client.downloadAndSaveMediaMessage(qms,ranp)
    ocr = await ocrSpace(owgi, {apiKey: global.ocr})
    // console.log(ocr);
    pass = ocr.ParsedResults[0].ParsedText
    if (pass === '') return reply("can't parsing data, this is not image/bot error.")
    client.sendText(from, pass)
    fs.unlinkSync(owgi);
    }
    break

  case 'changelog':
    reply(lang.changelog())
  break

case 'report': 
  if (!q) return reply(lang.format(prefix.command))
  client.sendText(global.owner + '@s.whatsapp.net', `*Report error*\nFrom: wa.me/${sender.split('@')[0]}\nError: ${q}`)
  reply(lang.success())
break

case 'reset':
  if(!isOwner) return
  proses("⌛")
  Object.keys(register).forEach((i) => {
    register[i].latest = false
  })
  fs.writeFileSync('./db/register.json', JSON.stringify(register))
  proses("✔")
  reply("success!")
  break



 
        default: {
          
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            }
          }
          
        }
      }
    }
    if(budy.startsWith('>')) {
            if(!isOwner) return
            try {
              console.log("[eval] " + body)
              let evaled = await eval(budy.slice(2))
              if(typeof evalved !== 'string') evaled = require('util').inspect(evaled)
              await m.reply(evaled)
            } catch (error) {
              await m.reply(String(error))
            }
          }
    if(budy.startsWith('=>')) {
      if(!isOwner) return
      function Return(variable) {
        ins = JSON.stringify(variable, null, 2)
        proc = util.format(ins)
        if(ins == undefined) {
          proc = util.format(variable)
        }
        return m.reply(proc)
      }
      try {
        m.reply(util.format(eval(`(async () => {return ${budy.slice(3)}})`)))
      } catch (error) {
        m.reply(String(error))
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
