const express = require('express');
const router = express.Router();
const { getQuery } = require('../controller/FilterController');

router.get('/querry', getQuery);

module.exports = router;
