const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Email/password login
exports.loginWithEmail = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Mobile/OTP login
exports.loginWithMobile = async (req, res) => {
  const { mobile, otp } = req.body;
  try {
    const user = await User.findOne({ mobile });
    if (!user || user.otp !== otp) {
      return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
    user.isVerified = true;
    user.otp = null;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token, user: { id: user._id, mobile: user.mobile } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Send OTP
exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;
  try {
    let user = await User.findOne({ mobile });
    if (!user) {
      user = new User({ mobile });
    }
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();
    // TODO: Integrate with SMS provider
    console.log(`OTP for ${mobile}: ${otp}`);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
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