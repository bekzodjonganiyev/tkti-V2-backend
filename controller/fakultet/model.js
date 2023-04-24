const mongoose = require('mongoose')
const FakultetSchema = mongoose.Schema({
    haqida_uz: String,
    haqida_ru: String,
    haqida_en: String,
    maqsad_uz: String,
    maqsad_en: String,
    maqsad_ru: String,
    title_uz:  String,
    title_ru:  String,
    title_en:  String,
    date:{
        type:Date,
        default:Date.now()
    }
});
const FakultetHodimSchema = mongoose.Schema({
    job_uz: String,
    job_ru: String,
    job_en:  String,
    name_uz: String,
    name_ru:String,
    name_en:String,
    tell:   String,
    email:  String,
    photo:  String,
    fakultet_id: {type: mongoose.Schema.Types.ObjectId, ref:'Fakultet', required:true  },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Fakultet_hodim = mongoose.model('FakultetHodimSchema', FakultetHodimSchema)
const Fakultet_data = mongoose.model('Fakultet', FakultetSchema)

module.exports = {Fakultet_data, Fakultet_hodim}