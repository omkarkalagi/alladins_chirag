import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import Logo from '../assets/logo.svg';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError('');

    try {
      // Hardcoded admin login
      if (email === 'omkardigambar4@gmail.com' && password === 'omkar') {
        await login({ email, token: 'admin-token' });
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
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

            <LoginForm 
              onSubmit={handleLogin} 
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
      
      <footer className="py-6 text-center text-gray-500 text-sm">
        <div className="font-dancing text-lg">
          With ❤️ from Omkar Kalagi
        </div>
        <div className="font-roboto mt-1 text-xs">
          Kalagi Group of Companies
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
