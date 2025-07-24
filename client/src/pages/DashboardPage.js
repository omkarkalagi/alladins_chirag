// DashboardPage.js
// This is the main dashboard page. All dashboard widgets should be managed here.
// TODO: Modularize dashboard widgets if the dashboard grows significantly.
import React from 'react';
import MarketOverview from '../components/Dashboard/MarketOverview';
import Portfolio from '../components/Dashboard/Portfolio';
import TradingPanel from '../components/Dashboard/TradingPanel';
import RecentActivity from '../components/Dashboard/RecentActivity';
import SectorPerformance from '../components/Dashboard/SectorPerformance';
import Recommendations from '../components/Dashboard/Recommendations';
import '../index.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-bg">
      <div className="dashboard-header">
        <div className="dashboard-brand">Alladins Chirag</div>
        <div className="dashboard-title">Live Trading Dashboard</div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-row">
          <MarketOverview />
          <SectorPerformance />
        </div>
        <div className="dashboard-row">
          <Portfolio />
          <Recommendations />
        </div>
        <div className="dashboard-row">
          <TradingPanel />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;