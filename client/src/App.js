import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import OTPVerification from './components/Auth/OTPVerification';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css'; // Corrected path

const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard socket={socket} />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;