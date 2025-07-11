import React, { useState } from 'react';

function AutoTradePanel({ stock }) {
  const [settings, setSettings] = useState({
    amount: 1000,
    risk: 'Medium',
    strategy: 'Momentum'
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const startTrading = () => {
    alert(`Auto trading started for ${stock} with $${settings.amount}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Auto Trade - {stock}</h2>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="input-group">
            <label className="input-label">Investment Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={settings.amount}
              onChange={handleChange}
              className="input-field"
              min="100"
              step="100"
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Risk Level</label>
            <select 
              name="risk" 
              value={settings.risk} 
              onChange={handleChange}
              className="input-field"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className="input-group">
            <label className="input-label">Trading Strategy</label>
            <select 
              name="strategy" 
              value={settings.strategy} 
              onChange={handleChange}
              className="input-field"
            >
              <option value="Momentum">Momentum</option>
              <option value="MeanReversion">Mean Reversion</option>
              <option value="Breakout">Breakout</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            className="btn btn-primary"
            onClick={startTrading}
          >
            Start Auto Trading
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-bold">Trading Preview:</h3>
          <p>Stock: {stock}</p>
          <p>Amount: ${settings.amount}</p>
          <p>Risk: {settings.risk}</p>
          <p>Strategy: {settings.strategy}</p>
        </div>
      </div>
    </div>
  );
}

export default AutoTradePanel;