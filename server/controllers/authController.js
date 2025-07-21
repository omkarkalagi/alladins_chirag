// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const bcrypt = require('bcryptjs');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// User registration
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ name, email, password, phone });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Generate JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.status(201).json({ token, user: { id: user.id, name, email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ token, user: { id: user.id, name: user.name, email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 300000; // 5 minutes
    
    // Find user by phone
    let user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Save OTP to user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    
    // Send SMS via Twilio
    await client.messages.create({
      body: `Your Alladins Chirag OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    // Find user
    const user = await User.findOne({ 
      phone,
      otp,
      otpExpiry: { $gt: Date.now() } // Check if OTP not expired
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP or expired' });
    }
    
    // Clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    
    // Generate JWT
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ token, user: { id: user.id, name: user.name } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Verify token
exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};