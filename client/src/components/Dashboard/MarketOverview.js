import React, { useEffect, useState } from 'react';
import socket from '../../services/socket';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const MarketOverview = () => {
  const [marketData, setMarketData] = useState({ indices: [], gainers: [], losers: [] });
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected) {
      socket.connect();
      socket.on('marketData', (data) => {
        setMarketData(data);
      });
      return () => {
        socket.off('marketData');
        socket.disconnect();
      };
    }
  }, [connected]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/stocks/kite/login-url`);
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      alert('Failed to get Kite login URL');
    }
    setLoading(false);
  };

  // For demo: check if redirected from callback (very basic)
  useEffect(() => {
    if (window.location.pathname.includes('callback')) {
      setConnected(true);
    }
  }, []);

  return (
    <div className="market-overview card">
      <h2>Market Overview</h2>
      {!connected ? (
        <button onClick={handleConnect} disabled={loading} style={{ marginBottom: 16 }}>
          {loading ? 'Connecting...' : 'Connect to Zerodha'}
        </button>
      ) : (
        <div style={{ color: 'green', marginBottom: 16 }}>Connected to Zerodha</div>
      )}
      <div>
        <h4>Indices</h4>
        <ul>
          {marketData.indices.map((idx) => (
            <li key={idx.name}>{idx.name}: {idx.value}</li>
          ))}
        </ul>
        <h4>Top Gainers</h4>
        <ul>
          {marketData.gainers.map((stock) => (
            <li key={stock.symbol}>{stock.symbol}: {stock.change}%</li>
          ))}
        </ul>
        <h4>Top Losers</h4>
        <ul>
          {marketData.losers.map((stock) => (
            <li key={stock.symbol}>{stock.symbol}: {stock.change}%</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MarketOverview;
