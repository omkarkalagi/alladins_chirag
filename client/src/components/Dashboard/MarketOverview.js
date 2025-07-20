import React from 'react';

const MarketOverview = ({ markets }) => {
  return (
    <div className="market-overview">
      <h3>Market Overview</h3>
      <div className="market-grid">
        {markets.map((market, index) => (
          <div className="market-card" key={index}>
            <h4>{market.name}</h4>
            <p className={`price ${market.change >= 0 ? 'positive' : 'negative'}`}>
              ${market.price.toFixed(2)}
              <span> ({market.change.toFixed(2)}%)</span>
            </p>
            <div className="volume">Vol: {market.volume}M</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;