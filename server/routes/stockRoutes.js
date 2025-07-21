// routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stockController = require('../controllers/stockController');

// Protected stock routes
router.get('/markets', auth, stockController.getMarketData);
router.post('/trades', auth, stockController.executeTrade);
router.get('/historical/:symbol', auth, stockController.getHistoricalData);
router.get('/portfolio', auth, stockController.getPortfolio);

module.exports = router;