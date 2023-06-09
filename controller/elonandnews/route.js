const express = require('express')
const ElonRouter = express.Router()
const NewsRouter = express.Router()
const upload = require('../../config/multer').single('photo')
const middleware = require('../../middleware');
const {ElonController, NewsController} = require('./index')


ElonRouter.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err || !req.file) {
    res.status(404).json({status:404, success:false, message:`E'lon qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, ElonController.Add)
ElonRouter.get('/all', middleware.checkContentType, ElonController.Get)
ElonRouter.get('/:id', middleware.checkParamsId, middleware.checkContentType, ElonController.GetById)
ElonRouter.put('/:id', middleware.checkParamsId, middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`E'lon qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, ElonController.Edit)
ElonRouter.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, ElonController.Delete)

NewsRouter.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err || !req.file) {
    res.status(404).json({status:404, success:false, message:`Yangilik qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, NewsController.Add)
NewsRouter.get('/all', middleware.checkContentType, NewsController.Get)
NewsRouter.get('/:id', middleware.checkParamsId, middleware.checkContentType, NewsController.GetById)
NewsRouter.put('/:id', middleware.checkParamsId, middleware.checkToken,(req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`Yangilik qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, NewsController.Edit)
NewsRouter.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, NewsController.Delete)

module.exports = {ElonRouter,NewsRouter};