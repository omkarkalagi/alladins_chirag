// stockService.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getMarketData = async () => {
  const res = await fetch(`${API_URL}/stocks/markets`);
  return res.json();
};

export const getHistoricalData = async (symbol, timeframe) => {
  const res = await fetch(`${API_URL}/stocks/historical/${symbol}?timeframe=${timeframe}`);
  return res.json();
};

export const executeTrade = async (tradeData) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/stocks/kite/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(tradeData),
  });
  return res.json();
}; 