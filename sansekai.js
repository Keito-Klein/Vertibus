const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const { Configuration, OpenAIApi } = require("openai");
const cheerio = require("cheerio");
const axios = require("axios")
const { event } = require("./lib/event.js")
const { mt } = require("./lib/mt.js")
let setting = require("./key.json");
var packName = "Masbro"
var author = "MiKako"
const guild = JSON.parse(fs.readFileSync('./db/guild.json'))

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
    fs.writeFileSync('./lib/guild.json', JSON.stringify(guild))
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
    /*let infoMSG = JSON.parse(fs.readFileSync('./db/msg.data.json'))
  infoMSG.push(JSON.parse(JSON.stringify(mek)))
  fs.writeFileSync('./db/msg.data.json', JSON.stringify(infoMSG, null, 2))
  const urutan_pesan = infoMSG.length
  if (urutan_pesan === 5000) {
      infoMSG.splice(0, 4300)
      fs.writeFileSync('./db/msg.data.json', JSON.stringify(infoMSG, null, 2))
  }*/

  const getGroupAdmins = (participants) => {
  admins = []
  for (let i of participants) {
    i.admin ? admins.push(i.id) : ''
  }
  return admins
}

    // Group
    const myGuild = ['6289675651966-1611471388@g.us', '120363023056066862@g.us']
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const groupId = m.isGroup ? groupMetadata.id : ''
    const groupMembers = m.isGroup ? groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? getGroupAdmins(groupMembers) : ''
    const isGroupAdmins = groupAdmins.includes(sender) || false
    const isMyGuild = myGuild.includes(groupId) || false


    /*Media Init*/
    const isMedia = (m.mtype === 'imageMessage' || m.mtype === 'videoMessage')
    const isQuotedImage = m.mtype === 'extendedTextMessage' && content.includes('imageMessage')
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


    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (isCmd2 && !m.isGroup) {
      console.log(chalk.black(chalk.bgWhite("[ LOGS ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
    } else if (isCmd2 && m.isGroup) {
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
          m.reply(`*Vertibus Toram DB*
            
*(ChatGPT)*
Cmd: ${prefix}ai 
Tanyakan apa saja kepada AI. 

*(DALL-E)*
Cmd: ${prefix}img
Membuat gambar dari teks

*(Toram Online DB)*
Cmd: ${prefix}lvl
List Leveling character

Cmd: ${prefix}farming
List recommend farming

Cmd: ${prefix}event 
list event
*(Dalam Pengembangan)*

Cmd: ${prefix}maintenance
menampilkan maintenance terbaru

*(Guild DB)*
Cmd: ${prefix}buff
Menampilkan seluruh Buff serikat

Cmd: ${prefix}push
Menambahkan buff kedalam list buff serikat

Cmd: ${prefix}change
Mengganti salah satu buff di list buff serikat

Cmd: ${prefix}delete
Menghapus salah satu buff di list buff serikat

*(OTHER)*
Cmd: ${prefix}sticker
Membuat sticker dari gambar yg dikirim
*Error*

Cmd: ${prefix}smeme
Membuat sticker dengan teks
*Error*
`)
          break;
        case "ai": case "openai": 
          try {
            if (setting.keyopenai === "Your_ApiKey_Here") return reply("Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`);
            const configuration = new Configuration({
              apiKey: setting.keyopenai,
            });
            const openai = new OpenAIApi(configuration);

            const response = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: text,
              temperature: 0.3,
              max_tokens: 2000,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
            });
            m.reply(`${response.data.choices[0].text}`);
          } catch (err) {
            console.log(err);
            m.reply("Maaf, sepertinya ada yang error :" + err);
          }
          break;
        case "img": case "ai-img": case "image": case "images":
          try {
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return reply("Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`Membuat gambar dari AI.\n\nContoh:\n${prefix}${command} Wooden house on snow mountain`);
            const configuration = new Configuration({
              apiKey: setting.keyopenai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
            //console.log(response.data.data[0].url)
            client.sendImage(from, response.data.data[0].url, text, mek);
          } catch (err) {
            console.log(err);
            m.reply("Maaf, sepertinya ada yang error :"+ err);
          }
          break;

          case 'lv':
          case 'lvl':
          case 'lvling' : 
          case 'leveling':
        let lvl = q.split('|')[0]
        let bexp = q.split('|')[1]
         if (!lvl) return m.reply(`cara penggunaan ${prefix + command} level|bonus exp`)
           if (!bexp) return m.reply(`cara penggunaan ${prefix + command} level|bonus exp`)
          if( isNaN(lvl)) return m.reply(`cara penggunaan ${prefix + command} level|bonus exp`)
            if( isNaN(bexp)) return m.reply(`cara penggunaan ${prefix + command} level|bonus exp`)
        

    axios.get(`https://toram-id.info/leveling?level=${lvl}&bonusexp=${bexp}&range=5`)
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
      let gb = `*Leveling lvl ${lvl} dengan bonus exp ${bexp}*\n`
      for(let i = 0; i < array.length; i++) {
          gb += `-------------------------------\nBoss: ${array[i].boss}\nLocation: ${array[i].location}\nEXP: ${array[i].exp}\n`
      }
      console.log(gb)
      client.sendText(from, gb, mek)
      console.log(array[0])
    }
  })
  break;

  case 'mobs':
case 'boss':
  if(!text) return reply("Masukan nama boss/monster!")

  axios.get(`https://coryn.club/monster.php?name=${text}#`)
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
            db = `Berikut detail dari ${command} bernama ${text}\n\n`
            for (let i = 0; i < array.length; i++) {
              db += `-----------------------------------\nBoss: ${array[i].boss}\nDiff: ${array[i].diff}\nLevel: ${array[i].lv}\nHP: ${array[i].hp}\nEXP: ${array[i].exp}\nElement: ${array[i].element}\nTamable: ${array[i].tamable}\nLocation: ${array[i].map}\nDrop: ${array[i].drop}\n`
            }
            client.sendText(from, db, mek)
        }
    
 })
  break

  case 'farm':
  case 'farming':
  if (!text) return reply("Mau farming apa?\n\n/logam\n/kayu\n/fauna\n/obat\n/kain _(Comming Soon)_\n/lainnya _(Comming Soon)_")
    if(text == "logam") {
      db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.metal.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.metal[i].monster}\nLevel: ${mobs.mats.metal[i].lv}\nElement: ${mobs.mats.metal[i].element}\nHP: ${mobs.mats.metal[i].hp}\nEXP: ${mobs.mats.metal[i].exp}\nLokasi: ${mobs.mats.metal[i].map}`
      }
      client.sendText(from, db, mek)
    } else if(text == "kayu") {
      db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.wood.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.wood[i].monster}\nLevel: ${mobs.mats.wood[i].lv}\nElement: ${mobs.mats.wood[i].element}\nHP: ${mobs.mats.wood[i].hp}\nEXP: ${mobs.mats.wood[i].exp}\nLokasi: ${mobs.mats.wood[i].map}`
      }
      client.sendText(from, db, mek)
    } else if(text == 'fauna') {
      db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.beast.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.beast[i].monster}\nLevel: ${mobs.mats.beast[i].lv}\nElement: ${mobs.mats.beast[i].element}\nHP: ${mobs.mats.beast[i].hp}\nEXP: ${mobs.mats.beast[i].exp}\nLokasi: ${mobs.mats.beast[i].map}`
      }
      client.sendText(from, db, mek)
    } else if(text == 'obat') {
      db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.medic.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.medic[i].monster}\nLevel: ${mobs.mats.medic[i].lv}\nElement: ${mobs.mats.medic[i].element}\nHP: ${mobs.mats.medic[i].hp}\nEXP: ${mobs.mats.medic[i].exp}\nLokasi: ${mobs.mats.medic[i].map}`
      }
      client.sendText(from, db, mek)
    } else if(text == 'kain') {
      db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.cloth.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.cloth[i].monster}\nLevel: ${mobs.mats.cloth[i].lv}\nElement: ${mobs.mats.cloth[i].element}\nHP: ${mobs.mats.cloth[i].hp}\nEXP: ${mobs.mats.cloth[i].exp}\nLokasi: ${mobs.mats.cloth[i].map}`
      }
      client.sendText(from, db, mek)
    }
    break;

  case 'logam':
  case 'metal':
     db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.metal.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.metal[i].monster}\nLevel: ${mobs.mats.metal[i].lv}\nElement: ${mobs.mats.metal[i].element}\nHP: ${mobs.mats.metal[i].hp}\nEXP: ${mobs.mats.metal[i].exp}\nLokasi: ${mobs.mats.metal[i].map}`
      }
      client.sendText(from, db, mek)
  break;

  case 'kayu':
  case 'wood':
     db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.wood.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.wood[i].monster}\nLevel: ${mobs.mats.wood[i].lv}\nElement: ${mobs.mats.wood[i].element}\nHP: ${mobs.mats.wood[i].hp}\nEXP: ${mobs.mats.wood[i].exp}\nLokasi: ${mobs.mats.wood[i].map}`
      }
      client.sendText(from, db, mek)
  break;

case 'fauna':
  case 'beast':
    db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.beast.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.beast[i].monster}\nLevel: ${mobs.mats.beast[i].lv}\nElement: ${mobs.mats.beast[i].element}\nHP: ${mobs.mats.beast[i].hp}\nEXP: ${mobs.mats.beast[i].exp}\nLokasi: ${mobs.mats.beast[i].map}`
      }
      client.sendText(from, db, mek)
  break;

  case 'obat':
  case 'medic':
  case 'medicine':
     db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.medic.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.medic[i].monster}\nLevel: ${mobs.mats.medic[i].lv}\nElement: ${mobs.mats.medic[i].element}\nHP: ${mobs.mats.medic[i].hp}\nEXP: ${mobs.mats.medic[i].exp}\nLokasi: ${mobs.mats.medic[i].map}`
      }
      client.sendText(from, db, mek)
  break;

case 'kain':
  case 'cloth':
    db = `*Berikut ini list Spot Farming ${text} yang saya ketahui:*\n`
      for(let i = 0; i < mobs.mats.cloth.length; i++) {
         db += `\n------------------\nMonster: ${mobs.mats.cloth[i].monster}\nLevel: ${mobs.mats.cloth[i].lv}\nElement: ${mobs.mats.cloth[i].element}\nHP: ${mobs.mats.cloth[i].hp}\nEXP: ${mobs.mats.cloth[i].exp}\nLokasi: ${mobs.mats.cloth[i].map}`
      }
      client.sendText(from, db, mek)
  break;

  case 'event': 
    if(!text) return reply("Event apa yang anda cari?\n- valentine")
      if(text == "valentine") {
        valen = event(text)
        db = `Berikut ini adalah list quest ${text} yang saya ketahui:\n\n`
        for (let i = 0; i < valen.quest.length; i++) {
          db += `\n------------------\n*${valen.quest[i].name}*\nSyarat: ${valen.quest[i].req}\nNPC: ${valen.quest[i].npc}\nQuest Level: ${valen.quest[i].lv}\nBahan Quest: \n${valen.quest[i].mats}\nBoss: ${valen.quest[i].boss}\nUnsur Boss: ${valen.quest[i].element}\nEXP: \n${valen.quest[i].exp}\nReward: ${valen.quest[i].reward}`
        }
      }
      client.sendText(from, db,mek)
      break;

    case 'valentine':
      valen = event(text)
        db = `Berikut ini adalah list quest ${text} yang saya ketahui:\n\n`
        for (let i = 0; i < valen.quest.length; i++) {
          db += `\n------------------\n*${valen.quest[i].name}*\nSyarat: ${valen.quest[i].req}\nNPC: ${valen.quest[i].npc}\nQuest Level: ${valen.quest[i].lv}\nBahan Quest: \n${valen.quest[i].mats}\nBoss: ${valen.quest[i].boss}\nUnsur Boss: ${valen.quest[i].element}\nEXP: \n${valen.quest[i].exp}\nReward: ${valen.quest[i].reward}`
        }
        break

    case 'maintenance':
    case 'mt':
      reply('mohon tunggu sebentar...')
      maint = await mt()
      client.sendText(from, maint, mek)
    break

  case "push":
    if(!m.isGroup) return reply("hanya bisa di lakukan di group!")
    if(!isMyGuild) return reply("Tidak bisa di gunakan di grup ini!")
    if(!isGroupAdmins) return reply("Minta admin untuk menambahkan!")
    if(!text) return reply(`Cara penggunan ${prefix}${command} ign|buffland`)
    if(!text.includes('|')) return reply('Format salah!!')
      ign = q.split('|')[0]
      buff = q.split('|')[1]
      validation = checkName(ign)
      if(validation === true) {
        return reply(`${ign} sudah ada dalam list buff serikat!!`)
      } else {  
      await addBuff(ign, buff)
      client.sendText(from, 'Buff telah ditambahkan ke dalam list buff serikat!!', mek)
      }
    break

  case 'change':
    if(!m.isGroup) return reply("hanya bisa di lakukan di group!")
    if(!isMyGuild) return reply("Tidak bisa di gunakan di grup ini!")
    if(!isGroupAdmins) return reply("Minta admin untuk mengganti!")
    if(!text) return reply(`Cara penggunan ${prefix}${command} ign|buffland`)
    if(!text.includes('|')) return reply('Format salah!!')
      ign = q.split('|')[0]
      buff = q.split('|')[1]
      validation = checkName(ign)
      if(validation === true) {
      await changeBuff(ign, buff)
      client.sendText(from, 'Buff telah diganti!!', mek)
      } else {
        reply(`${ign} tidak ada dalam list buff serikat!!`)
      }
    break 

    case 'cn':
    if(!m.isGroup) return reply("hanya bisa di lakukan di group!")
    if(!isMyGuild) return reply("Tidak bisa di gunakan di grup ini!")
    if(!isGroupAdmins) return reply("Minta admin untuk mengganti!")
    if(!text) return reply(`Cara penggunan ${prefix}${command} ign lama|ign baru`)
    if(!text.includes('|')) return reply('Format salah!!')
      ign = q.split('|')[0]
      buff = q.split('|')[1]
      validation = checkName(ign)
      if(validation === true) {
      await changeName(ign, buff)
      client.sendText(from, 'IGN telah diganti!!', mek)
      } else {
        reply(`${ign} tidak ada dalam list buff serikat!!`)
      }
    break 

  case 'getbuff':
    if(!m.isGroup) return reply("hanya bisa di lakukan di group!")
    if(!isMyGuild) return reply("Tidak bisa di gunakan di grup ini!")
    if(!text) return reply(`Cara penggunan ${prefix}${command} ign`)
      validation = checkName(text)
      if(validation === true) {
        db = await getBuff(text)
      client.sendText(from, db, mek)
      } else {
        reply(`${text} tidak ada dalam list buff serikat!!`)
      }
    break 

  case 'gmbuff':
    if(!m.isGroup) return reply("hanya bisa di lakukan di group!")
    if(!isMyGuild) return reply("Tidak bisa di gunakan di grup ini!")
    if(!text) return reply(`Cara penggunan ${prefix}${command} buffland`)
      validation = multipleBuff(text)
      if(validation === "tidak ada") {
      return reply(`${text} tidak ada dalam list buff serikat!!`)
      } else {
        db = `List member yang masak ${text} adalah :\n\n`
      for(let i = 0; i < validation.length; i++) {
        db += `- ${validation[i]}\n`
      }
      client.sendText(from, db, mek)
      }
    break 

  case 'delete':
    if(!m.isGroup) return reply("hanya bisa di lakukan di group!")
    if(!isMyGuild) return reply("Tidak bisa di gunakan di grup ini!")
    if(!isGroupAdmins) return reply("Minta admin untuk menghapus!")
    if(!text) return reply(`Cara penggunan ${prefix}${command} ign`)
    validation = checkName(text)
  if (validation === true) {
    await delBuff(text)
    client.sendText(from, 'Buff sukses dihapus!!', mek)
  } else {
    reply(`${text} memang tidak adaa dalam list buff serikat!!`)
  }
  break

case "buff":
  if(!m.isGroup) return reply("hanya bisa di lakukan di group!")
  if(!isMyGuild) return reply("Tidak bisa di gunakan di grup ini!")
  db = `*List Buff Member ⚔️👑SHINRA_TENSEI👑⚔️*\n\n`
  for (let i = 0; i < guild.length; i++) {
  db += `${i + 1}. ${guild[i].id} / ${guild[i].buff}\n`
  }
  db += `\nJika ada perubahan/mau ditambahkan, tag admin/pengurus guild🙏👍`
  client.sendText(from, db, mek)
  break




  case 'meta':
    se = client.groupMetadata()
    console.log(groupMetadata)
    break


  case 'sticker': case 's': case 'stickergif': case 'sgif': 
     if(q.split('|')[0]) {
      packName = q.split('|')[0]
     }
     if(q.split('|')[1]) {
      author = q.split('|')[1]
     }
             if (/image/.test(mime)) {

                  let media = await client.downloadMediaMessage(qms)
                  let encmedia = await client.sendImageAsSticker(from, media, m, { packname: packName, author: author })
                 await fs.unlinkSync(encmedia)
             } else if (/video/.test(mime)) {

                  if (qms.seconds > 11) return reply('Maksimal 10 detik!')
                 let media = await client.downloadMediaMessage(qms)
                 let encmedia = await client.sendVideoAsSticker(from, media, m, { packname: packName, author: author })
                  await fs.unlinkSync(encmedia)
              } else {
                 m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
                 }
              
              break;

case 'smeme': case 'stickmeme':
  if (!text) return m.reply(`cara penggunaan ${prefix + command} teks atas|teks bawah`)
top = q.split('|')[0]
bottom = q.split('|')[1]
var imgbb = require('imgbb-uploader')
if ((isMedia && !m.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length > 0) {
ger = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo : m
ranp = getRandom('54')
owgi = await  client.downloadAndSaveMediaMessage(qms,ranp)
anu = await imgbb("29f0fec470786b62364c5072718e41be", owgi)
teks = `${anu.display_url}`
anu1 = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${teks}`
client.sendImageAsSticker(from, `${anu1}`, m, { packname: packName, author: author })
fs.unlinkSync(owgi)
} else {
m.reply('Gunakan foto/stiker!')
}
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
