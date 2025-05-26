const Create_Update = require("./create-update");
const Read = require("./read");

module.exports = {
    ...Create_Update,
    ...Read
}