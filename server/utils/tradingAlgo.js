const nseService = require('../services/nseService');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Pre-trained model (simplified for example)
let model;

// Load pre-trained model
const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel('file://./ai_model/model.json');
  }
  return model;
};

// Predict next price movement
exports.predictNextMove = async (symbol) => {
  const model = await loadModel();
  const data = await nseService.getLiveNseData(symbol);
  
  // Prepare input tensor (simplified)
  const input = tf.tensor2d([
    [data.lastPrice, data.change, data.pChange]
  ]);
  
  // Make prediction
  const prediction = model.predict(input);
  const [confidence, direction] = prediction.arraySync()[0];
  
  // Calculate targets (example logic)
  const targetEntry = direction > 0.5 ? 
    data.lastPrice * 0.99 : 
    data.lastPrice * 1.01;
    
  const targetExit = direction > 0.5 ? 
    data.lastPrice * 1.05 : 
    data.lastPrice * 0.95;
  
  return {
    confidence: Math.round(confidence * 100),
    direction: direction > 0.5 ? 'up' : 'down',
    targetEntry: parseFloat(targetEntry.toFixed(2)),
    targetExit: parseFloat(targetExit.toFixed(2))
  };
};

// Train model function (run separately)
exports.trainModel = async () => {
  // This would use historical data to train the model
  // Implementation depends on your data sources
};