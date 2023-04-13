const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

router.post('/', dashboardController.getDashboard);
router.post('/userWorkspaces', dashboardController.getUserWorkspaces);
router.post('/userBoards', dashboardController.getBoards);
router.post('/userBoardsNotArchived', dashboardController.getBoardsNotArchived);
router.post('/workspace', dashboardController.getWorkspaceInfo);

module.exports = router;