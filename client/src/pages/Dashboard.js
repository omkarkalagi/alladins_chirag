import React from 'react';
import Header from '../components/UI/Header';
import Sidebar from '../components/UI/Sidebar';
import TopBar from '../components/UI/TopBar';
import MarketOverview from '../components/Dashboard/MarketOverview';
import Portfolio from '../components/Dashboard/Portfolio';
import TradingInsights from '../components/Dashboard/TradingInsights';
import ActivityLog from '../components/Dashboard/ActivityLog';
import TradingPanel from '../components/Dashboard/TradingPanel';

const Dashboard = () => {
  // Sample data for demonstration
  const markets = [
    { name: 'S&P 500', price: 4500.34, change: 0.8 },
    { name: 'NASDAQ', price: 15200.45, change: 1.2 },
    { name: 'DOW', price: 34500.67, change: -0.3 },
    { name: 'Crypto', price: 1.8, change: 2.4 }
  ];

  const holdings = [
    { symbol: 'AAPL', shares: 10, price: 152.34, value: 1523.40, change: 1.2 },
    { symbol: 'MSFT', shares: 5, price: 340.12, value: 1700.60, change: 0.8 },
    { symbol: 'BTC', shares: 0.25, price: 42567.89, value: 10641.97, change: 2.4 },
    { symbol: 'ETH', shares: 2.5, price: 2345.67, value: 5864.18, change: 1.8 }
  ];

  const activities = [
    { timestamp: '10:30 AM', action: 'Bought', symbol: 'AAPL', amount: 1523.40, type: 'buy' },
    { timestamp: 'Yesterday', action: 'Sold', symbol: 'TSLA', amount: 850.50, type: 'sell' },
    { timestamp: 'Dec 12', action: 'Deposit', symbol: 'Cash', amount: 5000.00, type: 'deposit' },
    { timestamp: 'Dec 10', action: 'Bought', symbol: 'ETH', amount: 5864.18, type: 'buy' }
  ];

  return (
    <div className="dashboard-page">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="content-area">
          <TopBar />
          <div className="dashboard-content">
            <div className="dashboard-row">
              <div className="dashboard-column large">
                <MarketOverview markets={markets} />
              </div>
              <div className="dashboard-column">
                <Portfolio holdings={holdings} />
              </div>
            </div>
            
            <div className="dashboard-row">
              <div className="dashboard-column">
                <TradingInsights marketData={markets} />
              </div>
              <div className="dashboard-column">
                <TradingPanel onExecuteTrade={(trade) => console.log('Execute trade:', trade)} />
              </div>
              <div className="dashboard-column">
                <ActivityLog activities={activities} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;