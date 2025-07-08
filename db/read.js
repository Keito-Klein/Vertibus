const fs = require("fs");
const Restrict = JSON.parse(fs.readFileSync("./db/restrict.json"));
const Usage = JSON.parse(fs.readFileSync("./db/usage.json"));
const User = JSON.parse(fs.readFileSync("./db/register.json"));

class Read {
    constructor() {
        this.read = true;
    }

    checkRestrict(id) {
        const restrictIndex = Restrict.findIndex((user) => user.group === id);
        let result;
        if (restrictIndex === -1) {
            result = {
                group: id,
                antilink: false,
                antilinkgc: false,
                open: true,
            }
        } else {
            result = {
                id: Restrict[restrictIndex].group,
                antilink: Restrict[restrictIndex].antilink,
                antilinkgc: Restrict[restrictIndex].antilinkgc,
                open: Restrict[restrictIndex].open,
            }
        }
        return result;
    }

    checkUser(id) {
        let result = {
            users: [],
            user: {}
        }
        const userIndex = User.findIndex((user) => user.id === id);
        result.users = User
        if (userIndex === -1) {
            result.user = null
        } else {
            result.user = User[userIndex]
        }
        return result;
    }

    checkUsage() {
        return Usage;
    }
}

module.exports = Read;