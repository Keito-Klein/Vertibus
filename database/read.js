import fs from "fs";
const Restrict = JSON.parse(fs.readFileSync("./database/db/restrict.json"));
const Usage = JSON.parse(fs.readFileSync("./database/db/usage.json"));
const User = JSON.parse(fs.readFileSync("./database/db/register.json"));
const Banned = JSON.parse(fs.readFileSync("./database/db/bans.json"));

class Read {
    constructor() {
        this.read = true;
    }

    checkRestrict(id) {
        const restrictIndex = Restrict.find((user) => user.group === id);
        let result;
        if (!restrictIndex) {
            result = {
                group: id,
                antilink: false,
                antilinkgc: false,
                open: true,
            }
        } else {
            result = restrictIndex;
        }
        return result;
    }

    checkUser(id) {
        let result = {
            users: [],
            user: {}
        }
        const userIndex = User.find((user) => user.id === id);
        result.users = User
        if (!userIndex) {
            result.user = null
        } else {
            result.user = userIndex;
        }
        return result;
    }

    checkBan(id) {
        const bannedUser = Banned.find(user => user.id === id);
        if(!bannedUser) return false;
        return bannedUser;
    }

    checkUsage() {
        return Usage;
    }
}

export default Read;