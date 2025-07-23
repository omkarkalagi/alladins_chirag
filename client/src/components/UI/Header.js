import React from 'react';

const Header = ({ user, logout }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-brand">
        <div className="dashboard-logo">
          <i className="fas fa-gem"></i>
        </div>
        <div className="dashboard-name">Alladins Chirag</div>
      </div>
      <div className="user-info">
        <div className="user-avatar">{getInitials(user.name)}</div>
        <div>
          <div>{user.name}</div>
          <div className="since">{user.accountType} Account</div>
        </div>
        <button className="logout-btn" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Header;