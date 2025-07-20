const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // convert to cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

// Confirm payment and update user balance
exports.confirmPayment = async (req, res) => {
  try {
    const { userId, amount, paymentId } = req.body;
    
    // Update user balance (in a real app, you'd verify payment with Stripe first)
    await User.findByIdAndUpdate(userId, { $inc: { balance: amount } });
    
    // Save payment record would go here
    
    res.json({ success: true, message: 'Payment confirmed' });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ message: 'Payment confirmation failed' });
  }
};