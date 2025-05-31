const fs = require("fs");
const toMs = require("ms");
const User = JSON.parse(fs.readFileSync("./db/register.json"));
const Usage = JSON.parse(fs.readFileSync("./db/usage.json"));
const Restrict = JSON.parse(fs.readFileSync("./db/usage.json"));

//Create_Update Class to handle user and restrict data.
class Create_Update {
    constructor() {
       this.name = "create"
    }

    addUser(id) {
        let userIndex = User.findIndex((user) => user.id === id);
        if (userIndex === -1) {
          const ovj = {
            id,
            date: Date.now(),
            latest: true,
          };
          User.push(ovj);
        } else {
          if (!User[userIndex].latest) {
            User[userIndex].latest = true;
          }
          if(!User[userIndex].date) {
            User[userIndex].date = Date.now();
          }
        }
        fs.writeFileSync("./db/register.json", JSON.stringify(User));
    }

    reset() {
      Object.keys(User).forEach((i) => {
        User[i].latest = false;
      });
      fs.writeFileSync("./db/register.json", JSON.stringify(User));
    }

  addUsage(type) {
    if(type === "private") {
      Usage.usage_private++
    } else {
      Usage.usage_group++
    }
    fs.writeFileSync("./db/usage.json", JSON.stringify(Usage));
  }

    addRestrict(group, antilinkStatus, antilinkgcStatus, openStatus, m) {
        let restrictIndex = Restrict.findIndex(
            (restrict) => restrict.group === group
          );
          if (restrictIndex === -1) {
            const ovj = {
              group,
              antilink: antilinkStatus,
              antilinkgc: antilinkgcStatus,
              open: openStatus,
            };
            Restrict.push(ovj);
            m.reply("success ✔");
          } else {
            if (Restrict[restrictIndex].antilinkgc !== antilinkgcStatus) {
              Restrict[restrictIndex].antilinkgc = antilinkgcStatus;
              m.reply("success ✔");
            }
            if (Restrict[restrictIndex].antilink !== antilinkStatus) {
              Restrict[restrictIndex].antilink = antilinkStatus;
              m.reply("success ✔");
            }
            if (Restrict[restrictIndex].open !== openStatus) {
              Restrict[restrictIndex].open = openStatus;
              m.reply("success ✔");
            }
          }
          fs.writeFileSync("./db/restrict.json", JSON.stringify(Restrict));
    }
}

module.exports = Create_Update;