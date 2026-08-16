import { runtime } from "../../lib/general-function.js"

const menu = (prefix) => {
    let text_puasa = ""
    let text_lebaran = ""
    let tanggal_puasa = new Date("2026-02-19T00:00:00").getTime() - Date.now()
    let tanggal_lebaran = new Date("2026-03-21T00:00:00").getTime() - Date.now()
    if (tanggal_puasa > 0) {
        const puasa = runtime(tanggal_puasa /1000)
        text_puasa = `${puasa}\nlagi menuju Bulan Ramadhan 🕌☪`
    } else {
        text_puasa = `Selamat menunaikan ibadah puasa bagi yang menjalankannya🙏`
    }

    if (tanggal_lebaran > 0) {
        const lebaran = runtime(tanggal_lebaran /1000)
        text_lebaran = `${lebaran}\nlagi menuju IdulFitri ✨🌙💠`
    } else {
        text_lebaran = `Selamat Hari Raya Idul Fitri, mohon maaf lahir dan batin🙏
Kami (Bot & owner) mohon maaf yang sebesar besarnya jikalau ada kesalahan selama setahun ini,
baik itu ownernya cuek atau bot mengalami error atau pula bot mengirim gambar lewd meski admin grup tidak suka😁.
kami akan terus mengupdate untuk kenyamanan user bot kedepannya.

Minal aidin wal faizin.`
    }
    
    
    return `
❏ *${global.botName} Menu* ❏

❏========================❏

 ❏ *AI Menu*
 │•${prefix}ai
 │•${prefix}aiedit
 │•${prefix}text2img
 │•${prefix}detectai
 │•${prefix}jadianime
 │•${prefix}remini
 ╰•${prefix}fhd

 ❏ *Anime Stream*
 │•${prefix}anime latest
 │•${prefix}anime recom
 ╰•${prefix}anime search

 ❏ *Downloader Menu*
 │•${prefix}fb
 │•${prefix}fb2
 │•${prefix}ig
 │•${prefix}x
 │•${prefix}tt
 │•${prefix}tt2
 │•${prefix}ttmp3
 │•${prefix}reddit
 │•${prefix}h3d
 │•${prefix}nh
 │•${prefix}sptfy
 │•${prefix}ytmp3
 │•${prefix}ytmp4
 ╰•${prefix}play

 ❏ *Konverter Menu*
 │•${prefix}sticker
 │•${prefix}swm
 │•${prefix}smeme
 │•${prefix}translate
 │•${prefix}toimg
 │•${prefix}tovid
 │•${prefix}tomp3
 │•${prefix}rmvbg
 ╰•${prefix}ocr
 
 ❏ *Media Menu*
 │•${prefix}pixiv
 │•${prefix}pinterest
 │•${prefix}anime
 │•${prefix}ba
 │•${prefix}loli
 │•${prefix}loli2
 │•${prefix}neko
 │•${prefix}milf
 │•${prefix}brat
 │•${prefix}hitamkan
 │•${prefix}sertifikat
 │•${prefix}qc
 ╰•${prefix}wallpaper

 ❏ *Group Menu*
 │•${prefix}metadata
 │•${prefix}hidetag
 │•${prefix}tagall
 │•${prefix}top
 │•${prefix}couple
 │•${prefix}notag
 │•${prefix}nsfw
 │•${prefix}bot
 │•${prefix}d
 │•${prefix}add
 │•${prefix}kick
 │•${prefix}promote
 │•${prefix}demote
 │•${prefix}antilink
 ╰•${prefix}antilinkgc

 ❏ *Sticker Storage*
 │•${prefix}save
 │•${prefix}rename
 │•${prefix}send
 │•${prefix}delete
 ╰•${prefix}list
 
 ❏ *Other Menu*
 │•${prefix}me
 │•${prefix}spx
 │•${prefix}stalkml
 │•${prefix}buyprem
 │•${prefix}cancelpayment
 │•${prefix}cekprem
 │•${prefix}owner
 │•${prefix}info
 │•${prefix}test
 │•${prefix}pricing(sewa)
 ╰•${prefix}donate

 ❏ *Owner Menu*
 │•${prefix}addprem
 │•${prefix}banned
 │•${prefix}reset
 │•${prefix}clean
 ╰•> (evaluate)
 
💰 *Bantu donasi di :*

💳 dana : 083831853737
💳 GoPay : 083831853737
💳 ShopeePay : 083831853737
`
}

const ownerContact = () => {
    return `
*Kontak Owner:*

*WhatsApp:* wa.me/${global.owner[0]}
*Facebook:* ${global.sosmed.facebook}
*Instagram:* ${global.sosmed.instagram}
`
}

const donate = () => {
    return `
💰 *Bantu donasi di :*

💳 Dana : 083831853737
💳 GoPay : 083831853737
💳 ShopeePay : 083831853737
`
}

const pricing = () => {
    return `
*List Harga ${global.botName}*

- Sewa+premium : (4k + random FEE (0-1k))/bulan

> Payment: Qris, Dana, Gopay, Shopeepay
`
}

const update = (pushname) => {
    return `
*Announcment*
Hi ${pushname}.

Segala pengumuman tentang vertibus dipindahkan ke channel yang sudah dibuat oleh owner. pesan update seperti ini lagi akan sangat jarang digunakan
Follow channel berikut untuk tetap mengetahui update tentang vertibus. buat yg belum follow silahkan difollow yh❤
https://whatsapp.com/channel/0029VbDEJGNDOQIUDqZJTg3a

Himbauan buat para user. Gunakan fitur dengan bijak, dan Jangan *Spam*!
laporkan fitur error ke owner jika ada error.
`
}

export {
    menu, 
    ownerContact,
    donate,
    pricing,
    update
}