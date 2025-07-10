// client/src/components/Dashboard/Sidebar.js
import React from 'react';

const Sidebar = () => (
  <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
    <div className="flex items-center justify-center h-20 border-b">
      <h1 className="text-2xl font-bold text-blue-600">Alladin's C.</h1>
    </div>
    <div className="flex-1 overflow-y-auto">
      <nav className="flex-1 px-2 py-4 space-y-2">
        <a href="#dashboard" className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Dashboard</a>
        <a href="#portfolio" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md">Portfolio</a>
        <a href="#trade" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md">Trade</a>
      </nav>
    </div>
  </div>
);

export default Sidebar;
