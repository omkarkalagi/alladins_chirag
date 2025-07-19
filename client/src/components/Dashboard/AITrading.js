import React, { useState } from 'react';

function AITrading({ sector, onSelectStock }) {
  // Add state for prediction
  const [prediction, setPrediction] = useState(null);
  
  const stocks = {
    Technology: ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA'],
    Finance: ['JPM', 'BAC', 'GS', 'V', 'MA'],
    Healthcare: ['JNJ', 'PFE', 'UNH', 'MRK', 'ABT']
  };

  const analyzeSector = () => {
    // Simulate AI analysis
    setTimeout(() => {
      setPrediction({
        direction: Math.random() > 0.5 ? 'Bullish' : 'Bearish',
        confidence: (Math.random() * 100).toFixed(1)
      });
    }, 1000);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>AI Trading - {sector} Sector</h2>
      </div>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-700 mb-2">Stocks:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {stocks[sector].map((stock) => (
                <button
                  key={stock}
                  className="px-4 py-2 rounded-md font-medium"
                  style={{ 
                    background: 'rgba(59, 130, 246, 0.1)',
                    color: 'var(--primary)'
                  }}
                  onClick={() => onSelectStock(stock)}
                >
                  {stock}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <button 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={analyzeSector}
            >
              Analyze Sector
            </button>
            
            {prediction && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-2">AI Prediction:</h3>
                <p className="mb-1">Direction: 
                  <span className={`ml-2 font-bold ${prediction.direction === 'Bullish' ? 'text-green-600' : 'text-red-600'}`}>
                    {prediction.direction}
                  </span>
                </p>
                <p>Confidence: {prediction.confidence}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AITrading;