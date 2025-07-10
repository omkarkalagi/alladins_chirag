// client/src/components/Auth/OTPVerification.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const location = useLocation();
  const { phone } = location.state || {};
  const navigate = useNavigate();
  const { verifyOtp, sendOtp } = useAuth();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      return setError('Please enter a valid 6-digit OTP');
    }
    
    try {
      setLoading(true);
      setError('');
      await verifyOtp(phone, fullOtp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    try {
      await sendOtp(phone);
      setTimer(60);
    } catch (err) {
      setError('Failed to resend OTP.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h2 className="text-2xl font-bold text-white text-center">OTP Verification</h2>
          <p className="text-blue-200 text-center mt-2">Enter the OTP sent to your phone</p>
        </div>
        
        <div className="p-8">
          <p className="text-gray-700 mb-6 text-center">
            Enter the 6-digit OTP sent to <span className="font-medium">{phone || 'your mobile number'}</span>
          </p>
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">{error}</div>}
          
          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          
          <button onClick={handleVerify} disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-md font-medium">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <div className="text-center mt-4">
            <button onClick={handleResendOTP} disabled={timer > 0} className={`text-blue-600 hover:underline ${timer > 0 ? 'text-gray-400' : ''}`}>
              Resend OTP {timer > 0 && `in ${timer}s`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
