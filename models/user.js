const mongoose = require("mongoose");
const User = mongoose.model('User', {
    id: String,
    date: Number,
    latest: Boolean
})

module.exports = User;