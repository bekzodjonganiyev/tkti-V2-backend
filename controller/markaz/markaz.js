const validate = require('./validate');
const {Faoliyat_data, Faoliyat_child} = require('../faoliyat/model');
const {Markaz_data, Markaz_hodim} = require('./model');
const { default: mongoose } = require('mongoose');

class MarkazController{
    async Add(req, res) {
        try{
            const { error, value } = validate.post.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Markaz = new Markaz_data(value);
            await Markaz.save();

            res.status(200).json({status:200,success:true, message:`Yangi Markaz qo'shildi`, data: Markaz})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.post.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const updated = await Markaz_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'Markaz topilmadi :('});
                return
            }
            res.status(200).json({status:200,success:true, message:`Markaz yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Markaz = await Markaz_data.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Markaz})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Markaz = await  Markaz_data.aggregate( [
                {$match:{_id: mongoose.Types.ObjectId(req.params.id)}},
                {$lookup:{ from: "markazhodims", localField: "_id", foreignField: "markaz_id", as: "hodimlar"}},
               {$lookup:{ from: "faoliyats", localField: "_id", foreignField: "markaz_id", as: "faoliyatlar"}}
             ] );
             if(Markaz.length <1){
                    res.status(404).json({status:404, message:'Bolim id xato', success:false});
                    return
                }

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Markaz[0]})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const Markaz = await Markaz_data.findByIdAndDelete(req.params.id);

            if(!Markaz){
                res.status(404).json({status:404, message:'Markaz id xato', success:false});
                return
            }
            // Markazga tegishli hodimlarni o'chirish 
            await Markaz_hodim.deleteMany({markaz_id: req.params.id})
          
           const MarkazFaoliyat = await Faoliyat_data.find({markaz_id: req.params.id});
           if(MarkazFaoliyat.length>0){
            for(let i of MarkazFaoliyat){
                await Faoliyat_child.deleteMany({faoliyat_id: i._id})
            }
            await Faoliyat_data.deleteMany({bolim_id: req.params.id});
           }

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Markaz})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new MarkazController;
