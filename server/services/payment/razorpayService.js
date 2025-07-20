const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * Creates a new payment order
 */
const createOrder = async (amount, currency = "INR", receipt = "rcptid_11") => {
  const options = {
    amount: amount * 100, // Convert to paise
    currency,
    receipt
  };

  try {
    const order = await instance.orders.create(options);
    console.log("Razorpay order created:", order);
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};

/**
 * Verifies payment signature (if needed)
 */
const verifySignature = (order_id, payment_id, signature) => {
  const crypto = require("crypto");
  const body = order_id + "|" + payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === signature;
};

module.exports = {
  createOrder,
  verifySignature
};
