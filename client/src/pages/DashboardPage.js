// DashboardPage.js
// This is the main dashboard page. All dashboard widgets should be managed here.
// TODO: Modularize dashboard widgets if the dashboard grows significantly.
import React from 'react';
import MarketOverview from '../components/Dashboard/MarketOverview';
import Portfolio from '../components/Dashboard/Portfolio';
import TradingPanel from '../components/Dashboard/TradingPanel';
import RecentActivity from '../components/Dashboard/RecentActivity';
import Header from '../components/UI/Header';
import Sidebar from '../components/UI/Sidebar';
import '../index.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content">
          <div className="dashboard-row">
            <MarketOverview />
            <Portfolio />
          </div>
          <div className="dashboard-row">
            <TradingPanel />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;