// controllers/stockController.js
const User = require('../models/User');
const axios = require('axios');
const { KITE_API_KEY } = process.env;

// Get market data
exports.getMarketData = async (req, res) => {
  try {
    // This would actually call your brokerage API
    const response = await axios.get(`https://api.kite.trade/quote`, {
      headers: { 
        'X-Kite-Version': 3, 
        'Authorization': `token ${KITE_API_KEY}` 
      }
    });
    
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: 'Failed to fetch market data',
      error: err.message 
    });
  }
};

// Execute trade
exports.executeTrade = async (req, res) => {
  try {
    const { symbol, quantity, action } = req.body;
    const userId = req.user.id;
    
    // Get user with portfolio data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Placeholder for actual trading logic
    // This would call your brokerage API and update user portfolio
    
    // Update user portfolio
    const existingStock = user.portfolio.find(item => item.symbol === symbol);
    
    if (action === 'buy') {
      if (existingStock) {
        existingStock.quantity += parseInt(quantity);
      } else {
        user.portfolio.push({
          symbol,
          quantity: parseInt(quantity),
          avgPrice: 100 // Placeholder price
        });
      }
    } else if (action === 'sell') {
      if (!existingStock || existingStock.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient shares to sell' });
      }
      existingStock.quantity -= parseInt(quantity);
      if (existingStock.quantity === 0) {
        user.portfolio = user.portfolio.filter(item => item.symbol !== symbol);
      }
    }
    
    await user.save();
    
    res.json({ 
      message: `Trade executed: ${action} ${quantity} shares of ${symbol}`,
      portfolio: user.portfolio
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: 'Trade execution failed',
      error: err.message 
    });
  }
};

// Get historical data
exports.getHistoricalData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { timeframe } = req.query;
    
    // This would actually call your brokerage API
    const response = await axios.get(
      `https://api.kite.trade/historical/${symbol}/${timeframe}`,
      { 
        headers: { 
          'Authorization': `token ${KITE_API_KEY}` 
        } 
      }
    );
    
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: 'Failed to fetch historical data',
      error: err.message 
    });
  }
};

// Get user portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('portfolio balance');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      portfolio: user.portfolio,
      balance: user.balance
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      message: 'Failed to fetch portfolio',
      error: err.message 
    });
  }
};