import React, { createContext, useState, useContext } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials, method = 'email') => {
    let response;
    if (method === 'email') {
      response = await authService.loginWithEmail(credentials.email, credentials.password);
    } else if (method === 'mobile') {
      response = await authService.loginWithMobile(credentials.mobile, credentials.otp);
    }
    if (response && response.success) {
      setUser(response.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } else {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return response;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);