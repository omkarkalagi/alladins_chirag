import React, { useState } from 'react';

const Login = ({ onLogin, onOTPRequest }) => {
  const [email, setEmail] = useState('omkardigambar4@gmail.com');
  const [password, setPassword] = useState('omkar');
  const [phone, setPhone] = useState('7624828106');
  const [loginMethod, setLoginMethod] = useState('email');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginMethod === 'email') {
      onLogin({ email, password });
    } else {
      onOTPRequest(phone);
    }
  };

  return (
    <div className="form-container login-form">
      <h2 className="form-title">Log in to your account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fas fa-envelope input-icon"></i>
          <input 
            type="email" 
            className="form-control" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address" 
          />
        </div>

        <div className="input-group">
          <i className="fas fa-lock input-icon"></i>
          <input 
            type="password" 
            className="form-control" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
          />
        </div>

        <div className="divider">
          <div className="divider-line"></div>
          <div className="divider-text">OR</div>
          <div className="divider-line"></div>
        </div>

        <div className="input-group">
          <i className="fas fa-phone input-icon"></i>
          <input 
            type="tel" 
            className="form-control" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number" 
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {loginMethod === 'email' ? 'Login' : 'Send OTP'}
        </button>
      </form>

      <div className="app-links">
        <p>Get the app.</p>
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
  );
};

export default Login;