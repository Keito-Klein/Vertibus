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
`;
};

exports.ownerContact = () => {
  return `
*Ownner Contact:*

*WhatsApp:* wa.me/${global.owner[0]}
*Facebook:* ${global.facebook}
*Instagram:* ${global.instagram}
`;
};

exports.pricing = () => {
  return `
*price list ${global.botName}*

- rent : 3k/month
- premium : 3k/month
- script : pm owner
- donate

> Payment: Qris, Dana, Gopay, Shopeepay
`;
};

exports.donate = () => {
  return `
💰 *Donate me on :*

💳 Dana : 083831853737
💳 GoPay : 083831853737
💳 ShopeePay : 083831853737
`;
};

exports.update = (pushname) => {
  return `
*New Update V. 5.4.4a*
Hi ${pushname}.

\`!welcome\` feature has been added this feature is used to enable/disable welcome message in group.

*bot is still under development*
Please understand if there are still many errors🙏

*Report if there is an error feature to the owner*
For questions, please PM the owner by typing:
*!owner*
`;
};
