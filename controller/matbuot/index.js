const validate = require("./validate");
const Matbuot_data = require('./model')

class MatbuotController{
    async Add(req, res) {
        try{
            const { error, value } = validate.post.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Matbuot = new Matbuot_data(value);
            await Matbuot.save();

            res.status(200).json({status:200,success:true, message:`Matbuot qo'shildi`, data: Matbuot})
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
    
            const updated = await Matbuot_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'Matbuot topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`Matbuot yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(req, res) {
        try{
            const Matbuot = await Matbuot_data.find().sort({_id:-1});
            res.status(200).json({status:200,success:true,  message:`Yaxshi uka`, data: Matbuot})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Matbuot = await Matbuot_data.findOne({_id:req.params.id});

            if(!Matbuot){
                res.status(404).json({status:404, message:'Matbuot topilmadi', success:false});
                return
            }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Matbuot})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const Matbuot = await Matbuot_data.findByIdAndDelete(req.params.id);
            if(!Matbuot){
                res.status(404).json({status:404, message:'Matbuot topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Matbuot})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new MatbuotController;