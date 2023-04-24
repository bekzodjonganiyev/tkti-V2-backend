const validate = require('./validate');

const {Faoliyat_child, Faoliyat_data} = require('./model');
const {Fakultet_data} = require('../fakultet/model')
const {Bolim_data} = require('../bolim/model')
const {Kafedra_data} = require('../kafedra/model');
const {Markaz_data} = require('../markaz/model')
const Rektorat_data = require('../rektorat/model');
const { default: mongoose } = require('mongoose');

class FaoliyatController{
    async Add(req, res) {
        try{
            const { error, value } = validate.post.validate({...req.body});
            if(error){
                console.log(error);
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            // Faoliyat qaysi schemaga reference bo'lishi topilmoqda
            if(value.fakultet_id){
                const Fakultet = await Fakultet_data.findOne({_id: value.fakultet_id});

                if(!Fakultet){
                    res.status(403).json({status:403, message:`Fakultet id xato`})
                    return 
                }
            }

            if(value.kafedra_id){
                const Kafedra = await Kafedra_data.findOne({_id: value.kafedra_id});

                if(!Kafedra){
                    res.status(403).json({status:403, message:`Kafedra id xato`})
                    return 
                }
            }

            if(value.bolim_id){
                const Bolim = await Bolim_data.findOne({_id: value.bolim_id});

                if(!Bolim){
                    res.status(403).json({status:403, message:`Bolim id xato`})
                    return 
                }
            }

            if(value.markaz_id){
                const Markaz = await Markaz_data.findOne({_id: value.markaz_id});

                if(!Markaz){
                    res.status(403).json({status:403, message:`Markaz id xato`})
                    return 
                }
            }

            if(value.rektorat_id){
                const Rektorat = await Rektorat_data.findOne({_id: value.rektorat_id});

                if(!Rektorat){
                    res.status(403).json({status:403, message:`Rektorat id xato`})
                    return 
                }
            }

            const ResponseData = new Faoliyat_data(value)
            await ResponseData.save();

            res.status(200).json({status:200,success:true, message:`Yangi Faoliyat qo'shildi`, data: ResponseData})
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

            let Faoliyat = await Faoliyat_data.findOne({_id: req.params.id});
            if(!Faoliyat){
                res.status(404).json({status:404, message:'Faoliyat topilmadi :('});
                return
            }

            // Faoliyatni reference idsi o'zgarsa o'sha id bo'yicha data bormi yo'qmi tekshirilyabti
            if(value.fakultet_id && !Faoliyat.fakultet_id){
                    res.status(403).json({status:403, message:`Siz ushbu Faoliyatni fakultetga biriktira olmaysiz :(`})
                    return 
            }
            if(value.fakultet_id && Faoliyat.fakultet_id){
                const Fakultet = await Fakultet_data.findOne({_id: value.fakultet_id});

                if(!Fakultet){
                    res.status(403).json({status:403, message:`Fakultet id xato`})
                    return 
                }

            }
            if(value.kafedra_id && !Faoliyat.kafedra_id){
                res.status(403).json({status:403, success:false, message:`Ushbu faoliyatni kafedralarga biriktira olmaysiz`})
                    return 
            }
            if(value.kafedra_id && Faoliyat.kafedra_id){
                const Kafedra = await Kafedra_data.findOne({_id: value.kafedra_id});

                if(!Kafedra){
                    res.status(403).json({status:403, message:`Kafedra id xato`})
                    return 
                }

            }
            if(value.bolim_id && !Faoliyat.bolim_id){
                    res.status(403).json({status:403, success:false, message:`Ushbu faoliyatni bo'limlarga biriktira olmaysiz`})
                    return 
            }
            if(value.bolim_id && Faoliyat.bolim_id){
                const Bolim = await Bolim_data.findOne({_id: value.bolim_id});

                if(!Bolim){
                    res.status(403).json({status:403, message:`Bolim id xato`})
                    return 
                }
            }
            if(value.markaz_id && !Faoliyat.markaz_id){
                res.status(403).json({status:403, success:false, message:`Ushbu faoliyatni markazlarga biriktira olmaysiz`})
                    return 
            }
            if(value.markaz_id && Faoliyat.markaz_id){
                const Markaz = await Markaz_data.findOne({_id: value.markaz_id});

                if(!Markaz){
                    res.status(403).json({status:403, message:`Markaz id xato`})
                    return 
                }
            }
            if(value.rektorat_id && !Faoliyat.rektorat_id){
                res.status(403).json({status:403, success:false, message:`Ushbu faoliyatni rektoratga biriktira olmaysiz`})
                    return 
            }
            if(value.rektorat_id && Faoliyat.rektorat_id){
                const Rektorat = await Rektorat_data.findOne({_id: value.rektorat_id});

                if(!Rektorat){
                    res.status(403).json({status:403, message:`Rektorat id xato`})
                    return 
                }
            }
            
            const updated = await Faoliyat_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            res.status(200).json({status:200,success:true, message:`Faoliyat yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Faoliyat = await Faoliyat_data.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Faoliyat})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Faoliyat = await  Faoliyat_data.aggregate( [
                {$match:{_id: mongoose.Types.ObjectId(req.params.id)}},
                {$lookup:{ from: "faoliyatchildren", localField: "_id", foreignField: "faoliyat_id", as: "child"}},
             ] );
             if(Faoliyat.length <1){
                    res.status(404).json({status:404, message:'Faoliyat id xato', success:false});
                    return
                }

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Faoliyat[0]})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const Faoliyat = await Faoliyat_data.findByIdAndDelete(req.params.id);
            if(!Faoliyat){
                res.status(404).json({status:404, message:'Faoliyat topilmadi', success:false});
                return
            }
            // Faoliyatga tegishli datalarni o'chirish    
            await Faoliyat_child.deleteMany({faoliyat_id: req.params.id})

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Faoliyat})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new FaoliyatController;