const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player.js');

router.get('/:email', playerController.get);

module.exports = router;
