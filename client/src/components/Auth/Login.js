import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, sendOtp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (method === 'email') {
        await login(email, password);
        navigate('/dashboard');
      } else {
        await sendOtp(phone);
        navigate('/verify-otp', { state: { phone } });
      }
    } catch (err) {
      setError(err.response?.data?.error || `Failed to log in with ${method}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
        {/* Animated gradient header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white p-2 rounded-full shadow-lg mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AC</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white text-center">Alladin's Chirag</h2>
            <p className="text-blue-200 text-center mt-1">Kalagi Group of Companies</p>
          </div>
        </div>
        
        {/* Glowing form container */}
        <div className="p-8 relative bg-white rounded-t-2xl -mt-6 z-20 shadow-lg">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-600 rounded-full blur-xl opacity-20"></div>
          
          {/* Login method tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                method === 'email' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setMethod('email')}
            >
              <i className="fas fa-envelope mr-2"></i>Email Login
            </button>
            <button
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                method === 'phone' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setMethod('phone')}
            >
              <i className="fas fa-mobile-alt mr-2"></i>Mobile Login
            </button>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {method === 'email' ? (
              <>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
                  <input
                    type="email" id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password</label>
                  <input
                    type="password" id="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>
              </>
            ) : (
              <div className="mb-5">
                <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Mobile Number</label>
                <input
                  type="tel" id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your mobile number" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required
                />
              </div>
            )}
            
            <button
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 font-bold shadow-md disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i> Loading...
                </span>
              ) : method === 'email' ? 'Login' : 'Send OTP'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account? <Link to="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
            </p>
            <Link to="/forgot-password" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;