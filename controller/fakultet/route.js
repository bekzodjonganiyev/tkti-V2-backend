const express = require('express')
const FakultetRouter = express.Router();
const FakultetHodimRouter = express.Router();
const {FakultetController, FakultetHodimController} = require('./index')
const middleware = require('../../middleware')
const upload = require('../../config/multer').single('photo');


FakultetHodimRouter.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err || !req.file) {
    res.status(404).json({status:404, success:false, message:`Fakultetga hodim qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring yuboring`})
    return
    }  
    next()
    })
  }, FakultetHodimController.Add)
FakultetHodimRouter.get('/all', middleware.checkContentType, middleware.checkToken, FakultetHodimController.Get)
FakultetHodimRouter.get('/:id',middleware.checkParamsId, middleware.checkContentType, FakultetHodimController.GetById)
FakultetHodimRouter.put('/:id',middleware.checkParamsId,  middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`Fakultetga hodim qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring yuboring`})
    return
    }  
    next()
    })
  }, FakultetHodimController.Edit)
FakultetHodimRouter.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, FakultetHodimController.Delete)

FakultetRouter.post('/add', middleware.checkContentType, middleware.checkToken, FakultetController.Add)
FakultetRouter.get('/all', middleware.checkContentType,  FakultetController.Get)
FakultetRouter.get('/:id',middleware.checkParamsId, middleware.checkContentType, FakultetController.GetById)
FakultetRouter.put('/:id',middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken, FakultetController.Edit)
FakultetRouter.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, FakultetController.Delete)

module.exports = {FakultetRouter,FakultetHodimRouter}
