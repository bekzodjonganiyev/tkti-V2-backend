const express = require('express')
const router = express.Router()
const upload = require('../config/multer').single('file')
const middleware = require('../middleware');
const MediaController = require('../controller/media')

router.post('/add', middleware.checkToken, (req, res, next) => {
    upload(req, res,  function (err) {
    if (err || !req.file) {
    res.status(404).json({status:404, success:false, message:`Media qo'shish uchun 'file' keyidan foydalanib 1ta rasm yuboring`})
    return
    }  
    next()
    })
  }, MediaController.Add);
router.get('/all', middleware.checkContentType, MediaController.Get)
router.get('/remove/cashe', middleware.checkContentType, middleware.checkToken, MediaController.RemoveCasheFiles)
router.get('/all-media', middleware.checkContentType, middleware.checkToken, MediaController.GetAll)
router.get('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, MediaController.GetById)
router.put('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken,  MediaController.Edit)
router.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, MediaController.Delete)
router.get('/down/:file', MediaController.Download)

module.exports = router