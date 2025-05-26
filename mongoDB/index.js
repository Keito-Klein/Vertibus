const Create_Update = require("./create-update");
const Read = require("./read");
const Delete = require("./delete");

module.exports = {
    ...Create_Update,
    ...Read,
    ...Delete
}