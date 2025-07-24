const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpService = require('../services/otpService');

// Email/password login (hardcoded)
exports.loginWithEmail = async (req, res) => {
  const { email, password } = req.body;
  // Allow any email/password for demo
  return res.json({
    success: true,
    token: 'dummy-token',
    user: { id: '1', email: (email || '').trim() }
  });
};

// Mobile/OTP login (hardcoded)
exports.loginWithMobile = async (req, res) => {
  const { mobile, otp } = req.body;
  // Allow any mobile/otp for demo
  return res.json({
    success: true,
    token: 'dummy-token',
    user: { id: '2', mobile: (mobile || '').trim() }
  });
};

// Send OTP (always return 7624 for dev/demo)
exports.sendOTP = async (req, res) => {
  // Always return OTP sent for demo
  return res.json({ success: true, message: 'OTP sent successfully (dev mode)', otp: '0000' });
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;
  try {
    const user = await User.findOne({ mobile });
    if (!user || user.otp !== otp) {
      return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
    user.isVerified = true;
    user.otp = null;
    await user.save();
    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'OTP verification error' });
  }
};

// Register user
exports.register = async (req, res) => {
  const { email, password, mobile } = req.body;
  try {
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    user = new User({ email, password: hashedPassword, mobile });
    await user.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration error' });
  }
};