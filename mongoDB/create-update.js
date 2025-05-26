require("./db.js");
const toMs = require("ms");
const User = require("../models/user.js");
const Usage = require("../models/usage")
const Premium = require("../models/premium.js");
const Restrict = require("../models/restrict.js");

//Class for creating and updating user and restrict data
class Create_Update {
  constructor() {
    this.name = "Create";
  }

  //Add new registered user
  async addUser(id) {
    const userdb = await User.findOne({ id }).exec();
    const user = await User.find();
    let userIndex = user.findIndex((user) => user.id === id);
    if (userdb === null) {
      const ovj = {
        id,
        date: Date.now(),
        latest: true,
      };
      let data = new User(ovj);
      data.save().then(() => {
        console.log(`add new data to mongoDB: ${id}`);
      });
    } else {
      if (!user[userIndex].latest) {
        await User.updateOne({ id: id }, { latest: true });
      }
      if(!user[userIndex].date) {
        await User.updateOne({ id: id }, { date: Date.now() });
      }
    }
  }

  async reset() {
    await User.updateMany({}, { latest: false });
  }

  async addUsage(type) {
    if (type === "private") {
      await Usage.updateOne({}, { $inc: { usage_private: 1 } });
    } else {
      await Usage.updateOne({}, { $inc: { usage_group: 1 } });
    }
  }

  //Add premium  user
  async addPremium(id, expired) {
    const premiumdb = await Premium.findOne({ id }).exec();
    const premium = await Premium.find();
    let premiumIndex = premium.findIndex((premium) => premium.id === id);
    if (premiumdb === null) {
      const ovj = {
        id,
        expired: Date.now() + toMs(expired)
      };
      let data = new Premium(ovj);
      data.save().then(() => {
        console.log(`add new premium user to mongoDB: ${id}`);
      });
    } else {
      const isPremium = premiumdb.expired !== undefined ? Date.now() <= premiumdb.expired ? true : false : false
      
      if (!isPremium) {
        await Premium.updateOne({ id: id }, { expired: Date.now() + toMs(expired) });
        console.log(`Success update premium user to mongoDB: ${id}`);
      }
      if(premiumdb.expired <= (Date.now() + toMs(expired))) {
        await Premium.updateOne({ id: id }, { expired: premiumdb.expired + toMs(expired) });
        console.log(`Success update premium user to mongoDB: ${id}`);
      }
    }
  }

  //Add Restricted group
  async addRestrict(group, antilinkStatus, antilinkgcStatus, openStatus, m) {
    const restrictdb = await Restrict.findOne({ group }).exec();
    const restrict = await Restrict.find();
    let restrictIndex = restrict.findIndex(
      (restrict) => restrict.group === group
    );
    if (restrictdb === null) {
      const ovj = {
        group,
        antilink: antilinkStatus,
        antilinkgc: antilinkgcStatus,
        open: openStatus,
      };
      let data = new Restrict(ovj);
      data.save().then(() => {
        m.reply("success ✔");
      });
    } else {
      if (restrict[restrictIndex].antilinkgc !== antilinkgcStatus) {
        await Restrict.updateOne(
          { group: group },
          { antilinkgc: antilinkgcStatus }
        );
        m.reply("success ✔");
      }
      if (restrict[restrictIndex].antilink !== antilinkStatus) {
        await Restrict.updateOne({ group: group }, { antilink: antilinkStatus });
        m.reply("success ✔");
      }
      if (restrict[restrictIndex].open !== openStatus) {
        await Restrict.updateOne({ group: group }, { open: openStatus });
        m.reply("success ✔");
      }
    }
  }
}

module.exports = Create_Update;
