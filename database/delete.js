import fs from "fs";

const readDB = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

class Delete {
    constructor() {
        this.name = "delete";
    }

    deleteUser(id) {
        const User = readDB("./database/db/register.json");
        const userIndex = User.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return null;
        }

        const deleted = {
            id: User[userIndex].id,
        };

        const updated = User.filter((user) => user.id !== id);
        fs.writeFileSync("./database/db/register.json", JSON.stringify(updated, null, 2));
        return deleted;
    }
}

export default Delete;