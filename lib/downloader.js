const axios = require('axios');
const cheerio = require("cheerio");
const qs = require("qs");

const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");
};

async function shortener(url) {
  return url;
}

exports.igDownloader = async(url) => {
	const header = {
		'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
		'origin' : 'https://idownloader.io',
		'referer': 'https://idownloader.io',
		'cookie' : 'Jig_did=8B24954B-CCCE-4353-9C9C-0F220382DA24; datr=8qF1ZU6Z1PWp0_3ZCZY5Nc4r; mid=ZXWiDAALAAEZrbXGUj0WcNxgzMGe; ig_nrcb=1; csrftoken=PnCrc82e2HF9wcqTRpcWjoyRuVZAVmYr; ds_user_id=6480756817; fbm_124024574287414=base_domain=.instagram.com; shbid="18495\0546480756817\0541736419855:01f7cac43defa06ac8aa3368a1ddc47582ba96d97fd8f825e57b78353d8f1de766465523"; shbts="1704883855\0546480756817\0541736419855:01f7d61dea8fb6ebf20765eccda03f34f5fa3c026d7ae33fb3be2fd06b2a84ac84dbed13"; sessionid=6480756817%3A2IylI8fkTOJF39%3A17%3AAYcmuK6Eob1YVABFDQObvEAGfywWD1Uc62N4VIS2Eg; fbsr_124024574287414=JSZZAScrsdS-E6d2ubULUzfqSNP55L6lSI5y2wNzOIQ.eyJ1c2VyX2lkIjoiMTAwMDE1OTA0MjcxMDE1IiwiY29kZSI6IkFRQUZrWkxtbkZ3SjhXd0MtNEdsY2llVXJuVEl1ZzZDcDBzd0hCbFpSM2ZYLW1BaDRqSEZrZ3BHd1RTV3dnVWxTY3Y2OVNBUVN4NTd0U196MHFJUXBJeGluUVNoZG9UTU1wN1JXR0RxV3VhdElSMlp2dGhKWkM4RUI3bmhLZFJpb0JwdTZqdkV5eXZTdWxlV3VvVHpCR3V1VGZ1a1pSVVpZajdmYjNFRUFPWnI0R2NaRmFHaDNDZXZKSEZWVm42OVUtVFlUVWVmVldqS3hyTmtQbXAxOHNROU1WTzRQZ1YyM1B2X3ctaVVFTVhrQldFOHJhenNNZ0FnRHVKbm1PWHdqdVc2aEtod012amwzQW55dkN1SnQ0aExsTEg1MnIycWFZQW5OanNKMm9YZ09OUGZ5Y0hVZnkyT3ZuOVR1dWx4bE9VNWJTM1dXbFBMVkRrZlpYZFl1eC1yIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCTzh6ZEcyTWprT1I0QmJBelJ3STlHWXNDS0tHanI2d01KcXlQVldpMHEwWEhjdld3M1JuTU1qSVZOa1JKYzhaQVNDVHlaQTJ1bnNTNXhZT0o4SnVPbFJ6dlpBZ3dwNXZrYUk1VXRnRkFVeFpCT3NoQU9oSjQ0WkN2WUpaQnhzUXpLUlBmMUtKN1VPc3B3U0J2b29SbUZaQjM3QzZOUHlMZG9PTXZaQ2FIMDRaQVBHc1NhRGJ0aU1HZFhGM1laRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNzA0ODgzODYzfQ; rur="EAG\0546480756817\0541736419869:01f7e0131607b34f02f17ec5d435d0505ff0324e6900518625477fd7f7f2a9ce17ff3af3"'
	};

	const data = `url=${url}&host=instagram`

	const resp = await axios.post('https://idownloader.io/core/ajax.php', data, { header })
	const $ = cheerio.load(resp.data)
	const link = []
	$('a').each((i, elem) => {
		link.push($(elem).attr('href'))
	})

	for (let res of link){
		const result = `https://idownloader.io/${res}`
		return result
	}
}



exports.tiktok = async(query) => {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ query })),
  });

  result = {};

  result.creator = "Mikako";
  result.title = clean(response.data.desc);
  result.author = clean(response.data.author);
  result.nowm = await shortener(
    (response.data.links[0].a || "").replace("https", "http")
  );
  result.watermark = await shortener(
    (response.data.links[1].a || "").replace("https", "http")
  );
  result.audio = await shortener(
    (response.data.links[2].a || "").replace("https", "http")
  );
  result.thumbnail = await shortener(response.data.cover);
  return result;
}

exports.fb = async(url) => {
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://getmyfb.com',
    'Referer': 'https://getmyfb.com/'
  }

  const query = {
    id: url,
    locale: 'en'
  }

  const res = await axios.post('https://getmyfb.com/process', qs.stringify(query), { header })
    const $ = cheerio.load(res.data)
    response = $(".results-download").find("ul > li:nth-child(1) > a").attr("href")
    return response
  
}

exports.pinterest = (querry) => {
  return new Promise(async(resolve,reject) => {
     axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
      headers: {
      "cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
    }
      }).then(({ data }) => {
    const $ = cheerio.load(data)
    const result = [];
    const hasil = [];
       $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
    });
      result.forEach(v => {
     if(v == undefined) return
     hasil.push(v.replace(/236/g,'736'))
      })
      hasil.shift();
    resolve(hasil)
    })
  })
}