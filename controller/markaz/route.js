const express = require('express')
const MarkazRouter = express.Router()
const MarkazHodimRouter = express.Router()

const MarkazController = require('./markaz');
const MarkazHodimController = require('./markaz_hodim')

const middleware = require('../../middleware')
const upload = require('../../config/multer').single('photo');

MarkazHodimRouter.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err || !req.file) {
    res.status(404).json({status:404, success:false, message:`Markazga hodim qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, MarkazHodimController.Add)
MarkazHodimRouter.get('/all', middleware.checkContentType, middleware.checkToken, MarkazHodimController.Get)
MarkazHodimRouter.get('/:id', middleware.checkParamsId, middleware.checkContentType, MarkazHodimController.GetById)
MarkazHodimRouter.put('/:id',middleware.checkParamsId, middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`Markazga hodim qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, MarkazHodimController.Edit)
MarkazHodimRouter.delete('/:id', middleware.checkParamsId, middleware.checkContentType,middleware.checkToken, MarkazHodimController.Delete)

MarkazRouter.post('/add', middleware.checkContentType, middleware.checkToken,  MarkazController.Add);
MarkazRouter.get('/all', middleware.checkContentType, MarkazController.Get)
MarkazRouter.get('/:id',  middleware.checkParamsId,  middleware.checkContentType,   MarkazController.GetById)
MarkazRouter.put('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken,  MarkazController.Edit)
MarkazRouter.delete('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken,  MarkazController.Delete)

module.exports = {MarkazRouter, MarkazHodimRouter}
