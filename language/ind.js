exports.menu = (prefix) => {
return `*Vertibus Toram DB*
            
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

Cmd: ${prefix}boss
menampilkan detail tentang boss

Cmd: ${prefix}mobs
menampilkan detail tentang mob

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
`
}

exports.eror = (err) => {
	return `Maaf, sepertinya ada yang error: ${err}`
}

exports.success = () => {
	return 'Sukses...'
}

exports.unreg = (text) => {
	return `${text} tidak ada di dalam list buff serikat!!`
}

exports.bump = (text) => {
	return `${text} sudah ada dalam list buff serikat!!`
}

exports.nonApikey = () => {
	return "Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys"
}

exports.format = (prefix, command) => {
	// if(command == "lv" || command == "lvl" || command == "lvling" || command == "leveling") {
	// 	return `How to use?\n${prefix + command} level|bonus exp`
	// }
	// if(command == "push" || command == "add" || command == "change") {
	// 	return `How to use?\n${prefix + command} ign|buffland`
	// }
	// if (command == "cn") {
	// 	return `How to use?\n${prefix}${command} old ign|new ign`
	// }
	switch(command) {
		case 'lv':
          case 'lvl':
          case 'lvling' : 
          case 'leveling':
          	return `Cara penggunaan\n${prefix + command} level|bonus exp`
          break;

      case 'push':
      case 'add':
      case 'change':
      	return `Cara penggunaan\n${prefix + command} ign|buffland`
      break;

  		case 'cn':
  			return `Cara penggunaan\n${prefix}${command} ign lama|ign baru`
  		break;

  		case 'getbuff':
  			return `Cara penggunaan\n${prefix}${command} ign`
  		break;

  		case 'gmbuff':
  			return `Cara penggunaan\n${prefix}${command} buffland`
  		break;

  		case 'ai':
  		case 'openai': 
  		case "img": 
  		case "ai-img": 
  		case "image": 
  		case "images":
  		case 'mobs':
		case 'boss':
		case 'monster':
  			return `mohon masukan query!!\nContoh: ${prefix + command} masukan query disini`
  		break;

  		case 'farm':
  		case 'farming':
  			return `Anda mau farming apa?\n\n/logam\n/kayu\n/beast\n/obat\n/kain\n/lainnya _(Comming Soon)_`
  		break;

  		case 'event':
  			return `Anda mau mencari event apa??\n- valentine\n- natal`
  		break;
  			}
}

exports.onGroup = () => {
	return `Hanya di grup!`
}

exports.onGuild = () => {
	return `Tidak bisa digunakan di grup ini!`
}

exports.onAdmin = () => {
	return `Hanya bisa dilakukan oleh admin gup!`
}

exports.head = (command, text = '') => {
  switch(command) {
  	case 'farm':
  	case 'farming':
  		return `*Berikut ini list spot farming ${text} yang saya ketahui:*\n`
  	break;

  	case 'logam':
  	case 'metal':
  	case 'kayu':
  	case 'wood':
  	case 'fauna':
  	case 'beast':
  	case 'obat':
  	case 'medic':
  	case 'medicine':
  	case 'kain':
  	case 'cloth':
  		return `*Berikut ini list spot farming ${command} yang saya ketahui:*\n`
  	break;

  default:

  }
}

exports.quest = (command, text = '') => {
	switch(command) {
	case 'valentine':
		return `Berikut ini list quest ${command} yang saya ketahui:\n\n`
	break;

	case 'event':
		return `Berikut ini list quest ${text} yang saya ketahui:\n\n`
	break;
default: 

	}
}
