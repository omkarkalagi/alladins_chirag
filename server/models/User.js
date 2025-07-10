const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  portfolio: [{
    symbol: String,
    quantity: Number,
    averagePrice: Number
  }],
  transactions: [{
    type: { type: String, enum: ['buy', 'sell'] },
    symbol: String,
    quantity: Number,
    price: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  balance: { type: Number, default: 100000 } // Starting balance
});

module.exports = mongoose.model('User', userSchema);