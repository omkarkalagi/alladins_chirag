// src/components/MarketOverview.js
import React from 'react';

function MarketOverview() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Market Overview</h2>
      </div>
      
      <div className="p-6">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-gray-800 font-bold">
            NIFEMA POWER AND MEMORIES TECHNICAL REPORT WARRIOR
          </p>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['NIFTY 50', 'SENSEX', 'BANKNIFTY', 'FINNIFTY'].map((index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-700">{index}</h3>
              <div className="flex items-center mt-2">
                <span className="text-green-600 font-bold text-lg">18,256.10</span>
                <span className="ml-2 text-green-600 text-sm">+0.85%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketOverview;