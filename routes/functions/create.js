//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const createController = require('../../controllers/create.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

//relate functions to link routes
router.post('/', middleware, createController.postCard);

//export router requests
module.exports = router;