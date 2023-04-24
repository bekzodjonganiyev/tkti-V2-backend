const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const QabulController = require('../controller/qabul')

router.post('/add', middleware.checkContentType, middleware.checkToken, QabulController.Add)
router.get('/all', middleware.checkContentType, QabulController.Get)
router.get('/:id',middleware.checkParamsId, middleware.checkContentType, QabulController.GetById)
router.put('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, QabulController.Edit)
router.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, QabulController.Delete)

module.exports = router
