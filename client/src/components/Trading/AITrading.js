// src/components/Trading/AITrading.js

import React, { useState } from 'react';
import TradeExecution from './TradeExecution';
import AutoTradePanel from './AutoTradePanel';
import SectorAnalysis from './SectorAnalysis';

const AITrading = () => {
  const [activeTab, setActiveTab] = useState('manual');

  return (
    <div className="trading-container">
      <div className="trading-tabs">
        <button 
          className={activeTab === 'manual' ? 'active' : ''}
          onClick={() => setActiveTab('manual')}
        >
          Manual Trading
        </button>
        <button 
          className={activeTab === 'auto' ? 'active' : ''}
          onClick={() => setActiveTab('auto')}
        >
          Auto Trading
        </button>
        <button 
          className={activeTab === 'analysis' ? 'active' : ''}
          onClick={() => setActiveTab('analysis')}
        >
          Sector Analysis
        </button>
      </div>

      <div className="trading-content">
        {activeTab === 'manual' && <TradeExecution />}
        {activeTab === 'auto' && <AutoTradePanel />}
        {activeTab === 'analysis' && <SectorAnalysis />}
      </div>
    </div>
  );
};

export default AITrading;
