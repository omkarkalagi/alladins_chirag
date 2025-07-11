// src/components/TopBar.js
import React from 'react';

function TopBar({ isLoggedIn, onLogout }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Alladin's Chirag</h1>
          <p className="text-sm opacity-90">Kalagi Group of Companies</p>
        </div>
        
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition">
              <span>Profile</span>
            </button>
            <button className="flex items-center space-x-1 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition">
              <span>Settings</span>
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center space-x-1 bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;