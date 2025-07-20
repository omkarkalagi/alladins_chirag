import api from './api';

export const placeOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.delete(`/orders/${orderId}`);
  return response.data;
};

export const getOpenOrders = async () => {
  const response = await api.get('/orders/open');
  return response.data;
};

export const getOrderHistory = async () => {
  const response = await api.get('/orders/history');
  return response.data;
};

export const startAutoTrading = async (strategy, params) => {
  const response = await api.post('/autotrading/start', { strategy, params });
  return response.data;
};

export const stopAutoTrading = async () => {
  const response = await api.post('/autotrading/stop');
  return response.data;
};

export const getAutoTradingStatus = async () => {
  const response = await api.get('/autotrading/status');
  return response.data;
};