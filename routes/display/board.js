//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const boardController = require('../../controllers/board.controller');

//relate functions to link routes
router.post('/', boardController.getBoard);
router.post('/settings', boardController.getStructure);
router.post('/workflows', boardController.getWorkflows);
router.post('/columns', boardController.getColumns);
router.post('/cards', boardController.getCards);

//export router requests
module.exports = router;