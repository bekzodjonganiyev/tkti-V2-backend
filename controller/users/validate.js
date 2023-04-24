const  joi = require('joi');

class Validate {
    loginValidation = joi.object().keys({
        name: joi.string().min(3).required(),
        password: joi.string().min(3).required(),
        email: joi.string().min(3).required()
    })
}

module.exports = new Validate;