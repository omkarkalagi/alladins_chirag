import React, { useState } from 'react';

const TradeExecution = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [tradeType, setTradeType] = useState('buy');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const tradeData = {
      symbol,
      quantity: parseInt(quantity),
      orderType,
      tradeType,
      limitPrice: orderType === 'limit' ? parseFloat(limitPrice) : null,
      stopPrice: orderType === 'stop' ? parseFloat(stopPrice) : null
    };
    
    console.log('Executing trade:', tradeData);
    // Here you would call your trading service
  };

  return (
    <div className="trade-execution">
      <h3>Execute Trade</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Symbol</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="e.g. AAPL"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Order Type</label>
            <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop">Stop</option>
              <option value="stop-limit">Stop-Limit</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Trade Type</label>
            <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="short">Short</option>
              <option value="cover">Cover</option>
            </select>
          </div>
        </div>
        
        {orderType === 'limit' && (
          <div className="form-group">
            <label>Limit Price ($)</label>
            <input
              type="number"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </div>
        )}
        
        {(orderType === 'stop' || orderType === 'stop-limit') && (
          <div className="form-group">
            <label>Stop Price ($)</label>
            <input
              type="number"
              value={stopPrice}
              onChange={(e) => setStopPrice(e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </div>
        )}
        
        <button type="submit" className="execute-btn">
          {tradeType === 'buy' ? 'Buy' : tradeType === 'sell' ? 'Sell' : tradeType === 'short' ? 'Short' : 'Cover'} {symbol || 'Asset'}
        </button>
      </form>
      
      <div className="market-data">
        <h4>Current Market Data</h4>
        <div className="data-row">
          <span>Current Price:</span>
          <span>$152.34</span>
        </div>
        <div className="data-row">
          <span>24h Change:</span>
          <span className="positive">+1.2%</span>
        </div>
        <div className="data-row">
          <span>Bid/Ask:</span>
          <span>$152.30 / $152.38</span>
        </div>
      </div>
    </div>
  );
};

export default TradeExecution;