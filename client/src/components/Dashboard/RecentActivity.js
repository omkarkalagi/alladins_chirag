import React from 'react';

const RecentActivity = () => {
  return (
    <div className="card">
      {/* AI prediction card same as your HTML */}
      <div className="card-header">
        <div className="card-title"><i className="fas fa-history"></i> Recent Activity</div>
      </div>
      <div className="card-body">
        <div className="activity-log">
          {/* Activity items same as your HTML */}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;