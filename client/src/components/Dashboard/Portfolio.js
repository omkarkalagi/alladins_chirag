// client/src/components/Dashboard/Portfolio.js
import React from 'react';

const Portfolio = ({ stocks }) => {
  const getChangeClass = (change) => (change >= 0 ? 'text-green-500' : 'text-red-500');

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Market Movers</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Symbol</th>
              <th className="py-2">Price</th>
              <th className="py-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {(stocks || []).map((stock, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 font-medium">{stock.symbol}</td>
                <td className="py-3">${stock.price?.toFixed(2)}</td>
                <td className={`py-3 ${getChangeClass(stock.change)}`}>{stock.change?.toFixed(2)} ({stock.changePercent}%)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
