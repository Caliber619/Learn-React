const express = require('express');
const studentController = require('../controllers/StudentController');
const { verifyToken, isStudent } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', studentController.register);
router.post('/login', studentController.login);

// Protected routes
router.post('/request-cleaning', verifyToken, isStudent, studentController.createCleaningRequest);
router.get('/cleaning-requests', verifyToken, isStudent, studentController.getCleaningRequests);

module.exports = router;