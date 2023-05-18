// include libraries
const express = require('express');
// define router
const router = express.Router();
// defoe route
const ownersController = require('../../controllers/owners.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

// relate function to link routes
router.post('/', middleware, ownersController.getOwners);

// export router requests
module.exports = router;