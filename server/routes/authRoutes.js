const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login/email', authController.loginWithEmail);
router.post('/login/mobile', authController.loginWithMobile);
router.post('/otp/send', authController.sendOTP);
router.post('/otp/verify', authController.verifyOTP);
router.post('/register', authController.register);


module.exports = router;