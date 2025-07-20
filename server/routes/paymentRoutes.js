const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.post('/create-intent', authMiddleware, paymentController.createPaymentIntent);
router.post('/confirm', authMiddleware, paymentController.confirmPayment);

module.exports = router;