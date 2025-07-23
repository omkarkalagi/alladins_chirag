import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); // email or mobile
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
          navigate('/dashboard');
        } else {
          setErrorMessage(data.message || 'Invalid credentials');
        }
      } catch (err) {
        setErrorMessage('Login error');
      }
    } else if (isMobile(identifier)) {
      // Mobile login - send OTP or verify OTP
      if (!isOtpSent) {
        try {
          const res = await fetch(`${API_URL}/auth/otp/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: identifier }),
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
            body: JSON.stringify({ mobile: identifier, otp }),
          });
          const data = await res.json();
          if (data.success) {
            setSuccessMessage('Login successful. Redirecting to dashboard...');
            await login({ mobile: identifier, otp }, 'mobile');
            navigate('/dashboard');
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          placeholder="Email or Mobile Number"
          required
        />
        {isEmail(identifier) && (
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        )}
        {isMobile(identifier) && isOtpSent && (
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        )}
        <button type="submit">
          {isMobile(identifier) && !isOtpSent ? 'Send OTP' : 'Login'}
        </button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
