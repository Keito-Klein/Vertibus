
const format = (prefix, command) => {
  let arr = [...command];
  arr.shift();
  command = arr.join("")
  
  console.log(command)
  switch (command) {
    case "brat":
      return `Cara penggunaan:\n${prefix}${command} Hallo`;
    
    case "watk":
      return `Cara penggunaan:\n${prefix}${command} <Base weapon attack senjata>\nContoh:\n${prefix}${command} 369`;

    case "cdmg":
      return 'use "/" as separator!\nex: total STR/total STR on eq/total cd percent/cd flat/LV of skill critical UP\nOr:\n/cdmg 250/5/20/40/10\nDon\'t use space!\n\nPenjelasan:\n- Total Str di personal status\n- Total STR di equipment/avatar\n- Total critical damage % di eq/avatar\n- Total critical damage di eq/avatar\n Level skill Crit. UP(Di skill tempur'

    case "mq":
      return `Cara penggunaan:\n${prefix}${command} <level>|<EXP Percentage>\nContoh:\n${prefix}${command} 270|10`;

    case "calculate":
      return `belum ada info`;

      case "lv":
      case "lvl":
      case "lvling":
      case "leveling":
        return `Cara penggunaan:\n${prefix}${command} <level>|<Bonus EXP>\nContoh:\n${prefix}${command} 270|10`;

    case "mob":
    case "mobs":
    case "monster":
    case "boss":
      return `Cara penggunaan:\n${prefix}${command} <nama monster>\nContoh:\n${prefix}${command} Goblin`;

    case "take":
    case "swm":
    case "wm":
    case "steal":
    case "curi":
    case "smeme":
    case "stickmeme":
      return `Cara penggunaan:\n\n${prefix}${command} teks1|teks2`;

    case "pixiv":
    case "pinterest":
    case "pin":
      return `Cara penggunaan:\n\n${prefix}${command} Sorasaki Hina`;

    case "add":
      return `Cara penggunaan:\n\n${prefix}${command} 6281234567890`;

    default:
      return `Cara penggunaan:\n${prefix}${command} <text>`;
  }
};

const unsupported = (media = "gambar") => {
  return `Format media tidak didukung!\nmedia yang didukung: _${media}_`;
};

const premium = () => {
  return `Fitur ini hanya tersedia untuk premium user/anda belum premium.\nSilahkan beli premium pada owner\n!owner`;
};

const owner = () => {
  return `Fitur ini hanya tersedia untuk Owner!`;
};

const onGroup = () => {
  return `Fitur ini hanya tersedia di Grup!`;
};

const onAdmin = () => {
  return `Fitur ini hanya tersedia untuk Admin Grup!`;
};

const botAdmin = () => {
  return `Fitur ini hanya tersedia jika bot adalah admin grup!`;
};

const nsfw = () => {
  return `Konten nsfw dimatikan selama puasa!\nTunggu buka puasa dan sebelum imsak untuk mennggunakannya`;
}

const error = (err) => {
    return `Terjadi kesalahan dalam memproses command!\nPesan error: ${err.message}`;
}

const maintenance = () => {
  return `Server saat ini sedang maintenance(05.00 - 12.00 WIB/UTC+7). fitur ini tidak dapat digunakan!`
}

export {
  format,
  unsupported,
  premium,
  owner,
  onGroup,
  onAdmin,
  botAdmin,
  nsfw,
  error
}