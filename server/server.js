// alladins_chirag/server/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Corrected import paths (removed './server/')
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const stockRoutes = require('./routes/stockRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/payment', paymentRoutes);

// ✅ Basic health check route
app.get('/', (req, res) => {
  res.send('Trading Platform Backend is running');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
