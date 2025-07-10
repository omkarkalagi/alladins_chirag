const aiService = require('../services/aiService');

// Get AI recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const { sector } = req.query;
    const sectors = await aiService.getSectorVolatility();
    
    // Get top 5 volatile stocks in sector
    const sectorStocks = sectors.find(s => s.name === sector)?.topStocks.slice(0, 5) || [];
    
    // Get predictions for each stock
    const recommendations = await Promise.all(
      sectorStocks.map(symbol => aiService.generateTradeSignals(symbol))
    );
    
    res.json({
      sector,
      volatility: sectors.find(s => s.name === sector)?.change || 0,
      recommendations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Execute auto-trade
exports.autoTrade = async (req, res) => {
  try {
    const { userId, symbol, amount } = req.body;
    const trade = await aiService.executeAutoTrade(userId, symbol, amount);
    
    if (trade) {
      // Save to database (implementation needed)
      res.json({ success: true, trade });
    } else {
      res.json({ 
        success: false, 
        message: 'No high-confidence trade opportunity found' 
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};