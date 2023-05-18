//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const loginController = require('../../controllers/login.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

//relate functions to link routes
router.post('/', loginController.doLogin);

//export router requests
module.exports = router;