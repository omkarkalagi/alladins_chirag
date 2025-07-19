const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../../models/User');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = {
  createDepositOrder: async (userId, amount) => {
    const order = await instance.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `deposit_${userId}_${Date.now()}`
    });
    
    await User.findByIdAndUpdate(userId, {
      $push: {
        transactions: {
          type: 'deposit',
          amount,
          status: 'pending',
          razorpayOrderId: order.id
        }
      }
    });
    
    return order;
  },

  verifyPayment: async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');
      
    if (expectedSignature !== razorpaySignature) {
      throw new Error('Invalid signature');
    }
    
    const user = await User.findOne({ 'transactions.razorpayOrderId': razorpayOrderId });
    if (!user) throw new Error('User not found');
    
    const transaction = user.transactions.find(t => t.razorpayOrderId === razorpayOrderId);
    await User.updateOne(
      { _id: user._id, 'transactions._id': transaction._id },
      { 
        $set: { 
          'transactions.$.status': 'completed',
          'transactions.$.paymentId': razorpayPaymentId,
          'balance': user.balance + transaction.amount
        } 
      }
    );
    
    return { success: true };
  },

  processWithdrawal: async (userId, amount, bankAccount) => {
    const user = await User.findById(userId);
    if (user.balance < amount) throw new Error('Insufficient balance');
    
    // In production: Initiate actual bank transfer
    const payout = await instance.payouts.create({
      account_number: bankAccount.accountNumber,
      fund_account_id: bankAccount.id,
      amount: amount * 100,
      currency: "INR",
      mode: "NEFT",
      purpose: "refund"
    });
    
    await User.findByIdAndUpdate(userId, {
      $inc: { balance: -amount },
      $push: {
        transactions: {
          type: 'withdrawal',
          amount,
          status: 'completed',
          payoutId: payout.id
        }
      }
    });
    
    return { success: true, payoutId: payout.id };
  }
};