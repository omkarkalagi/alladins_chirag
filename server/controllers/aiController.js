const { predictMarket } = require('../services/tradingAlgo');

// AI prediction controller
exports.getMarketPrediction = async (req, res) => {
  try {
    const { symbol } = req.query;
    const prediction = await predictMarket(symbol);
    res.json({ success: true, prediction });
  } catch (error) {
    console.error('AI prediction error:', error);
    res.status(500).json({ success: false, message: 'Prediction failed' });
  }
};

exports.startAutoTrading = async (req, res) => {
  try {
    const { userId, strategy, riskLevel } = req.body;
    // Start auto trading logic would go here
    res.json({ success: true, message: 'Auto trading started' });
  } catch (error) {
    console.error('Auto trading start error:', error);
    res.status(500).json({ success: false, message: 'Failed to start auto trading' });
  }
};

exports.stopAutoTrading = async (req, res) => {
  try {
    const { userId } = req.body;
    // Stop auto trading logic would go here
    res.json({ success: true, message: 'Auto trading stopped' });
  } catch (error) {
    console.error('Auto trading stop error:', error);
    res.status(500).json({ success: false, message: 'Failed to stop auto trading' });
  }
};