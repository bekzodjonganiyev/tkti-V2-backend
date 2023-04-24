const express = require('express')
const AuthController = require('./auth');
const middleware = require('../../middleware');
const router = express.Router();

router.post('/login', middleware.checkContentType, AuthController.Login)


module.exports = router