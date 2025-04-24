const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', userController.getUserProfile);

// Update user profile
router.put('/profile', userController.updateUserProfile);

// Get user's research history
router.get('/research', userController.getUserResearch);

module.exports = router;
