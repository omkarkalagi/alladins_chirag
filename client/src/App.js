import React, { useState } from 'react';

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
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 shadow-lg">
        <div className="container flex justify-between items-center">
          <div className="text-center">
            <h1 className="text-xl font-bold">Alladin&apos;s Chirag</h1>
            <p className="text-sm opacity-90">Kalagi Group of Companies</p>
          </div>
          
          {isLoggedIn && (
            <div className="flex gap-3">
              <button className="bg-white/20 flex items-center gap-1 px-4 py-2 rounded-full text-white transition hover:bg-white/30">
                <span>Profile</span>
              </button>
              <button className="bg-white/20 flex items-center gap-1 px-4 py-2 rounded-full text-white transition hover:bg-white/30">
                <span>Settings</span>
              </button>
              <button 
                onClick={handleLogout}
                className="bg-danger flex items-center gap-1 px-4 py-2 rounded-full text-white transition hover:bg-red-600"
              >
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-6">
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

// Login Page Component
function LoginPage({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!showOtp) {
      setShowOtp(true);
    } else {
      onLogin();
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Login to Your Account</h2>
          <p className="text-gray-200">Access your trading dashboard</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {!showOtp && (
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          
          {showOtp && (
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-200 mb-2">
                Mobile OTP
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="bg-primary text-white font-bold px-4 py-3 rounded-lg hover:bg-primary-dark transition"
                >
                  Send OTP
                </button>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition transform hover:-translate-y-0.5 shadow-md"
            >
              {showOtp ? 'Verify & Login' : 'Login'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-primary font-medium hover:underline"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Signup Page Component
function SignupPage({ onSignup, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!showOtp) {
      setShowOtp(true);
    } else {
      onSignup();
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Create an Account</h2>
          <p className="text-gray-200">Join Alladin&apos;s Chirag today</p>
        </div>
        
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Full Name
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                type="text"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <button
                type="button"
                className="bg-primary text-white font-bold px-4 py-3 rounded-lg hover:bg-primary-dark transition"
              >
                Send OTP
              </button>
            </div>
          </div>
          
          {showOtp && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Enter OTP
              </label>
              <input
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                type="text"
                placeholder="Enter OTP sent to your mobile"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition transform hover:-translate-y-0.5 shadow-md"
            >
              {showOtp ? 'Verify & Create Account' : 'Create Account'}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary font-medium hover:underline"
            >
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">AI Trading Dashboard</h1>
        <button className="bg-gradient-to-r from-success to-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:opacity-90 transition">
          Trade Now
        </button>
      </div>
      
      {/* Market Overview Section */}
      <MarketOverview />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <PortfolioPerformance />
        <SectorAnalysis />
      </div>
    </div>
  );
}

// Market Overview Component
function MarketOverview() {
  return (
    <div className="dashboard-section">
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold text-lg rounded-t-lg">
        Market Overview
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-white/20">
          <div className="flex items-center gap-2">
            <span className="font-bold">NIFTY 50:</span>
            <span>18,432.45</span>
            <span className="text-success font-bold">+0.85%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-bold">SENSEX:</span>
            <span>62,187.34</span>
            <span className="text-success font-bold">+0.92%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-6">
          <IndexCard 
            title="NIFTY BANK" 
            value="42,187.95" 
            change="+1.25%" 
            isPositive={true} 
          />
          
          <IndexCard 
            title="NIFTY IT" 
            value="34,882.10" 
            change="-0.35%" 
            isPositive={false} 
          />
          
          <IndexCard 
            title="NIFTY AUTO" 
            value="12,876.45" 
            change="+0.92%" 
            isPositive={true} 
          />
          
          <IndexCard 
            title="NIFTY PHARMA" 
            value="14,321.60" 
            change="+0.45%" 
            isPositive={true} 
          />
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">
            Most Volatile Stocks
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <VolatileStock name="RELIANCE" change="+2.3%" isPositive={true} />
            <VolatileStock name="HDFC BANK" change="-1.8%" isPositive={false} />
            <VolatileStock name="INFOSYS" change="+3.1%" isPositive={true} />
            <VolatileStock name="TCS" change="-0.9%" isPositive={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Index Card Component
function IndexCard({ title, value, change, isPositive }) {
  return (
    <div className={`bg-white/5 p-4 rounded-lg border-l-4 ${isPositive ? 'border-success' : 'border-danger'}`}>
      <div className="text-sm font-semibold text-gray-300 mb-2">
        {title}
      </div>
      <div className="text-xl font-bold text-white mb-1">
        {value}
      </div>
      <div className={`font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
        {change}
      </div>
    </div>
  );
}

// Volatile Stock Component
function VolatileStock({ name, change, isPositive }) {
  return (
    <div className={`flex justify-between items-center bg-white/5 px-4 py-3 rounded-lg border-l-3 ${isPositive ? 'border-success' : 'border-danger'}`}>
      <span className="font-semibold text-white">{name}</span>
      <span className={`font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
        {change}
      </span>
    </div>
  );
}

// Portfolio Performance Component
function PortfolioPerformance() {
  return (
    <div className="dashboard-section h-full">
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold text-lg rounded-t-lg">
        Portfolio Performance
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/20">
          <h3 className="font-bold text-white">TIN™ Portfolio</h3>
          <span className="bg-success text-white px-3 py-1 rounded-full text-sm">
            Active
          </span>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <span className="text-gray-300">Total Value</span>
            <span className="font-bold text-white">¥1,254,870</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-300">Today's Gain</span>
            <span className="text-success font-bold">+¥24,650</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Overall Return</span>
            <span className="text-success font-bold">+18.45%</span>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold mb-4 text-white">
            Investment Budget
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Enter Your Investment Budget (₹)
            </label>
            <input
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              type="number"
              placeholder="500000"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Risk Profile
            </label>
            <select className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Low Risk</option>
              <option selected>Moderate Risk</option>
              <option>High Risk</option>
            </select>
          </div>
          
          <button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition shadow-md">
            Optimize Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

// Sector Analysis Component
function SectorAnalysis() {
  const sectors = ['Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer Goods', 'Utilities'];
  
  return (
    <div className="dashboard-section h-full">
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold text-lg rounded-t-lg">
        Sector Analysis
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sectors.map((sector) => (
            <button
              key={sector}
              className="bg-primary/10 text-primary p-3 rounded-lg font-semibold hover:bg-primary/20 transition backdrop-blur-sm"
            >
              {sector}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;