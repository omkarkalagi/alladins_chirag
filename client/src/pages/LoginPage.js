import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const VERIFIED_NUMBER = '7624828106'; // Only allow this 10-digit number
const VERIFIED_E164 = '+917624828106';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);

  const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
  const isMobile = (val) => /^\d{10}$/.test(val);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (isEmail(identifier)) {
      // Email login
      try {
        const res = await fetch(`${API_URL}/auth/login/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier, password }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMessage('Login successful. Redirecting to dashboard...');
          await login({ email: identifier, password }, 'email');
          window.location.href = '/dashboard';
        } else {
          setErrorMessage(data.message || 'Invalid credentials');
        }
      } catch (err) {
        setErrorMessage('Login error');
      }
    } else if (isMobile(identifier)) {
      if (identifier !== VERIFIED_NUMBER) {
        setErrorMessage('For demo, OTP can only be sent to your verified number: +91 7624828106');
        return;
      }
      if (!isOtpSent) {
        try {
          const res = await fetch(`${API_URL}/auth/otp/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: VERIFIED_E164 }),
          });
          const data = await res.json();
          if (data.success) {
            setIsOtpSent(true);
            setSuccessMessage('OTP sent to your mobile number');
          } else {
            setErrorMessage(data.message || 'Failed to send OTP');
          }
        } catch (err) {
          setErrorMessage('Error sending OTP');
        }
      } else {
        // Verify OTP and login
        try {
          const res = await fetch(`${API_URL}/auth/login/mobile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: VERIFIED_E164, otp }),
          });
          const data = await res.json();
          if (data.success) {
            setSuccessMessage('Login successful. Redirecting to dashboard...');
            await login({ mobile: VERIFIED_E164, otp }, 'mobile');
            window.location.href = '/dashboard';
          } else {
            setErrorMessage(data.message || 'Invalid OTP');
          }
        } catch (err) {
          setErrorMessage('OTP verification error');
        }
      }
    } else {
      setErrorMessage('Please enter a valid email or 10-digit mobile number');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-brand">Alladins Chirag</div>
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Email or 10-digit Mobile Number" className="auth-input" required />
          {isEmail(identifier) && (
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="auth-input" required />
          )}
          {isMobile(identifier) && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ background: '#f0f0f0', padding: '12px 10px', borderRadius: '7px 0 0 7px', border: '1px solid #ddd', borderRight: 'none', color: '#405DE6', fontWeight: 600 }}>+91</span>
              <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Mobile Number" className="auth-input" style={{ borderRadius: '0 7px 7px 0', marginBottom: 0, borderLeft: 'none' }} maxLength={10} minLength={10} required />
            </div>
          )}
          {isMobile(identifier) && isOtpSent && (
            <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" className="auth-input" required />
          )}
          <button type="submit" className="auth-btn">{isMobile(identifier) && !isOtpSent ? 'Send OTP' : 'Login'}</button>
        </form>
        {successMessage && <p className="auth-success">{successMessage}</p>}
        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        <div className="auth-switch">Don't have an account? <a href="/signup">Sign Up</a></div>
      </div>
    </div>
  );
};

export default LoginPage;
