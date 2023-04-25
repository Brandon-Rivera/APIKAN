//include libraries
const express = require('express');
//define router
const router = express.Router();
//define route
const dashboardController = require('../../controllers/dashboard.controller');

//relate functions to link routes
router.post('/', dashboardController.getDashboard);
router.post('/userWorkspaces', dashboardController.getUserWorkspaces);
router.post('/userBoards', dashboardController.getBoards);
router.post('/userBoardsNotArchived', dashboardController.getBoardsNotArchived);
router.post('/workspace', dashboardController.getWorkspaceInfo);

//export router requests
module.exports = router;