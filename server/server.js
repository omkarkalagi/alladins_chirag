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
const portfolioRoutes = require('./routes/portfolioRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/portfolio', portfolioRoutes);

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