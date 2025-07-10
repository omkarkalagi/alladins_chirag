import React, { useState } from 'react';
import SectorAnalysis from './SectorAnalysis';
import AITrading from './AITrading';
import AutoTradePanel from './AutoTradePanel';

// Dashboard component
function Dashboard() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <div>
      {/* Your existing dashboard content here */}
      
      <div className="mt-6">
        <SectorAnalysis onSelectSector={setSelectedSector} />
      </div>

      {selectedSector && (
        <div className="mt-6">
          <AITrading sector={selectedSector} onSelectStock={setSelectedStock} />
        </div>
      )}

      {selectedStock && (
        <div className="mt-6">
          <AutoTradePanel stock={selectedStock} />
        </div>
      )}
    </div>
  );
}

// Export as default
export default Dashboard;