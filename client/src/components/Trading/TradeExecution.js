import React, { useState } from 'react';
import { executeTrade } from '../../services/tradingService';

const TradeExecution = ({ prediction, balance }) => {
  const [amount, setAmount] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState(null);

  const handleExecute = async () => {
    if (!amount || amount <= 0 || amount > balance) {
      alert('Invalid amount');
      return;
    }

    setIsExecuting(true);
    try {
      const tradeResult = await executeTrade({
        symbol: prediction.symbol,
        action: prediction.action,
        amount: parseFloat(amount),
        entryPrice: prediction.entryPrice,
        targetPrice: prediction.targetPrice
      });
      setResult(tradeResult);
    } catch (error) {
      alert(`Trade failed: ${error.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Execute Trade</h3>
      
      <div className="mb-4">
        <label className="block mb-2">Amount to Invest (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder={`Max: ₹${balance.toLocaleString()}`}
          max={balance}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">Entry Price</p>
          <p className="font-bold">₹{prediction.entryPrice.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">Target Price</p>
          <p className="font-bold">₹{prediction.targetPrice.toFixed(2)}</p>
        </div>
      </div>
      
      <button
        onClick={handleExecute}
        disabled={isExecuting}
        className={`w-full py-2 rounded font-bold ${
          prediction.action === 'BUY' 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
      >
        {isExecuting ? 'Executing...' : `${prediction.action} ${prediction.symbol}`}
      </button>
      
      {result && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <p className="font-bold">Trade Executed Successfully!</p>
          <p>Order ID: {result.orderId}</p>
          <p>Quantity: {result.quantity}</p>
        </div>
      )}
    </div>
  );
};

export default TradeExecution;