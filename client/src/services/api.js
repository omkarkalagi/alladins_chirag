// Basic API setup
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url.com',
});

export default api;