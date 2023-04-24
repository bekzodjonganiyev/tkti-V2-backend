const joi = require('joi');

class Validate{
    post = joi.object().keys({
        haqida_uz: joi.required(),
        haqida_ru: joi.required(),
        haqida_en: joi.required(),
        maqsad_uz: joi.required(),
        maqsad_en: joi.required(),
        maqsad_ru: joi.required(),
        title_uz:  joi.string().min(3).required(),
        title_ru:  joi.string().min(3).required(),
        title_en:  joi.string().min(3).required()
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
        markaz_id:  joi.string().length(24).required()
    })
}

module.exports = new Validate;