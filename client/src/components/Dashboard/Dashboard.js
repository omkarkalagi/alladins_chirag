import React, { useState } from 'react';
import SectorAnalysis from './SectorAnalysis';
import AITrading from './AITrading';
import AutoTradePanel from './AutoTradePanel';
import MarketOverview from '../components/MarketOverview';
import PortfolioPerformance from '../components/PortfolioPerformance';
import React from 'react';
import './Dashboard.css'; // Add this import
import './Dashboard.css'; // Assuming you have a CSS file for Dashboard styles
// Dashboard.js
// This file is part of the AI Trading Dashboard, which includes sector analysis,
// AI trading features, and an auto trade panel for selected stocks.  
// It allows users to select a sector, view AI trading suggestions, and execute trades automatically.
// It is designed to provide a comprehensive trading experience with AI-driven insights.
// It is part of the client-side application built with React.
// It is designed to provide a comprehensive trading experience with AI-driven insights.
function Dashboard() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <div className="dashboard">
      <h1>AI Trading Dashboard</h1>
      
      <div className="dashboard-section">
        <SectorAnalysis onSelectSector={setSelectedSector} />
      </div>

      {selectedSector && (
        <div className="dashboard-section mt-6">
          <AITrading sector={selectedSector} onSelectStock={setSelectedStock} />
        </div>
      )}

      {selectedStock && (
        <div className="dashboard-section mt-6">
          <AutoTradePanel stock={selectedStock} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;