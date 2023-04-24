const express = require('express')
const router = express.Router()
const middleware = require('../../middleware')
const MatbuotController = require('./index')

router.post('/add', middleware.checkContentType, middleware.checkToken, MatbuotController.Add)
router.get('/all', middleware.checkContentType, MatbuotController.Get)
router.get('/:id',middleware.checkParamsId,  middleware.checkContentType, MatbuotController.GetById)
router.put('/:id',middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken, MatbuotController.Edit)
router.delete('/:id',middleware.checkParamsId,  middleware.checkContentType, middleware.checkToken, MatbuotController.Delete)

module.exports = router
