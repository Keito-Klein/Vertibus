exports.format = (prefix, command) => {
  switch (command) {
    case "brat":
      return `How to use:\n${prefix}${command} Hallo`;
    
    case "watk":
      return `How to use:\n${prefix}${command} <Base weapon attack>\nExample:\n${prefix}${command} 369`;

    case "cdmg":
      return 'use "/" as separator!\nex: total STR/total STR on eq/total cd percent/cd flat/LV of skill critical UP\nOr:\n/cdmg 250/5/20/40/10\nDon\'t use space!\n\nPenjelasan:\n- Total Str di personal status\n- Total STR di equipment/avatar\n- Total critical damage % di eq/avatar\n- Total critical damage di eq/avatar\n Level skill Crit. UP(Di skill tempur'

    case "mq":
      return `How to use:\n${prefix}${command} <level>|<EXP Percentage>\nExample:\n${prefix}${command} 270|10`;

      case "lv":
      case "lvl":
      case "lvling":
      case "leveling":
        return `How to use:\n${prefix}${command} <level>|<Bonus EXP>\nExample:\n${prefix}${command} 270|10`;

    case "take":
    case "swm":
    case "wm":
    case "steal":
    case "curi":
    case "smeme":
    case "stickmeme":
      return `How to use?\n\n${prefix}${command} Text1|Text2`;

    case "pixiv":
    case "pinterest":
    case "pin":
      return `How to use?\n\n${prefix}${command} Sorasaki Hina`;

    case "add":
      return `How to use?\n\n${prefix}${command} 6281234567890`;

    default:
      return `how to use?\n${prefix}${command} <text>`;
  }
};

exports.unsupported = () => {
  return `Media format isn't Suported!`;
};

exports.premium = () => {
  return `This command is only available for Premium users!\nbuy premium on owner\n!owner`;
};

exports.owner = () => {
  return `This command is only available for Owner!`;
};

exports.onGroup = () => {
  return `This command is only available in Group!`;
};

exports.onAdmin = () => {
  return `This command is only available for Group Admins!`;
};

exports.botAdmin = () => {
  return `This command is only available if bot is Admin!`;
};

exports.nsfw = () => {
  return `Nsfw content is restricted during Ramadhan!`;
};

exports.error = (err) => {
  return `An error occurred in processing the command!\nError message: ${err.message}`;
};
