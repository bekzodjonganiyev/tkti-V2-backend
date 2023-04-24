const mongoose = require('mongoose')
const BolimSchema = mongoose.Schema({
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
})

const BolimHodimSchema = mongoose.Schema({
    job_uz:String,
    job_ru:String,
    job_en:String,
    name_uz:String,
    name_ru:String,
    name_en:String,
    tell: String,
    email:String,
    photo: String,
    bolim_id: {type: mongoose.Schema.Types.ObjectId, ref:'Bolim', required:true  },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Bolim_data = mongoose.model('Bolim', BolimSchema);
const Bolim_hodim = mongoose.model('BolimHodim', BolimHodimSchema)

module.exports = { Bolim_data, Bolim_hodim  }