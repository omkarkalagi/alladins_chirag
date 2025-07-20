import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" activeClassName="active">
          <span className="icon">📊</span> Dashboard
        </NavLink>
        <NavLink to="/portfolio" activeClassName="active">
          <span className="icon">💰</span> Portfolio
        </NavLink>
        <NavLink to="/trading" activeClassName="active">
          <span className="icon">📈</span> Trading
        </NavLink>
        <NavLink to="/watchlist" activeClassName="active">
          <span className="icon">👀</span> Watchlist
        </NavLink>
        <NavLink to="/research" activeClassName="active">
          <span className="icon">🔍</span> Research
        </NavLink>
        <NavLink to="/history" activeClassName="active">
          <span className="icon">🕒</span> History
        </NavLink>
        <NavLink to="/settings" activeClassName="active">
          <span className="icon">⚙️</span> Settings
        </NavLink>
      </nav>
      
      <div className="quick-actions">
        <h4>Quick Actions</h4>
        <button className="action-btn">Deposit Funds</button>
        <button className="action-btn">Withdraw</button>
        <button className="action-btn">New Trade</button>
      </div>
      
      <div className="market-status">
        <h4>Market Status</h4>
        <div className="status-indicator open">OPEN</div>
        <div className="market-summary">
          <div>S&P 500: <span className="positive">+0.8%</span></div>
          <div>NASDAQ: <span className="positive">+1.2%</span></div>
          <div>DOW: <span className="negative">-0.3%</span></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;