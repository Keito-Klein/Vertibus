exports.menu = (prefix) => {
    return `
❏ *${global.botName} Menu* ❏

 ❏ *Other Menu*
 │•${prefix}lvling
 │•${prefix}watk
 │•${prefix}cdmg
 │•${prefix}food
 │•${prefix}maze
 │•${prefix}bag
 │•${prefix}mq
 │•${prefix}ailment
 ╰•${prefix}mqmats

 ❏ *Other Menu*
 │•${prefix}sticker
 │•${prefix}smeme
 │•${prefix}pixiv
 │•${prefix}loli
 │•${prefix}milf
 │•${prefix}anime
 │•${prefix}pinterest
 ╰•${prefix}brat

 ❏ *Group Menu*
 │•${prefix}metadata
 │•${prefix}hidetag
 │•${prefix}tagall
 │•${prefix}bot
 │•${prefix}add
 │•${prefix}kick
 │•${prefix}promote
 │•${prefix}demote
 │•${prefix}welcome
 │•${prefix}antilink
 ╰•${prefix}antilinkgc
 
 ❏ *Bot Menu*
 │•${prefix}owner
 │•${prefix}info
 ╰•${prefix}donate
 
💰 *Bantu donasi di :*

💳 dana : 083831853737
💳 GoPay : 083831853737
💳 ShopeePay : 083831853737
`
}

exports.ownerContact = () => {
    return `
*Kontak Owner:*

*WhatsApp:* wa.me/${global.owner[0]}
*Facebook:* ${global.facebook}
*Instagram:* ${global.instagram}
`
}

exports.donate = () => {
    return `
💰 *Bantu donasi di :*

💳 Dana : 083831853737
💳 GoPay : 083831853737
💳 ShopeePay : 083831853737
`
}

exports.pricing = () => {
    return `
*List Harga ${global.botName}*

- Sewa : 3k/bulan
- premium : 3k/bulan
- script : pm owner

> Payment: Qris, Dana, Gopay, Shopeepay
`
}

exports.update = (pushname) => {
    return `
*New Update V. 5.4.4a*
Hi ${pushname}.

fitur \`!welcome\` telah ditambahkan fitur tersebut digunakan untuk mengaktifkan/menonaktifkan pesan selamat datang di grup.

*bot masih dalam pengembangan*
harap maklumi jika masih banyak error🙏

*laporkan jika ada fitur error kepada owner*
tanya tanya silahkan pm owner dengan mengetik:
*!owner*
`
}