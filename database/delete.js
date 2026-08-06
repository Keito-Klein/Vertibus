import fs from "fs";
const User = JSON.parse(fs.readFileSync("./database/db/register.json"));
class Delete {
    constructor() {
        this.name = "delete";
    }

    deleteUser(id) {
        userIndex = User.findIndex((user) => user.id === id);
        const deleted = {
            id: User[userIndex].id,
        }
        User.splice(userIndex, 1)
        fs.writeFileSync("./db/register.json", JSON.stringify(User));
        return deleted;
    }
}

export default Delete;