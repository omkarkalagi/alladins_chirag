// client/src/services/api.js

import axios from 'axios';

// ✅ Define API base URL for Render backend deployment
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://alladins-chirag.onrender.com/api';

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login if unauthorized
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data || error.response);
    }
    return Promise.reject(error.message || error);
  }
);

// ✅ API methods

export const getMarketData = async () => {
  const response = await api.get('/stocks/markets');
  return response.data;
};

export const getPortfolio = async () => {
  const response = await api.get('/stocks/portfolio');
  return response.data;
};

export const executeTrade = async (tradeData) => {
  const response = await api.post('/stocks/trades', tradeData);
  return response.data;
};

export const getHistoricalData = async (symbol, timeframe) => {
  const response = await api.get(`/stocks/historical/${symbol}?timeframe=${timeframe}`);
  return response.data;
};

export default api;
