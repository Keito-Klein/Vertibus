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


//Instagram Downlaoder
exports.igDownloader = async(url) => {
	const header = {
		'Content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': "v3.igdownloader.app",
		'Origin' : 'https://idownloader.app',
		'Referer': 'https://idownloader.app',
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0"
		
	};
	const data = {
    q: url,
    lang: 'id'
  };
	const resp = await axios.post('https://v3.igdownloader.app/api/ajaxSearch', qs.stringify(data), { header })
	const $ = cheerio.load(resp.data.data)
    result = $('ul').find('li > div > .download-items__btn > a').attr("href")
    return result;
	
}


//TikTok Downloader
exports.tiktok = async (query) => {
  const obj = {
      language_id: "2",
      query: query
  }

  const fetcher = await axios.post('https://ttsave.app/download',
      qs.stringify(obj),
      {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'origin': 'https://ttsave.app',
              'referer': 'https://ttsave.app/id',
              'cookie': 'cf_clearance=ObuMr4U0GjQb3wNyd_cyuo85_SYvFKoTrCtTgai_iJ0-1724153369-1.2.1.1-oaSpxqkdRDWE1LZu5ZLKWUSfIJklatIOckY4W.u4oLOF8v3NTcBd_Bk66rbGZ7OU7xm0tW1X1Jw2P0.zD_EXYvCBRXeQsjN9aCKWgbICpnB7ipIBZuzc.4QqBTsisKendWcdro3uLxn9cbXOrOM8U5wx3vt_JL.OtjHubFpb2UeuI9rcBPJw8FAp9T7.lmHxivyB8y21wiYi5FJKRXfJKPbTpsSLCYs6iyoy7oztaxpD2FSK88l_2aOW45dJD7gnjP_sM3MCGP5RHox0fF5i2Op4zoDTYfVnK9HsZZbIi2Gpc6YvMhCD1gEej3R85bk8ktbM6yMS2f1EV5BX2UAB_w; _ga_1CPHGEZ2VQ=GS1.1.1724153369.1.0.1724153380.0.0.0; _ga=GA1.1.876118086.1724153370; __gads=ID=17278becbaf8d245:T=1724153370:RT=1724153370:S=ALNI_MZKtM4NhRG1Icm2Hwgb6rd1U3XUNQ; __gpi=UID=00000ecdc9ddb6d1:T=1724153370:RT=1724153370:S=ALNI_MYiqHCqnTaxOqj3DGxQjR3Qag-wyQ; __eoi=ID=dad76db29aea4779:T=1724153370:RT=1724153370:S=AA-AfjbFM8MDDi5-GTj49ZnTauqt; FCNEC=%5B%5B%22AKsRol8wGA6kkq4TFfbtBAhvg8SWAhPckUvM75XukxOciffuh1YzFhaF_TtBar8AqUchB32OrzGzv7iTYoKXYkJRexcFwyx-p9eIg5zI8xZ1OMmSvhq1s7L1Us3hirn5g02SbBF4CuYU6zjXtgDa2cBGFQ66XTTwmw%3D%3D%22%5D%5D'
          }
      }
  )
  if (fetcher.status !== 200) {
      throw new Error('Failed to fetch data')
  }
  const $ = cheerio.load(fetcher.data)
  const result = {
      videoUrl: $('[type="no-watermark"]').attr('href'),
      user: $('a.font-extrabold').text().trim(),
      desc: $('p.text-gray-600').text().trim(),
  }
  return result;
}



//Facebook Downloader
exports.fb = async(url) => {
  const header = {
      'Content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie' : '_ga_TCJS95JCVR=GS1.1.1720801112.1.1.1720801123.0.0.0; _ga=GA1.2.369418658.1720801113; _gid=GA1.2.1912706931.1720801113; _gat_UA-3524196-10=1; __gads=ID=afefb7ddec429fcd:T=1720801112:RT=1720801112:S=ALNI_MZMgD85zqsMwJB15BaOhAfnsFnonw; __gpi=UID=00000e8e49763fbf:T=1720801112:RT=1720801112:S=ALNI_Mb1gNT54TWF9a2lWkP6FOCFJjZ4Qw; __eoi=ID=d5acc26ce7ca5c3a:T=1720801112:RT=1720801112:S=AA-Afja6KkmN3155srOgy9-WHyps; FCNEC=%5B%5B%22AKsRol8__qCYP2OmRMX8V7iROVGYRxwEw10qFFgOmT9JVTnoBRuXVSUCmOVssPeNnjnE_KgzgWcFsoBzJYo2uwGIwskclz5voI_PJWL5ZuNBwkBrGzaAxUE2BgYf8Kl56lwj3gf6hhjlnBk3F2sPk6Ff3f5RcRb5_w%3D%3D%22%5D%5D',
      'Origin' : 'https://likeedownloader.com',
      'Referer' : 'https://likeedownloader.com/id/facebook-video-downloader',
      'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0'
  }
  
  const data = {
      id : url
  }
  
  const response = await axios.post('https://likeedownloader.com/process', qs.stringify(data), {header})
  const $ = cheerio.load(response.data.template)
  result = $('.result-links').find('.result-links-item:nth-child(1) > div:nth-child(2) > a').attr('href')
  return result
}



//pinterest Downloader
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

//Youtube Downloader
exports.ytdls = async (url) => {
  let result;
  const obj = {
    link: url,
    mp3_task: 2
  }
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://listentoyoutube.ch',
    'Referer': 'https://listentoyoutube.ch/en1/',
  }
  const response = await axios.post('https://yt-cw.fabdl.com/youtube/get?url=https://youtu.be/4Cp0WgkgDbQ?si=qcT6yEePftc73phh&mp3_task=2', qs.stringify(obj), header);
  size = response.data.result.audios[0].filesize / 1000000
  result = {
    title: response.data.result.title,
    channel: response.data.result.author,
    fileSize: size.toFixed(1) + " MB",
  }

  const fetcher = await axios.get(response.data.result.mp3_task_url, { responseType: 'json' });
  result.url = 'https://api.fabdl.com' + fetcher.data.result.download_url;

  return result;
  
}
