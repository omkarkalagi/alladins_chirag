import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/logo.svg';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';
import './LoginPage.css';  // Add this import

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send OTP request to backend
      console.log(`Sending OTP to ${phone}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (otp) => {
    setLoading(true);
    setError('');

    try {
      // Verify OTP with backend
      console.log(`Verifying OTP: ${otp}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      await login({ email: 'admin@alladinschirag.com', token: 'admin-token' });
      navigate('/dashboard');
    } catch (err) {
      setError('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (email === 'omkardigambar4@gmail.com' && password === 'omkar') {
        await login({ email, token: 'admin-token' });
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-container">
        <div className="image-section">
          <div className="brand-container">
            <div className="logo">
              <div className="logo-inner">
                <i className="fas fa-gem"></i>
              </div>
            </div>
            <div className="brand">Alladins Chirag</div>
            <p className="tagline">Your trusted partner for premium trading solutions and exceptional service since 2001</p>
          </div>
        </div>
        
        <div className="form-section">
          {step === 1 ? (
            <div className="form-container login-form">
              <h2 className="form-title">Log in to your account</h2>
              
              {/* OTP Form */}
              <form onSubmit={handleOtpRequest}>
                <div className="input-group">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
                  Send OTP
                </button>
              </form>
              
              <div className="divider">
                <div className="divider-line"></div>
                <div className="divider-text">OR</div>
                <div className="divider-line"></div>
              </div>
              
              {/* Email/Password Form */}
              <form onSubmit={handleEmailLogin}>
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-email-login"
                  disabled={loading}
                >
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
                  Sign In with Email
                </button>
              </form>
              
              <div className="app-links">
                <p>Get the app</p>
                <div className="app-stores">
                  <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="App Store" className="app-store" />
                  <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Google Play" className="app-store" />
                </div>
              </div>
              
              <div className="footer">
                <div className="company-name">Kalagi Group of Companies</div>
                <div className="since">Since 2001</div>
              </div>
            </div>
          ) : (
            <OtpVerification 
              phone={phone} 
              onVerify={handleOtpVerification} 
              onBack={() => setStep(1)}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// OTP Verification Component
const OtpVerification = ({ phone, onVerify, onBack, loading, error }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = Array(6).fill(0);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp.join(''));
  };

  return (
    <div className="form-container otp-section">
      <div className="otp-icon">
        <i className="fas fa-lock"></i>
      </div>
      
      <h2 className="otp-title">Verify OTP</h2>
      <p className="otp-instruction">Enter the 6-digit code sent to {phone}</p>
      
      <div className="valid-badge">
        <i className="fas fa-check-circle"></i> Valid for 5 minutes
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="otp-inputs">
          {otpInputs.map((_, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              className="otp-input"
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : null}
          Verify & Continue
        </button>
      </form>
      
      <div className="resend-otp">
        Didn't receive code? <a href="#" onClick={onBack}>Resend OTP</a>
      </div>
      
      <div className="switch-auth">
        <a href="#" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back to login
        </a>
      </div>
    </div>
  );
};

export default LoginPage;