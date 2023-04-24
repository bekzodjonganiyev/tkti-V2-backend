const express = require('express')
const router = express.Router()
const upload = require('../../config/multer').single('photo')
const middleware = require('../../middleware');
const RektoratController = require('./index')


router.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err || !req.file) {
    res.status(404).json({status:404, success:false, message:`Rektorat qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, RektoratController.Add)
router.get('/all', middleware.checkContentType, RektoratController.Get)
router.get('/:id', middleware.checkParamsId, middleware.checkContentType, RektoratController.GetById)
router.put('/:id', middleware.checkParamsId, middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err) {
    res.status(404).json({status:404, success:false, message:`Rektorat qo'shish uchun 'photo' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, RektoratController.Edit)
router.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, RektoratController.Delete)

module.exports = router