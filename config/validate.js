const  joi = require('joi');

class Validate {   
    postSertifikatValidation = joi.object().keys({
        name_uz: joi.string().min(2).required(),
        name_ru: joi.string().min(2).required(),
        name_en: joi.string().min(2).required(),
        kod:     joi.string().min(2).required(),
        link:    joi.string().min(5).required()
    })

    postMediaValidation = joi.object().keys({
        name: joi.string().min(2).required()
    })

    postQabulValidation = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        body_uz:  joi.string().min(3).required(),
        body_ru:  joi.string().min(3).required(),
        body_en:  joi.string().min(3).required(),
        nested_title_uz:  joi.string().min(3).required(),
        nested_title_ru:  joi.string().min(3).required(),
        nested_title_en:  joi.string().min(3).required(),
        accordion_uz: Array,
        accordion_ru: Array,
        accordion_en: Array,
    })

    

    postStudentBolimValidation = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        body_uz:  joi.string().min(3).required(),
        body_ru:  joi.string().min(3).required(),
        body_en:  joi.string().min(3).required(),
        icon:     joi.string().min(3).required(),
    });

    postStatisticSchemaValidation = joi.object().keys({
        content_uz: joi.string().required(),
        content_ru: joi.string().required(),
        content_en: joi.string().required(),
        title_uz: joi.string().required(),
        title_ru: joi.string().required(),
        title_en: joi.string().required(),
    });

    postStudentValidation = joi.object().keys({
        name_uz: joi.string().min(2).required(),
        name_ru: joi.string().min(2).required(),
        name_en: joi.string().min(2).required(),
        kafedra_name_uz: joi.string().min(2).required(),
        kafedra_name_ru: joi.string().min(2).required(),
        kafedra_name_en: joi.string().min(2).required(),
        ish_joyi_uz: joi.string().min(2).required(),
        ish_joyi_ru: joi.string().min(2).required(),
        ish_joyi_en: joi.string().min(2).required(),
        job_uz: joi.string().min(2).required(),
        job_ru: joi.string().min(2).required(),
        job_en: joi.string().min(2).required(),
        finished_year: joi.string().min(2).required(),
        tel: joi.string().min(2).required(),
        email: joi.string().min(2),
        photo: joi.string().min(2).required(),
    })
}

module.exports = new Validate;