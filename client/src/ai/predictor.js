import * as tf from '@tensorflow/tfjs';

// Pre-trained LSTM model for stock prediction
export async function loadModel() {
  const model = await tf.loadLayersModel('/models/stock-predictor/model.json');
  return model;
}

export async function predict(symbol, historicalData) {
  const model = await loadModel();
  
  // Preprocess data
  const prices = historicalData.map(d => d.close);
  const input = tf.tensor3d([prices.slice(-30)], [1, 30, 1]);
  
  // Make prediction
  const prediction = model.predict(input);
  const [buyProbability, sellProbability] = prediction.dataSync();
  
  // Calculate targets
  const lastPrice = prices[prices.length - 1];
  const entryPrice = lastPrice * (buyProbability > sellProbability ? 0.995 : 1.005);
  const targetPrice = lastPrice * (buyProbability > sellProbability ? 1.03 : 0.97);
  
  return {
    symbol,
    action: buyProbability > sellProbability ? 'BUY' : 'SELL',
    confidence: Math.max(buyProbability, sellProbability) * 100,
    entryPrice: parseFloat(entryPrice.toFixed(2)),
    targetPrice: parseFloat(targetPrice.toFixed(2))
  };
}