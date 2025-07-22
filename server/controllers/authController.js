const User = require('../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.login = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    // Validate credentials
    if (email !== 'omkardigambar4@gmail.com' || password !== 'omkar') {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    // Validate phone number format
    if (!phone || !phone.startsWith('+')) {
      return res.status(400).json({ 
        message: 'Phone number must include country code (e.g. +91XXXXXXXXXX)' 
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 300000; // 5 mins

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, phone, otp, otpExpiry, name: 'Omkar', password: 'hashed' });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.phone = phone;
    }
    await user.save();

    // Send OTP via WhatsApp
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phone}`,
      body: `Your Alladins Chirag OTP is: ${otp}`
    });

    res.json({ message: 'OTP sent successfully', userId: user._id });

  } catch (err) {
    console.error('Twilio WhatsApp error:', err);
    
    // Enhanced error logging
    const errorDetails = {
      message: err.message,
      code: err.code,
      twilioError: err.moreInfo,
      fromNumber: process.env.TWILIO_WHATSAPP_NUMBER,
      toNumber: `whatsapp:${req.body.phone}`,
      accountSid: process.env.TWILIO_ACCOUNT_SID
    };
    
    res.status(500).json({
      message: 'Failed to send OTP',
      error: errorDetails
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp != otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'OTP verified successfully', token });

  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ 
      message: 'Server error during OTP verification',
      error: err.message 
    });
  }
};