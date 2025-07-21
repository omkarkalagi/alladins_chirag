import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupForm from '../components/Auth/SignupForm';
import OtpForm from '../components/Auth/OtpForm';
import Logo from '../assets/logo.svg';

const SignupPage = () => {
  const [step, setStep] = useState(1); // 1: Signup, 2: OTP
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      // Validate data
      if (!data.name || !data.email || !data.password || !data.phone) {
        throw new Error('All fields are required');
      }
      
      if (data.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      
      setUserData(data);
      setStep(2); // Move to OTP step
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (otp) => {
    setLoading(true);
    setError('');
    
    try {
      // In a real app, verify OTP with backend
      if (otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }
      
      // Complete registration
      await login({ email: userData.email });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
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
              <SignupForm 
                onSubmit={handleSignup} 
                loading={loading}
                error={error}
              />
            ) : (
              <OtpForm 
                phone={userData.phone}
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

export default SignupPage;