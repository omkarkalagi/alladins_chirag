import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(''); // email or mobile
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
  const isMobile = (val) => /^\d{10}$/.test(val);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isEmail(identifier)) {
      // Email login
      try {
        const res = await axios.post('/api/auth/login', { email: identifier, password });
        if (res.data.success) {
          setSuccessMessage('Login successful. Redirecting to dashboard...');
          await login(res.data.user);
          navigate('/dashboard');
        } else {
          alert('Invalid credentials');
        }
      } catch (err) {
        console.error(err);
        alert('Login error');
      }
    } else if (isMobile(identifier)) {
      // Mobile login - send OTP or verify OTP
      if (!isOtpSent) {
        try {
          const res = await axios.post('/api/auth/send-otp', { phone: identifier });
          if (res.data.success) {
            setIsOtpSent(true);
            alert('OTP sent to your mobile number');
          } else {
            alert('Failed to send OTP');
          }
        } catch (err) {
          console.error(err);
          alert('Error sending OTP');
        }
      } else {
        // Verify OTP
        try {
          const res = await axios.post('/api/auth/verify-otp', { phone: identifier, otp });
          if (res.data.success) {
            setSuccessMessage('Login successful. Redirecting to dashboard...');
            await login(res.data.user);
            navigate('/dashboard');
          } else {
            alert('Invalid OTP');
          }
        } catch (err) {
          console.error(err);
          alert('OTP verification error');
        }
      }
    } else {
      alert('Please enter a valid email or 10-digit mobile number');
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
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default LoginPage;
