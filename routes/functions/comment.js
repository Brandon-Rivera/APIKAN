//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const commentController = require('../../controllers/comment.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

//relate functions to link routes
router.post('/', middleware, commentController.doComment);
router.post('/get', middleware, commentController.getComment);

//export router requests
module.exports = router;