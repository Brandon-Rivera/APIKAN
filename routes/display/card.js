//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const cardController = require('../../controllers/card.controller');

//relate functions to link routes
router.post('/', cardController.getCard);
router.post('/subtasks', cardController.getSubtasks);

//export router requests
module.exports = router;