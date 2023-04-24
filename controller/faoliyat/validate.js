const joi = require('joi');

class Validate{
    post = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        about_uz: joi.string().min(3).required(),
        about_ru: joi.string().min(3).required(),
        about_en: joi.string().min(3).required(),
        kafedra_id: joi.string().length(24),
        fakultet_id: joi.string().length(24),
        bolim_id: joi.string().length(24),
        markaz_id: joi.string().length(24),
        rektorat_id: joi.string().length(24),
    });
    postFaoliyat = joi.object().keys({
        title_uz:  joi.string().min(3).required(),
        title_ru:  joi.string().min(3).required(),
        title_en:  joi.string().min(3).required(),
        description_uz:  joi.string().min(3).required(),
        description_ru: joi.string().min(3).required(),
        description_en: joi.string().min(3).required(),
        location_uz:  joi.string().min(3).required(),
        location_ru: joi.string().min(3).required(),
        location_en: joi.string().min(3).required(),
        hashtag:  joi.array(),
        faoliyat_id: joi.string().length(24)
    })
}

module.exports = new Validate;