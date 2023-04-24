const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
})

module.exports = mongoose.model("user", userSchema)