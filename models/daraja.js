const mongoose = require('mongoose')

const DarajaSchema = mongoose.Schema({
    title: String, 
    photo: {
        type: Array,
        data: Buffer
    },
    yili: Number,
    Fakultet: String,
    Kafedra: String,
    talim_turi: String,
    talim_yonalishi: String,
    talim_darajasi: String,
});



module.exports = mongoose.model('Daraja', DarajaSchema)