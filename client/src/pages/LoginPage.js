import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/logo.svg';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    if (phone === '+917624828106' && otp === '7624') {
      login({ phone, token: 'phone-login-token' });
      navigate('/dashboard');
    } else {
      setError('Invalid phone number or OTP');
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (email === 'omkardigambar4@gmail.com' && password === 'omkar') {
      login({ email, token: 'email-login-token' });
      navigate('/dashboard');
    } else {
      setError('You are not registered');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4">
                <img src={Logo} alt="Alladins Chirag" className="h-16 w-16" />
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-2">
                Alladins Chirag
              </h1>
            </div>

            {error && (
              <div className="bg-red-900 text-red-200 p-3 rounded-md text-center mb-4">
                {error}
              </div>
            )}

            {/* Phone + OTP login */}
            <form onSubmit={handlePhoneLogin} className="space-y-4 mb-8">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-yellow-600 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
              >
                Login with Phone
              </button>
            </form>

            {/* Email + Password login */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-yellow-600 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
              >
                Login with Email
              </button>
            </form>

          </div>
          <div className="flex justify-center items-center py-4 bg-gray-900">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Playstore" className="h-10 mx-2" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/Microsoft_Store_logo_2022.svg" alt="Microsoft Store" className="h-10 mx-2" />
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <div className="font-dancing text-lg">With ❤️ from Omkar Kalagi</div>
        <div className="font-roboto mt-1 text-xs">Kalagi Group of Companies</div>
      </footer>
    </div>
  );
};

export default LoginPage;
