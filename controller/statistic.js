const validate = require("../config/validate");
const Stat_data = require('../models/statistic');

class StatController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postStatisticSchemaValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Stat = new Stat_data(value);
            await Stat.save();

            res.status(200).json({status:200,success:true, message:`Statistika qo'shildi`, data: Stat})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postStatisticSchemaValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }
    
            const updated = await Stat_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'Statistika topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`Statistika yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(req, res) {
        try{
            const {page, count} = req.query;
            const Stat = await Stat_data.find().sort({_id: -1});
            const resData = Stat.splice(page >1 ? Number(page) * (Number(count) ? count:10) - (Number(count) ? count : 10) : 0, (Number(count) ? count :10))
            // const Stat = await (await Stat_data.find().sort({_id: -1})).splice(page && page >1 ? Number(page) * (Number(count) ? count :10) - (Number(count) ? count :10) : 0, (Number(count) ? count :10))
            res.status(200).json({status:200,success:true, perPage: Number(page) || 1, total: Stat.length, message:`Yaxshi uka`, data: resData})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Stat = await  Stat_data.findOne({_id: req.params.id})
             if(Stat.length <1){
                    res.status(404).json({status:404, message:'Statistika id xato', success:false});
                    return
                }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Stat})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const Stat = await Stat_data.findByIdAndDelete(req.params.id);
            if(!Stat){
                res.status(404).json({status:404, message:'Statistika topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Stat})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new StatController;