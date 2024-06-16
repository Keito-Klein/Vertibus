const { logColor } = require('./lib/color') ;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://MiKako:taufik572577@client.dhx1h9p.mongodb.net/vertibus?retryWrites=true&w=majority&appName=Client')
mongoose.connect.on('connected', () => console.log(logColor('Database mongoDB Connected!','green'))