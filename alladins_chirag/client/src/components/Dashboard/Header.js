// client/src/components/Dashboard/Header.js
import React from 'react';

const Header = ({ user, onLogout }) => (
  <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
    <div>
      <h2 className="text-lg font-semibold">Dashboard</h2>
    </div>
    <div>
      <button onClick={onLogout} className="text-sm text-gray-600 hover:text-blue-600">
        Logout
      </button>
    </div>
  </header>
);

export default Header;
