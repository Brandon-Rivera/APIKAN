//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const dashboardController = require('../../controllers/dashboard.controller');
//define route for middleware
const middleware = require('../../middleware/jwt-middleware.js');

//relate functions to link routes
router.post('/', middleware, dashboardController.getDashboard);
router.post('/userWorkspaces', middleware, dashboardController.getUserWorkspaces);
router.post('/userBoards', middleware, dashboardController.getBoards);
router.post('/userBoardsNotArchived', middleware, dashboardController.getBoardsNotArchived);
router.post('/workspace', middleware, dashboardController.getWorkspaceInfo);

//export router requests
module.exports = router;