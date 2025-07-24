import React, { useEffect, useState } from 'react';

const mockRecommendations = [
  { symbol: 'RELIANCE', action: 'Buy', price: 2600, reason: 'Strong uptrend, sector leader' },
  { symbol: 'TCS', action: 'Hold', price: 3550, reason: 'Stable, wait for breakout' },
  { symbol: 'BANKNIFTY', action: 'Sell', price: 48000, reason: 'Overbought, sector rotation' },
];

const Recommendations = () => {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    // Replace with live AI/ML API call for real data
    setRecs(mockRecommendations);
  }, []);

  return (
    <div className="recommendations card">
      <h2>What to Buy/Sell Now</h2>
      <ul>
        {recs.map((rec, idx) => (
          <li key={idx} style={{ color: rec.action === 'Buy' ? 'green' : rec.action === 'Sell' ? 'red' : '#888' }}>
            <b>{rec.symbol}</b>: {rec.action} @ ₹{rec.price} <span style={{ fontSize: 13, color: '#888' }}>({rec.reason})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations; 