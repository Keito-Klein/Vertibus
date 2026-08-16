import fs from "fs";

const readDB = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

class Read {
    constructor() {
        this.read = true;
    }

    checkRestrict(id) {
        const Restrict = readDB("./database/db/restrict.json");
        const restrictIndex = Restrict.find((user) => user.group === id);

        if (!restrictIndex) {
            return {
                group: id,
                antilink: false,
                antilinkgc: false,
                open: true,
            };
        }

        return restrictIndex;
    }

    checkUser(id) {
        const User = readDB("./database/db/register.json");
        const userIndex = User.find((user) => user.id === id);

        return {
            users: User,
            user: userIndex ?? null,
        };
    }

    checkBan(id) {
        const Banned = readDB("./database/db/bans.json");
        const bannedUser = Banned.find((user) => user.id === id);
        return bannedUser || false;
    }

    checkUsage() {
        return readDB("./database/db/usage.json");
    }
}

export default Read;