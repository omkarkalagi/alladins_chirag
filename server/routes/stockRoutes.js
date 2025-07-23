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

// Zerodha Kite API routes
router.get('/kite/login-url', stockController.getKiteLoginURL);
router.post('/kite/session', stockController.generateKiteSession);
router.post('/kite/quotes', stockController.getMarketQuotes);
router.post('/kite/order', stockController.placeOrder);
router.get('/kite/callback', stockController.kiteCallback);

module.exports = router;