const joi = require('joi');

class Validate{
    post = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        body_uz: joi.required(),
        body_ru: joi.required(),
        body_en: joi.required(),
        date: joi.string().required()
    })
}

module.exports = new Validate;