//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const updateController = require('../../controllers/update.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

//relate functions to link routes
router.post('/', middleware, updateController.updateCard);
router.post('/move', middleware, updateController.moveCard);
router.post('/next', middleware, updateController.nextColumn);

//export router requests
module.exports = router;