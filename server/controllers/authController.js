// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const bcrypt = require('bcryptjs');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Login route (Only your credentials work)
exports.login = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    // Allow only your email
    if (email !== 'omkardigambar4@gmail.com') {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    // Check password
    if (password !== 'omkar') {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 300000; // 5 mins

    // Save OTP to DB
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, phone, otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.phone = phone;
    }
    await user.save();

    // Send WhatsApp message
    await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio sandbox WhatsApp number
      to: `whatsapp:${phone}`,        // Ensure phone has country code (e.g. +91...)
      body: `Your Alladins Chirag OTP is: ${otp}`
    });

    res.json({ message: 'OTP sent via WhatsApp successfully', userId: user._id });

  } catch (err) {
    console.error('WhatsApp OTP send error:', err.message);
    res.status(500).send('Server error while sending OTP');
  }
};

// Verify OTP route
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp != otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Generate JWT after successful OTP verification
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'OTP verified', token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
