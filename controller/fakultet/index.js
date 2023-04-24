const { default: mongoose } = require('mongoose');
const removeMedia = require('../../config/fs');
const validate = require('./validate');
const {Fakultet_data, Fakultet_hodim} = require('./model');
const {Faoliyat_data, Faoliyat_child} = require('../faoliyat/model');
const {Kafedra_data, Kafedra_hodim, Kafedra_yonalish} = require('../kafedra/model')

class Fakultet{
    async Add(req, res) {
        try{
            const { error, value } = validate.post.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Fakultet = new Fakultet_data(value);
            await Fakultet.save()

            res.status(200).json({status:200,success:true, message:`Yangi fakultet qo'shildi`, data: Fakultet})
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

            const updated = await Fakultet_data.findByIdAndUpdate(req.params.id, {...value}, {new:true})

            if(!updated){
                res.status(404).json({status:404, message:'Fakultet topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`fakultet yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async Get(_, res) {
        try{
            const Fakultet = await Fakultet_data.find().sort({_id:-1})

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Fakultet})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async GetById(req, res) {
        try{
            const Fakultet = await  Fakultet_data.aggregate( [
                {$match:{_id: mongoose.Types.ObjectId(req.params.id)}},
                {$lookup:{ from: "fakultethodimschemas", localField: "_id", foreignField: "fakultet_id", as: "hodimlar"}},
               {$lookup:{ from: "faoliyats", localField: "_id", foreignField: "fakultet_id", as: "faoliyatlar"}},
               {$lookup:{ from: "kafedras", localField: "_id", foreignField: "fakultet_id", as: "kafedralar"}},
             ] );
             if(Fakultet.length <1){
                    res.status(404).json({status:404, message:'Fakultet id xato', success:false});
                    return
                }

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Fakultet[0]})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
    async Delete(req, res) {
        try{
            const Fakultet = await Fakultet_data.findByIdAndDelete(req.params.id);

            if(!Fakultet){
                res.status(404).json({status:404, success:false, message:`Fakultet id xato`});
                return
            }

            // fakultetga tegishli hodimlarni o'chirish 
            await Fakultet_hodim.deleteMany({fakultet_id: req.params.id})

            // fakultetga tegishli kafedralarni o'chirish 
            const FakultetKafedralar = await Kafedra_data.find({fakultet_id: req.params.id});
            if(FakultetKafedralar.length >0){
                await Kafedra_data.deleteMany({fakultet_id: req.params.id})
                
                for(let i of FakultetKafedralar){
                    // O'chirilgan kafedraga tegishli hodimlarni o'chirish 
                    await Kafedra_hodim.deleteMany({kafedra_id: i._id});
                   
                    // O'chirilgan kafedraga tegishli yo'nalishlarni o'chirish
                    await Kafedra_yonalish.deleteMany({kafedra_id: i._id})

                    // o'chirilgan kafedraga tegishli faoliyatni o'chirish
                    const KafedraFaoliyat = await Faoliyat_data.find({kafedra_id: i._id});
                    if(KafedraFaoliyat.length >0){
                        await Faoliyat_data.deleteMany({kafedra_id: i._id})
                        for(let item of KafedraFaoliyat){
                            await Faoliyat_child.deleteMany({faoliyat_id: item._id})
                        }
                    }
                }
            }

            // fakultetga oid faoliyatlarni o'chirish
            const Faoliyat = await Faoliyat_data.find({fakultet_id: req.params.id});
            if(Faoliyat.length>0){
                await Faoliyat_data.deleteMany({fakultet_id: req.params.id});

                for(let i of Faoliyat){
                    await Faoliyat_child.deleteMany({faoliyat_id: i._id})
                }
            }

            // frontga response 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Fakultet})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

class FakultetHodim{
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
            const Fakultet = await Fakultet_data.findOne({_id:value.fakultet_id});
            if(!Fakultet){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:`Fakultet id xato`})
                return
            }
            
            value.photo = `uploads/${req.file.filename}`

            const FakultetHodim = new Fakultet_hodim(value);
            await FakultetHodim.save();

            res.status(200).json({status:200,success:true, message:`Yangi hodim qo'shildi`, data: FakultetHodim})
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

           const Fakultet = await Fakultet_data.findOne({_id: value.fakultet_id});
           if(!Fakultet){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:'Fakultet topilmadi :('});
                return
           }

            const FakultetHodim = await Fakultet_hodim.findOne({_id: req.params.id});
            if(!FakultetHodim){
                if(req.file){
                    removeMedia(req.file.filename)
                }
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            if(req.file){
                value.photo = `uploads/${req.file.filename}`
            }

            const updated = await Fakultet_hodim.findByIdAndUpdate(req.params.id, {...value}, {new:true});

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
            const FakultetHodim = await Fakultet_hodim.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: FakultetHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const FakultetHodim = await Fakultet_hodim.findOne({_id:req.params.id});

            if(!FakultetHodim){
                res.status(404).json({status:404, message:'Hodim topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: FakultetHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{ 
            const FakultetHodim = await Fakultet_hodim.findByIdAndDelete(req.params.id);

            if(!FakultetHodim){
                res.status(404).json({status:404, message:'hodim topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: FakultetHodim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

const FakultetController = new Fakultet;
const FakultetHodimController = new FakultetHodim;

module.exports = {FakultetController,FakultetHodimController}
