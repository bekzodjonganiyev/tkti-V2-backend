// faxriy bitiruvchilar
// // ism + bitirish yili + qaysi kafedra bitirgani+ ish joyi + hozirgi lavozmi + rasmi+ tel + email

const mongoose = require('mongoose')

const QabulSchema = mongoose.Schema({
    title_uz: String,
    title_ru: String,
    title_en: String,
    nested_title_uz: String,
    nested_title_ru: String,
    nested_title_en: String,
    body_uz: String,
    body_ru: String,
    body_en: String,
    accordion_uz: Array,
    accordion_ru: Array,
    accordion_en: Array,
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('qabul', QabulSchema)