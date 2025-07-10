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

// In-memory OTP store
const otpStore = {};

// Generate OTP and send via SMS
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });
  
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phone] = { otp, timestamp: Date.now() };

    // Uncomment to send real SMS
    // await client.messages.create({
    //   body: `Your Alladin's Chirag OTP is: ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phone
    // });
    
    console.log(`OTP for ${phone} is ${otp}`);
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
  if (!storedOtp || storedOtp.otp !== otp || (Date.now() - storedOtp.timestamp > 300000)) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  try {
    delete otpStore[phone];

    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone });
      await user.save();
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
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