// client/src/components/Auth/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create an account');
      console.error(err);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
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
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
              <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-md hover:from-blue-700 hover:to-indigo-800 transition duration-300 font-medium">
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
