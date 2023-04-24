const joi = require('joi');

class Validate{
    postKafedra = joi.object().keys({
        haqida_uz: joi.string().min(3).required(),
        haqida_ru: joi.string().min(3).required(),
        haqida_en: joi.string().min(3).required(),
        maqsad_uz: joi.string().min(3).required(),
        maqsad_en: joi.string().min(3).required(),
        maqsad_ru: joi.string().min(3).required(),
        title_uz:  joi.string().min(3).required(),
        title_ru:  joi.string().min(3).required(),
        title_en:  joi.string().min(3).required(),
        fakultet_id: joi.string().length(24).required()
    })

    postHodim = joi.object().keys({
        job_uz: joi.string().min(3).required(),
        job_ru: joi.string().min(3).required(),
        job_en: joi.string().min(3).required(),
        name_uz: joi.string().min(3).required(),
        name_ru: joi.string().min(3).required(),
        name_en: joi.string().min(3).required(),
        tell:   joi.string().min(3).required(),
        email:  joi.string().min(3).required(),
        kafedra_id:  joi.string().length(24).required()
    })

    postYonalish = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        kafedra_id:  joi.string().length(24).required()
    })
}

module.exports = new Validate;