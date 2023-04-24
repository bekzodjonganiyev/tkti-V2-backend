const express = require('express')
const BolimRouter = express.Router()
const BolimHodimRouter = express.Router()
const BolimController = require('./bolim');
const BolimHodimController = require('./bolim_hodim');
const middleware = require('../../middleware')
const upload = require('../../config/multer').single('photo');


BolimRouter.post('/add', middleware.checkContentType, middleware.checkToken,  BolimController.Add);
BolimRouter.get('/all', middleware.checkContentType, BolimController.Get)
BolimRouter.get('/:id',  middleware.checkParamsId,  middleware.checkContentType,   BolimController.GetById)
BolimRouter.put('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken,  BolimController.Edit)
BolimRouter.delete('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken,  BolimController.Delete)

BolimHodimRouter.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err || !req.file) {
    res.status(404).json({status:404, success:false, message:`Bo'limga hodim qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, BolimHodimController.Add)
BolimHodimRouter.get('/all', middleware.checkContentType, middleware.checkToken, BolimHodimController.Get)
BolimHodimRouter.get('/:id', middleware.checkParamsId, middleware.checkContentType, BolimHodimController.GetById)
BolimHodimRouter.put('/:id',middleware.checkParamsId, middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`Bo'limga hodim qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, BolimHodimController.Edit)
BolimHodimRouter.delete('/:id', middleware.checkParamsId, middleware.checkContentType,middleware.checkToken, BolimHodimController.Delete)


module.exports = {BolimRouter, BolimHodimRouter}
