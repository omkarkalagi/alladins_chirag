// src/services/authService.js

import api from './api'; // uses your configured Axios instance with baseURL and interceptors

// Sign up a new user
export const signup = async (email, password) => {
  try {
    const response = await api.post('/auth/register', { email, password });
    const { token, userId } = response; // adjust fields based on your backend response

    localStorage.setItem('authToken', token);
    return { userId, token };
  } catch (error) {
    throw new Error(error.message || 'Signup failed');
  }
};

// Login existing user
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, userId } = response;

    localStorage.setItem('authToken', token);
    return { userId, token };
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

// Logout user
export const logout = async () => {
  localStorage.removeItem('authToken');
  return Promise.resolve();
};

// Listen for auth state changes
export const onAuthStateChanged = (callback) => {
  const token = localStorage.getItem('authToken');
  const user = token ? { email: 'user@example.com' } : null; // optionally decode JWT for real email
  callback(user);
  return () => {};
};

const authService = {
  signup,
  login,
  logout,
  onAuthStateChanged
};

export default authService;
