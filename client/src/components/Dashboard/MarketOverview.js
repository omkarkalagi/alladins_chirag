import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarketOverview = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await axios.get('/api/stocks/markets');
        setMarketData(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch market data');
        setLoading(false);
      }
    };
    fetchMarketData();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title"><i className="fas fa-chart-line"></i> Market Overview</div>
        <div className="since">Live</div>
      </div>
      <div className="card-body">
        {loading && <div>Loading market data...</div>}
        {error && <div style={{color: 'red'}}>{error}</div>}
        {marketData && (
          <pre style={{fontSize: '0.9em', background: '#f8f8f8', padding: '10px'}}>{JSON.stringify(marketData, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default MarketOverview;
