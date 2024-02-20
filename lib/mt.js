const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")


const mt = async () => {
const res = await axios.get(`http://id.toram.jp/?type_code=update#contentArea`)
const sup = cheerio.load(res.data)
const b = sup('.common_list').find('.news_border:nth-child(1)')
let link = `http://id.toram.jp` + sup(b).find('a').attr('href')

const des = await axios.get(link)

const soup = cheerio.load(des.data)
const result = soup('#news').find('div').text().trim()
const reg = result.split('Kembali ke atas')[0]
return reg
}

exports.mt = mt