import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';

// Twilio client setup from environment variables
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Utility function to generate JWT
 */
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * Signup Controller
 */
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = generateToken(newUser);
    res.cookie('token', token, { httpOnly: true }).json({ user: newUser });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Login Controller
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true }).json({ user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Send OTP Controller
 */
export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await client.messages.create({
      body: `Your Alladin's Chirag OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    // Store OTP in DB if needed, or in-memory store for demo
    res.json({ message: 'OTP sent successfully', otp }); // Return OTP for testing only. Remove in production.
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

/**
 * Verify OTP Controller
 */
export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    // Implement OTP verification logic here
    // For demo, accept any OTP
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true }).json({ user });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

/**
 * Logout Controller
 */
export const logout = async (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};

/**
 * Check Auth Controller
 */
export const checkAuth = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error('Check Auth Error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
