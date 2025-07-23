// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const http = require('http');
const setupWebsocket = require('./websocket');

// Route imports
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const stockRoutes = require('./routes/stockRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Security Middleware
app.use(helmet()); // Sets various security headers
app.use(mongoSanitize()); // Prevents MongoDB operator injection

// ✅ Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// ✅ Enhanced CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes

// ✅ Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ MongoDB connection with enhanced options
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // Exit on DB connection failure
});

// ✅ Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('📊 MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB connection disconnected');
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/payment', paymentRoutes);

// ✅ Enhanced health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'UP',
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    services: {
      twilio: process.env.TWILIO_ACCOUNT_SID ? 'configured' : 'missing',
      stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'missing',
      alphaVantage: process.env.ALPHA_VANTAGE_API_KEY ? 'configured' : 'missing',
      kite: process.env.KITE_API_KEY ? 'configured' : 'missing'
    }
  });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ✅ Server startup
const server = http.createServer(app);
setupWebsocket(server);
server.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🌐 Listening on port ${PORT}`);
  console.log(`🔗 MongoDB: ${process.env.MONGODB_URI.split('@')[1]?.split('/')[0] || 'Connected'}`);
  console.log(`🔒 JWT: ${process.env.JWT_SECRET ? 'Configured' : 'Missing'}`);
  console.log(`📱 Twilio: ${process.env.TWILIO_ACCOUNT_SID ? 'Ready' : 'Disabled'}`);
  console.log(`💳 Stripe: ${process.env.STRIPE_SECRET_KEY ? 'Ready' : 'Disabled'}`);
  console.log(`📈 Alpha Vantage: ${process.env.ALPHA_VANTAGE_API_KEY ? 'Ready' : 'Disabled'}`);
  console.log(`📊 Kite API: ${process.env.KITE_API_KEY ? 'Ready' : 'Disabled'}`);
  console.log('='.repeat(50));
});

// ✅ Graceful shutdown
const shutdown = () => {
  console.log('\n🛑 Received shutdown signal. Shutting down gracefully...');
  server.close(() => {
    console.log('🚫 HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('🚫 MongoDB connection closed');
      process.exit(0);
    });
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// ✅ Unhandled rejection catcher
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});

// ✅ Uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('🚨 Uncaught Exception:', err);
  shutdown();
});