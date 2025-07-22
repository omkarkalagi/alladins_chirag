import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/logo.svg';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('omkardigambar4@gmail.com');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Initialize MSG91 widget
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://verify.msg91.com/otp-provider.js";
    script.async = true;
    script.onload = () => {
      if (window.initSendOTP) {
        window.msg91Config = {
          widgetId: "356776757043323231343834",
          identifier: phone,
          success: (data) => {
            console.log('OTP verified successfully', data);
            handleOtpVerification(data.token);
          },
          failure: (error) => {
            console.error('OTP verification failed', error);
            setError('OTP verification failed');
          },
        };
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [phone]);

  const handleOtpRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Initialize MSG91 OTP widget
      if (window.initSendOTP) {
        window.initSendOTP(window.msg91Config);
      } else {
        throw new Error('MSG91 widget not loaded');
      }
    } catch (err) {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (token) => {
    setLoading(true);
    setError('');

    try {
      // Verify token with backend
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/verify-msg91`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          phone: phone
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        await login({ email, token: data.token });
        navigate('/dashboard');
      } else {
        throw new Error(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (email === 'omkardigambar4@gmail.com' && password === 'omkar') {
        await login({ email, token: 'admin-token' });
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-yellow-600">
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4">
                <img src={Logo} alt="Alladins Chirag" className="h-24 w-24 mx-auto" />
              </div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-2 text-center">
                ALLADINS CHIRAG
              </h1>
              <p className="text-gray-300 text-center italic">
                Your trusted partner for premium trading solutions and exceptional service since 2001
              </p>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                {error && (
                  <div className="bg-red-900 text-red-200 p-3 rounded-md text-center">
                    {error}
                  </div>
                )}

                {/* OTP Section */}
                <form onSubmit={handleOtpRequest}>
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-yellow-500 text-lg" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number (for OTP)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-yellow-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 transform hover:scale-[1.02] ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending OTP...
                      </span>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </form>

                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="mx-4 text-gray-400">OR</span>
                  <div className="flex-grow border-t border-gray-600"></div>
                </div>

                {/* Email/Password Section */}
                <form onSubmit={handleEmailLogin}>
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-yellow-500 text-lg" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                      required
                    />
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-yellow-500 text-lg" />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </span>
                    ) : (
                      'Sign In with Email'
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-block bg-yellow-900 text-yellow-200 p-3 rounded-full mb-4">
                    <i className="fas fa-lock text-2xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Verify OTP</h2>
                  <p className="text-gray-300 mb-6">
                    Enter the 6-digit code sent to <span className="text-yellow-400">{phone}</span>
                  </p>
                  
                  <div className="flex justify-center mb-8">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 mx-1 text-center text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleOtpVerification(otp.join(''))}
                    disabled={loading}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-yellow-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                  </button>
                </div>
                
                <div className="text-center mt-6">
                  <button 
                    onClick={() => setStep(1)}
                    className="text-yellow-500 hover:text-yellow-400 font-medium"
                  >
                    <i className="fas fa-arrow-left mr-2"></i> Back to login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-300 text-sm">
        <div className="mb-2">
          <p className="text-gray-400">Get the app</p>
          <div className="flex justify-center mt-2 space-x-3">
            <a href="#" className="inline-block">
              <div className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center">
                <i className="fab fa-google-play text-green-400 mr-2"></i>
                <span className="text-white">Google Play</span>
              </div>
            </a>
            <a href="#" className="inline-block">
              <div className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center">
                <i className="fab fa-microsoft text-blue-400 mr-2"></i>
                <span className="text-white">Microsoft</span>
              </div>
            </a>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="font-roboto">
            <span className="text-yellow-500 font-bold">KALAGI GROUP OF COMPANIES</span>
            <span className="mx-2">•</span>
            <span>Since 2001</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;