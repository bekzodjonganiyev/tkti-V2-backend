const users = require("./model");
const validate = require('./validate')
const jwt = require('jsonwebtoken');

const setToken = payload => jwt.sign(payload, 'MUSAFFO_SKY', {
    expiresIn:"24h"
})


class AuthController{
    async Login(req, res){
        try{
            const { error, value } = validate.loginValidation.validate({...req.body});
            if(error){
                res.status(403).json({status:403, message:String(error["details"][0].message)})
                return
            }

            const oldData = await users.findOne({name:value.name, password: value.password, email: value.email});

            if(!oldData){
                res.status(403).json({status:403, message:`Name yoki parol xato`})
                return
            }

            res.status(200).json({status:200, success:true,  token: setToken({id:oldData._id}), message:'yaxshi uka login qilding'})
        }
        catch(e){
            console.log(e);
            res.status(500).json({status:500, message:'invalid request'})
        }
    }
}

module.exports = new AuthController;