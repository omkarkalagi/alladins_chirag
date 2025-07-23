import React, { useEffect, useState } from 'react';
import socket from '../../services/socket';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on('portfolioUpdate', (data) => {
      setPortfolio(data);
    });
    // Cleanup
    return () => {
      socket.off('portfolioUpdate');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="portfolio card">
      <h2>Portfolio</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Avg. Price</th>
            <th>Current Value</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item) => (
            <tr key={item.symbol}>
              <td>{item.symbol}</td>
              <td>{item.quantity}</td>
              <td>{item.avgPrice}</td>
              <td>{item.currentValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;