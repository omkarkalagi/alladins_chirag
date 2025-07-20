const axios = require('axios');
const User = require('../models/User');

// Get real-time stock data
exports.getStockData = async (req, res) => {
  try {
    const { symbol } = req.params;
    
    // In a real app, you'd call a financial API
    const mockData = {
      symbol,
      price: (Math.random() * 1000).toFixed(2),
      change: (Math.random() * 10 - 5).toFixed(2),
      changePercent: (Math.random() * 5 - 2.5).toFixed(2) + '%',
      open: (Math.random() * 1000).toFixed(2),
      high: (Math.random() * 1000).toFixed(2),
      low: (Math.random() * 1000).toFixed(2),
      volume: Math.floor(Math.random() * 10000000)
    };
    
    res.json(mockData);
  } catch (error) {
    console.error('Stock data error:', error);
    res.status(500).json({ message: 'Failed to get stock data' });
  }
};

// Execute a trade
exports.executeTrade = async (req, res) => {
  try {
    const { userId, symbol, quantity, action } = req.body;
    
    // Get user
    const user = await User.findById(userId);
    
    // Get current price (simulated)
    const price = parseFloat((Math.random() * 1000).toFixed(2));
    const total = price * quantity;
    
    if (action === 'buy') {
      if (user.balance < total) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
      user.balance -= total;
    } else if (action === 'sell') {
      // Check if user has enough shares
      const asset = user.portfolio.find(item => item.symbol === symbol);
      if (!asset || asset.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient shares' });
      }
      user.balance += total;
      asset.quantity -= quantity;
      
      if (asset.quantity === 0) {
        user.portfolio = user.portfolio.filter(item => item.symbol !== symbol);
      }
    }
    
    // Add to portfolio if buying
    if (action === 'buy') {
      const existing = user.portfolio.find(item => item.symbol === symbol);
      if (existing) {
        existing.quantity += quantity;
        existing.avgPrice = 
          ((existing.avgPrice * (existing.quantity - quantity)) + (price * quantity)) / 
          existing.quantity;
      } else {
        user.portfolio.push({ symbol, quantity, avgPrice: price });
      }
    }
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: `Trade executed: ${action} ${quantity} ${symbol} at $${price}`,
      newBalance: user.balance
    });
  } catch (error) {
    console.error('Trade execution error:', error);
    res.status(500).json({ message: 'Trade execution failed' });
  }
};

// Get user portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('portfolio balance');
    res.json(user);
  } catch (error) {
    console.error('Portfolio error:', error);
    res.status(500).json({ message: 'Failed to get portfolio' });
  }
};