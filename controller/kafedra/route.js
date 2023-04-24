const express = require('express')

const Kafedra_dataController = require('./kafedra')
const Kafedra_hodimController = require('./kafedra_hodim')
const KafedraYonalishController = require('./Kafedra_yonalish')

const KafedraRouter = express.Router()
const KafedraHodimRouter = express.Router()
const KafedraYonalishRouter = express.Router()

const middleware = require('../../middleware')
const upload = require('../../config/multer').single('photo')


KafedraYonalishRouter.post('/add', middleware.checkContentType, middleware.checkToken, KafedraYonalishController.Add)
KafedraYonalishRouter.get('/all', middleware.checkContentType, middleware.checkToken, KafedraYonalishController.Get)
KafedraYonalishRouter.get('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, KafedraYonalishController.GetById)
KafedraYonalishRouter.put('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, KafedraYonalishController.Edit)
KafedraYonalishRouter.delete('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken, KafedraYonalishController.Delete)

KafedraHodimRouter.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err || !req.file) {
    res.status(404).json({status:404, success:false, message:`Kafedraga hodim qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, Kafedra_hodimController.Add)
KafedraHodimRouter.get('/all', middleware.checkContentType, middleware.checkToken, Kafedra_hodimController.Get)
KafedraHodimRouter.get('/:id',middleware.checkParamsId, middleware.checkContentType, Kafedra_hodimController.GetById)
KafedraHodimRouter.put('/:id', middleware.checkParamsId, middleware.checkToken,  (req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`Kafedraga hodim qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, Kafedra_hodimController.Edit)
KafedraHodimRouter.delete('/:id', middleware.checkContentType, middleware.checkParamsId, middleware.checkToken, Kafedra_hodimController.Delete)

KafedraRouter.post('/add', middleware.checkContentType, middleware.checkToken, Kafedra_dataController.Add)
KafedraRouter.get('/all', middleware.checkContentType, Kafedra_dataController.Get)
KafedraRouter.get('/:id', middleware.checkParamsId, middleware.checkContentType, Kafedra_dataController.GetById)
KafedraRouter.put('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, Kafedra_dataController.Edit)
KafedraRouter.delete('/:id', middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken, Kafedra_dataController.Delete)

module.exports = {KafedraRouter,KafedraHodimRouter,KafedraYonalishRouter}
