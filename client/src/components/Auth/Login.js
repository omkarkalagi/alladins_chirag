import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('email'); // 'email' or 'phone'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (method === 'email') {
        await login(email, password);
      } else {
        // For phone, navigate to OTP verification
        navigate('/verify-otp', { state: { phone } });
        return;
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-2 rounded-full">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AC</span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center">Alladin's Chirag</h2>
          <p className="text-blue-200 text-center">Kalagi Group of Companies</p>
        </div>
        
        <div className="p-8">
          <div className="flex border-b mb-6">
            <button
              className={`py-2 px-4 font-medium ${method === 'email' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setMethod('email')}
            >
              Email Login
            </button>
            <button
              className={`py-2 px-4 font-medium ${method === 'phone' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setMethod('phone')}
            >
              Mobile Login
            </button>
          </div>
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            {method === 'email' ? (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : (
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-md hover:from-blue-700 hover:to-indigo-800 transition duration-300 font-medium"
            >
              {method === 'email' ? 'Login' : 'Send OTP'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
// client/src/components/Auth/Login.js
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
      {/* Header content */}
    </div>
    
    {/* Add shadow and rounded corners to form */}
    <div className="p-6 rounded-lg bg-white shadow-sm">
      {/* Form content */}
    </div>
  </div>
</div>