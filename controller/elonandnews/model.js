const mongoose = require('mongoose')

const ElonSchema = mongoose.Schema({
    title_uz:String,
    title_ru:String,
    title_en:String,
    body_uz: String,
    body_ru: String,
    body_en: String,
    photo: String,
    date: String
})

const NewsSchema = mongoose.Schema({
    title_uz: String,
    title_ru: String,
    title_en: String,
    body_uz: String,
    body_ru: String,
    body_en: String,
    photo: String,
    date:String
})

const News_data = mongoose.model('News', NewsSchema)
const Elon_data = mongoose.model('Elon', ElonSchema)

module.exports = {News_data, Elon_data}