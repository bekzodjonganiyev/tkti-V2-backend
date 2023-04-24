const express = require('express')
const router = express.Router()
const upload = require('../../config/multer').array('file',20)
const update = require('../../config/multer').array('file',20)
const middleware = require('../../middleware');
const AboutUsController = require('./index')

router.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
      console.log(req.files)
    if (err || !req.files) {
    res.status(404).json({status:404, success:false, message:`Media qo'shish uchun 'file' keyidan foydalanib 20tagacha rasm yuboring`})
    return
    }  
    next()
    })
  }, AboutUsController.Add);
router.get('/', AboutUsController.Get)
router.get('/all-media', middleware.checkContentType, middleware.checkToken, AboutUsController.GetAll)
router.get('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, AboutUsController.GetById)
router.put('/:id', middleware.checkParamsId,  middleware.checkToken, (req, res, next) => {
  update(req, res,  function (err) {
  if (err) {
  res.status(404).json({status:404, success:false, message:`Media qo'shish uchun 'file' keyidan foydalanib 1ta rasm yuboring`})
  return
  }  
  next()
  })
},  AboutUsController.Edit)
router.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, AboutUsController.Delete)
router.get('/down/:file', AboutUsController.Download)

module.exports = router