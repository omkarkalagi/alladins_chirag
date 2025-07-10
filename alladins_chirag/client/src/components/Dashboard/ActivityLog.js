// client/src/components/Dashboard/ActivityLog.js
import React from 'react';

const ActivityLog = () => {
  // Mock data for recent activities
  const activities = [
    { id: 1, type: 'Buy', symbol: 'RELIANCE', quantity: 10, time: '2 mins ago' },
    { id: 2, type: 'Sell', symbol: 'TCS', quantity: 5, time: '1 hour ago' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
      <ul>
        {activities.map(activity => (
          <li key={activity.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <span className={`font-bold ${activity.type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{activity.type}</span> {activity.symbol}
              <p className="text-sm text-gray-500">Quantity: {activity.quantity}</p>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
