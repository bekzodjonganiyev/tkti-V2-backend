const validate = require("../config/validate");
const Sertifikat_data = require('../models/sertifikat')

class SertifikatController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postSertifikatValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Sertifikat = new Sertifikat_data(value);
            await Sertifikat.save();

            res.status(200).json({status:200,success:true, message:`Sertifikat qo'shildi`, data: Sertifikat})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postSertifikatValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }
    
            const updated = await Sertifikat_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'Sertifikat topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`Sertifikat yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Sertifikat = await Sertifikat_data.find().sort({_id: -1})

            res.status(200).json({status:200,success:true,  message:`Yaxshi uka`, data: Sertifikat})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Sertifikat = await Sertifikat_data.findOne({_id:req.params.id});

            if(!Sertifikat){
                res.status(404).json({status:404, message:'Sertifikat topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Sertifikat})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const Sertifikat = await Sertifikat_data.findByIdAndDelete(req.params.id);
            if(!Sertifikat){
                res.status(404).json({status:404, message:'Sertifikat topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Sertifikat})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new SertifikatController;