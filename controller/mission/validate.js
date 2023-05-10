const joi = require('joi');

class Validate{

postApplicaton = joi.object().keys({
    body_uz: joi.required(),
    body_en: joi.required(),
    body_ru: joi.required(),
    body_ar: joi.required(),
    title_uz:  joi.string().min(3).required(),
    title_ru:  joi.string().min(3).required(),
    title_en:  joi.string().min(3).required(),
    title_ar:  joi.string().min(3).required()
})

}

module.exports = new Validate;