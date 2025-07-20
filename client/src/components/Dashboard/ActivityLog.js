import React from 'react';

const ActivityLog = ({ activities }) => {
  return (
    <div className="activity-log">
      <h3>Recent Activity</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <span className="timestamp">{activity.timestamp}</span>
            <span className="action">{activity.action}</span>
            <span className="symbol">{activity.symbol}</span>
            <span className={`amount ${activity.type}`}>
              {activity.type === 'buy' ? '+' : '-'}${activity.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;