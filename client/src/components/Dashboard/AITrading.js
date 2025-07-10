import React, { useState, useEffect } from 'react';
import { getAITradeRecommendations } from '../../services/aiService';

const AITrading = ({ sector }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const data = await getAITradeRecommendations(sector);
        setRecommendations(data.recommendations || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load AI recommendations:', error);
        setLoading(false);
      }
    };
    
    if (sector) fetchRecommendations();
  }, [sector]);

  if (loading) return <div className="p-4 text-center">Loading AI recommendations...</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        AI Trading Recommendations for {sector}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Current Price</th>
              <th className="px-4 py-2">AI Prediction</th>
              <th className="px-4 py-2">Confidence</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Target Entry</th>
              <th className="px-4 py-2">Target Exit</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{rec.symbol}</td>
                <td className="px-4 py-3">₹{rec.currentPrice.toFixed(2)}</td>
                <td className={`px-4 py-3 font-medium ${
                  rec.prediction.direction === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {rec.prediction.direction === 'up' ? '↑ Bullish' : '↓ Bearish'}
                </td>
                <td className="px-4 py-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        rec.confidence > 85 ? 'bg-green-600' : 
                        rec.confidence > 70 ? 'bg-yellow-500' : 'bg-red-600'
                      }`} 
                      style={{ width: `${rec.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{rec.confidence}%</span>
                </td>
                <td className={`px-4 py-3 font-bold ${
                  rec.action === 'BUY' ? 'text-green-600' : 
                  rec.action === 'SELL' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {rec.action}
                </td>
                <td className="px-4 py-3">₹{rec.targetEntry.toFixed(2)}</td>
                <td className="px-4 py-3">₹{rec.targetExit.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {recommendations.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No high-confidence trade opportunities in this sector currently
        </div>
      )}
    </div>
  );
};

export default AITrading;