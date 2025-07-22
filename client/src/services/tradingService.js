import api from './api';

export const getKiteLoginURL = async () => {
  const response = await api.get('/stocks/kite-login-url');
  return response.data.url;
};

export const generateKiteSession = async (requestToken) => {
  const response = await api.post('/stocks/kite-generate-session', { requestToken });
  return response.data;
};
