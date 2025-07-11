import React, { useState } from 'react';
import SectorAnalysis from './SectorAnalysis';
import AITrading from './AITrading';
import AutoTradePanel from './AutoTradePanel';
import '../Dashboard.css'; // Component-specific CSS

function Dashboard() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <div className="dashboard">
      <h1 className="text-center">Trading Dashboard</h1>
      
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