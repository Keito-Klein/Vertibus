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

exports.tiktok2 = async(url) => {
  fetch = await axios.get(`https://www.tikwm.com/api/?url=${url}`)
  if (fetch.status!== 200) {
      throw new Error('Failed to fetch data')
  }
  result = {
    name: fetch.data.data.author.nickname,
    username: fetch.data.data.author.unique_id,
    description: fetch.data.data.title,
    videoUrl: fetch.data.data.play,
    duration: fetch.data.data.duration,
    play_count: fetch.data.data.play_count,
    like: fetch.data.data.digg_count,
    comment: fetch.data.data.comment_count,
    share: fetch.data.data.share_count
  }
  return result;
}



//Facebook Downloader

exports.fb = async(url) => {
    const header = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://getmyfb.com',
        'Referer': 'https://getmyfb.com/',
        'Cookie': ''
      };

      const query = {
    id: url,
    locale: 'en'
  };

  const res = await axios.post('https://getmyfb.com/process', qs.stringify(query), { header })
    const $ = cheerio.load(res.data)
    response = $(".results-download").find("ul > li:nth-child(1) > a").attr("href")
    return response;

}

exports.fb2 = async(url) => {
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



//pinterest Downloader
/*exports.pinterest = (querry) => {
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
}*/

exports.pinterest = (querry) => {
  return new Promise(async(resolve,reject) => {
     axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
      headers: {
      "cookie" : 'csrftoken=3dab68b3d9c661e3248353e2b21ebfab; _b="AYLvdMG9NuJHlpO01JaZcR3QQbGxPq0JxcQYsebkEBexSrgJwLixU9T7SxiX0Fdz0fA="; ar_debug=1; _routing_id="2d59b285-dd2a-4e3b-81bc-ace4a282c44d"; sessionFunnelEventLogged=1; l_o=RkgwZEoxYjVqWEZ3T3ZNb2gzeTIzZDVuS2hmV1l2UzBMcVpndnpRUkwxY2ZHRERRT05HOXZTRVlCYTdJZGw3OHB5aWpDaHpPMG5zUGRkdjVKdEJqc2tua2dTMUd6eHhoZlpUc0s3OUhYOFk9JkdCcTlMdWUzZ0h6aDVxSDh3cW0wTis4UU9Pcz0=; g_state={"i_l":0}; _auth=1; _pinterest_sess=TWc9PSZrbmJ3U1Y4eUpnOVliT3hGME0vQm9pQkpwak0zd0swSjBWWDQvbmNkSnBBVDdDM0I2dFp0dnltMGVZb0lGendhTldyUVdvQWNRMjR6L0xrK3dyWEg3bkNydzJFaDNMNE9RV3RHZHFtZWVUV05mc2pWOVNQVFhzQk1ONDJnZDJnMURrcnpvcUM1dmo0S1k0MCswQm4vMFhiK0VZRGFxZU5OaE5xa2l6TEdHUEpnQkF5Y3FxVWhDSG9zRDFIWVZoR2pjYnp5cUtoMmhoeUhXRWJMUXNQNVVFT09iVmIvVGRwUjN5RDNQMUVFQnBrMGg0cEQ0RXhCRit2Q3VRQ0V3YWE5dFpZRndZUmV0RjZ0RDk5UzJEQW93SWZkaDFWWkFHdFpPVFQwcDY0b0Y3cFRlRndqNDRaRU5TMkhHeTNJZkRPS0ZrU2xPQ2tRU2JVVjkrZHREcnNGMHNVS2xLYS9tZGJwSlRLTWdSWkZFVGc2Z2NFVUNFRlJEbFdBRkFLK2J3WnRhOFJFTXloekVjNWErcGtXbUJrUEVLWHJTU3ArTmNZdHVCcmNkSThLVkR2cHgzTHZVR2sxbVlCdUhLOXA1M2JKWFpuejk1QThPdEtKcG8vQ2FmK1I0VjdxSHlvcnBaQWJiRlF5alN3ZE5udWwxbE5Ya3ZlNHJiQmNuVHg1c3c4MklwZFZpeXNZSGVvbnNnNU11SzBZMi9iZzJKZkdxWTJhR21TQU9hR2htdWU1T3c1SFlxUHFac2NpUzFzTlQ5Mi8zZG81TDBvLzJ6UzVQZUJadldaSDJ4M29qR2VrZXkrTnd1UmZJcEt4SWp2bzJadUV1RXIvYWhrcWRyZFR1aDJoK3NYRGtQSlNvVVZ4TTlzTWNsQU9QdXVmUitjYmx3MG01WXhHUUE0bzJuUjdhdXlSRE0yWFZNWlFxVmUxSERELzAzV213OW5PL3ZoTlJBOTM2ODJKbmdOV2FwektEZC82azZNNlBjN2J0bzNrRHpHT1E1YnhwMHAyVkdQeE1kbjFORzh6RHdrTXJUdlppTmh3WGRyMWs0UE4wSHhnaWRMdjg0a2J2TWZGTzlDTkcycjhucWxCU2M5NXRJOU1vOGlaUXFiSFBZVnJXRHdSYXNycG0wUFFtQU1LQjJFV3lucFF3S1ZyYUVvb09vRTZMb0NjVG1mb0dkUDYwVy9Hc1J3MXhhQzEvMVVVNWR3Umx2SUVQQzZiejNRd0ZVZkZHSVhla3N3MFgxYWdJWkhkTHlMRHJ6TCttTHlsY1lmdGhqY1QvOWtsdnZobDQrc1pWOFR6Zk5pZFFkOEp2ak45QmxIamZMZTJ4WDc2dG5memRWS3BSYmF0QXhzODc5Mk5PaWZKc3BIc1pMWlJEMFIrVEh1Wk5Rbk0yK2VEakZib0JnaUNSSVBhRU1VZTR6M3l1K3FUd2pnYnZlRUR2eWNFaTdqZzV4UnZRdm5ycHFZdE1VeVp1ZElhNWE2NUJCd0VtQmdkU0ROUzFtdFRyelhJSnFKeXhhUEFnUFp3KzlnVXNzdXMvdGV2blNVWVVIMDZaTUdWYVB1M0ZnTHFobzFEc2IyVmlpZnB0SzFyOXNFRC8rWkljQThVR0xGMURpTHdzUWxydnA3ak1MUlZ4UE9PS2xRVVcyNE9TWGV4ZWFLcTVLWHV3M1E2TVQ0WVV3d3I5cnh2RFoxSVJQWTRmdjYzNzd0dmtER1BWL2pVOGNaUk5LOTREUWo4U0piZ2tGNlBLRUJENldEZGNZNEYrbzFBeDZwOVEzYzZyNWF5RnBXU0piUjMmMm56R3FVWFdmNEhlMXRHYWowajhLak5kSzBNPQ==; __Secure-s_a=K2M1WW9NRllDUi9lMXRkM1ZYT0tjRmlPMndIbk5sQTU1aXZmTk45ZW8ybnFsQ2RxNTN5WTMzSzVxQzgvYTVaOFVvc081WWNWRVgrSG44YVRNelhscTRzV2Y3NmFiYjJGUDEzdWMvelEzTzBsVnVkNy9IVXUvSHBYQXl3WWN0Qng0cHBFYUlxR2N1c3poQnpLM05TTWZKSi9UQkdzdE1ZWmJJTE9MWHVxSmI3b1ROcUc1TEZRNzJDTmp6Y0xJcDFLSGQ0K2dMNi9HWU0zbnJaUzRKYm81VUtZSElTZUhaeHhqUFc3d05zS3FmZ081NEt5NHltakQ3cWZ5bFdaL1I2L3RoMjBYczNMSXc0a3BqSnUyaWdmbzRyQ0lZQU5GazhveXlCRUkraUVnMDhDbWpCNXVVUUcxMHNLOVhyY3RlTEp4QXhxWnRJVm13WGh4WWdTVEh2UFR3Z2lCN1g3ZVJrTExrZ2JYWFJHNXE5UTRiTXMweVRTN0srMlRGb0tjVGd1VllGVUEwOXBPOG5ISzVQdVVyZHl0MFNRZi96a2pycitLeWhyUHk4TUpTUkd6SElvTGxTcFNDT3psVWo3Tmx2V2dYNU4yMjl5R3MvTzZKWFg1NnB5aUxZREdWVEhSei9XT05UUFJTeWpzMTNKWi9GcGNjSkNqQzJMOHRqOFlVOWdoUHdmaWRtK2pRRnpVYWQvdVRINEwrcFVDREhkVUJOOG1Id3VVNVVBNXJTYXJyQ1hUVnMyYlRNNXg0bVd4SUwzczNTaXJvTlhBSVJXRGdlakRkbnlTaHU4MzBGQ1B5ZXlwSzQ4Y1RxWmZOWHBjNDdFQ0kyWXg3NnRMVW9tUmU0UnljYm1kS21aNElIZTVQQzlpMWV6Vy9xaS9LVGp1TzltZTFjZVZMTm9CTkxNNVBIV09CeWF2Sk1KUjRtNUtMeFpyemRZTTFDcThEVG45SThKZ1l0em5zMGxzM3o3ZnJZdGlhT1Y3bFFTVUJ4VmY0VGk2Mk1tamxFd0NPYUhmVUZwY1hleXBKR1JITHFvQnU5V3lYbUVrR09CVnF5ZkFKaG5XWU8xRnIyaVhJWEczaW8rMkIzaVlnYm9zV1NSVnNwNWNoa2tBYWRPQkZUNFlGUmRsU2E3SHIyZHFVWVNVMmVWQnVjRm9hWVRFeVgxcjdCTCtDRGUrMjFicHg1Nk91S1FiL0ozNEFBUEViTjNnOURGdHYxWFlVbmY2bnlPNktuSHFRNDNJUEhmVEliRGtCejN3ZTZqVWk5VTc3UFdOSCt1WEdKbFF0NkNnWFhQVFhjallPNlJzYnc1M2F3eEU1ZEVhT3dIcU0wTXdSbz0mRktTYlU0OUhKQzd5Q1NWeFVrVEVsSnJOT3d3PQ=='
    }
      }).then(({ data }) => {
        data = data.replace(/\"/g, '"').replace(/&amp;/g, "&")
        let result = []
        let regex = /"orig"\s*:\s*\{[^}]*"url"\s*:\s*"([^"]+)"/gm;
        let match;
        while ((match = regex.exec(data))!== null) {
          result.push(match[1])
        }
        resolve(result)
        if (result.length < 1) {
          reject("No image found!")
        }
    }).catch((err) => {
      console.log(err)
      reject("Unable to fetch query image!")
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
