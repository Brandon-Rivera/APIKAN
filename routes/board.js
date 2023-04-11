const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

//router.post('/', boardController.getBoard);
router.post('/settings', boardController.getStructure);

module.exports = router;