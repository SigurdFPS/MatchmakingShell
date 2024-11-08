// File: routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Supabase uses email for authentication, so ensure that email and password are handled
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
