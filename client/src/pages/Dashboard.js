// src/pages/Dashboard.js
import React from 'react';
import MarketOverview from '../components/MarketOverview';
import PortfolioPerformance from '../components/PortfolioPerformance';
import SectorAnalysis from '../components/Dashboard/SectorAnalysis';
import AITrading from '../components/Dashboard/AITrading';
import AutoTradePanel from '../components/Dashboard/AutoTradePanel';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">AI Trading Dashboard</h1>
        <button className="bg-gradient-primary text-white py-2 px-6 rounded-lg font-bold shadow-md hover:opacity-90 transition">
          Trade Now
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketOverview />
        <PortfolioPerformance />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <SectorAnalysis />
        <AITrading />
        <AutoTradePanel />
      </div>
    </div>
  );
}

export default Dashboard;