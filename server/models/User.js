const mongoose = require('mongoose');

const PortfolioItemSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  avgPrice: { type: Number, required: true }
});

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6,
    select: false
  },
  balance: { 
    type: Number, 
    default: 0,
    min: 0
  },
  portfolio: [PortfolioItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);