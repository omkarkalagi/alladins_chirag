import React, { useState } from 'react';

const TradingPanel = () => {
  const [stock, setStock] = useState('RELIANCE');
  const [amount, setAmount] = useState(50000);
  const [risk, setRisk] = useState('Medium');

  const handleTrade = (action) => {
    alert(`Placed ${action} order for ${stock} at ₹${amount}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title"><i className="fas fa-exchange-alt"></i> Trading Panel</div>
      </div>
      <div className="card-body">
        <div className="trading-form">
          {/* Form fields same as your HTML */}
          <div className="btn-group">
            <button className="btn-trade btn-buy" onClick={() => handleTrade('buy')}>
              Buy
            </button>
            <button className="btn-trade btn-sell" onClick={() => handleTrade('sell')}>
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;