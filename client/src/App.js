import TopBar from './components/Dashboard/TopBar';
import LoginPage from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';

// src/App.js
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      color: '#1f2937'
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        background: 'linear-gradient(to right, #3b82f6, #6366f1)',
        color: 'white',
        padding: '16px 24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            {/* Fixed apostrophe */}
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Alladin&apos;s Chirag</h1>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Kalagi Group of Companies</p>
          </div>
          
          {isLoggedIn && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <span>Profile</span>
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <span>Settings</span>
              </button>
              <button 
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#ef4444',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px'
      }}>
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
    <div style={{
      maxWidth: '500px',
      margin: '40px auto',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Login to Your Account</h2>
          <p style={{ color: '#6b7280' }}>Access your trading dashboard</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {!showOtp && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                color: '#374151', 
                fontSize: '0.875rem', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <input
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s'
                }}
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
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                color: '#374151', 
                fontSize: '0.875rem', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Mobile OTP
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  style={{
                    flex: '1',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button
                  type="button"
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Send OTP
                </button>
              </div>
            </div>
          )}
          
          <div style={{ marginBottom: '24px' }}>
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #3b82f6, #6366f1)',
                color: 'white',
                fontWeight: 'bold',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              {showOtp ? 'Verify & Login' : 'Login'}
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              onClick={onSwitchToSignup}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontWeight: '500',
                cursor: 'pointer'
              }}
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
    <div style={{
      maxWidth: '500px',
      margin: '40px auto',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          {/* Fixed apostrophe */}
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Create an Account</h2>
          <p style={{ color: '#6b7280' }}>Join Alladin&apos;s Chirag today</p>
        </div>
        
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Full Name
            </label>
            <input
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Confirm Password
            </label>
            <input
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Mobile Number
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                style={{
                  flex: '1',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                type="text"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <button
                type="button"
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Send OTP
              </button>
            </div>
          </div>
          
          {showOtp && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                color: '#374151', 
                fontSize: '0.875rem', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Enter OTP
              </label>
              <input
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                type="text"
                placeholder="Enter OTP sent to your mobile"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          
          <div style={{ marginBottom: '24px' }}>
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #3b82f6, #6366f1)',
                color: 'white',
                fontWeight: 'bold',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              {showOtp ? 'Verify & Create Account' : 'Create Account'}
            </button>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={onSwitchToLogin}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontWeight: '500',
                cursor: 'pointer'
              }}
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>AI Trading Dashboard</h1>
        <button style={{
          background: 'linear-gradient(to right, #10b981, #059669)',
          color: 'white',
          fontWeight: 'bold',
          padding: '10px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          Trade Now
        </button>
      </div>
      
      {/* Market Overview Section */}
      <MarketOverview />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginTop: '32px'
      }}>
        <PortfolioPerformance />
        <SectorAnalysis />
      </div>
    </div>
  );
}

// Market Overview Component
function MarketOverview() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'linear-gradient(to right, #3b82f6, #6366f1)',
        padding: '16px 24px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.25rem'
      }}>
        Market Overview
      </div>
      
      <div style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          paddingBottom: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#374151' }}>NIFTY 50:</span>
            <span>18,432.45</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>+0.85%</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#374151' }}>SENSEX:</span>
            <span>62,187.34</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>+0.92%</span>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
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
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>
            Most Volatile Stocks
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px'
          }}>
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
    <div style={{
      background: '#f9fafb',
      borderRadius: '12px',
      padding: '16px',
      borderLeft: `4px solid ${isPositive ? '#10b981' : '#ef4444'}`
    }}>
      <div style={{ 
        fontSize: '0.9rem', 
        fontWeight: '600', 
        marginBottom: '8px',
        color: '#4b5563'
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        marginBottom: '4px',
        color: '#1f2937'
      }}>
        {value}
      </div>
      <div style={{ 
        color: isPositive ? '#10b981' : '#ef4444',
        fontWeight: 'bold'
      }}>
        {change}
      </div>
    </div>
  );
}

// Volatile Stock Component
function VolatileStock({ name, change, isPositive }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#f9fafb',
      padding: '12px 16px',
      borderRadius: '8px',
      borderLeft: `3px solid ${isPositive ? '#10b981' : '#ef4444'}`
    }}>
      <span style={{ fontWeight: '600' }}>{name}</span>
      <span style={{ 
        color: isPositive ? '#10b981' : '#ef4444',
        fontWeight: 'bold'
      }}>
        {change}
      </span>
    </div>
  );
}

// Portfolio Performance Component
function PortfolioPerformance() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      height: '100%'
    }}>
      <div style={{
        background: 'linear-gradient(to right, #3b82f6, #6366f1)',
        padding: '16px 24px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.25rem'
      }}>
        Portfolio Performance
      </div>
      
      <div style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontWeight: 'bold', color: '#1f2937' }}>TIN™ Portfolio</h3>
          <span style={{ 
            background: '#10b981',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.875rem'
          }}>Active</span>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#6b7280' }}>Total Value</span>
            <span style={{ fontWeight: 'bold' }}>¥1,254,870</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#6b7280' }}>Today's Gain</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>+¥24,650</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280' }}>Overall Return</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>+18.45%</span>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>
            Investment Budget
          </h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Enter Your Investment Budget (₹)
            </label>
            <input
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              type="number"
              placeholder="500000"
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Select Risk Profile
            </label>
            <select style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem'
            }}>
              <option>Low Risk</option>
              <option selected>Moderate Risk</option>
              <option>High Risk</option>
            </select>
          </div>
          
          <button style={{
            width: '100%',
            background: 'linear-gradient(to right, #3b82f6, #6366f1)',
            color: 'white',
            fontWeight: 'bold',
            padding: '14px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
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
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      height: '100%'
    }}>
      <div style={{
        background: 'linear-gradient(to right, #3b82f6, #6366f1)',
        padding: '16px 24px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.25rem'
      }}>
        Sector Analysis
      </div>
      
      <div style={{ padding: '24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px'
        }}>
          {sectors.map((sector) => (
            <button
              key={sector}
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
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