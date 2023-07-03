const joi = require("joi");

class Validate {
  postIlmiyTadData = joi.object().keys({
    body_uz: joi.string().min(5).required(),
    body_ru: joi.string().min(5).required(),
    body_en: joi.string().min(5).required(),
    title_uz: joi.string().min(5).required(),
    title_ru: joi.string().min(5).required(),
    title_en: joi.string().min(5).required(),
    nameId:  joi.string().length(24).required(),
    faq:  joi.string()
  });

  postIlmiyTadName = joi.object().keys({
    title_uz: joi.string().min(5).required(),
    title_ru: joi.string().min(5).required(),
    title_en: joi.string().min(5).required(),
  });
}

module.exports = new Validate();
