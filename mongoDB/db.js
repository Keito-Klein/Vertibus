require('../setting');
const { color } = require('../lib/color') ;
const mongoose = require('mongoose');
mongoose.connect(global.mongoString)
    .catch(err => console.log(color('Be sure your connection string is corrrect!!\nCheck it on setting.js Line : 13', "red"), `\nError Message: ${err}`))
mongoose.connection.on('connected', () => console.log(color('Database mongoDB Connected!','green')))