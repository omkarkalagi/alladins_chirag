const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// ✅ AI prediction route (protected)
router.get('/predict', authMiddleware, aiController.getMarketPrediction);

// ✅ Start auto trading (protected)
router.post('/auto-trade/start', authMiddleware, aiController.startAutoTrading);

// ✅ Stop auto trading (protected)
router.post('/auto-trade/stop', authMiddleware, aiController.stopAutoTrading);

module.exports = router;
