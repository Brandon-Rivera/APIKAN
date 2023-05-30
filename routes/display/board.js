//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const boardController = require('../../controllers/board.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

//relate functions to link routes
router.post('/', middleware, boardController.getBoard);
router.post('/settings', middleware, boardController.getStructure);
router.post('/workflows', middleware, boardController.getWorkflows);
router.post('/columns', middleware, boardController.getColumns);
router.post('/cards', middleware, boardController.getCards);
router.post('/lines', middleware, boardController.getLines);

//export router requests
module.exports = router;