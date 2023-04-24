const validate = require('./validate');
const {Kafedra_data, Kafedra_hodim, Kafedra_yonalish} = require('./model');
const {Fakultet_data} = require('../fakultet/model')
const { default: mongoose } = require('mongoose');
const {Faoliyat_data, Faoliyat_child} = require('../faoliyat/model');

class KafedraController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postKafedra.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Fakultet = await Fakultet_data.findOne({_id: value.fakultet_id});

            if(!Fakultet){
                res.status(403).json({status:403, message:`Fakultet id xato`})
                return 
            }

            const Kafedra = new Kafedra_data(value);
            await Kafedra.save();

            res.status(200).json({status:200,success:true, message:`Yangi Kafedra qo'shildi`, data: Kafedra})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postKafedra.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Kafedra = await Kafedra_data.findOne({_id: req.params.id});
            if(!Kafedra){
                res.status(404).json({status:404, message:'Kafedra topilmadi :('});
                return
            }

            const Fakultet = await Fakultet_data.findOne({_id: value.fakultet_id});

            if(!Fakultet){
                res.status(403).json({status:403, message:`Fakultet id xato`})
                return 
            }
            
            const updated = await Kafedra_data.findByIdAndUpdate(req.params.id, {...value}, {new:true})

            res.status(200).json({status:200,success:true, message:`Kafedra yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Kafedra = await Kafedra_data.find().sort({_id:-1})

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Kafedra})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Kafedra = await  Kafedra_data.aggregate( [
                {$match:{_id: mongoose.Types.ObjectId(req.params.id)}},
                {$lookup:{ from: "kafedrahodims", localField: "_id", foreignField: "kafedra_id", as: "hodimlar"}},
               {$lookup:{ from: "faoliyats", localField: "_id", foreignField: "kafedra_id", as: "faoliyatlar"}},
               {$lookup:{ from: "kafedrayonalishes", localField: "_id", foreignField: "kafedra_id", as: "yonalishlar"}},
             ] );
             if(Kafedra.length <1){
                    res.status(404).json({status:404, message:'kafedra id xato', success:false});
                    return
                }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Kafedra[0]})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const Kafedra = await Kafedra_data.findByIdAndDelete(req.params.id);
            if(!Kafedra){
                res.status(404).json({status:404, message:'Kafedra topilmadi', success:false});
                return
            }

            // Kafedraga tegishli hodimlarni o'chirish 
            await Kafedra_hodim.deleteMany({kafedra_id: req.params.id})

            // Kafedraga tegishli yo'nalishlarni o'chirish 
            await Kafedra_yonalish.deleteMany({kafedra_id: req.params.id})

            // Kafedraga oid faoliyatlarni o'chirish
            const KafedraFaoliyat = await Faoliyat_data.find({kafedra_id: req.params.id});
                    if(KafedraFaoliyat.length >0){
                        await Faoliyat_data.deleteMany({kafedra_id: req.params.id})
                        for(let item of KafedraFaoliyat){
                            await Faoliyat_child.deleteMany({faoliyat_id: item._id})
                        }
            }

            // frontga response 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Kafedra})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

}

module.exports = new KafedraController;