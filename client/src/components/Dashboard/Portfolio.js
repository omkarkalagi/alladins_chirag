import React from 'react';

const Portfolio = ({ holdings }) => {
  const totalValue = holdings.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="portfolio">
      <h3>Your Portfolio</h3>
      <div className="portfolio-summary">
        <div className="total-value">${totalValue.toFixed(2)}</div>
        <div className="performance">+2.3% today</div>
      </div>
      
      <div className="holdings-list">
        {holdings.map((holding, index) => (
          <div className="holding-item" key={index}>
            <div className="symbol">{holding.symbol}</div>
            <div className="details">
              <span>{holding.shares} shares</span>
              <span>${holding.price.toFixed(2)}</span>
            </div>
            <div className={`value ${holding.change >= 0 ? 'positive' : 'negative'}`}>
              ${holding.value.toFixed(2)}
              <span>({holding.change.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;