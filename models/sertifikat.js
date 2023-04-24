const mongoose = require('mongoose')

const SertifikatSchema = mongoose.Schema({
    name_uz: String,
    name_ru: String,
    name_en: String,
    kod: String,
    link: String,
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('SertifikatSchema', SertifikatSchema)

