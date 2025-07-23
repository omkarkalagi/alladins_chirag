import React, { useEffect, useState } from 'react';
import socket from '../../services/socket';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on('recentActivity', (data) => {
      setActivities(data);
    });
    // Cleanup
    return () => {
      socket.off('recentActivity');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="recent-activity card">
      <h2>Recent Activity</h2>
      <ul>
        {activities.map((activity, idx) => (
          <li key={idx}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;