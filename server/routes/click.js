const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.js');

router.post('/', playerController.click);

module.exports = router;
