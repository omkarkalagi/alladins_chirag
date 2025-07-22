const User = require('../models/User');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Login route (Only your credentials work)
exports.login = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    if (email !== 'omkardigambar4@gmail.com' || password !== 'omkar') {
      return res.status(401).json({ message: 'Unauthorized user' });
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

    // ✅ Send OTP via WhatsApp Sandbox
    await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio Sandbox WhatsApp number
      to: `whatsapp:${phone}`,
      body: `Your Alladins Chirag OTP is: ${otp}`
    });

    res.json({ message: 'OTP sent successfully', userId: user._id });

  } catch (err) {
    console.error('Twilio WhatsApp error:', err);
    res.status(500).send('Server error: WhatsApp message failed');
  }
};

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

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'OTP verified', token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
