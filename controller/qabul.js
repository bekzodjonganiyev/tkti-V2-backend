const validate = require("../config/validate");
const Qabul_data = require('../models/qabul');

class QabulController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postQabulValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Qabul = new Qabul_data(value);
            await Qabul.save();

            res.status(200).json({status:200,success:true, message:`Qabul qo'shildi`, data: Qabul})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postQabulValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }
    
            const updated = await Qabul_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'Qabul topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`Qabul yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Qabul = await Qabul_data.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Qabul})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Qabul = await  Qabul_data.findOne({_id: req.params.id})
             if(Qabul.length <1){
                    res.status(404).json({status:404, message:'Qabul id xato', success:false});
                    return
                }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Qabul})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const Qabul = await Qabul_data.findByIdAndDelete(req.params.id);
            if(!Qabul){
                res.status(404).json({status:404, message:'Qabul topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Qabul})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new QabulController;