import os
import json

def create_file(path, content=""):
    """Create a file with given content"""
    # Ensure the directory exists before creating the file
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)

def create_project_structure():
    """Create the entire project structure"""
    # Create root directory
    project_root = "alladins_chirag"
    os.makedirs(project_root, exist_ok=True)
    
    # --- Server Setup ---
    server_dir = os.path.join(project_root, "server")
    os.makedirs(server_dir, exist_ok=True)
    
    # Server files
    create_file(os.path.join(server_dir, "server.js"), """// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

// WebSocket for real-time data
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send market data updates every 5 seconds
  const marketInterval = setInterval(async () => {
    try {
      // In production, replace with real API calls
      const mockData = await generateMockMarketData();
      socket.emit('market-update', mockData);
    } catch (error) {
      console.error('Error sending market update:', error);
    }
  }, 5000);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(marketInterval);
  });
});

// Generate mock market data
async function generateMockMarketData() {
  const nifty50Stocks = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'HINDUNILVR', 
                        'ICICIBANK', 'KOTAKBANK', 'SBIN', 'BHARTIARTL', 'LT'];
  
  const stocks = [];
  
  for (const symbol of nifty50Stocks) {
    const basePrice = Math.random() * 3000 + 500;
    const change = (Math.random() * 5 - 2.5);
    const price = basePrice + change;
    
    stocks.push({
      symbol,
      name: getStockName(symbol),
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(((change / basePrice) * 100).toFixed(2))
    });
  }
  
  return {
    indices: {
      nifty: {
        value: 18432.45 + (Math.random() * 100 - 50),
        change: (Math.random() * 0.5 - 0.25)
      },
      sensex: {
        value: 62187.34 + (Math.random() * 200 - 100),
        change: (Math.random() * 0.5 - 0.25)
      }
    },
    stocks
  };
}

function getStockName(symbol) {
  const names = {
    'RELIANCE': 'Reliance Industries',
    'TCS': 'Tata Consultancy Services',
    'HDFCBANK': 'HDFC Bank',
    'INFY': 'Infosys',
    'HINDUNILVR': 'Hindustan Unilever',
    'ICICIBANK': 'ICICI Bank',
    'KOTAKBANK': 'Kotak Mahindra Bank',
    'SBIN': 'State Bank of India',
    'BHARTIARTL': 'Bharti Airtel',
    'LT': 'Larsen & Toubro'
  };
  
  return names[symbol] || symbol;
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
""")

    # Create server subdirectories
    server_subdirs = ["controllers", "models", "routes"]
    for subdir in server_subdirs:
        os.makedirs(os.path.join(server_dir, subdir), exist_ok=True)
    
    # Create server files
    create_file(os.path.join(server_dir, "models", "User.js"), """// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true }, // sparse allows multiple null values
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  portfolio: [{
    symbol: String,
    quantity: Number,
    averagePrice: Number
  }]
});

module.exports = mongoose.model('User', userSchema);
""")

    create_file(os.path.join(server_dir, "routes", "authRoutes.js"), """// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID, 
  process.env.TWILIO_AUTH_TOKEN
);

// In-memory OTP store for simplicity. In production, use a database like Redis.
const otpStore = {};

// Generate OTP and send via SMS
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });
  
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phone] = { otp, timestamp: Date.now() }; // Store with timestamp

    // In a real app, uncomment the following to send SMS
    // await client.messages.create({
    //   body: `Your Alladin's Chirag OTP is: ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phone
    // });
    
    console.log(`OTP for ${phone} is ${otp}`); // For testing without sending SMS
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP and login/signup
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  
  const storedOtp = otpStore[phone];
  // Verify OTP (and check expiration, e.g., 5 minutes)
  if (!storedOtp || storedOtp.otp !== otp || (Date.now() - storedOtp.timestamp > 300000)) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  try {
    delete otpStore[phone]; // OTP is used, remove it

    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone });
      await user.save();
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    res.status(200).json({ message: 'OTP verified successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

// Email/password signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    user = new User({ name, email, password });
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Email/password login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Check auth status
router.get('/check', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ user: null });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // You might want to fetch the user from the DB here to ensure they still exist
        res.status(200).json({ user: { id: decoded.id } });
    } catch (error) {
        res.status(401).json({ user: null });
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
""")

    create_file(os.path.join(server_dir, "routes", "stockRoutes.js"), """// server/routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Use Alpha Vantage as free stock API
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Get Nifty 50 stocks
router.get('/nifty50', async (req, res) => {
  try {
    // In a real app, you might have a dynamic list of Nifty 50 symbols
    const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'HINDUNILVR', 
                     'ICICIBANK', 'KOTAKBANK', 'SBIN', 'BHARTIARTL', 'LT'];
    
    const promises = symbols.map(symbol => 
      axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${ALPHA_VANTAGE_API_KEY}`)
    );
    
    const results = await Promise.all(promises);
    const stocks = results.map(res => res.data['Global Quote']).filter(quote => quote); // Filter out empty responses
    
    res.json(stocks);
  } catch (error) {
    console.error('Alpha Vantage API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

module.exports = router;
""")

    create_file(os.path.join(server_dir, "package.json"), json.dumps({
        "name": "alladins-chirag-server",
        "version": "1.0.0",
        "description": "Backend for Alladin's Chirag stock trading platform",
        "main": "server.js",
        "scripts": {
            "start": "node server.js",
            "dev": "nodemon server.js"
        },
        "dependencies": {
            "axios": "^1.6.7",
            "bcryptjs": "^2.4.3",
            "cookie-parser": "^1.4.6",
            "cors": "^2.8.5",
            "dotenv": "^16.3.1",
            "express": "^4.18.2",
            "jsonwebtoken": "^9.0.2",
            "mongoose": "^8.0.3",
            "socket.io": "^4.7.2",
            "twilio": "^4.19.0"
        },
        "devDependencies": {
            "nodemon": "^3.0.1"
        }
    }, indent=2))
    
    # --- Client Setup ---
    client_dir = os.path.join(project_root, "client")
    os.makedirs(client_dir, exist_ok=True)
    
    # Create React app structure
    client_subdirs = [
        "public",
        "src/components/Auth",
        "src/components/Dashboard",
        "src/context"
    ]
    
    for subdir in client_subdirs:
        # We handle src creation implicitly with its children
        if subdir != "src":
             os.makedirs(os.path.join(client_dir, subdir), exist_ok=True)

    # Create client files
    create_file(os.path.join(client_dir, "public", "index.html"), """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Alladin's Chirag | Kalagi Group of Companies</title>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>
""")

    create_file(os.path.join(client_dir, "src", "index.js"), """// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
""")

    create_file(os.path.join(client_dir, "src", "App.js"), """// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import OTPVerification from './components/Auth/OTPVerification';
import Dashboard from './components/Dashboard/Dashboard';
import { useAuth } from './context/AuthContext';
import './App.css';

const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard socket={socket} />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;
""")

    create_file(os.path.join(client_dir, "src", "App.css"), """
@import url('https://rsms.me/inter/inter.css');

html { font-family: 'Inter', sans-serif; }

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f3f4f6; /* gray-100 */
}

.App {
  text-align: center;
}
""")

    create_file(os.path.join(client_dir, "src", "context", "AuthContext.js"), """// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/api/auth/check');
        setCurrentUser(data.user);
      } catch (error) {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    setCurrentUser(data.user);
    return data;
  };

  const signup = async (name, email, password) => {
    const { data } = await axios.post('/api/auth/signup', { name, email, password });
    setCurrentUser(data.user);
    return data;
  };
  
  const sendOtp = async (phone) => {
    return await axios.post('/api/auth/send-otp', { phone });
  };
  
  const verifyOtp = async (phone, otp) => {
    const { data } = await axios.post('/api/auth/verify-otp', { phone, otp });
    setCurrentUser(data.user);
    return data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    sendOtp,
    verifyOtp,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
""")

    create_file(os.path.join(client_dir, "src", "components", "Auth", "Login.js"), """// client/src/components/Auth/Login.js
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
  const { login, sendOtp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (method === 'email') {
        await login(email, password);
        navigate('/dashboard');
      } else {
        await sendOtp(phone);
        navigate('/verify-otp', { state: { phone } });
      }
    } catch (err) {
      setError(err.response?.data?.error || `Failed to log in with ${method}`);
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
          <div className="flex border-b mb-6">
            <button
              className={`py-2 px-4 font-medium w-1/2 text-center ${method === 'email' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setMethod('email')}
            >
              Email Login
            </button>
            <button
              className={`py-2 px-4 font-medium w-1/2 text-center ${method === 'phone' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setMethod('phone')}
            >
              Mobile Login
            </button>
          </div>
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            {method === 'email' ? (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email" id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password" id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  />
                </div>
              </>
            ) : (
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel" id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} required
                />
              </div>
            )}
            
            <button
              type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-md hover:from-blue-700 hover:to-indigo-800 transition duration-300 font-medium"
            >
              {loading ? 'Loading...' : (method === 'email' ? 'Login' : 'Send OTP')}
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
""")

    create_file(os.path.join(client_dir, "src", "components", "Auth", "Signup.js"), """// client/src/components/Auth/Signup.js
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
""")

    create_file(os.path.join(client_dir, "src", "components", "Auth", "OTPVerification.js"), """// client/src/components/Auth/OTPVerification.js
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
""")

    # This is the file that was originally cut off
    create_file(os.path.join(client_dir, "src", "components", "Dashboard", "Dashboard.js"), """// client/src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MarketOverview from './MarketOverview';
import Portfolio from './Portfolio';
import TradingPanel from './TradingPanel';
import ActivityLog from './ActivityLog';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = ({ socket }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState({ indices: {}, stocks: [] });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Listen for real-time market updates
    socket.on('market-update', (data) => {
      setMarketData(data);
    });
    
    // Cleanup on component unmount
    return () => {
      socket.off('market-update');
    };
  }, [currentUser, navigate, socket]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          <div className="container mx-auto max-w-7xl">
            <MarketOverview data={marketData.indices} />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Portfolio stocks={marketData.stocks} />
                <ActivityLog />
              </div>
              <div className="lg:col-span-1">
                <TradingPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
""")

    create_file(os.path.join(client_dir, "src", "components", "Dashboard", "MarketOverview.js"), """// client/src/components/Dashboard/MarketOverview.js
import React from 'react';

const MarketOverview = ({ data }) => {
  const { nifty, sensex } = data || { nifty: {}, sensex: {} };

  const getChangeClass = (change) => (change >= 0 ? 'text-green-500' : 'text-red-500');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Nifty 50</h3>
        <p className="text-2xl font-bold">{nifty.value?.toFixed(2) || 'N/A'}</p>
        <p className={`text-sm ${getChangeClass(nifty.change)}`}>{nifty.change?.toFixed(2) || 'N/A'}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Sensex</h3>
        <p className="text-2xl font-bold">{sensex.value?.toFixed(2) || 'N/A'}</p>
        <p className={`text-sm ${getChangeClass(sensex.change)}`}>{sensex.change?.toFixed(2) || 'N/A'}</p>
      </div>
    </div>
  );
};

export default MarketOverview;
""")

    create_file(os.path.join(client_dir, "src", "components", "Dashboard", "Portfolio.js"), """// client/src/components/Dashboard/Portfolio.js
import React from 'react';

const Portfolio = ({ stocks }) => {
  const getChangeClass = (change) => (change >= 0 ? 'text-green-500' : 'text-red-500');

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Market Movers</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Symbol</th>
              <th className="py-2">Price</th>
              <th className="py-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {(stocks || []).map((stock, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 font-medium">{stock.symbol}</td>
                <td className="py-3">${stock.price?.toFixed(2)}</td>
                <td className={`py-3 ${getChangeClass(stock.change)}`}>{stock.change?.toFixed(2)} ({stock.changePercent}%)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
""")

    create_file(os.path.join(client_dir, "src", "components", "Dashboard", "TradingPanel.js"), """// client/src/components/Dashboard/TradingPanel.js
import React, { useState } from 'react';

const TradingPanel = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('buy');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle trade execution
    console.log({ symbol, quantity, orderType });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Trade</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="symbol" className="block text-gray-700 mb-2">Symbol</label>
          <input
            type="text" id="symbol"
            className="w-full px-3 py-2 border rounded-md"
            value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number" id="quantity"
            className="w-full px-3 py-2 border rounded-md"
            value={quantity} onChange={(e) => setQuantity(e.target.value)} required
          />
        </div>
        <div className="flex space-x-4 mb-6">
          <button type="button" onClick={() => setOrderType('buy')} className={`w-full py-2 rounded-md ${orderType === 'buy' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Buy</button>
          <button type="button" onClick={() => setOrderType('sell')} className={`w-full py-2 rounded-md ${orderType === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Sell</button>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Place Order</button>
      </form>
    </div>
  );
};

export default TradingPanel;
""")

    create_file(os.path.join(client_dir, "src", "components", "Dashboard", "ActivityLog.js"), """// client/src/components/Dashboard/ActivityLog.js
import React from 'react';

const ActivityLog = () => {
  // Mock data for recent activities
  const activities = [
    { id: 1, type: 'Buy', symbol: 'RELIANCE', quantity: 10, time: '2 mins ago' },
    { id: 2, type: 'Sell', symbol: 'TCS', quantity: 5, time: '1 hour ago' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
      <ul>
        {activities.map(activity => (
          <li key={activity.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <span className={`font-bold ${activity.type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{activity.type}</span> {activity.symbol}
              <p className="text-sm text-gray-500">Quantity: {activity.quantity}</p>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
""")

    create_file(os.path.join(client_dir, "src", "components", "Dashboard", "Sidebar.js"), """// client/src/components/Dashboard/Sidebar.js
import React from 'react';

const Sidebar = () => (
  <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
    <div className="flex items-center justify-center h-20 border-b">
      <h1 className="text-2xl font-bold text-blue-600">Alladin's C.</h1>
    </div>
    <div className="flex-1 overflow-y-auto">
      <nav className="flex-1 px-2 py-4 space-y-2">
        <a href="#dashboard" className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Dashboard</a>
        <a href="#portfolio" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md">Portfolio</a>
        <a href="#trade" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md">Trade</a>
      </nav>
    </div>
  </div>
);

export default Sidebar;
""")

    create_file(os.path.join(client_dir, "src", "components", "Dashboard", "Header.js"), """// client/src/components/Dashboard/Header.js
import React from 'react';

const Header = ({ user, onLogout }) => (
  <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
    <div>
      <h2 className="text-lg font-semibold">Dashboard</h2>
    </div>
    <div>
      <button onClick={onLogout} className="text-sm text-gray-600 hover:text-blue-600">
        Logout
      </button>
    </div>
  </header>
);

export default Header;
""")

    # --- Client package.json ---
    create_file(os.path.join(client_dir, "package.json"), json.dumps({
      "name": "client",
      "version": "0.1.0",
      "private": True,
      "dependencies": {
        "@testing-library/jest-dom": "^5.17.0",
        "@testing-library/react": "^13.4.0",
        "@testing-library/user-event": "^13.5.0",
        "axios": "^1.6.7",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.22.0",
        "react-scripts": "5.0.1",
        "socket.io-client": "^4.7.4",
        "web-vitals": "^2.1.4"
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      },
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest"
        ]
      },
      "browserslist": {
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ],
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      },
      "devDependencies": {
        "tailwindcss": "^3.4.1"
      }
    }, indent=2))
    
    # --- Root Level Files ---
    create_file(os.path.join(project_root, ".gitignore"), """
# Dependencies
/node_modules
/client/node_modules

# Production
/build
/client/build

# dotenv
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# misc
npm-debug.log*
yarn-debug.log*
yarn-error.log*
""")
    
    create_file(os.path.join(project_root, ".env.example"), """
# Server Configuration
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alladins_chirag
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000

# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+15551234567

# Alpha Vantage API Key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key

# React App Configuration
REACT_APP_BACKEND_URL=http://localhost:5000
""")

    print(f"Project '{project_root}' created successfully!")


# Execute the function to create the project
if __name__ == "__main__":
    create_project_structure()