// src/components/PortfolioPerformance.js
import React from 'react';

function PortfolioPerformance() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-primary px-6 py-4">
        <h2 className="text-xl font-bold text-white">Portfolio Performance</h2>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-700">TIN™ Portfolio</h3>
            <span className="text-sm text-success font-medium">Active</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Value</span>
              <span className="font-bold">¥1,254,870</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Today's Gain</span>
              <span className="text-success font-bold">+¥24,650</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overall Return</span>
              <span className="text-success font-bold">+18.45%</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-700 mb-3">Investment Budget</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-2">Enter Your Investment Budget (₹)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="500000"
              />
            </div>
            
            <div>
              <label className="block text-gray-600 text-sm mb-2">Select Risk Profile</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>Low Risk</option>
                <option selected>Moderate Risk</option>
                <option>High Risk</option>
              </select>
            </div>
            
            <button className="w-full bg-gradient-primary text-white py-3 rounded-lg font-bold shadow-md hover:opacity-90 transition">
              Optimize Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPerformance;