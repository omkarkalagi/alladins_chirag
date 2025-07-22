import React from 'react';
import SignupForm from '../components/Auth/SignupForm';
import Logo from '../assets/logo.svg';

const SignupPage = () => {
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

            <SignupForm />
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <div className="font-dancing text-lg">With ❤️ from Omkar Kalagi</div>
        <div className="font-roboto mt-1 text-xs">Kalagi Group of Companies</div>
      </footer>
    </div>
  );
};

export default SignupPage;
