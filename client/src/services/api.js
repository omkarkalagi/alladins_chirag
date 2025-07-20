import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.trademaster.com/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Redirect to login if unauthorized
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

// API methods
export const getMarketData = async () => {
  const response = await api.get('/markets');
  return response.data;
};

export const getPortfolio = async () => {
  const response = await api.get('/portfolio');
  return response.data;
};

export const executeTrade = async (tradeData) => {
  const response = await api.post('/trades', tradeData);
  return response.data;
};

export const getHistoricalData = async (symbol, timeframe) => {
  const response = await api.get(`/historical/${symbol}?timeframe=${timeframe}`);
  return response.data;
};

export default api;