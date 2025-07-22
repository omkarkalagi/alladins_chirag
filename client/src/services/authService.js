import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUser = async (email, password, phone) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
      phone
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login request failed');
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post('/auth/verify-otp', {
      email,
      otp
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'OTP verification failed');
  }
};