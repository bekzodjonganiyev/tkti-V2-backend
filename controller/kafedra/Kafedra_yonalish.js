const validate = require('./validate');
const {Kafedra_data,  Kafedra_yonalish} = require('./model');

class KafedraYonalishController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postYonalish.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Kafedra = await Kafedra_data.findOne({_id: value.kafedra_id});

            if(!Kafedra){
                res.status(403).json({status:403, message:`Kafedra id xato`})
                return 
            }

            const KafedraYonalish = new Kafedra_yonalish(value);
            await KafedraYonalish.save()

            res.status(200).json({status:200,success:true, message:`Yangi yo'nalish qo'shildi`, data: KafedraYonalish})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postYonalish.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const KafedraYonalish = await Kafedra_yonalish.findOne({_id: req.params.id});
            if(!KafedraYonalish){
                res.status(404).json({status:404, message:'Kafedra yo`nalish topilmadi :('});
                return
            }

            const Kafedra = await Kafedra_data.findOne({_id: value.kafedra_id});

            if(!Kafedra){
                res.status(403).json({status:403, message:`Kafedra id xato`})
                return 
            }
            
            const updated = await Kafedra_yonalish.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            res.status(200).json({status:200,success:true, message:`Kafedra yo'nalish yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const KafedraYonalish = await Kafedra_yonalish.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: KafedraYonalish})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const KafedraYonalish = await Kafedra_yonalish.findOne({_id:req.params.id});

            if(!KafedraYonalish){
                res.status(404).json({status:404, message:'Kafedra topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: KafedraYonalish})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{
            const KafedraYonalish = await Kafedra_yonalish.findByIdAndDelete(req.params.id);
            if(!KafedraYonalish){
                res.status(404).json({status:404, message:'Kafedra yo`nalish topilmadi', success:false});
                return
            }

            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: KafedraYonalish})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

}

module.exports = new KafedraYonalishController;