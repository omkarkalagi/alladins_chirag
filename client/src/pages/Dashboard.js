import React, { useEffect } from 'react';
import Header from '../components/UI/Header';
import Sidebar from '../components/UI/Sidebar';
import TopBar from '../components/UI/TopBar';
import MarketOverview from '../components/Dashboard/MarketOverview';
import Portfolio from '../components/Dashboard/Portfolio';
import TradingInsights from '../components/Dashboard/TradingInsights';
import ActivityLog from '../components/Dashboard/ActivityLog';
import TradingPanel from '../components/Dashboard/TradingPanel';

const Dashboard = () => {
  useEffect(() => {
    const fetchKiteData = async () => {
      // Integrate Zerodha Kite API calls here
      console.log('Fetching data from Kite API...');
    };
    fetchKiteData();
  }, []);

  return (
    <div className="dashboard-page">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="content-area">
          <TopBar />
          <div className="dashboard-content">
            <MarketOverview />
            <Portfolio />
            <TradingInsights />
            <TradingPanel />
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
