const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOtp);

router.get('/verify', auth, authController.verifyToken);

module.exports = router;
