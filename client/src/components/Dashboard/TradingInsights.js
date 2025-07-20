import React from 'react';
import { predictMarketTrend } from '../../ai/predictor';

const TradingInsights = ({ marketData }) => {
  const prediction = predictMarketTrend(marketData);
  
  return (
    <div className="trading-insights">
      <h3>Trading Insights</h3>
      <div className="insight-card">
        <div className="recommendation">
          <strong>Recommendation:</strong> {prediction === 'Bullish' ? 'BUY' : 'SELL'}
        </div>
        <div className="analysis">
          <p>Market volatility is low with steady growth patterns observed in tech stocks.</p>
          <p>Strong buy signals detected for AI-related assets.</p>
        </div>
        <div className="confidence">
          Confidence Level: 84%
        </div>
      </div>
    </div>
  );
};

export default TradingInsights;