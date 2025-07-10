// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/api/auth/check');
        setCurrentUser(data.user);
      } catch (error) {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    setCurrentUser(data.user);
    return data;
  };

  const signup = async (name, email, password) => {
    const { data } = await axios.post('/api/auth/signup', { name, email, password });
    setCurrentUser(data.user);
    return data;
  };
  
  const sendOtp = async (phone) => {
    return await axios.post('/api/auth/send-otp', { phone });
  };
  
  const verifyOtp = async (phone, otp) => {
    const { data } = await axios.post('/api/auth/verify-otp', { phone, otp });
    setCurrentUser(data.user);
    return data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    sendOtp,
    verifyOtp,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
