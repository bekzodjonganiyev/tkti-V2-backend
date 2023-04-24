const express = require('express')
const FaoliyatRouter = express.Router()
const FaoliyatDataRouter = express.Router()
const middleware = require('../../middleware');
const FaoliyatController = require('./faoliyat')
const FaoliyatDataController = require('./faoliyat_data')

FaoliyatDataRouter.post('/add', middleware.checkToken, FaoliyatDataController.Add)
FaoliyatDataRouter.get('/all', middleware.checkContentType, FaoliyatDataController.Get)
FaoliyatDataRouter.get('/:id', middleware.checkParamsId, middleware.checkContentType, FaoliyatDataController.GetById)
FaoliyatDataRouter.put('/:id', middleware.checkParamsId, middleware.checkToken,  FaoliyatDataController.Edit)
FaoliyatDataRouter.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, FaoliyatDataController.Delete)

FaoliyatRouter.post('/add', middleware.checkContentType, middleware.checkReferenceId, middleware.checkToken, FaoliyatController.Add)
FaoliyatRouter.get('/all', middleware.checkContentType, FaoliyatController.Get)
FaoliyatRouter.get('/:id', middleware.checkParamsId, middleware.checkContentType, FaoliyatController.GetById)
FaoliyatRouter.put('/:id', middleware.checkParamsId, middleware.checkReferenceIdCount, middleware.checkToken,  FaoliyatController.Edit)
FaoliyatRouter.delete('/:id', middleware.checkParamsId, middleware.checkContentType, middleware.checkToken, FaoliyatController.Delete)

module.exports = {FaoliyatDataRouter, FaoliyatRouter}