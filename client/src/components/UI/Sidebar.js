import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { id: 'market', icon: 'fas fa-chart-line', label: 'Market' },
    { id: 'portfolio', icon: 'fas fa-wallet', label: 'Portfolio' },
    { id: 'trading', icon: 'fas fa-exchange-alt', label: 'Trading' },
    { id: 'insights', icon: 'fas fa-lightbulb', label: 'AI Insights' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  return (
    <div className="sidebar">
      {menuItems.map(item => (
        <a 
          key={item.id}
          href="#" 
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(item.id);
          }}
        >
          <i className={item.icon}></i> {item.label}
        </a>
      ))}
    </div>
  );
};

export default Sidebar;