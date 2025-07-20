const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authMiddleware = require('../middleware/auth');

// Public route
router.get('/:symbol', stockController.getStockData);

// Protected routes
router.post('/trade', authMiddleware, stockController.executeTrade);
router.get('/portfolio/:userId', authMiddleware, stockController.getPortfolio);

module.exports = router;