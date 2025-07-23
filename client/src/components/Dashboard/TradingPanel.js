import React, { useState } from 'react';
import { executeTrade } from '../../services/stockService';

const TradingPanel = () => {
  const [form, setForm] = useState({ symbol: '', quantity: '', type: 'buy' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await executeTrade(form);
      if (response && response.message) {
        setMessage(response.message);
      } else {
        setMessage('Order placed!');
      }
    } catch (err) {
      setMessage('Order failed.');
    }
    setForm({ symbol: '', quantity: '', type: 'buy' });
  };

  return (
    <div className="trading-panel card">
      <h2>Trading Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="symbol"
          placeholder="Stock Symbol"
          value={form.symbol}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button type="submit">Place Order</button>
      </form>
      {message && <div className="trade-message">{message}</div>}
    </div>
  );
};

export default TradingPanel;