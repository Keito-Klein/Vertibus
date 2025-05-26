require("./db");
const Premium = require("../models/premium")
const Restrict = require("../models/restrict")
const Usage = require("../models/usage")
const User = require("../models/user")

class Read {
    constructor() {
        this.read = true;
    }

    async checkPrem(id) {
        const premiumdb = await Premium.findOne({ id }).exec();
        const isPremium = premiumdb !== null ? premiumdb.expired !== undefined ? Date.now() <= premiumdb.expired ? true : false : false : false
        if(!isPremium) {
            return false
        } else {
            return premiumdb;
        }
    }

    async checkRestrict(id) {
        const restrictDB = await Restrict.findOne({ group: id }).exec();
        let result;
        if(restrictDB === null) {
            result = {
                group: id,
                antilink: false,
                antilinkgc: false,
                open: false,
            }
        } else {
            result = {
                id: restrictDB.group,
                antilink: restrictDB.antilink,
                antilinkgc: restrictDB.antilinkgc,
                open: restrictDB.open,
            }
        }
        return result;
    }

    async checkUser(id) {
        let result = {
            users: [],
            user: {}
        }
        result.users = await User.find()
        result.user = await User.findOne({ id }).exec()
        return result;
    }

    async checkUsage() {
        const usagedb = await Usage.find();
        return usagedb[0];
    }

}

module.exports = Read;