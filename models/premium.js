const mongoose = require("mongoose");
const Restrict = mongoose.model('Premium', {
    id: String,
    expired: Number
})

module.exports = Restrict;