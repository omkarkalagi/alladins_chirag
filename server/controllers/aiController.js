const { predictMarket } = require('../services/tradingAlgo');

/**
 * GET /api/ai/predict
 * AI market prediction for a given symbol
 */
exports.getMarketPrediction = async (req, res) => {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({ success: false, message: 'Symbol is required' });
    }

    const prediction = await predictMarket(symbol);

    res.json({
      success: true,
      data: {
        symbol,
        prediction
      }
    });
  } catch (error) {
    console.error('AI prediction error:', error);
    res.status(500).json({ success: false, message: 'Prediction failed' });
  }
};

/**
 * POST /api/ai/auto-trade/start
 * Starts automated trading for a user
 */
exports.startAutoTrading = async (req, res) => {
  try {
    const { userId, strategy, riskLevel } = req.body;

    if (!userId || !strategy || !riskLevel) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // TODO: Integrate with your auto trading engine here

    res.json({ success: true, message: 'Auto trading started', data: { userId, strategy, riskLevel } });
  } catch (error) {
    console.error('Auto trading start error:', error);
    res.status(500).json({ success: false, message: 'Failed to start auto trading' });
  }
};

/**
 * POST /api/ai/auto-trade/stop
 * Stops automated trading for a user
 */
exports.stopAutoTrading = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // TODO: Integrate with your auto trading engine stop logic here

    res.json({ success: true, message: 'Auto trading stopped', data: { userId } });
  } catch (error) {
    console.error('Auto trading stop error:', error);
    res.status(500).json({ success: false, message: 'Failed to stop auto trading' });
  }
};
