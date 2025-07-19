import express from 'express';
import { signup, login, sendOtp, verifyOtp, logout, checkAuth } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/logout', logout);
router.get('/check', checkAuth);

export default router;
