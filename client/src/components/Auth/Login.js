// client/src/components/Auth/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  // ... existing state and logic ...

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
        {/* Animated gradient header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white p-2 rounded-full shadow-lg mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AC</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white text-center">Alladin's Chirag</h2>
            <p className="text-blue-200 text-center mt-1">Kalagi Group of Companies</p>
          </div>
        </div>
        
        {/* Glowing form container */}
        <div className="p-8 relative bg-white rounded-t-2xl -mt-6 z-20 shadow-lg">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-600 rounded-full blur-xl opacity-20"></div>
          
          {/* Login method tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                method === 'email' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setMethod('email')}
            >
              <i className="fas fa-envelope mr-2"></i>Email Login
            </button>
            <button
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                method === 'phone' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setMethod('phone')}
            >
              <i className="fas fa-mobile-alt mr-2"></i>Mobile Login
            </button>
          </div>
          
          {/* Rest of your form */}
        </div>
      </div>
    </div>
  );
};

export default Login;