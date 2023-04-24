const validate = require("./validate");
const Model = require('./model');

class XalqaroALoqa{
    async Add(req, res) {
        try{
            const { error, value } = validate.post.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Stat = new Model(value);
            await Stat.save();

            res.status(200).json({status:200,success:true, message:`Statistika qo'shildi`, data: Stat})
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
    
            const updated = await Model.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'Statistika topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`Statistika yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(req, res) {
        try{
            // const {page, count} = req.query;
            const Stat = await Model.find().sort({_id: -1});
            res.status(200).json({status:200,success:true, message:`Yaxshi ukaaaaaa`, data: Stat})
            // const resData = Stat.splice(page >1 ? Number(page) * (Number(count) ? count:10) - (Number(count) ? count : 10) : 0, (Number(count) ? count :10))
            // const Stat = await (await Model.find().sort({_id: -1})).splice(page && page >1 ? Number(page) * (Number(count) ? count :10) - (Number(count) ? count :10) : 0, (Number(count) ? count :10))
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Stat = await  Model.findOne({_id: req.params.id})
             if(Stat.length <1){
                    res.status(404).json({status:404, message:'Statistika id xato', success:false});
                    return
                }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Stat})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const Stat = await Model.findByIdAndDelete(req.params.id);
            if(!Stat){
                res.status(404).json({status:404, message:'Statistika topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Stat})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new XalqaroALoqa