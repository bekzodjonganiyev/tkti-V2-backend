const joi = require('joi');

class Validate{
    post = joi.object().keys({
        name_uz: joi.string().min(2).required(),
        name_ru: joi.string().min(2).required(),
        name_en: joi.string().min(2).required(),
        link:    joi.string().min(5).required()
    })
}

module.exports = new Validate;