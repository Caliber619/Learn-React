const express = require('express');
const managerController = require('../controllers/managerController');
const { verifyToken, isManager } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', managerController.register);
router.post('/login', managerController.login);

// Protected routes
router.post('/add-worker', verifyToken, isManager, managerController.addWorker);
router.get('/workers', verifyToken, isManager, managerController.getAllWorkers);
router.get('/tasks', verifyToken, isManager, managerController.getAllTasks);
router.post('/assign-task', verifyToken, isManager, managerController.assignTask);

module.exports = router;