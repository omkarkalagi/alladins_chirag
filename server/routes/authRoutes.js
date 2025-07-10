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

// Generate OTP and send via SMS
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  
  try {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP to user (in real app, store in DB with expiration)
    
    // Send SMS with Twilio
    await client.messages.create({
      body: `Your Alladin's Chirag OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP and login/signup
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  
  try {
    // In real app, verify OTP from DB
    
    // Check if user exists
    let user = await User.findOne({ phone });
    
    if (!user) {
      // Create new user if not exists
      user = new User({ phone });
      await user.save();
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    
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
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    user = new User({ name, email, password });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    
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
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    
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

module.exports = router;