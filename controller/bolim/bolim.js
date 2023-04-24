const { default: mongoose } = require('mongoose');
const validate = require('./validate');
const {Bolim_data, Bolim_hodim} = require('./model');
const {Faoliyat_data, Faoliyat_child} = require('../faoliyat/model');

class BolimController{
    async Add(req, res) {
        try{
            const { error, value } = validate.post.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message: String(error["details"][0].message)})
                return
            }

            const Bolim = new Bolim_data(value);
            await Bolim.save()

            res.status(200).json({status:200,success:true, message:`Yangi Bo'lim qo'shildi`, data: Bolim})
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

            const updated = await Bolim_data.findByIdAndUpdate(req.params.id, {...value}, {new:true})

            if(!updated){
                res.status(404).json({status:404, message:'Bolim topilmadi :('});
                return
            }
            res.status(200).json({status:200,success:true, message:`Bolim yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Bolim = await Bolim_data.find().sort({_id:-1})

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Bolim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
          const Bolim = await  Bolim_data.aggregate( [
                {$match:{_id: mongoose.Types.ObjectId(req.params.id)}},
                {$lookup:{ from: "bolimhodims", localField: "_id", foreignField: "bolim_id", as: "hodimlar"}},
               {$lookup:{ from: "faoliyats", localField: "_id", foreignField: "bolim_id", as: "faoliyatlar"}}
             ] );
             if(Bolim.length <1){
                    res.status(404).json({status:404, message:'Bolim id xato', success:false});
                    return
                }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Bolim[0]})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const Bolim = await Bolim_data.findByIdAndDelete(req.params.id);

            if(!Bolim){
                res.status(404).json({status:404, message:'Bo`lim id xato', success:false});
                return
            }
            // Bolimga tegishli hodimlarni o'chirish 
            await Bolim_hodim.deleteMany({bolim_id: req.params.id})
           

           const BolimFaoliyat = await Faoliyat_data.find({bolim_id: req.params.id});
           if(BolimFaoliyat.length>0){
            for(let i of BolimFaoliyat){
                await Faoliyat_child.deleteMany({faoliyat_id: i._id})
            }
            await Faoliyat_data.deleteMany({bolim_id: req.params.id});
           }

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Bolim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new BolimController;
