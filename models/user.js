const mongoose = require("mongoose");
const User = mongoose.model('User', {
    id: String,
    latest: Boolean
})

module.exports = User;