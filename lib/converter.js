const { getRandom } = require("./general-function");
const { tmpdir } = require("os");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const Crypto = require("crypto");
const BodyForm = require("form-data");
const ff = require("fluent-ffmpeg");
const webp = require("node-webpmux");


//Image to Sticker
async function imageToWebp (media, options) {

    const tmpFileOut = `./tmp/${getRandom(".webp")}`
    const tmpFileIn = `./tmp/${getRandom(".png")}`
    fs.writeFileSync(tmpFileIn, media)

try {
    require.resolve("sharp");
    const cc = require("sharp")
    if (options == false) {
        await cc(tmpFileIn)
            .rotate()
            .resize(300)
            .toFile(tmpFileOut)
            .then(data => console.log(data))
    } else if (options == true) {
        await new Promise((resolve, reject) => {
    
            ff(tmpFileIn)
                .on("error", reject)
                .on("end", () => resolve(true))
                .addOutputOptions([
                    "-vcodec",
                    "libwebp",
                    "-vf",
                    "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
                ])
                .toFormat("webp")
                .save(tmpFileOut)
        })
    }
} catch {
    await new Promise((resolve, reject) => {
    
        ff(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })
}

    const buff = fs.readFileSync(tmpFileOut)
    fs.unlinkSync(tmpFileOut)
    fs.unlinkSync(tmpFileIn)
    return buff
}


//Sticker to Image
async function toImage (media) {
    const tmpFileIn = `./tmp/${getRandom(".webp")}`
    const tmpFileOut = `./tmp/${getRandom(".png")}`
    fs.writeFileSync(tmpFileIn, media);

try {
    require.resolve("sharp");
    const cc = require("sharp");
    await cc(tmpFileIn)
        .rotate()
        .resize(480)
        .toFile(tmpFileOut)
        .then(data => console.log(data))
} catch {
    await new Promise((resolve, reject) => {
        ff(tmpFileIn)
            .output(tmpFileOut)
            .on("error", reject)
            .on("end", () => resolve(true))
            .run();
    })
    
}

    buff = fs.readFileSync(tmpFileOut)
    return buff
}

//Video to Sticker
async function videoToWebp (media) {

    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)
    fs.writeFileSync(tmpFileIn, media)

    await new Promise((resolve, reject) => {
        ff(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:11",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })

    const buff = fs.readFileSync(tmpFileOut)
    fs.unlinkSync(tmpFileOut)
    fs.unlinkSync(tmpFileIn)
    return buff
};

//sticker to video
function toVideo(path) {
    return new Promise((resolve, reject) => {
         const form = new BodyForm()
         form.append('new-image-url', '')
         form.append('new-image', fs.createReadStream(path))
         axios({
              method: 'post',
              url: 'https://ezgif.com/webp-to-mp4',
              data: form,
              headers: {
                   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
              }
         }).then(({ data }) => {
              const bodyFormThen = new BodyForm()
              const $ = cheerio.load(data)
              const file = $('input[name="file"]').attr('value')
              bodyFormThen.append('file', file)
              bodyFormThen.append('convert', "Convert WebP to MP4!")
              axios({
                   method: 'post',
                   url: 'https://ezgif.com/webp-to-mp4/' + file,
                   data: bodyFormThen,
                   headers: {
                        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                   }
              }).then(({ data }) => {
                   const $ = cheerio.load(data)
                   const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                   resolve({
                        status: true,
                        message: "Created By MRHRTZ",
                        result: result
                   })
              }).catch(reject)
         }).catch(reject)
    })
}

//Sticker Watermark
async function writeExifImg (media, metadata, options) {
    let wMedia = await imageToWebp(media, options)
    const tmpFileIn = `./tmp/${getRandom(".webp")}`
    const tmpFileOut = `./tmp/${getRandom(".webp")}`
    fs.writeFileSync(tmpFileIn, wMedia)

    if (metadata.packname || metadata.author) {
        const img = new webp.Image()
        const json = { "sticker-pack-id": `https://github.com/DikaArdnt/Hisoka-Morou`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
        const exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(tmpFileIn)
        fs.unlinkSync(tmpFileIn)
        img.exif = exif
        await img.save(tmpFileOut)
        return tmpFileOut
    }
};

//Animated Sticker Watermark
async function writeExifVid (media, metadata) {
    let wMedia = await videoToWebp(media)
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    fs.writeFileSync(tmpFileIn, wMedia)

    if (metadata.packname || metadata.author) {
        const img = new webp.Image()
        const json = { "sticker-pack-id": `https://github.com/DikaArdnt/Hisoka-Morou`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
        const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
        const exif = Buffer.concat([exifAttr, jsonBuff])
        exif.writeUIntLE(jsonBuff.length, 14, 4)
        await img.load(tmpFileIn)
        fs.unlinkSync(tmpFileIn)
        img.exif = exif
        await img.save(tmpFileOut)
        return tmpFileOut
    }
};

module.exports = {
    toImage,
    videoToWebp,
    writeExifVid,
    writeExifImg,
    imageToWebp,
    toVideo

};