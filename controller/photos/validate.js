const joi = require('joi');

class Validate{

    postPhoto = joi.object().keys({
        width: joi.string().min(3).required(),
        height: joi.string().min(3).required(),
        date: joi.string().required()
    })

}

module.exports = new Validate;