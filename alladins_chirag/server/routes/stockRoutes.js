const express = require('express');
const router = express.Router();
const axios = require('axios');

// Use Alpha Vantage as free stock API
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Get Nifty 50 stocks
router.get('/nifty50', async (req, res) => {
  try {
    // In real app, you might have a list of Nifty 50 symbols
    const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'HINDUNILVR', 
                    'ICICIBANK', 'KOTAKBANK', 'SBIN', 'BHARTIARTL', 'LT'];
    
    const promises = symbols.map(symbol => 
      axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${ALPHA_VANTAGE_API_KEY}`)
    );
    
    const results = await Promise.all(promises);
    const stocks = results.map(res => res.data['Global Quote']);
    
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;