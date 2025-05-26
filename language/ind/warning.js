const { expectationFailed } = require("@hapi/boom");

exports.format = (prefix, command) => {
  switch (command) {
    case "brat":
      return `Cara penggunaan:\n${prefix}${command} Hallo`;
    
    case "watk":
      return `Cara penggunaan:\n${prefix}${command} <Base weapon attack senjata>\nContoh:\n${prefix}${command} 369`;

    case "cdmg":
      return 'use "/" as separator!\nex: total STR/total STR on eq/total cd percent/cd flat/LV of skill critical UP\nOr:\n/cdmg 250/5/20/40/10\nDon\'t use space!\n\nPenjelasan:\n- Total Str di personal status\n- Total STR di equipment/avatar\n- Total critical damage % di eq/avatar\n- Total critical damage di eq/avatar\n Level skill Crit. UP(Di skill tempur'

    case "mq":
      return `Cara penggunaan:\n${prefix}${command} <level>|<EXP Percentage>\nContoh:\n${prefix}${command} 270|10`;

      case "lv":
      case "lvl":
      case "lvling":
      case "leveling":
        return `Cara penggunaan:\n${prefix}${command} <level>|<Bonus EXP>\nContoh:\n${prefix}${command} 270|10`;

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

exports.unsupported = () => {
  return `Format media tidak didukung!`;
};

exports.premium = () => {
  return `Fitur ini hanya tersedia untuk premium user/anda belum premium.\nSilahkan beli premium pada owner\n!owner`;
};

exports.owner = () => {
  return `Fitur ini hanya tersedia untuk Owner!`;
};

exports.onGroup = () => {
  return `Fitur ini hanya tersedia di Grup!`;
};

exports.onAdmin = () => {
  return `Fitur ini hanya tersedia untuk Admin Grup!`;
};

exports.botAdmin = () => {
  return `Fitur ini hanya tersedia jika bot adalah admin grup!`;
};

exports.nsfw = () => {
  return `Konten nsfw dimatikan selama puasa!\nTunggu buka puasa dan sebelum imsak untuk mennggunakannya`;
}

exports.error = (err) => {
    return `Terjadi kesalahan dalam memproses command!\nPesan error: ${err.message}`;
}
