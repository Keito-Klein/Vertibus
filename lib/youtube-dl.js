const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const EventEmitter = require("events");

let cookies = [
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.143004,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-1PAPISID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "S3xjX2XIioaFFzzS/AHglAQloFu0qcpJYJ",
        "id": 1
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.142991,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "g.a000qwjX1GJkS22Cs2EzBX3h4cEVDGCMWFspsNPdE-VSJI-6Uh4R-PRYokB5VpkYC8kgqMfQnQACgYKAQISARUSFQHGX2MihsFT178IoGU9E2IUZbdvYRoVAUF8yKpWMNWjeoxQHdmqDbksNxKK0076",
        "id": 2
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1766224380.717481,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDCC",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AKEyXzUZYCn4Sv2HMAzC-6ir9uv3WAcdfNouVC8fL8eSCXJt6Ry5xKqFvHw9jG0y2PYcE0Ng5WY",
        "id": 3
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1766224378.494952,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDTS",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sidts-CjEB7wV3sZwcSvzbpXJvcPQuqqTnYkUtYGK0whISrmZhaJT29BsKsacRKojtb9_CnGplEAA",
        "id": 4
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.143007,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "S3xjX2XIioaFFzzS/AHglAQloFu0qcpJYJ",
        "id": 5
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.142994,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "g.a000qwjX1GJkS22Cs2EzBX3h4cEVDGCMWFspsNPdE-VSJI-6Uh4RpkHhhEEkWhDUKTTNGJaWiwACgYKARkSARUSFQHGX2Mi9cdvDI_GBfv3rPITWZ53LxoVAUF8yKpRvGRaLNCHh1SSojmmOTXc0076",
        "id": 6
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1766224380.717536,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDCC",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AKEyXzUi5x5ZEuvCr2CDlmVHvZ-d9J5MKzlUJYo2bHQVtNoJdlYocXIyM6i03GeB8ZsuyUGhowg",
        "id": 7
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1766224378.495065,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDTS",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "sidts-CjEB7wV3sZwcSvzbpXJvcPQuqqTnYkUtYGK0whISrmZhaJT29BsKsacRKojtb9_CnGplEAA",
        "id": 8
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.142999,
        "hostOnly": false,
        "httpOnly": false,
        "name": "APISID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "LHSDG2X7aMm5n76a/AXHvnnILJ-1U66Ysi",
        "id": 9
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1734688975,
        "hostOnly": false,
        "httpOnly": false,
        "name": "CONSISTENCY",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AKreu9tM104lI14gIlUJdQZa1fm3PkDMh6kowL1YGAqszovHDxEUVuKWVbOaS-FDhsAJ2Ksguq4tYsD23j__VXXPkiOcEtl4l1S0nuuAId0ulzc_puyCWcg0A-bO8_TVMn3zjaaLG-4O83_EYj20dV_M",
        "id": 10
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.142997,
        "hostOnly": false,
        "httpOnly": true,
        "name": "HSID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "AhrD8n-U0LvqPqjZr",
        "id": 11
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681302.648592,
        "hostOnly": false,
        "httpOnly": true,
        "name": "LOGIN_INFO",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AFmmF2swRQIgdnd9F0qqWF-My3jcT2qfT4qzEo8H33AkS14iKj6hvJ0CIQDQNk4P_LwweI4Z4cESzqJ0qFycHYF9a_cjnI21LAl5uQ:QUQ3MjNmejNFU3VNLU9WM1RDX1VhY1NudzZ1X09XR0ZOZGlqQzZwYTVzdW5nUE9DU0RKOUZqWFAxeEpaUXVrOWVrTUg1dHdHMzlvYkhWVkphUkNwek0zQVZkcW5zRk14b3dMN3o3QTI3NE1CbEl0c3RfR3RUOWFhOERCYlFCeGl3U1o1MUpzcVdmTXFpUGp5bHJJaWg0M3AyamJtVUFMUVFn",
        "id": 12
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1769248375.586288,
        "hostOnly": false,
        "httpOnly": false,
        "name": "PREF",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "f6=40000000&tz=Asia.Jakarta&f7=100",
        "id": 13
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.143001,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SAPISID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "S3xjX2XIioaFFzzS/AHglAQloFu0qcpJYJ",
        "id": 14
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.142987,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "g.a000qwjX1GJkS22Cs2EzBX3h4cEVDGCMWFspsNPdE-VSJI-6Uh4R8cTTpYRQe2t-BB9KgKNNZAACgYKAVMSARUSFQHGX2MitTYQg_3QtKe9UEvfoanxMRoVAUF8yKqeYlyh03Ke7k4ltaBraKj10076",
        "id": 15
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1766224380.717381,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SIDCC",
        "path": "/",
        "sameSite": "unspecified",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "AKEyXzVfJNmIDDMKONdekNTiEbYfSIeQdcsCAuwbMjkJJvE6g6_V--3DMIdm38m4Y9GTyEC0Gw",
        "id": 16
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767681300.142998,
        "hostOnly": false,
        "httpOnly": true,
        "name": "SSID",
        "path": "/",
        "sameSite": "unspecified",
        "secure": true,
        "session": false,
        "storeId": "0",
        "value": "AyNnnsgi13MDcPjVW",
        "id": 17
    }
    ]


    //Use cookies
    const agent = ytdl.createAgent(cookies);

    //Queue handler 
    class WriteQueue extends EventEmitter {
        constructor(filePath) {
            super();
            this.queue = []; //store queue
            this.writing = false //keep false
            this.stream = fs.createWriteStream(filePath, {flags: 'a'})

            //Stream  events
            this.stream.on('drain', () => this.processQueue());
            this.stream.on('finish', () => console.log('All data written successfully.'));
            this.stream.on('error', (err) => console.error('Write error:', err));
        }

            //Add data
            enqueue(data) {
                if(!Buffer.isBuffer(data)) throw new Error("Data must typeof Buffer!")
                this.queue.push(data)
                this.processQueue()
            }

            //Process Queue
            processQueue() {
                if (this.writing || this.queue.length === 0) return
                this.writing = true;

                const data = this.queue.shift();
                const canWrite = this.stream.write(data, () => {
                    this.writing = false;
                    if(this.queue.length > 0) {
                        this.processQueue();
                    }
                })

                if (!canWrite) {
                    this.writing = true
                }
            }

            //Ending
            end() {
                this.stream.end()
            }

    }


    // Download the video with the agent
exports.ytdls = (url, format, fileName) => {
    if(format == "mp3") {
        return new Promise((resolve, reject) => {
            ytdl.getInfo(url, { agent }).then((api) => {
                const array = []
                    for(let i = 0; i < api.formats.length; i++) {
    
                        if (api.formats[i].codecs === "opus" && api.formats[i].audioQuality === "AUDIO_QUALITY_MEDIUM") {
                            
                            array.push({
                                title: api.videoDetails.title,
                                channel: api.videoDetails.author.name,
                                subscriber: api.videoDetails.author.subscriber_count,
                                viewCount: api.videoDetails.viewCount,
                                likes: api.videoDetails.likes,
                                audioBitrate: api.formats[i].audioBitrate,
                                url: api.formats[i].url
                            })
                        }
                    }
                    if(array.length === 0) reject("no audio available")
                        const highesBitrate = array.reduce((current, highes) => {
                    return (current.audioBitrate > highes.audioBitrate)? current : highes
                }, array[0])

                resolve(highesBitrate)
            });
    
        })
    }
    if(format == "mp4") {
        return new Promise((resolve, reject) => {
            ytdl.getInfo(url, { agent }).then((api) => {
                const array = []
                    for(let i = 0; i < api.formats.length; i++) {
    
                        if (api.formats[i].hasVideo === true && api.formats[i].hasAudio === true) {
                    
                            array.push({
                                title: api.videoDetails.title,
                                channel: api.videoDetails.author.name,
                                subscriber: api.videoDetails.author.subscriber_count,
                                viewCount: api.videoDetails.viewCount,
                                likes: api.videoDetails.likes,
                                width: api.formats[i].width,
                                height: api.formats[i].height,
                                url: api.formats[i].url
                            })
                        }
                    }
                    if(array.length === 0) throw new Error("no video available")
                        const highesQuality = array.reduce((current, highes) => {
                    return (current.height > highes.height)? current : highes
                }, array[0])
                resolve(highesQuality)
            });
    
        })
    }
}
