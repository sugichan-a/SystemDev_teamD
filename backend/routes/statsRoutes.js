const express = require('express');
const router = express.Router();
const statisController = require('../controllers/statsController');

router.get('/', statisController.getStats);

module.exports = router;
