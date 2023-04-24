const joi = require('joi');

class Validate{

    postPhoto = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        width: joi.string().min(3).required(),
        height: joi.string().min(3).required(),
        date: joi.string().required()
    })

}

module.exports = new Validate;