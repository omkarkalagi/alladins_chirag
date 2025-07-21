// client/src/services/api.js
import axios from 'axios';

// Dynamic API URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://alladins-chirag.onrender.com/api');

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error('Network Error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your internet connection.'
      });
    }
    
    const status = error.response.status;
    const data = error.response.data;
    
    if (status === 401) {
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

// ✅ Authentication
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error.response?.data || error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error.response?.data || error;
  }
};

export const verifyToken = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw error;
  }
};

// ✅ Twilio OTP Services
export const sendOtp = async (phone) => {
  try {
    const response = await api.post('/auth/send-otp', { phone });
    return response.data;
  } catch (error) {
    console.error('Failed to send OTP:', error);
    throw error.response?.data || error;
  }
};

export const verifyOtp = async (phone, otp) => {
  try {
    const response = await api.post('/auth/verify-otp', { phone, otp });
    return response.data;
  } catch (error) {
    console.error('OTP verification failed:', error);
    throw error.response?.data || error;
  }
};

// ✅ Trading Data
export const getMarketData = async () => {
  try {
    const response = await api.get('/stocks/markets');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch market data:', error);
    throw error;
  }
};

export const getPortfolio = async () => {
  try {
    const response = await api.get('/stocks/portfolio');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    throw error;
  }
};

export const executeTrade = async (tradeData) => {
  try {
    const response = await api.post('/stocks/trades', tradeData);
    return response.data;
  } catch (error) {
    console.error('Trade execution failed:', error);
    throw error;
  }
};

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

// Default export
export default api;