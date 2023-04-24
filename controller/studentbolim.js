const validate = require("../config/validate");
const StudentBolim_data = require('../models/studentbolim');

class StudentBolimController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postStudentBolimValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const StudentBolim = new StudentBolim_data(value);
            await StudentBolim.save();

            res.status(200).json({status:200,success:true, message:`Student bolim qo'shildi`, data: StudentBolim})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postStudentBolimKategoryValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }
    
            const updated = await StudentBolim_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'Student bolim topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`Student bolim yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const StudentBolim = await StudentBolim_data.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: StudentBolim})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const StudentBolim = await  StudentBolim_data.findOne({_id: req.params.id})
             if(StudentBolim.length <1){
                    res.status(404).json({status:404, message:'Student bolim id xato', success:false});
                    return
                }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: StudentBolim})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const StudentBolim = await StudentBolim_data.findByIdAndDelete(req.params.id);
            if(!StudentBolim){
                res.status(404).json({status:404, message:'Student bolim topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: StudentBolim})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new StudentBolimController;