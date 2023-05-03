// include libraries
const express = require('express');
// define router
const router = express.Router();
// defoe route
const ownersController = require('../../controllers/owners.controller');

// relate function to link routes
router.post('/', ownersController.getOwners);

// export router requests
module.exports = router;