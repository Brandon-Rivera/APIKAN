//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const loginController = require('../../controllers/login.controller');

//relate functions to link routes
router.post('/', loginController.doLogin);

//export router requests
module.exports = router;