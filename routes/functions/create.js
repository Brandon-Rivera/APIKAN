const express = require('express');
const router = express.Router();
const createController = require('../../controllers/create.controller');

router.post('/', createController.postCard);

module.exports = router;