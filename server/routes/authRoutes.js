// alladins_chirag/server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ Register user
router.post('/register', authController.register);

// ✅ Login user
router.post('/login', authController.login);

// ✅ Get user profile (secured in controller)
router.get('/profile', authController.getUserProfile);

module.exports = router;
