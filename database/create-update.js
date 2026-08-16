import fs from "fs";

const readDB = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const writeDB = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

//Create_Update Class to handle user and restrict data.
class Create_Update {
    constructor() {
       this.name = "create"
    }

    addUser(id, lid) {
        const User = readDB("./database/db/register.json");
        const userIndex = User.find((user) => user.id === id);
        let update = User;

        if (!userIndex) {
          const obj = {
            id,
            lid,
            date: Date.now(),
            latest: true,
          };
          update = [...User, { ...obj }]
        } else {
          const shouldUpdate =
            !userIndex.latest ||
            !userIndex.date ||
            !userIndex.lid ||
            userIndex.lid !== lid;

          if (shouldUpdate) {
            update = User.map((data) =>
              data.id === id
                ? {
                    ...data,
                    lid,
                    date: data.date || Date.now(),
                    latest: true,
                  }
                : data
            );
          }
        }

        writeDB("./database/db/register.json", update);
        return true;
    }

    reset() {
      const User = readDB("./database/db/register.json");
      const refreshed = User.map((user) => ({ ...user, latest: false }));
      writeDB("./database/db/register.json", refreshed);
      return true;
    }

  addUsage(type) {
    const Usage = readDB("./database/db/usage.json");
    if (type === "private") {
      Usage.usage_private++
    } else {
      Usage.usage_group++
    }
    writeDB("./database/db/usage.json", Usage);
    return true;
  }

    addRestrict(group, antilinkStatus, antilinkgcStatus, openStatus, m) {
        const Restrict = readDB("./database/db/restrict.json");
        const restrictIndex = Restrict.find((restrict) => restrict.group === group);
        let update = Restrict;

        if (!restrictIndex) {
          update = [
            ...Restrict,
            {
              group,
              antilink: antilinkStatus,
              antilinkgc: antilinkgcStatus,
              open: openStatus,
            },
          ];
        } else {
          const hasChanges =
            restrictIndex.antilink !== antilinkStatus ||
            restrictIndex.antilinkgc !== antilinkgcStatus ||
            restrictIndex.open !== openStatus;

          if (hasChanges) {
            update = Restrict.map((data) =>
              data.group === group
                ? {
                    ...data,
                    antilink: antilinkStatus,
                    antilinkgc: antilinkgcStatus,
                    open: openStatus,
                  }
                : data
            );
          }
        }

        writeDB("./database/db/restrict.json", update);
        if (m) m.reply("success ✔");
        return true;
    }

    banned(id, lid, banned, reason = "No Reason") {
      const Banned = readDB("./database/db/bans.json");
      const banDB = Banned.find((user) => user.id === id);
      let update = Banned;

      if (!banDB) {
        update = [
          ...Banned,
          {
            id,
            lid,
            banned: true,
            reason,
          },
        ];
      } else {
        const shouldUpdate =
          banDB.banned !== banned ||
          banDB.reason !== reason ||
          banDB.lid !== lid;

        if (shouldUpdate) {
          update = Banned.map((user) =>
            user.id === id
              ? {
                  ...user,
                  lid,
                  banned,
                  reason: banned ? reason : null,
                }
              : user
          );
        }
      }

      console.log(`${banned ? "Banned" : "Unbanned"} user: ${id} with reason: ${reason}`)
      writeDB("./database/db/bans.json", update);
      return true;
    }
}

export default Create_Update;