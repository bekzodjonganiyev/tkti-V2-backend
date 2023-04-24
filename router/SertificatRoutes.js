const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const SertifikatController = require('../controller/sertifikat')

router.post('/add', middleware.checkContentType, middleware.checkToken, SertifikatController.Add)
router.get('/all', middleware.checkContentType, SertifikatController.Get)
router.get('/:id',middleware.checkParamsId, middleware.checkContentType, SertifikatController.GetById)
router.put('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, SertifikatController.Edit)
router.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, SertifikatController.Delete)

module.exports = router
