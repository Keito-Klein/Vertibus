const axios = require('axios');
const cheerio = require("cheerio");
const qs = require("qs");
const readline = require('readline');

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
    'Host': "v3.clipdown.app",
		'Origin' : 'https://clipdown.app',
		'Referer': 'https://clipdown.app/',
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0"
		
	};
	const data = {
    q: url,
    t: 'media',
    lang: 'id',
    v: 'v2'
  };
	const resp = await axios.post('https://v3.clipdown.app/api/ajaxSearch', qs.stringify(data), { header })
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
      'Cookie' : 'sb=5I2dZn1rnh9tBdjOXXgSQShS; datr=5I2dZkHRAkzxaf2rxTFubtiB; c_user=100015904271015; ps_n=1; ps_l=1; fr=1yUN8hR2G3ARBb6NB.AWU7TDpbe2FU_wjeO8nKkuNUEOg.BnNbw_..AAA.0.0.BnNbw_.AWU77pg2R1E; xs=6%3A0xGff6aMZYvcZg%3A2%3A1721601512%3A-1%3A10797%3A%3AAcXCypKJ84c_IThHlzAJQ2w025szcXvLZRTVk6pwyQ; wd=1280x607; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1731574854686%2C%22v%22%3A1%7D',
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

// exports.fb = async(url) => {
//   const header = {
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     'Origin': 'https://getmyfb.com',
//     'Referer': 'https://getmyfb.com/',
//     'Cookie': ''
//   };

//   const query = {
//     id: url,
//     locale: 'en'
//   };

//   const res = await axios.post('https://getmyfb.com/process', qs.stringify(query), { header })
//     const $ = cheerio.load(res.data)
//     response = $(".results-download").find("ul > li:nth-child(1) > a").attr("href")
//     return response;

// }




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
  let result
  input = {
    eg_csrf_token_label: 'a691cdc5dccdd15689c0ab2148a485db8ecafaa7cdfeb92a99c066c0ed9c09b4',
    type: 'mp3',
    search_txt: url
}
const first = await axios.post('https://en.bigconverter.com/modelss/convertbig.php',
    qs.stringify(input),
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': 'PHPSESSID=vv4qmpgctdfkqnbpc3fqf9g9bh; _ga_5BY0V8W1GQ=GS1.1.1724340321.1.0.1724340321.0.0.0; _ga=GA1.1.2094006697.1724340322; cf_clearance=_VxS_rmN8ME_7uYXZt9gwMt5lffvhr6BRLgrCSraoxw-1724340324-1.2.1.1-c65da5GzMGT8x3JCIiW85NPw2j.xSLcoQTxyplDx4W9zkYZzFgbeiSxvN_nceZy8KNjACdDQP3GfQmyZU1lMITkw9ES_3uug9gloaAc1bQprNWcPj6hUEEGtNBrdQ.FSYQBnXWFj9MbNW4CyMj4aZdCV1kg9fovBb8zBPB4_l6dY_hyQcL9pT6adLR2UAzvz8s8rrfDzXiTpTY3ly2lM_v7gKfEFX0di_TxrKYCcxwzqJQDkkngMzDqwMtu9HKUCeaJQrJS_UMYQrNxCkwWrbaUR9jxGEJd10VifULQt5l.JKiUjBgEWuWQ6nh9bmLniiE93J8UKq0ZJrZIrGSS6zegk5GCsFmLiKXow3AKTVwI; _secretjs=a691cdc5dccdd15689c0ab2148a485db8ecafaa7cdfeb92a99c066c0ed9c09b4',
            'origin': 'https://en.bigconverter.com',
            'referer': 'https://en.bigconverter.com/youtube-to-mp3-215/',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
)
const $ = cheerio.load(first.data);
result = {
  title: $('h5').text().trim(),
  thumb: $('.img-thumbnail').attr('src'),
  duration: $('.yt-duration-top > span').text().trim(),
}
data_hash = $('#video_types > option:nth-child(1)').attr('data-hash');

hash = {
    hash: data_hash,
}
const second = await axios.post('https://en.bigconverter.com/modelss/startTask.php',
    qs.stringify(hash),
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': 'PHPSESSID=vv4qmpgctdfkqnbpc3fqf9g9bh; _ga_5BY0V8W1GQ=GS1.1.1724340321.1.0.1724340321.0.0.0; _ga=GA1.1.2094006697.1724340322; cf_clearance=_VxS_rmN8ME_7uYXZt9gwMt5lffvhr6BRLgrCSraoxw-1724340324-1.2.1.1-c65da5GzMGT8x3JCIiW85NPw2j.xSLcoQTxyplDx4W9zkYZzFgbeiSxvN_nceZy8KNjACdDQP3GfQmyZU1lMITkw9ES_3uug9gloaAc1bQprNWcPj6hUEEGtNBrdQ.FSYQBnXWFj9MbNW4CyMj4aZdCV1kg9fovBb8zBPB4_l6dY_hyQcL9pT6adLR2UAzvz8s8rrfDzXiTpTY3ly2lM_v7gKfEFX0di_TxrKYCcxwzqJQDkkngMzDqwMtu9HKUCeaJQrJS_UMYQrNxCkwWrbaUR9jxGEJd10VifULQt5l.JKiUjBgEWuWQ6nh9bmLniiE93J8UKq0ZJrZIrGSS6zegk5GCsFmLiKXow3AKTVwI; _secretjs=a691cdc5dccdd15689c0ab2148a485db8ecafaa7cdfeb92a99c066c0ed9c09b4',
            'origin': 'https://en.bigconverter.com',
            'referer': 'https://en.bigconverter.com/youtube-to-mp3-215/',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
)


const final = async() => {
    task_id = {
        taskId: second.data
    }
    const res = await axios.post('https://en.bigconverter.com/modelss/taskStatus.php',
        qs.stringify(task_id),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'cookie': 'PHPSESSID=vv4qmpgctdfkqnbpc3fqf9g9bh; _ga_5BY0V8W1GQ=GS1.1.1724340321.1.0.1724340321.0.0.0; _ga=GA1.1.2094006697.1724340322; cf_clearance=_VxS_rmN8ME_7uYXZt9gwMt5lffvhr6BRLgrCSraoxw-1724340324-1.2.1.1-c65da5GzMGT8x3JCIiW85NPw2j.xSLcoQTxyplDx4W9zkYZzFgbeiSxvN_nceZy8KNjACdDQP3GfQmyZU1lMITkw9ES_3uug9gloaAc1bQprNWcPj6hUEEGtNBrdQ.FSYQBnXWFj9MbNW4CyMj4aZdCV1kg9fovBb8zBPB4_l6dY_hyQcL9pT6adLR2UAzvz8s8rrfDzXiTpTY3ly2lM_v7gKfEFX0di_TxrKYCcxwzqJQDkkngMzDqwMtu9HKUCeaJQrJS_UMYQrNxCkwWrbaUR9jxGEJd10VifULQt5l.JKiUjBgEWuWQ6nh9bmLniiE93J8UKq0ZJrZIrGSS6zegk5GCsFmLiKXow3AKTVwI; _secretjs=a691cdc5dccdd15689c0ab2148a485db8ecafaa7cdfeb92a99c066c0ed9c09b4',
                'origin': 'https://en.bigconverter.com',
                'referer': 'https://en.bigconverter.com/youtube-to-mp3-215/',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    )
    if (res.data.status === 'finished') {
        result.url = res.data.download
        return result
    } else if (res.data.status === 'Preparing...' || 'Checking source file...' || 'Downloading audio source file...' || 'Converting file...') {

    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${res.data.convert_progress / 10}% downloaded `);
    readline.moveCursor(process.stdout, 0, 0);
    setTimeout(final, 1000);
    }
}
final()
    
}
