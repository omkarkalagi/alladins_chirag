// DashboardPage.js
// This is the main dashboard page. All dashboard widgets should be managed here.
// TODO: Modularize dashboard widgets if the dashboard grows significantly.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/UI/Header';
import Sidebar from '../components/UI/Sidebar';
import MarketOverview from '../components/Dashboard/MarketOverview';
import Portfolio from '../components/Dashboard/Portfolio';
import TradingPanel from '../components/Dashboard/TradingPanel';
import RecentActivity from '../components/Dashboard/RecentActivity';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      setDateTime(now.toLocaleDateString('en-US', options));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="dashboard">
      <Header user={user} logout={logout} />
      
      <div className="dashboard-main">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="content">
          <div className="content-header">
            <div className="welcome-message">Welcome back, {user.name}!</div>
            <div className="date-time">{dateTime}</div>
          </div>
          
          <div className="grid-container">
            <MarketOverview />
            <Portfolio />
            <TradingPanel />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;