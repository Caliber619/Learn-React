const express = require('express');
const workerController = require('../controllers/workerController');
const { verifyToken, isWorker } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/login', workerController.login);

// Protected routes
router.post('/complete-task', workerController.completeTask);
router.get('/assigned-tasks', verifyToken, isWorker, workerController.getAssignedTasks);

module.exports = router;