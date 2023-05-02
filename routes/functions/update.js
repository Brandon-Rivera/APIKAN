//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const updateController = require('../../controllers/update.controller');

//relate functions to link routes
//router.post('/', updateController.updateCard);
router.post('/move', updateController.moveCard);

//export router requests
module.exports = router;