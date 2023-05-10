const mongoose = require('mongoose')

const MissionSchema = mongoose.Schema({
    title_uz: String,
    title_ru: String,
    title_en: String,
    title_ar: String,
    body_uz: String,
    body_ru: String,
    body_en: String,
    body_ar: String,
    link: Array,
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Mission', MissionSchema)