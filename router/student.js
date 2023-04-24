const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const StudentController = require('../controller/student')

router.post('/add', middleware.checkContentType, middleware.checkToken, StudentController.Add)
router.get('/all', middleware.checkContentType, StudentController.Get)
router.get('/:id',middleware.checkParamsId, middleware.checkContentType, StudentController.GetById)
router.put('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, StudentController.Edit)
router.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, StudentController.Delete)

module.exports = router
