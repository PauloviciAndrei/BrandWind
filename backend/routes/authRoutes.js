const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateCredentials = require('../middleware/validateCredentials');

// Register new user
router.post('/register', validateCredentials, authController.register);

// Login
router.post('/login', authController.login);

// Forgot Password
router.post('/forgot-password', authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
