const fetch = require("node-fetch");
const { PDFDocument, rgb } = require("pdf-lib");
const axios = require("axios");
const cheerio = require("cheerio");
const fileType = require("file-type");
const sharp = require("sharp");
const fs = require("fs");

/**
 * Fetch image url from array
 * @param {Array} url images
 * @returns buffer
 */
async function fetchImage(url) {
    try{
         response = await fetch(url)
        if(response.status === 403 && url.includes('/i3')) {
            response = await fetchImage(url.replace('/i3', '/i1'))
        } else if(response.status === 403 && url.includes('/i1')) {
            response = await fetchImage(url.replace('/i1', '/i2'))
        } else if(response.status === 403 && url.includes('/i2')) {
            response = await fetchImage(url.replace('/i2', '/i4'))
        } else if(response.status === 403 && url.includes('/i4')) {
            response = await fetchImage(url.replace('/i4', '/i3'))
        }
        
    }catch(e) {
        throw new Error("One of images can't downloaded!")
        
    }
    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer);
}

/**
 * Combine image to PDF using lib
 * @param {Array} imageURLs image urls
 * @param {string} output file path
 */
async function createPDF(imageURLs, output) {
    const pdfDoc = await PDFDocument.create();

    for (let imageUrl of imageURLs) {
        const imageBytes = await fetchImage(imageUrl)
        const type = await fileType.fromBuffer(imageBytes)
        let image
        if (type.ext == 'jpg') {
            image = await pdfDoc.embedJpg(imageBytes)
        } else if(type.ext == 'png') {
            image = await pdfDoc.embedPng(imageBytes)
        }  else if (type.ext == 'webp') {
            convertion = await sharp(imageBytes)
                            .toFormat('jpg')
                            .toBuffer()
            jpgUintData = new Uint8Array(convertion)
            image = await pdfDoc.embedJpg(jpgUintData)
         }
        const page = pdfDoc.addPage([image.width, image.height])
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height
        });
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(output, pdfBytes);
    return output;
}

/**
 * 
 * @param {string} code code of title
 */
async function nhentai(code, fileName) {
    
        const res = await axios.get(`https://nhentai.net/g/${code}/`)
        if (res.status === 404) throw new Error("*Error*\nData not Found! 404")
        const html = res.data
        const $ = cheerio.load(html);
        if (res.status === 525) {
            const errMessage = {
                code: "525",
                message: $(".leading-relaxed:nth-child(1) > p").text().trim(),
                bot: $("#cf-browser-status > span:nth-child(2)").text().trim(),
                cloudflare: $("#cf-cloudflare-status > span:nth-child(2)").text().trim(),
                host: $("#cf-host-status > span:nth-child(2)").text().trim()
            }
            throw new Error(`*Error*\n*Code:* ${errMessage.code}\n*Message:* ${errMessage.message}\n*Bot:* ${errMessage.bot}\n*Cloudflare:* ${errMessage.cloudflare}\n*Host:*\n ${errMessage.host}`)
        }
        let urlImages = []
        $(".thumb-container").each(function(i, elem) {
            let url = $(this).find('a > img').attr('data-src').replace(/t([1234])/, (match, p1) => `i${p1}`)
            url = url.replace('t.', '.')
            urlImages.push(url)
        })
         const buffer = await createPDF(urlImages, `./tmp/${fileName}.pdf`)
         return buffer;


}

module.exports = { nhentai }