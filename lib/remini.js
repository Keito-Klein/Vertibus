const FormData = require("form-data");
const axios = require("axios");

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
  }

async function processing(urlPath, method) {
	return new Promise(async (resolve, reject) => {
		let Methods = ["enhance", "recolor", "dehaze"];
		Methods.includes(method) ? (method = method) : (method = Methods[0]);
		let buffer,
			Form = new FormData(),
			scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
		Form.append("model_version", 1, {
			"Content-Transfer-Encoding": "binary",
			contentType: "multipart/form-data; charset=uttf-8",
		});
		Form.append("image", Buffer.from(urlPath), {
			filename: "enhance_image_body.jpg",
			contentType: "image/jpeg",
		});
		Form.submit(
			{
				url: scheme,
				host: "inferenceengine" + ".vyro" + ".ai",
				path: "/" + method,
				protocol: "https:",
				headers: {
					"User-Agent": "okhttp/4.9.3",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
				},
			},
			function (err, res) {
				if (err) reject();
				let data = [];
				res
					.on("data", function (chunk, resp) {
						data.push(chunk);
					})
					.on("end", () => {
						resolve(Buffer.concat(data));
					});
				res.on("error", (e) => {
					reject();
				});
			}
		);
	});
}



async function remini (urlPath) {

// Daftar URL yang akan dicoba
const urls = [
  `https://api.botcahx.eu.org/api/tools/remini-v3?url=${urlPath}&resolusi=4&apikey=${global.apikey}`, // URL pertama
  `https://api.botcahx.eu.org/api/tools/remini?url=${urlPath}&apikey=${global.apikey}`, // URL kedua
  `https://api.botcahx.eu.org/api/tools/remini-v2?url=${urlPath}&apikey=${global.apikey}`  //Default
];

// Fungsi untuk mencoba akses URL
  for (const url of urls) {
    try {
      console.log(`Trying to fetch: ${url}`);
      const response = await axios({
		url,
        method: 'GET',
        responseType: 'json',
        timeout: 60000 // Maksimal waktu 60 detik
	  }) // Timeout 60 detik
      return response.data.url; // Kembalikan hasil
    } catch (error) {
      if (error.response && error.response.status === 504) {
        console.error(`Gateway Timeout (504) for URL: ${url}`);
      } else if (error.code === 'ECONNABORTED') {
        console.error(`Request Timeout for URL: ${url}`);
      } else {
        console.error(`Error for URL: ${url} - ${error.message}`);
      }
    }
  }
  throw new Error('All URLs failed.'); // Jika semua URL gagal


	/*try {
		let fetch  = await axios({
			url: `https://api.botcahx.eu.org/api/tools/remini-v4?url=${urlPath}&resolusi=16&apikey=${global.apikey}`,
			method: 'GET',
			responseType: 'json',
			timeout: 60000
		  })
		  return fetch.data.url
	} catch(e) {
		if (e.status === 504) {
			let fetch  = await axios({
				url: `https://api.botcahx.eu.org/api/tools/remini?url=${urlPath}&apikey=${global.apikey}`,
				method: 'GET',
				responseType: 'json',
				timeout: 60000
			  })
			  return fetch.data.url
		}
	}*/
}

async function fhd (url) {
	try{
		let response = await axios({
			url: `https://api.botcahx.eu.org/api/tools/remini-v4?url=${url}&resolusi=16&apikey=${global.apikey}`,
            method: 'GET',
            responseType: 'json'
		})
		return response.data.url
	}catch(e) {
		console.log(e)
		throw new Error("Error: " + e.message)
	}
}

module.exports = { remini, fhd }