const mongoose = require('mongoose')
const MarkazSchema = mongoose.Schema({
    maqsad_uz: String,
    maqsad_en: String,
    maqsad_ru: String,
    haqida_uz: String,
    haqida_ru: String,
    haqida_en: String,
    title_uz:String,
    title_ru:String,
    title_en:String,
    date:{
        type:Date,
        default:Date.now()
    }
});

const MarkazHodimSchema = mongoose.Schema({
    job_uz:String,
    job_ru:String,
    job_en:String,
    name_uz:String,
    name_ru:String,
    name_en:String,
    tell: String,
    email:String,
    photo: String,
    markaz_id: {type: mongoose.Schema.Types.ObjectId, ref:'Markaz', required:true  },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Markaz_hodim = mongoose.model('MarkazHodim', MarkazHodimSchema)
const Markaz_data = mongoose.model('Markaz', MarkazSchema)

module.exports = {Markaz_data, Markaz_hodim}