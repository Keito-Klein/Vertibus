const mongoose = require("mongoose");
const Restrict = mongoose.model('restrict', {
    group: String,
    antilink: Boolean,
    antilinkgc: Boolean,
    open: Boolean
})

module.exports = Restrict;