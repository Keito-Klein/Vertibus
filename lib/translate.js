const translate = require('@vitalets/google-translate-api')

const doing = (text, lang = "id") => new Promise((resolve, reject) => {
    console.log(`Translating to ${lang}...`)
    translate(text, {client: 'gtx', to: lang })
    .then((res) => resolve(res.text))
    .catch((err) => reject(err))
})

exports.doing = doing