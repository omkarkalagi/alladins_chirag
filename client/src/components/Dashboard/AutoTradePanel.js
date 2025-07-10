import React, { useState, useContext } from 'react';
import { executeAutoTrade } from '../../services/tradeService';
import { useAuth } from '../../context/AuthContext';

const AutoTradePanel = ({ stock }) => {
  const { currentUser } = useAuth();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    
    if (!amount || amount < 1000) {
      setError('Minimum investment is ₹1000');
      return;
    }
    
    try {
      setIsLoading(true);
      const tradeResult = await executeAutoTrade(
        currentUser.id, 
        stock.symbol, 
        parseFloat(amount)
      );
      
      setResult(tradeResult);
    } catch (err) {
      setError(err.message || 'Auto-trade failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">AI Auto-Trade</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Stock Symbol</label>
            <input
              type="text"
              value={stock.symbol}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Current Price</label>
            <input
              type="text"
              value={`₹${stock.price.toFixed(2)}`}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Investment Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1000"
              step="500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Minimum: ₹1000 | AI will trade with this amount
            </p>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2">How Auto-Trade Works</h4>
          <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
            <li>AI analyzes real-time market data and historical patterns</li>
            <li>Executes trades only when confidence exceeds 85%</li>
            <li>Automatically sets profit targets and stop losses</li>
            <li>You maintain full control - can cancel anytime</li>
          </ul>
        </div>
        
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 font-bold shadow-md disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <i className="fas fa-spinner fa-spin mr-2"></i> Executing Trade...
            </span>
          ) : 'Start Auto-Trading'}
        </button>
      </form>
      
      {result && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-2">Trade Executed Successfully!</h4>
          <p className="mb-1">
            <span className="font-medium">Action:</span> {result.action} {result.quantity} shares
          </p>
          <p className="mb-1">
            <span className="font-medium">Executed at:</span> ₹{result.executedPrice.toFixed(2)}
          </p>
          <p className="mb-1">
            <span className="font-medium">Target Exit:</span> ₹{result.targetExit.toFixed(2)}
          </p>
          <p className="mt-2 text-sm">
            AI will automatically sell when target is reached or stop loss triggers
          </p>
        </div>
      )}
    </div>
  );
};

export default AutoTradePanel;