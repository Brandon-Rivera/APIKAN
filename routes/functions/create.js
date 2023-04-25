//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const createController = require('../../controllers/create.controller');

//relate functions to link routes
router.post('/', createController.postCard);

//export router requests
module.exports = router;