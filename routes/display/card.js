//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const cardController = require('../../controllers/card.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

//relate functions to link routes
router.post('/', middleware, cardController.getCard);
router.post('/subtasks', middleware, cardController.getSubtasks);

//export router requests
module.exports = router;