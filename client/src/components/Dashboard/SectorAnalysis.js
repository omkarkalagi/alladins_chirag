import React, { useState, useEffect } from 'react';
import { getSectorVolatility } from '../../services/aiService';

const SectorAnalysis = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const data = await getSectorVolatility();
        setSectors(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load sectors:', error);
        setLoading(false);
      }
    };
    
    fetchSectors();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading sectors...</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Sector Volatility Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((sector, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border ${
              sector.change > 3 ? 'bg-red-50 border-red-200' : 
              sector.change < -2 ? 'bg-blue-50 border-blue-200' : 
              'bg-gray-50'
            }`}
          >
            <div className="flex justify-between">
              <h4 className="font-bold">{sector.name}</h4>
              <span className={`font-medium ${
                sector.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {sector.change > 0 ? '+' : ''}{sector.change}%
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">Top Stocks:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {sector.topStocks.map((stock, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {stock}
                  </span>
                ))}
              </div>
            </div>
            <button className="mt-3 text-blue-600 text-sm font-medium">
              View AI Recommendations
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorAnalysis;