const mongoose = require('mongoose')
const RektoratSchema = mongoose.Schema({
    name_uz: String,
    name_ru: String,
    name_en: String,
    job_uz: String,
    job_en: String,
    job_ru: String,
    address_uz:  String,
    address_ru:  String,
    address_en:  String,
    qisqacha_uz:  String,
    qisqacha_ru:  String,
    qisqacha_en:  String,
    mehnat_faoliyat_uz:  String,
    mehnat_faoliyat_ru:  String,
    mehnat_faoliyat_en:  String,
    ilmiy_yonlaish_uz:  String,
    ilmiy_yonlaish_ru:  String,
    ilmiy_yonlaish_en:  String,
    asosiy_vazifa_uz:  String,
    asosiy_vazifa_ru:  String,
    asosiy_vazifa_en:  String,
    tel: String,
    link: String,
    photo: String,
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Rektorat', RektoratSchema)