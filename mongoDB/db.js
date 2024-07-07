const { color } = require('../lib/color') ;
const mongoose = require('mongoose');
mongoose.connect('Enter Your Connection String!!')
    .catch(err => console.log(color('Be sure your connection string is corrrect!!\nCheck it on ./mongoDb/db.js Line : 3', "red"), `\nError Message: ${err}`))
mongoose.connection.on('connected', () => console.log(color('Database mongoDB Connected!','green')))