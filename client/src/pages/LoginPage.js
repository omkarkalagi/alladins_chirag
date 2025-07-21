import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import OtpForm from '../components/Auth/OtpForm';
import Logo from '../assets/logo.svg';

const LoginPage = () => {
  const [step, setStep] = useState(1); // 1: Login, 2: OTP
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, you would call your API here
      // await api.login(credentials);
      
      // For demo: validate credentials
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        setEmail(credentials.email);
        setPhone(credentials.phone);
        setStep(2); // Move to OTP step
      } else {
        setError('Invalid credentials. Use email: user@example.com, password: password');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (otp) => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, you would verify OTP here
      // await api.verifyOtp(phone, otp);
      
      // For demo: any 6-digit code works
      if (otp.length === 6) {
        await login({ email });
        navigate('/dashboard');
      } else {
        setError('Please enter a valid 6-digit OTP');
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed');
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

            {step === 1 ? (
              <LoginForm 
                onSubmit={handleLogin} 
                loading={loading}
                error={error}
              />
            ) : (
              <OtpForm 
                phone={phone}
                onSubmit={handleOtpVerification}
                onResendOtp={() => console.log('Resend OTP')}
                loading={loading}
                error={error}
              />
            )}
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