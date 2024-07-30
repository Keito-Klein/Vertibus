const fetch = require("node-fetch");
const { PDFDocument, rgb } = require("pdf-lib");
const axios = require("axios");
const cheerio = require("cheerio");
const fileType = require("file-type");
const fs = require("fs");

/**
 * Fetch image url from array
 * @param {Array} url images
 * @returns buffer
 */
async function fetchImage(url) {
    const response = await fetch(url)
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
        if (res.status === 404) throw new Error("Data not Found! 404")
        const html = res.data
        const $ = cheerio.load(html);
        let urlImages = []
        $(".thumb-container").each(function(i, elem) {
            let url = $(this).find('a > img').attr('data-src').replace(/t([735])/, (match, p1) => `i${p1}`)
            url = url.replace('t.', '.')
            urlImages.push(url)
        })
         const buffer = await createPDF(urlImages, `./tmp/${fileName}.pdf`)
         return buffer;


}

module.exports = { nhentai }