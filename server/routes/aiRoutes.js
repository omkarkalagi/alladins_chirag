const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// AI-powered endpoints
router.get('/recommendations', aiController.getRecommendations);
router.post('/auto-trade', aiController.autoTrade);

module.exports = router;