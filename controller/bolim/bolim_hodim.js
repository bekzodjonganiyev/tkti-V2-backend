const validate = require("./validate");
const {Bolim_data, Bolim_hodim} = require('./model');
const removeMedia = require('../../config/fs');

class BolimHodimController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postHodim.validate({...req.body});
            if(error){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }
            const Bolim = await Bolim_data.findOne({_id:value.bolim_id});
            if(!Bolim){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:`Bolim id xato`})
                return
            }
           
            value.photo = `uploads/${req.file.filename}`

            const BolimHodim = new Bolim_hodim(value);
            await BolimHodim.save();

            res.status(200).json({status:200,success:true, message:`Yangi hodim qo'shildi`, data: BolimHodim})
        }
        catch(e){
            if(req.file){
                removeMedia(req.file.filename)
            }
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postHodim.validate({...req.body});
            if(error){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Bolim = await Bolim_data.findOne({_id: value.bolim_id})
            if(!Bolim){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:'Bo`lim topilmadi :('});
                return
            }
           

            const BolimHodim = await Bolim_hodim.findOne({_id: req.params.id});
            if(!BolimHodim){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            if(req.file){
                value.photo = `uploads/${req.file.filename}`
            }

            const updated = await Bolim_hodim.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            res.status(200).json({status:200,success:true, message:`hodim yangilandi`, data: updated})
        }
        catch(e){
            if(req.file){
                removeMedia(req.file.filename)
            }
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const BolimHodim = await Bolim_hodim.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: BolimHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const BolimHodim = await Bolim_hodim.findOne({_id:req.params.id});

            if(!BolimHodim){
                res.status(404).json({status:404, message:'Hodim topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: BolimHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const BolimHodim = await Bolim_hodim.findByIdAndDelete(req.params.id);
            if(!BolimHodim){
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: BolimHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new BolimHodimController;