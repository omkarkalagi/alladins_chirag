const nseService = require('./nseService');
const { predictNextMove } = require('./tradingAlgo');

// AI prediction core
exports.generateTradeSignals = async (symbol) => {
  const stockData = await nseService.getLiveNseData(symbol);
  const prediction = await predictNextMove(symbol);
  
  return {
    symbol,
    currentPrice: stockData.lastPrice,
    prediction,
    action: prediction.confidence > 0.8 ? 
      (prediction.direction === 'up' ? 'BUY' : 'SELL') : 'HOLD',
    targetEntry: prediction.targetEntry,
    targetExit: prediction.targetExit,
    confidence: prediction.confidence,
    sector: stockData.sector
  };
};

// Auto-trade execution
exports.executeAutoTrade = async (userId, symbol, amount) => {
  const signal = await this.generateTradeSignals(symbol);
  const quantity = Math.floor(amount / signal.currentPrice);
  
  if (signal.action === 'BUY' && signal.confidence > 0.85) {
    return {
      action: 'BUY',
      symbol,
      quantity,
      executedPrice: signal.currentPrice,
      targetExit: signal.targetExit,
      timestamp: new Date()
    };
  } else if (signal.action === 'SELL' && signal.confidence > 0.85) {
    return {
      action: 'SELL',
      symbol,
      quantity,
      executedPrice: signal.currentPrice,
      targetExit: signal.targetExit,
      timestamp: new Date()
    };
  }
  
  return null;
};