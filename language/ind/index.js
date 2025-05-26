const menu = require("./menu");
const warning = require("./warning");
const bs = require("./bs");
const mq = require("../Toram-DB/mq-ind");
const maze = require("../Toram-DB/maze-ind");
const ailment = require("../Toram-DB/ailment-ind");
const bag = require("../Toram-DB/bag-ind");

module.exports = {
    menu: menu.menu,
    donate: menu.donate,
    pricing: menu.pricing,
    update: menu.update,
    ownerContact: menu.ownerContact,
    format: warning.format,
    unsupported: warning.unsupported,
    premium: warning.premium,
    error: warning.error,
    owner: warning.owner,
    onGroup: warning.onGroup,
    onAdmin: warning.onAdmin,
    botAdmin: warning.botAdmin,
    nsfw: warning.nsfw,
    bs: bs.bs,
    mq: mq.mq,
    maze: maze.maze,
    ailment: ailment.ailment,
    bag: bag.bag,
};