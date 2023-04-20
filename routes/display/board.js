const express = require('express');
const router = express.Router();
const boardController = require('../../controllers/board.controller');

router.post('/', boardController.getBoard);
router.post('/settings', boardController.getStructure);
router.post('/workflows', boardController.getWorkflows);
router.post('/columns', boardController.getColumns);
router.post('/cards', boardController.getCards);

module.exports = router;