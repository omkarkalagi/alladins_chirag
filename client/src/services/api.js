// client/src/services/api.js
import axios from 'axios';

// Define API base URL with environment variable fallbacks
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 
                    (process.env.NODE_ENV === 'production' 
                     ? 'https://alladins-chirag.onrender.com/api' 
                     : 'http://localhost:5000/api');

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout for production
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      console.error('Network Error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your internet connection.'
      });
    }
    
    const status = error.response.status;
    const data = error.response.data;
    
    if (status === 401) {
      // Handle token expiration
      localStorage.removeItem('authToken');
      console.warn('Session expired. Redirecting to login.');
      window.location.href = '/login?session=expired';
    } else if (status === 403) {
      console.error('Forbidden:', data.message || 'Access denied');
      return Promise.reject({
        message: 'You do not have permission to perform this action'
      });
    } else if (status >= 500) {
      console.error('Server Error:', data.message || 'Internal server error');
      return Promise.reject({
        message: 'Server error. Please try again later.'
      });
    }
    
    // Return custom error message if available
    return Promise.reject(data || error);
  }
);

// API methods

/**
 * Fetches market data
 * @returns {Promise<Array>} Array of market stocks
 */
export const getMarketData = async () => {
  try {
    const response = await api.get('/stocks/markets');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch market data:', error);
    throw error;
  }
};

/**
 * Fetches user portfolio
 * @returns {Promise<Object>} Portfolio data
 */
export const getPortfolio = async () => {
  try {
    const response = await api.get('/stocks/portfolio');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    throw error;
  }
};

/**
 * Executes a trade
 * @param {Object} tradeData - Trade details
 * @param {string} tradeData.symbol - Stock symbol
 * @param {number} tradeData.quantity - Number of shares
 * @param {string} tradeData.action - 'buy' or 'sell'
 * @returns {Promise<Object>} Trade confirmation
 */
export const executeTrade = async (tradeData) => {
  try {
    const response = await api.post('/stocks/trades', tradeData);
    return response.data;
  } catch (error) {
    console.error('Trade execution failed:', error);
    throw error;
  }
};

/**
 * Fetches historical data for a stock
 * @param {string} symbol - Stock symbol
 * @param {string} timeframe - Timeframe (e.g., '1d', '1w', '1m')
 * @returns {Promise<Array>} Historical price data
 */
export const getHistoricalData = async (symbol, timeframe = '1d') => {
  try {
    const response = await api.get(
      `/stocks/historical/${symbol}`, 
      { params: { timeframe } }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch historical data for ${symbol}:`, error);
    throw error;
  }
};

/**
 * User authentication
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Authentication response
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * User registration
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Registration response
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// Default export
export default api;