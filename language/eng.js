exports.menu = (prefix) => {
return `*Vertibus Toram DB*
            
*(ChatGPT)*
Cmd: ${prefix}ai 
Asking anything to AI. 

*(DALL-E)*
Cmd: ${prefix}img
making picture from text

*(Toram Online DB)*
Cmd: ${prefix}lvl
List Leveling character

Cmd: ${prefix}farming
List recommend farming

Cmd: ${prefix}event 
list event
*(On Development)*

Cmd: ${prefix}maintenance
Show the latest of maintenance

Cmd: ${prefix}boss
Show details about boss

Cmd: ${prefix}mobs
Show details about monsters

*(Guild DB)*
Cmd: ${prefix}buff
Showing all buf guild

Cmd: ${prefix}push
add buff to the guild buff list

Cmd: ${prefix}change
Replace one of the buffs in the guild buff list

Cmd: ${prefix}delete
Removes one of the buffs in the guild buff list

*(OTHER)*
Cmd: ${prefix}sticker
Make stickers from the images sent
*Error*

Cmd: ${prefix}smeme
Create stickers with text
*Error*
`
}

exports.eror = (err) => {
	return `sorry, I got an error with ${err}`
}

exports.success = () => {
	return 'Success...'
}

exports.unreg = (text) => {
	return `${text} is not on the guild buff list!!`
}

exports.bump = (text) => {
	return `${text} is already on the guild buff list!!`
}

exports.nonApikey = () => {
	return "Apikey is wrong\n\nPlease change the apikey on file key.json\n\nyou can made your apikey on website: https://beta.openai.com/account/api-keys"
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
          	return `How to use?\n${prefix + command} level|bonus exp`
          break;

      case 'push':
      case 'add':
      case 'change':
      	return `How to use?\n${prefix + command} ign|buffland`
      break;

  		case 'cn':
  			return `How to use?\n${prefix}${command} old ign|new ign`
  		break;

  		case 'getbuff':
  			return `How to use?\n${prefix}${command} ign`
  		break;

  		case 'gmbuff':
  			return `How to use?\n${prefix}${command} buffland`
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
  			return `Please input query!!\nExample: ${prefix + command} your query here`
  		break;

  		case 'farm':
  		case 'farming':
  			return `What you want to farming?\n\n/metal\n/wood\n/beast\n/medicine\n/cloth\n/other _(Comming Soon)_`
  		break;

  		case 'event':
  			return `which event would you like to see??\n- valentine\n- christmas`
  		break;
  			}
}

exports.onGroup = () => {
	return `Group Only!`
}

exports.onGuild = () => {
	return `Can't use in this group!`
}

exports.onAdmin = () => {
	return `Admin Only!`
}

exports.head = (command, text = '') => {
  switch(command) {
  	case 'farm':
  	case 'farming':
  		return `*The following is a list farming spot of ${text} quests that I known:*\n`
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
  		return `*The following is a list farming spot of ${command} quests that I known:*\n`
  	break;

  default:

  }
}

exports.quest = (command, text = '') => {
	switch(command) {
	case 'valentine':
		return `The following is a list of ${command} quests that I known:\n\n`
	break;

	case 'event':
		return `The following is a list of ${text} quests that I known:\n\n`
	break;
default: 

	}
}