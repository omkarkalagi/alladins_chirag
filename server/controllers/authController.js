const User = require('../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const bcrypt = require('bcryptjs');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Login route (Only your credentials work)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Allow only your email
    if (email !== 'omkardigambar4@gmail.com') {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    // Check password
    if (password !== 'omkar') {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Send OTP via Twilio
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 300000; // 5 mins

    // Save OTP to DB
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, phone: '+917624828106', otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      user.phone = '+917624828106';
    }
    await user.save();

    console.log(`Sending OTP ${otp} to +917624828106`);

    // Send SMS
    await client.messages.create({
      body: `Your Alladins Chirag OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+917624828106'
    });

    res.json({ message: 'OTP sent successfully', userId: user._id });

  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).send('Server error');
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
    console.error('Error verifying OTP:', err.message);
    res.status(500).send('Server error');
  }
};
