import fs from "fs";
import toMs from "ms";
const User = JSON.parse(fs.readFileSync("./database/db/register.json"));
const Usage = JSON.parse(fs.readFileSync("./database/db/usage.json"));
const Restrict = JSON.parse(fs.readFileSync("./database/db/restrict.json"));
const Banned = JSON.parse(fs.readFileSync("./database/db/bans.json"));

//Create_Update Class to handle user and restrict data.
class Create_Update {
    constructor() {
       this.name = "create"
    }

    addUser(id, lid) {
        let userIndex = User.find((user) => user.id === id);
        let update;
        if (!userIndex) {
          const ovj = {
            id,
            lid,
            date: Date.now(),
            latest: true,
          };
          update = [...User, {...ovj}]
        } else {
          if (!userIndex.latest) {
            update = User.map((data) => data.id === id ? {...data, latest: true} : data)
          }
          if(!userIndex.date) {
            update = User.map((data) => data.id === id ? {...data, date: Date.now()} : data)
          }
          if(!userIndex.lid) {
            update = User.map((data) => data.id === id ? {...data, lid} : data)
          }
        }
        if(!update) {
            return false;
          } else {
            fs.writeFileSync("./database/db/restrict.json", JSON.stringify(update, null, 2));
            console.log("Updated database for", userIndex.id)
            return true;
          }
    }

    reset() {
      Object.keys(User).forEach((i) => {
        User[i].latest = false;
      });
      fs.writeFileSync("./database/db/register.json", JSON.stringify(User, null, 2));
    }

  addUsage(type) {
    if(type === "private") {
      Usage.usage_private++
    } else {
      Usage.usage_group++
    }
    fs.writeFileSync("./database/db/usage.json", JSON.stringify(Usage));
  }

    addRestrict(group, antilinkStatus, antilinkgcStatus, openStatus, m) {
        let restrictIndex = Restrict.find(
            (restrict) => restrict.group === group
          );
          let update;
          if (!restrictIndex) {
            const ovj = {
              group,
              antilink: antilinkStatus,
              antilinkgc: antilinkgcStatus,
              open: openStatus,
            };
            update = [...Restrict, {...ovj}]
          } else {
            if (restrictIndex.antilinkgc !== antilinkgcStatus) {
              update = Restrict.map((data) => data.group === group ? {...data, antilinkgc: antilinkgcStatus} : data)
            }
            if (restrictIndex.antilink !== antilinkStatus) {
              update = Restrict.map((data) => data.group === group ? {...data, antilink: antilinkStatus} : data)
            }
            if (restrictIndex.open !== openStatus) {
              update = Restrict.map((data) => data.group === group ? {...data, open: openStatus} : data)
            }
          }
          if(!update) {
            m.reply("failed ❌")
            return false;
          } else {
            fs.writeFileSync("./database/db/restrict.json", JSON.stringify(update, null, 2));
            m.reply("success ✔")
            return true;
          }
    }

    banned(id, lid, banned, reason = "No Reason") {
      const banDB = Banned.find(user => user.id === id);
      let update;
      if(!banDB) {
        const obj = {
          id,
          lid,
          banned: true,
          reason
        }
        update = [...Banned, {...obj}];
      }else {
        if(banDB.banned !== banned) {
          update = Banned.map(user => user.id === id ? {...user, banned, reason: !banned ? null : reason} : user);
        }
      }
      console.log(`${banned ? "Banned" : "Unbanned"} user: ${id} with reason: ${reason}`)
    }
}

export default Create_Update;