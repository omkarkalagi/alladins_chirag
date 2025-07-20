import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-icon">📊</span>
          <span className="logo-text">TradeMaster</span>
        </Link>
      </div>
      
      <div className="header-center">
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/trading">Trading</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/research">Research</Link>
        </nav>
      </div>
      
      <div className="header-right">
        {currentUser ? (
          <>
            <div className="user-info">
              <span className="user-avatar">{currentUser.email.charAt(0).toUpperCase()}</span>
              <span className="user-name">{currentUser.email}</span>
            </div>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;