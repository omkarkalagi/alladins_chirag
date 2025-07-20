import React, { useState } from 'react';

const TradingPanel = ({ onExecuteTrade }) => {
  const [symbol, setSymbol] = useState('');
  const [amount, setAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [orderType, setOrderType] = useState('market');

  const handleSubmit = (e) => {
    e.preventDefault();
    onExecuteTrade({ symbol, amount: parseFloat(amount), tradeType, orderType });
  };

  return (
    <div className="trading-panel">
      <h3>Trading Panel</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Symbol</label>
          <input 
            type="text" 
            value={symbol} 
            onChange={(e) => setSymbol(e.target.value.toUpperCase())} 
            placeholder="e.g. BTC" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Amount ($)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0.00" 
            min="0"
            step="0.01"
            required 
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Order Type</label>
            <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop">Stop Loss</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="trade-button">
          {tradeType === 'buy' ? 'Buy' : 'Sell'} {symbol || 'Asset'}
        </button>
      </form>
    </div>
  );
};

export default TradingPanel;