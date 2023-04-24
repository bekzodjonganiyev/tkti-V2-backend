const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const StatisticController = require('../controller/statistic')

router.post('/add', middleware.checkContentType, middleware.checkToken, StatisticController.Add)
router.get('/all', middleware.checkContentType, StatisticController.Get)
router.get('/:id',middleware.checkParamsId, middleware.checkContentType, StatisticController.GetById)
router.put('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, StatisticController.Edit)
router.delete('/:id',middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, StatisticController.Delete)

module.exports = router