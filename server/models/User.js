// server/models/User.js
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
