const validate = require("./validate");
const {Kafedra_data, Kafedra_hodim} = require('./model');
const removeMedia = require('../../config/fs');

class KafedraHodimController{
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
            const Kafedra = await Kafedra_data.findOne({_id:value.kafedra_id});
            if(!Kafedra){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:`Kafedra id xato`})
                return
            }
            
            value.photo = `uploads/${req.file.filename}`;

            const KafedraHodim = new Kafedra_hodim(value);
            await KafedraHodim.save();

            res.status(200).json({status:200,success:true, message:`Yangi hodim qo'shildi`, data: KafedraHodim})
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

            const Kafedra = await Kafedra_data.findOne({_id: value.kafedra_id})
            if(!Kafedra){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:'Kafedra topilmadi :('});
                return
            }

            const KafedraHodim = await Kafedra_hodim.findOne({_id: req.params.id});
            if(!KafedraHodim){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            if(req.file){
                value.photo = `uploads/${req.file.filename}`
            }

            const updated = await Kafedra_hodim.findByIdAndUpdate(req.params.id, {...value}, {new:true});

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
            const KafedraHodim = await Kafedra_hodim.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: KafedraHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const KafedraHodim = await Kafedra_hodim.findOne({_id:req.params.id});

            if(!KafedraHodim){
                res.status(404).json({status:404, message:'Hodim topilmadi :(', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: KafedraHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
          const KafedraHodim =  await Kafedra_hodim.findByIdAndDelete(req.params.id);
          if(!KafedraHodim){
            res.status(404).json({status:404, message:'hodim topilmadi :('});
            return
        }

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: KafedraHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new KafedraHodimController;