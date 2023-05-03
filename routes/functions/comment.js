//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const commentController = require('../../controllers/comment.controller');

//relate functions to link routes
router.post('/', commentController.doComment);
router.post('/move', commentController.getComment);

//export router requests
module.exports = router;