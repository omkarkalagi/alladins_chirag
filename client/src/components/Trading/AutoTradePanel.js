import React, { useState } from 'react';

const AutoTradePanel = () => {
  const [strategy, setStrategy] = useState('momentum');
  const [riskLevel, setRiskLevel] = useState('medium');
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => {
    setIsActive(true);
    console.log(`Starting ${strategy} strategy with ${riskLevel} risk`);
  };

  const handleStop = () => {
    setIsActive(false);
    console.log("Auto trading stopped");
  };

  return (
    <div className="auto-trade-panel">
      <h3>Automated Trading</h3>
      
      <div className="strategy-selector">
        <label>Trading Strategy:</label>
        <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option value="momentum">Momentum Trading</option>
          <option value="mean-reversion">Mean Reversion</option>
          <option value="arbitrage">Arbitrage</option>
          <option value="trend-following">Trend Following</option>
        </select>
      </div>

      <div className="risk-selector">
        <label>Risk Level:</label>
        <div className="risk-options">
          {['low', 'medium', 'high'].map(level => (
            <label key={level}>
              <input
                type="radio"
                value={level}
                checked={riskLevel === level}
                onChange={() => setRiskLevel(level)}
              />
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="capital-allocation">
        <label>Capital Allocation:</label>
        <input type="range" min="0" max="100" value="75" />
        <span>75% of portfolio</span>
      </div>

      <div className="auto-trade-actions">
        {!isActive ? (
          <button className="start-btn" onClick={handleStart}>
            Start Auto Trading
          </button>
        ) : (
          <button className="stop-btn" onClick={handleStop}>
            Stop Auto Trading
          </button>
        )}
      </div>

      <div className="performance-preview">
        <h4>Strategy Performance</h4>
        <div className="performance-metrics">
          <div>30d Return: +8.2%</div>
          <div>Win Rate: 68.5%</div>
          <div>Max Drawdown: -12.3%</div>
        </div>
      </div>
    </div>
  );
};

export default AutoTradePanel;