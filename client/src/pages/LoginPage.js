import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.success) {
        setSuccessMessage('Login successful. Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Login error');
    }
  };

  const sendOTP = async () => {
    try {
      const res = await axios.post('/api/auth/send-otp', { phone });
      if (res.data.success) {
        setOtpSent(true);
        alert('OTP sent successfully');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send OTP');
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post('/api/auth/verify-otp', { phone, otp });
      if (res.data.success) {
        setSuccessMessage('OTP verified. Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      console.error(err);
      alert('OTP verification error');
    }
  };

  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="logo-container">
        <img src="/assets/logo.svg" alt="Alladins Chirag Logo" className="h-20 mx-auto mb-2" />
        <h2 className="text-2xl font-semibold">Welcome to Alladins Chirag</h2>
      </div>

      {successMessage && (
        <div className="bg-green-600 px-4 py-2 rounded-lg mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleEmailLogin} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary w-full">Login with Email</button>
      </form>

      <div className="my-4">OR</div>

      <div className="otp-login w-full max-w-sm space-y-4">
        {!otpSent ? (
          <>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button onClick={sendOTP} className="btn-primary w-full">Send OTP</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button onClick={verifyOTP} className="btn-primary w-full">Verify OTP</button>
          </>
        )}
      </div>

      <div className="app-links mt-6">
        <img src="/assets/google-play.png" alt="Get it on Google Play" className="h-10 inline mx-2" />
        <img src="/assets/microsoft-store.png" alt="Get it from Microsoft Store" className="h-10 inline mx-2" />
      </div>
    </div>
  );
};

export default LoginPage;
