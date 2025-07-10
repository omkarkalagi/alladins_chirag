import React from 'react';
import { FaChartLine, FaSyncAlt } from 'react-icons/fa';

const MarketOverview = ({ marketData }) => {
  if (!marketData) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <FaChartLine className="mr-2 text-blue-600" /> Market Overview
          </h2>
          <div className="text-sm text-gray-500 flex items-center">
            <FaSyncAlt className="mr-1 animate-spin" /> Loading...
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <FaChartLine className="mr-2 text-blue-600" /> Market Overview
        </h2>
        <div className="text-sm text-gray-500 flex items-center">
          <FaSyncAlt className="mr-1" /> Real-time Data
        </div>
      </div>
      
      <div className="flex flex-wrap items-center mb-4 bg-gray-50 p-3 rounded-lg">
        <div className="mr-6">
          <span className="text-gray-600">NIFTY 50: </span>
          <span className="font-bold">{marketData.indices.nifty.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          <span className={`ml-2 ${marketData.indices.nifty.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {marketData.indices.nifty.change >= 0 ? '+' : ''}{marketData.indices.nifty.change.toFixed(2)}%
          </span>
        </div>
        <div>
          <span className="text-gray-600">SENSEX: </span>
          <span className="font-bold">{marketData.indices.sensex.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          <span className={`ml-2 ${marketData.indices.sensex.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {marketData.indices.sensex.change >= 0 ? '+' : ''}{marketData.indices.sensex.change.toFixed(2)}%
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {marketData.stocks.slice(0, 4).map((stock, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-gray-600 text-sm mb-1">{stock.symbol}</h3>
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">₹{stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                stock.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{stock.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;