// src/components/MarketOverview.js
import React from 'react';

function MarketOverview() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-primary px-6 py-4">
        <h2 className="text-xl font-bold text-white">Market Overview</h2>
      </div>
      
      <div className="p-6">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-gray-800 font-bold">
            NIFEMA POWER AND MEMORIES TECHNICAL REPORT WARRIOR
          </p>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <MarketIndexCard title="NIFTY 50" value="18,432.45" change="+0.85%" />
          <MarketIndexCard title="SENSEX" value="62,187.34" change="+0.92%" />
          <MarketIndexCard title="NIFTY BANK" value="42,876.45" change="+0.92%" />
          <MarketIndexCard title="NIFTY PHARMA" value="14,321.60" change="+0.45%" />
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-700">Most Volatile Stocks</h3>
            <span className="text-sm text-success font-medium">Real-time Data</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-medium">RELIANCE</span>
              <span className="text-success">+2.3%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">HDFC BANK</span>
              <span className="text-danger">-1.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">INFOSYS</span>
              <span className="text-success">+3.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MarketIndexCard = ({ title, value, change }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <div className="flex items-center mt-2">
        <span className="font-bold text-lg">{value}</span>
        <span className={`ml-2 text-sm ${isPositive ? 'text-success' : 'text-danger'}`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export default MarketOverview;