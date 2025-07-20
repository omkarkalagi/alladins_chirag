import api from './api';

export const createPaymentIntent = async (amount, currency = 'usd') => {
  // In a real app, you'd call your backend to create a Payment Intent
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        clientSecret: `pi_${Math.random().toString(36).substr(2, 14)}_secret_${Math.random().toString(36).substr(2, 24)}`,
        amount,
        currency
      });
    }, 500);
  });
};

export const confirmPayment = async (paymentMethodId, amount) => {
  // In a real app, you'd call your backend to confirm the payment
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        amount,
        transactionId: `tx_${Math.random().toString(36).substr(2, 14)}`,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });
};

export const getPaymentHistory = async () => {
  const response = await api.get('/payments/history');
  return response.data;
};