//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const uploadController = require('../../controllers/upload.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

//relate functions to link routes
router.post('/', middleware, uploadController.uploadImage);

//export router requests
module.exports = router;