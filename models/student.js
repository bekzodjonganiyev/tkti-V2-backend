const { default: mongoose } = require("mongoose")

const StudentSchema = mongoose.Schema({
    name_uz: String,
    name_ru: String,
    name_en: String,
    kafedra_name_uz: String,
    kafedra_name_ru: String,
    kafedra_name_en: String,
    ish_joyi_uz: String,
    ish_joyi_ru: String,
    ish_joyi_en: String,
    job_uz: String,
    job_ru: String,
    job_en: String,
    finished_year: String,
    tel: String,
    email: String,
    photo: String,
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('student', StudentSchema)