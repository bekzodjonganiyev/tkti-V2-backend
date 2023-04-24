const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    BM_hodim:{
        type: mongoose.Schema.ObjectId,
        ref: "BolimHodim"
    },
    BM_data:{
        type: mongoose.Schema.ObjectId,
        ref: "Bolim"
    },
    facultet_data:{
        type: mongoose.Schema.ObjectId,
        ref: "Fakultet"
    },
    facultet_hodim :{
        type: mongoose.Schema.ObjectId,
        ref: "FakultetHodimSchema"
    },
    Faoliyat_data :{
        type: mongoose.Schema.ObjectId,
        ref: "Faoliyat"
    },
    Faoliyat_hodim :{
        type: mongoose.Schema.ObjectId,
        ref: "FaoliyatHodimSchema"
    },
    kafedra_data :{
        type: mongoose.Schema.ObjectId,
        ref: "Kafedra"
    },
    kafedra_hodim :{
        type: mongoose.Schema.ObjectId,
        ref: "KafedraHodim"
    },
    elon :{
        type: mongoose.Schema.ObjectId,
        ref: "Elon"
    },
    yangilik :{
        type: mongoose.Schema.ObjectId,
        ref: "News"
    },
    Matbuot :{
        type: mongoose.Schema.ObjectId,
        ref: "Matbuot"
    },
    Sertifikat :{
        type: mongoose.Schema.ObjectId,
        ref: "SertifikatSchema"
    },
    Sub_Catagory :{
        type: mongoose.Schema.ObjectId,
        ref: "Sub_Catagory"
    },
});

module.exports = mongoose.model('filter', Schema);