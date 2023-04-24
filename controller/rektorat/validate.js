const joi = require('joi');

class Validate{
    post = joi.object().keys({
        name_uz: joi.string().min(3).required(),
        name_ru: joi.string().min(3).required(),
        name_en: joi.string().min(3).required(),
        job_uz: joi.string().min(3).required(),
        job_en: joi.string().min(3).required(),
        job_ru: joi.string().min(3).required(),
        address_uz:  joi.string().min(3).required(),
        address_ru:  joi.string().min(3).required(),
        address_en:  joi.string().min(3).required(),
        qisqacha_uz:  joi.string().min(3).required(),
        qisqacha_ru:  joi.string().min(3).required(),
        qisqacha_en:  joi.string().min(3).required(),
        mehnat_faoliyat_uz:  joi.string().min(3).required(),
        mehnat_faoliyat_ru:  joi.string().min(3).required(),
        mehnat_faoliyat_en:  joi.string().min(3).required(),
        ilmiy_yonlaish_uz:  joi.string().min(3).required(),
        ilmiy_yonlaish_ru:  joi.string().min(3).required(),
        ilmiy_yonlaish_en:  joi.string().min(3).required(),
        asosiy_vazifa_uz:  joi.string().min(3).required(),
        asosiy_vazifa_ru:  joi.string().min(3).required(),
        asosiy_vazifa_en:  joi.string().min(3).required(),
        tel: joi.string().min(3).required(),
        link: joi.string().min(3).required(),
        });
}

module.exports = new Validate;