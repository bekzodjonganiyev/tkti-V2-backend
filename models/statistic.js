const mongoose = require('mongoose')

const StatisticSchema = mongoose.Schema({
    content_uz: String,
    content_ru: String,
    content_en: String,
    title_uz: String,
    title_ru: String,
    title_en: String,
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('statistic', StatisticSchema)