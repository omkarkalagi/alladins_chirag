const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Get Nifty 50 stocks
router.get('/nifty50', async (req, res) => {
  try {
    const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'HINDUNILVR', 
                     'ICICIBANK', 'KOTAKBANK', 'SBIN', 'BHARTIARTL', 'LT'];
    
    const promises = symbols.map(symbol => 
      axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${ALPHA_VANTAGE_API_KEY}`)
    );
    
    const results = await Promise.all(promises);
    const stocks = results.map(res => {
      const quote = res.data['Global Quote'];
      return {
        symbol: quote['01. symbol'].split('.')[0],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
      };
    }).filter(quote => quote.price);
    
    res.json(stocks);
  } catch (error) {
    console.error('Alpha Vantage API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// Get stock details by symbol
router.get('/:symbol', async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.symbol}.BSE&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    const quote = data['Global Quote'];
    if (!quote) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    
    const stock = {
      symbol: quote['01. symbol'].split('.')[0],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
    };
    
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

module.exports = router;