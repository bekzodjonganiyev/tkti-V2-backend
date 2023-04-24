const validate = require("../config/validate");
const Student_data = require('../models/student');

class StudentController{
    async Add(req, res) {
        try{
            const { error, value } = validate.postStudentValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const Student = new Student_data(value);
            await Student.save();

            res.status(200).json({status:200,success:true, message:`Student qo'shildi`, data: Student})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Edit(req, res) {
        try{
            const { error, value } = validate.postStudentValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }
    
            const updated = await Student_data.findByIdAndUpdate(req.params.id, {...value}, {new:true});

            if(!updated){
                res.status(404).json({status:404, message:'Student topilmadi :('});
                return
            }

            res.status(200).json({status:200,success:true, message:`Student yangilandi`, data: updated})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Get(_, res) {
        try{
            const Student = await Student_data.find().sort({_id:-1});

            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Student})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async GetById(req, res) {
        try{
            const Student = await  Student_data.findOne({_id: req.params.id})
             if(Student.length <1){
                    res.status(404).json({status:404, message:'Student id xato', success:false});
                    return
                }
            res.status(200).json({status:200,success:true, message:`Yaxshi uka`, data: Student})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }

    async Delete(req, res) {
        try{            
            const Student = await Student_data.findByIdAndDelete(req.params.id);
            if(!Student){
                res.status(404).json({status:404, message:'Student topilmadi :('});
                return
            }
 
            res.status(200).json({status:200,success:true, message:`Yaxshi  delet qilindi`, data: Student})
        }
        catch(e){
            res.status(500).json({status:500, message:'invalid request', success:false});
        }
    }
}

module.exports = new StudentController;