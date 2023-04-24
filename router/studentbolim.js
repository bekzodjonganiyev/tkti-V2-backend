const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const StudentBolimController = require('../controller/studentbolim')

router.post('/add', middleware.checkContentType, middleware.checkToken, StudentBolimController.Add)
router.get('/all', middleware.checkContentType, StudentBolimController.Get)
router.get('/:id',middleware.checkParamsId, middleware.checkContentType, StudentBolimController.GetById)
router.put('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, StudentBolimController.Edit)
router.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, StudentBolimController.Delete)

module.exports = router