
const mongoose = require("mongoose");
const Usage = mongoose.model('Usage', {
    usage_private: Number,
    usage_group: Number
})

module.exports = Usage;