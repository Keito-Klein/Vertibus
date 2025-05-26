require("./db.js");
const User = require("../models/user.js");
const Premium = require("../models/premium.js");

class Delete {
    constructor() {
        this.name = "delete";
    }

    async deleteUser(id) {
        const deleted = await User.findOneAndDelete({ id });
        return deleted;
    }
}

module.exports = Delete;
