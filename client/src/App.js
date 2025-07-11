import React, { useState } from 'react';
import TopBar from './components/TopBar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // Add this import
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <TopBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <div className="container mx-auto p-4">
        {!isLoggedIn && activeTab === 'login' && (
          <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setActiveTab('signup')} />
        )}
        
        {!isLoggedIn && activeTab === 'signup' && (
          <SignupPage onSignup={handleLogin} onSwitchToLogin={() => setActiveTab('login')} />
        )}
        
        {isLoggedIn && activeTab === 'dashboard' && <Dashboard />}
      </div>
    </div>
  );
}

export default App;