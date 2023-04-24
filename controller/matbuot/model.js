const mongoose = require('mongoose')

const MatbuotSchema = mongoose.Schema({
    name_uz: String,
    name_ru: String,
    name_en: String,
    link: String,
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Matbuot', MatbuotSchema)