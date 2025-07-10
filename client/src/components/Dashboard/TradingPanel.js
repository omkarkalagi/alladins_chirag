// client/src/components/Dashboard/TradingPanel.js
import React, { useState } from 'react';

const TradingPanel = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('buy');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle trade execution
    console.log({ symbol, quantity, orderType });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Trade</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="symbol" className="block text-gray-700 mb-2">Symbol</label>
          <input
            type="text" id="symbol"
            className="w-full px-3 py-2 border rounded-md"
            value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number" id="quantity"
            className="w-full px-3 py-2 border rounded-md"
            value={quantity} onChange={(e) => setQuantity(e.target.value)} required
          />
        </div>
        <div className="flex space-x-4 mb-6">
          <button type="button" onClick={() => setOrderType('buy')} className={`w-full py-2 rounded-md ${orderType === 'buy' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Buy</button>
          <button type="button" onClick={() => setOrderType('sell')} className={`w-full py-2 rounded-md ${orderType === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Sell</button>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Place Order</button>
      </form>
    </div>
  );
};

export default TradingPanel;
