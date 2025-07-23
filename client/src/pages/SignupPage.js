import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const VERIFIED_NUMBER = '7624828106';
const VERIFIED_E164 = '+917624828106';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (mobile !== VERIFIED_NUMBER) {
      setErrorMessage('For demo, you can only register with your verified number: +91 7624828106');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, mobile: VERIFIED_E164 }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage('Signup successful! You can now log in.');
        setEmail(''); setPassword(''); setMobile('');
      } else {
        setErrorMessage(data.message || 'Signup failed.');
      }
    } catch (err) {
      setErrorMessage('Signup error.');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-brand">Alladins Chirag</div>
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="auth-input" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="auth-input" required />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ background: '#f0f0f0', padding: '12px 10px', borderRadius: '7px 0 0 7px', border: '1px solid #ddd', borderRight: 'none', color: '#405DE6', fontWeight: 600 }}>+91</span>
            <input type="text" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Mobile Number" className="auth-input" style={{ borderRadius: '0 7px 7px 0', marginBottom: 0, borderLeft: 'none' }} maxLength={10} minLength={10} required />
          </div>
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        {successMessage && <p className="auth-success">{successMessage}</p>}
        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        <div className="auth-switch">Already have an account? <a href="/login">Log In</a></div>
      </div>
    </div>
  );
};

export default SignupPage; 