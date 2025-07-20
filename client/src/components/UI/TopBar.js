import React, { useState } from 'react';

const TopBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const notifications = 3; // Removed useState since it's static and not updated

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement search functionality
  };

  return (
    <div className="top-bar">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assets, news, or analysis..."
          />
          <button type="submit">
            <span className="search-icon">🔍</span>
          </button>
        </form>
      </div>
      
      <div className="top-bar-actions">
        <button className="notifications-btn">
          <span className="icon">🔔</span>
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </button>
        <button className="alerts-btn">
          <span className="icon">⚠️</span>
        </button>
        <button className="help-btn">
          <span className="icon">❓</span>
        </button>
      </div>
      
      <div className="market-ticker">
        <div className="ticker-item">
          <span className="symbol">BTC/USD</span>
          <span className="price">$42,567.89</span>
          <span className="change positive">+2.4%</span>
        </div>
        <div className="ticker-item">
          <span className="symbol">ETH/USD</span>
          <span className="price">$2,345.67</span>
          <span className="change positive">+1.8%</span>
        </div>
        <div className="ticker-item">
          <span className="symbol">AAPL</span>
          <span className="price">$152.34</span>
          <span className="change negative">-0.3%</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;