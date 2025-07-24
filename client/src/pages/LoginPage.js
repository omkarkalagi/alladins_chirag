import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const VERIFIED_NUMBER = '7624828106';
const VERIFIED_E164 = '+917624828106';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);

  const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
  const isMobile = (val) => /^\d{10}$/.test(val);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!isEmail(trimmedEmail)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }
    if (!trimmedPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }
    try {
      console.log('Sending email login:', trimmedEmail, trimmedPassword);
      const res = await fetch(`${API_URL}/auth/login/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });
      const data = await res.json();
      console.log('Email login response:', data);
      if (data.success) {
        setSuccessMessage('Login successful. Redirecting to dashboard...');
        await login({ email: trimmedEmail, password: trimmedPassword }, 'email');
        window.location.href = '/dashboard';
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setErrorMessage('Login error');
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const trimmedMobile = mobile.trim();
    if (!isMobile(trimmedMobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (trimmedMobile !== VERIFIED_NUMBER) {
      setErrorMessage('For demo, OTP can only be sent to your verified number: 7624828106');
      return;
    }
    try {
      console.log('Sending OTP to:', VERIFIED_E164);
      const res = await fetch(`${API_URL}/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: VERIFIED_E164 }),
      });
      const data = await res.json();
      console.log('Send OTP response:', data);
      if (data.success) {
        setIsOtpSent(true);
        setSuccessMessage(`OTP sent! (For demo, use OTP: ${data.otp})`);
      } else {
        setErrorMessage(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setErrorMessage('Error sending OTP');
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const trimmedMobile = mobile.trim();
    const trimmedOtp = otp.trim();
    if (!isMobile(trimmedMobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!trimmedOtp) {
      setErrorMessage('Please enter the OTP.');
      return;
    }
    try {
      console.log('Sending OTP login:', VERIFIED_E164, trimmedOtp);
      const res = await fetch(`${API_URL}/auth/login/mobile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: VERIFIED_E164, otp: trimmedOtp }),
      });
      const data = await res.json();
      console.log('OTP login response:', data);
      if (data.success) {
        setSuccessMessage('Login successful. Redirecting to dashboard...');
        await login({ mobile: VERIFIED_E164, otp: trimmedOtp }, 'mobile');
        window.location.href = '/dashboard';
      } else {
        setErrorMessage(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setErrorMessage('OTP verification error');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-brand">Alladins Chirag</div>
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleEmailLogin} style={{ marginBottom: 24 }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="auth-input" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="auth-input" required />
          <button type="submit" className="auth-btn">Login with Email</button>
        </form>
        <div style={{ margin: '16px 0', color: '#888', textAlign: 'center' }}>OR</div>
        <form onSubmit={isOtpSent ? handleOtpLogin : handleSendOtp}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ background: '#f0f0f0', padding: '12px 10px', borderRadius: '7px 0 0 7px', border: '1px solid #ddd', borderRight: 'none', color: '#405DE6', fontWeight: 600 }}>+91</span>
            <input type="text" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit Mobile Number" className="auth-input" style={{ borderRadius: '0 7px 7px 0', marginBottom: 0, borderLeft: 'none' }} maxLength={10} minLength={10} required />
          </div>
          {(isOtpSent || successMessage.includes('OTP sent')) && (
            <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" className="auth-input" required />
          )}
          <button type="submit" className="auth-btn">{isOtpSent ? 'Login with OTP' : 'Send OTP'}</button>
        </form>
        {successMessage && <p className="auth-success">{successMessage}</p>}
        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        <div className="auth-switch">Don't have an account? <a href="/signup">Sign Up</a></div>
      </div>
    </div>
  );
};

export default LoginPage;

