const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.get('/predict', authMiddleware, aiController.getMarketPrediction);
router.post('/auto-trade/start', authMiddleware, aiController.startAutoTrading);
router.post('/auto-trade/stop', authMiddleware, aiController.stopAutoTrading);

module.exports = router;