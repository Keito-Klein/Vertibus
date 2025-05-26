
const fs = require("fs");
db = JSON.parse(fs.readFileSync("./language/Toram-DB/mq-db-eng.json"));
//kondisi !mq 230|38 eps58 eps125
//
// let lvl = Math.floor(Math.pow(230, 4) * 0.025 + 230 * 2)
// let percentage = Math.floor(lvl * 38/100)
// let startEXP = lvl - percentage

const convertLV = (lv) => Math.floor(Math.pow(lv, 4) * 0.025 + lv * 2)

//Kondisi mq 273|78 eps110 eps110
function calculateMQ (level, percentage, start, end) {
let sisa = 0;
let currentLvl = convertLV(level);
let calcP = (convertLV(level)) * (percentage / 100);
let requiredXP = Math.floor(currentLvl - calcP);
mqBegin = start;
mqEnd = end;
mqXp = 0;
for(let i = mqBegin-1; i < mqEnd; i++) {
    mqXp += Number(db[i].exp);
}
console.log("Total EXP: " + mqXp)
console.log(requiredXP)
if(mqXp < requiredXP) {
    sisa = calcP + mqXp;
    return [level, Math.floor(100*sisa/currentLvl)]
    //return console.log(`Aditional percentage: ${Math.floor(100*sisa/currentLvl)}%`)
} else {
    mqXp += calcP;
    while(convertLV(level) <= mqXp) {
        mqXp -= convertLV(level);
        level += 1;
    }
    return [level, Math.floor(100*mqXp/convertLV(level))]
    //return console.log(`level: ${level} ${Math.floor(100*mqXp/convertLV(level))}%`)
}

}
//calculateMQ(273, 4, 110, 110);
module.exports = calculateMQ;