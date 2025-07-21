import React, { useState } from 'react';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

const OtpForm = ({ phone, onSubmit, onResendOtp, loading, error }) => {
  const [otp, setOtp] = useState('');
  const last4Digits = phone.slice(-4);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="flex items-center text-gray-400 hover:text-white mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      
      <h2 className="text-xl font-semibold text-white text-center mb-2">
        Verify OTP
      </h2>
      
      <p className="text-gray-400 text-center mb-6">
        Enter the 6-digit code sent to ••••••{last4Digits}
      </p>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded-md text-center">
          {error}
        </div>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaLock className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white text-center text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 bg-gradient-to-r from-yellow-600 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-yellow-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Verifying...' : 'Verify & Continue'}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Didn't receive OTP?{' '}
          <button 
            type="button" 
            className="text-yellow-500 hover:text-yellow-400 font-medium"
            onClick={onResendOtp}
            disabled={loading}
          >
            Resend
          </button>
        </p>
      </div>
    </form>
  );
};

export default OtpForm;