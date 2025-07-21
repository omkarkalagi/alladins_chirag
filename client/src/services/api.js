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
    }
    
    return Promise.reject(data || error);
  }
);

// API methods
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

export const getMarketData = async () => {
  try {
    const response = await api.get('/stocks/markets');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch market data:', error);
    throw error;
  }
};

// Add other API methods here...

export default api;