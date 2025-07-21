// server/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const stockRoutes = require('./routes/stockRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/payment', paymentRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Trading Platform Backend running');
});

// ✅ Deployment mode handling
if (process.env.RENDER === 'true') {
  // Render: normal server listening
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} else if (process.env.NODE_ENV === 'production') {
  // Vercel: serverless export
  module.exports = app;
  module.exports.handler = serverless(app);
} else {
  // Local development
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}
