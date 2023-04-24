const validate = require('./validate');
const {Faoliyat_child, Faoliyat_data} = require('./model');

class FaoliyatChildController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postFaoliyat.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const FaoliyatData = await Faoliyat_data.findOne({_id: value.faoliyat_id});

            if(!FaoliyatData){
                res.status(403).json({status:403, message:`Faoliyat id xato`})
                return 
            }

            const FaoliyatChild = new Faoliyat_child(value);
            await FaoliyatChild.save()

            res.status(200).json({status:200,success:true, message:`Yangi data qo'shildi`, data: FaoliyatChild})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postFaoliyat.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const FaoliyatChild = await Faoliyat_child.findOne({_id: req.params.id});
            if(!FaoliyatChild){
                res.status(404).json({status:404, message:'Faoliyat data topilmadi :('});
                return
            }

            const FaoliyatData = await Faoliyat_data.findOne({_id: value.faoliyat_id});

            if(!FaoliyatData){
                res.status(403).json({status:403, message:`Faoliyat id xato`})
                return 
            }
            
            const updated = await Faoliyat_child.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            res.status(200).json({status:200,success:true, message:`Faoliyat data yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const FaoliyatData = await Faoliyat_child.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: FaoliyatData})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const FaoliyatData = await Faoliyat_child.findOne({_id:req.params.id});

            if(!FaoliyatData){
                res.status(404).json({status:404, message:'Faoliyat data topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: FaoliyatData})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const FaoliyatData = await Faoliyat_child.findByIdAndDelete(req.params.id);
            if(!FaoliyatData){
                res.status(404).json({status:404, message:'Faoliyat topilmadi', success:false});
                return
            }
           
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: FaoliyatData})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new FaoliyatChildController;