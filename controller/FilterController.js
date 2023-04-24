const Filter = require('../models/fileter');


exports.getQuery = async (req, res) =>{
    try {
        let condition = {};
        const {
            BM_hodim ,
            BM_data ,
            facultet_data ,
            facultet_hodim ,
            Faoliyat_data ,
            Faoliyat_hodim ,
            kafedra_data ,
            kafedra_hodim ,
            elon ,
            yangilik ,
            Matbuot ,
            Sertifikat ,
            Sub_Catagory
        } = req.query  
        if ( name_uz, name_ru, name_en ) condition = { ...condition, BM_hodim }

        if ( title_uz, title_ru, title_en) condition = { ...condition, BM_data }

        if (title_uz, title_ru, title_en) condition = { ...condition, facultet_data }

        if (name_uz, name_ru, name_en) condition = { ...condition, facultet_hodim }

        if (title_uz, title_ru, title_en) condition = { ...condition, Faoliyat_data }

        if ( name_uz, name_ru, name_en ) condition = { ...condition, Faoliyat_hodim }

        if (title_uz, title_ru, title_en) condition = { ...condition, kafedra_data }

        if (name_uz, name_ru, name_en) condition = { ...condition, kafedra_hodim }

        if (title_uz, title_ru, title_en) condition = { ...condition, elon }

        if (title_uz, title_ru, title_en) condition = { ...condition, yangilik }
        if (title_uz, title_ru, title_en) condition = { ...condition, Matbuot }
        if (title_uz, title_ru, title_en) condition = { ...condition, Sertifikat }
        if (title_uz, title_ru, title_en) condition = { ...condition, Sub_Catagory }
        
        const data = await Filter.find(condition)
        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}