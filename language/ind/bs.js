const  fs = require("fs");
exports.bs = () => {
    const db = JSON.parse(fs.readFileSync("../Toram-DB/bs-ind.json"));
        return `
*List Leveling BlackSmith*

*0 - 5*
*Craft:* ${db.five.craft} 
*Bahan:*
${db.five.mats}
*Location:*
${db.five.location}
*Mob:* 
${db.five.mob}

*5 - 10*
*Craft:* ${db.ten.craft}
*Bahan:*
${db.ten.mats}
*Location:*
${db.ten.location}
*Mob:* 
${db.ten.mob}

*10 - 50*
*Craft:* ${db.fifty.craft}
*Bahan:*
${db.fifty.mats}
*Location:*
${db.fifty.location}
*Mob:* 
${db.fifty.mob}

*50 - 90*
*Craft:* ${db.ninety.craft}
*Bahan:*
${db.ninety.mats}
*Location:*
${db.ninety.location}
*Mob:* 
${db.ninety.mob}

*90 - 120*
*Craft:* ${db.one_hundred_twenty.craft}
*Bahan:*
${db.one_hundred_twenty.mats}
*Location:*
${db.one_hundred_twenty.location}
*Mob:* 
${db.one_hundred_twenty.mob}

*120 - 140*
*Craft:* ${db.one_hundred_fourty.craft}
*Bahan:*
${db.one_hundred_fourty.mats}
*Location:*
${db.one_hundred_fourty.location}
*Mob:* 
${db.one_hundred_fourty.mob}

*140 - 170*
*Craft:* ${db.one_hundred_seventy.craft}
*Bahan:*
${db.one_hundred_seventy.mats}
*Location:*
${db.one_hundred_seventy.location}
*Mob:* 
${db.one_hundred_seventy.mob}

*170 - 200*
*Craft:* ${db.two_hundred.craft}
*Bahan:*
${db.two_hundred.mats}
*Location:*
${db.two_hundred.location}
*Mob:* 
${db.two_hundred.mob}

*200 - 250*
*Craft:* ${db.two_hundred_fifty.craft}
*Bahan:*
${db.two_hundred_fifty.mats}
*Location:*
${db.two_hundred_fifty.location}
*Mob:* 
${db.two_hundred_fifty.mob}

*250 - 260*
*Craft:* ${db.two_hundred_sixty.craft}
*Bahan:*
${db.two_hundred_sixty.mats}
*Location:*
${db.two_hundred_sixty.location}
*Mob:* 
${db.two_hundred_sixty.mob}
`
}