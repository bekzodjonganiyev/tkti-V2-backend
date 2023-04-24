const joi = require("joi");

class Validate {
  post = joi.object().keys({
    body_uz: joi.string().required(),
    body_ru: joi.string().required(),
    body_en: joi.string().required(),
    title_uz: joi.string().required(),
    title_ru: joi.string().required(),
    title_en: joi.string().required(),
  });
}

module.exports = new Validate
