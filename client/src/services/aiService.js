import api from './api';

export const getSectorVolatility = async () => {
  const response = await api.get('/api/ai/sectors');
  return response.data;
};

export const getAITradeRecommendations = async (sector) => {
  const response = await api.get(`/api/ai/recommendations?sector=${sector}`);
  return response.data;
};