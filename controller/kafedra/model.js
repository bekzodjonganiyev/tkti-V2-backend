const mongoose = require('mongoose')
const KafedraSchema = mongoose.Schema({
    haqida_uz: String,
    haqida_ru: String,
    haqida_en: String,
    maqsad_uz: String,
    maqsad_en: String,
    maqsad_ru: String,
    title_uz:  String,
    title_ru:  String,
    title_en:  String,
    fakultet_id: {type: mongoose.Schema.Types.ObjectId, ref:'Fakultet', required:true  },
    date:{
        type:Date,
        default:Date.now()
    }
});

const KafedraHodimSchema = mongoose.Schema({
    job_uz:String,
    job_ru:String,
    job_en:String,
    name_uz:String,
    name_ru:String,
    name_en:String,
    tell: String,
    email:String,
    photo: String,
    kafedra_id: {type: mongoose.Schema.Types.ObjectId, ref:'Kafedra', required:true  },
    date:{
        type:Date,
        default:Date.now()
    }
});

const KafedraYonalishSchema = mongoose.Schema({
    title_uz: String,
    title_ru: String,
    title_en: String,
    kafedra_id: {type: mongoose.Schema.Types.ObjectId, ref:'Kafedra', required:true  }
})

const Kafedra_yonalish = mongoose.model("KafedraYonalish", KafedraYonalishSchema)
const Kafedra_hodim = mongoose.model('KafedraHodim', KafedraHodimSchema)
const Kafedra_data = mongoose.model('Kafedra', KafedraSchema);

module.exports = {Kafedra_data, Kafedra_hodim, Kafedra_yonalish}