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
 │•~${prefix}antilink~
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
*Ownner Contact:*

*WhatsApp:* wa.me/${global.owner[0]}
*Facebook:* ${global.facebook}
*Instagram:* ${global.instagram}
`
}

exports.pricing = () => {
    return `
*price list ${global.botName}*

- rent : 3k/month
- premium : 3k/month
- script : pm owner
- donate

> Payment: Qris, Dana, Gopay, Shopeepay
`
}

exports.donate = () => {
    return `
💰 *Donate me on :*

💳 Dana : 083831853737
💳 GoPay : 083831853737
💳 ShopeePay : 083831853737
`
}

exports.update = (pushname) => {
    return `
*New Update V. 5.3.0a*
Hi ${pushname}.

\`!boss\`/\`!mobs\` feature has been added, this feature is used to view details of the monsters in the game.
such as level, location, drops, and others.

> personal language for each user has been added, the default language is Indonesian. to change it to English use the command \`!language eng\`

*bot is still under development*
Please understand if there are still many errors🙏

*Report if there is an error feature to the owner*
For questions, please PM the owner by typing:
*!owner*
`
}