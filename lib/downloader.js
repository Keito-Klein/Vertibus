const axios =  require("axios");
const cheerio = require("cheerio");

exports.tiktok = async(url) => {
    fetch = await axios.get(`https://www.tikwm.com/api/?url=${url}`)
    if (fetch.status !== 200) {
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

  exports.pinterest = (querry) => {
    return new Promise(async(resolve,reject) => {
       axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
        headers: {
        "cookie" : `csrftoken=3dab68b3d9c661e3248353e2b21ebfab; _b="AYLvdMG9NuJHlpO01JaZcR3QQbGxPq0JxcQYsebkEBexSrgJwLixU9T7SxiX0Fdz0fA="; ar_debug=1; _routing_id="2d59b285-dd2a-4e3b-81bc-ace4a282c44d"; sessionFunnelEventLogged=1; l_o=RkgwZEoxYjVqWEZ3T3ZNb2gzeTIzZDVuS2hmV1l2UzBMcVpndnpRUkwxY2ZHRERRT05HOXZTRVlCYTdJZGw3OHB5aWpDaHpPMG5zUGRkdjVKdEJqc2tua2dTMUd6eHhoZlpUc0s3OUhYOFk9JkdCcTlMdWUzZ0h6aDVxSDh3cW0wTis4UU9Pcz0=; g_state={"i_l":0}; _auth=1; _pinterest_sess=TWc9PSZrbmJ3U1Y4eUpnOVliT3hGME0vQm9pQkpwak0zd0swSjBWWDQvbmNkSnBBVDdDM0I2dFp0dnltMGVZb0lGendhTldyUVdvQWNRMjR6L0xrK3dyWEg3bkNydzJFaDNMNE9RV3RHZHFtZWVUV05mc2pWOVNQVFhzQk1ONDJnZDJnMURrcnpvcUM1dmo0S1k0MCswQm4vMFhiK0VZRGFxZU5OaE5xa2l6TEdHUEpnQkF5Y3FxVWhDSG9zRDFIWVZoR2pjYnp5cUtoMmhoeUhXRWJMUXNQNVVFT09iVmIvVGRwUjN5RDNQMUVFQnBrMGg0cEQ0RXhCRit2Q3VRQ0V3YWE5dFpZRndZUmV0RjZ0RDk5UzJEQW93SWZkaDFWWkFHdFpPVFQwcDY0b0Y3cFRlRndqNDRaRU5TMkhHeTNJZkRPS0ZrU2xPQ2tRU2JVVjkrZHREcnNGMHNVS2xLYS9tZGJwSlRLTWdSWkZFVGc2Z2NFVUNFRlJEbFdBRkFLK2J3WnRhOFJFTXloekVjNWErcGtXbUJrUEVLWHJTU3ArTmNZdHVCcmNkSThLVkR2cHgzTHZVR2sxbVlCdUhLOXA1M2JKWFpuejk1QThPdEtKcG8vQ2FmK1I0VjdxSHlvcnBaQWJiRlF5alN3ZE5udWwxbE5Ya3ZlNHJiQmNuVHg1c3c4MklwZFZpeXNZSGVvbnNnNU11SzBZMi9iZzJKZkdxWTJhR21TQU9hR2htdWU1T3c1SFlxUHFac2NpUzFzTlQ5Mi8zZG81TDBvLzJ6UzVQZUJadldaSDJ4M29qR2VrZXkrTnd1UmZJcEt4SWp2bzJadUV1RXIvYWhrcWRyZFR1aDJoK3NYRGtQSlNvVVZ4TTlzTWNsQU9QdXVmUitjYmx3MG01WXhHUUE0bzJuUjdhdXlSRE0yWFZNWlFxVmUxSERELzAzV213OW5PL3ZoTlJBOTM2ODJKbmdOV2FwektEZC82azZNNlBjN2J0bzNrRHpHT1E1YnhwMHAyVkdQeE1kbjFORzh6RHdrTXJUdlppTmh3WGRyMWs0UE4wSHhnaWRMdjg0a2J2TWZGTzlDTkcycjhucWxCU2M5NXRJOU1vOGlaUXFiSFBZVnJXRHdSYXNycG0wUFFtQU1LQjJFV3lucFF3S1ZyYUVvb09vRTZMb0NjVG1mb0dkUDYwVy9Hc1J3MXhhQzEvMVVVNWR3Umx2SUVQQzZiejNRd0ZVZkZHSVhla3N3MFgxYWdJWkhkTHlMRHJ6TCttTHlsY1lmdGhqY1QvOWtsdnZobDQrc1pWOFR6Zk5pZFFkOEp2ak45QmxIamZMZTJ4WDc2dG5memRWS3BSYmF0QXhzODc5Mk5PaWZKc3BIc1pMWlJEMFIrVEh1Wk5Rbk0yK2VEakZib0JnaUNSSVBhRU1VZTR6M3l1K3FUd2pnYnZlRUR2eWNFaTdqZzV4UnZRdm5ycHFZdE1VeVp1ZElhNWE2NUJCd0VtQmdkU0ROUzFtdFRyelhJSnFKeXhhUEFnUFp3KzlnVXNzdXMvdGV2blNVWVVIMDZaTUdWYVB1M0ZnTHFobzFEc2IyVmlpZnB0SzFyOXNFRC8rWkljQThVR0xGMURpTHdzUWxydnA3ak1MUlZ4UE9PS2xRVVcyNE9TWGV4ZWFLcTVLWHV3M1E2TVQ0WVV3d3I5cnh2RFoxSVJQWTRmdjYzNzd0dmtER1BWL2pVOGNaUk5LOTREUWo4U0piZ2tGNlBLRUJENldEZGNZNEYrbzFBeDZwOVEzYzZyNWF5RnBXU0piUjMmMm56R3FVWFdmNEhlMXRHYWowajhLak5kSzBNPQ==; __Secure-s_a=K2M1WW9NRllDUi9lMXRkM1ZYT0tjRmlPMndIbk5sQTU1aXZmTk45ZW8ybnFsQ2RxNTN5WTMzSzVxQzgvYTVaOFVvc081WWNWRVgrSG44YVRNelhscTRzV2Y3NmFiYjJGUDEzdWMvelEzTzBsVnVkNy9IVXUvSHBYQXl3WWN0Qng0cHBFYUlxR2N1c3poQnpLM05TTWZKSi9UQkdzdE1ZWmJJTE9MWHVxSmI3b1ROcUc1TEZRNzJDTmp6Y0xJcDFLSGQ0K2dMNi9HWU0zbnJaUzRKYm81VUtZSElTZUhaeHhqUFc3d05zS3FmZ081NEt5NHltakQ3cWZ5bFdaL1I2L3RoMjBYczNMSXc0a3BqSnUyaWdmbzRyQ0lZQU5GazhveXlCRUkraUVnMDhDbWpCNXVVUUcxMHNLOVhyY3RlTEp4QXhxWnRJVm13WGh4WWdTVEh2UFR3Z2lCN1g3ZVJrTExrZ2JYWFJHNXE5UTRiTXMweVRTN0srMlRGb0tjVGd1VllGVUEwOXBPOG5ISzVQdVVyZHl0MFNRZi96a2pycitLeWhyUHk4TUpTUkd6SElvTGxTcFNDT3psVWo3Tmx2V2dYNU4yMjl5R3MvTzZKWFg1NnB5aUxZREdWVEhSei9XT05UUFJTeWpzMTNKWi9GcGNjSkNqQzJMOHRqOFlVOWdoUHdmaWRtK2pRRnpVYWQvdVRINEwrcFVDREhkVUJOOG1Id3VVNVVBNXJTYXJyQ1hUVnMyYlRNNXg0bVd4SUwzczNTaXJvTlhBSVJXRGdlakRkbnlTaHU4MzBGQ1B5ZXlwSzQ4Y1RxWmZOWHBjNDdFQ0kyWXg3NnRMVW9tUmU0UnljYm1kS21aNElIZTVQQzlpMWV6Vy9xaS9LVGp1TzltZTFjZVZMTm9CTkxNNVBIV09CeWF2Sk1KUjRtNUtMeFpyemRZTTFDcThEVG45SThKZ1l0em5zMGxzM3o3ZnJZdGlhT1Y3bFFTVUJ4VmY0VGk2Mk1tamxFd0NPYUhmVUZwY1hleXBKR1JITHFvQnU5V3lYbUVrR09CVnF5ZkFKaG5XWU8xRnIyaVhJWEczaW8rMkIzaVlnYm9zV1NSVnNwNWNoa2tBYWRPQkZUNFlGUmRsU2E3SHIyZHFVWVNVMmVWQnVjRm9hWVRFeVgxcjdCTCtDRGUrMjFicHg1Nk91S1FiL0ozNEFBUEViTjNnOURGdHYxWFlVbmY2bnlPNktuSHFRNDNJUEhmVEliRGtCejN3ZTZqVWk5VTc3UFdOSCt1WEdKbFF0NkNnWFhQVFhjallPNlJzYnc1M2F3eEU1ZEVhT3dIcU0wTXdSbz0mRktTYlU0OUhKQzd5Q1NWeFVrVEVsSnJOT3d3PQ==`
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

  exports.wallpaper = (query, page = "1") => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${query}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com/'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image: [$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')]
                })
            })
            resolve(hasil)
        })
    })
}