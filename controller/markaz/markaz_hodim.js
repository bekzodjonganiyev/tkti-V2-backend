const validate = require("./validate");
const {Markaz_data, Markaz_hodim} = require("./model");
const removeMedia = require('../../config/fs');

class MarkazHodimController{
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
            const Markaz = await Markaz_data.findOne({_id:value.markaz_id});
            if(!Markaz){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:`Markaz id xato`})
                return
            }
            
            value.photo = `uploads/${req.file.filename}`

            const MarkazHodim = new Markaz_hodim(value);
            await MarkazHodim.save();

            res.status(200).json({status:200,success:true, message:`Yangi hodim qo'shildi`, data: MarkazHodim})
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

            const MarkazHodim = await Markaz_hodim.findOne({_id: req.params.id});
            if(!MarkazHodim){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            const Markaz = await Markaz_data.findOne({_id:value.markaz_id});
            if(!Markaz){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:`Markaz id xato`})
                return
            }

            if(req.file){
                value.photo = `uploads/${req.file.filename}`
            }

            const updated = await Markaz_hodim.findByIdAndUpdate(req.params.id, {...value}, {new:true});

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
            const MarkazHodim = await Markaz_hodim.find();

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: MarkazHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const MarkazHodim = await Markaz_hodim.findOne({_id:req.params.id});

            if(!MarkazHodim){
                res.status(404).json({status:404, message:'Hodim topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: MarkazHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const MarkazHodim = await Markaz_hodim.findByIdAndDelete(req.params.id);
            if(!MarkazHodim){
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }
            
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: MarkazHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new MarkazHodimController;