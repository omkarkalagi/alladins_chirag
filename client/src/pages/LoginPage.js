import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import OtpForm from '../components/Auth/OtpForm';
import Logo from '../assets/logo.svg';
import { loginUser, verifyOtp } from '../services/authService';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password, phone }) => {
    setLoading(true);
    setError('');

    try {
      // ✅ Hardcoded admin login bypass
      if (email === 'omkardigambar4@gmail.com' && password === 'omkar') {
        await login({ email, token: 'admin-token' });
        navigate('/dashboard');
        return;
      }

      const res = await loginUser(email, password, phone);
      setEmail(email);
      setPhone(phone);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (otp) => {
    setLoading(true);
    setError('');

    try {
      const res = await verifyOtp(email, otp);
      await login({ email, token: res.token });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
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
                onResendOtp={() => handleLogin({ email, phone })}
                loading={loading}
                error={error}
              />
            )}
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <div className="font-dancing text-lg">With ❤️ from Omkar Kalagi</div>
        <div className="font-roboto mt-1 text-xs">Kalagi Group of Companies</div>
        <p className="text-sm text-white mt-2">
          Don't have an account?{' '}
          <a href="/signup" className="text-yellow-500 underline">
            Sign up
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;