const mongoose = require('mongoose')

const FaoliyatSchema = mongoose.Schema({
    title_uz:String,
    title_ru:String,
    title_en:String,
    about_uz:String,
    about_ru:String,
    about_en:String,
    fakultet_id: {type: mongoose.Schema.Types.ObjectId, ref:'Fakultet'  },
    kafedra_id: {type: mongoose.Schema.Types.ObjectId, ref:'Kafedra'  },
    bolim_id: {type: mongoose.Schema.Types.ObjectId, ref:'Bolim'  },
    markaz_id: {type: mongoose.Schema.Types.ObjectId, ref:'Markaz'  },
    rektorat_id: {type: mongoose.Schema.Types.ObjectId, ref:'Rektorat'  },
    date:{
        type:Date,
        default:Date.now()
    }
})
const FaoliyatChildSchema = mongoose.Schema({
    title_uz: String,
    title_ru: String,
    title_en:  String,
    description_uz: String,
    description_ru:String,
    description_en:String,
    location_uz: String,
    location_ru:String,
    location_en:String,
    hashtag:  Array,
    faoliyat_id: {type: mongoose.Schema.Types.ObjectId, ref:'Faoliyat', required:true  },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Faoliyat_data = mongoose.model('Faoliyat', FaoliyatSchema)
const Faoliyat_child = mongoose.model('FaoliyatChild', FaoliyatChildSchema);

module.exports = {Faoliyat_child, Faoliyat_data}