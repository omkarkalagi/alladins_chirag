// Before (broken):
import api from './api';

// Fix 1: Add extension if file exists:
import api from './api.js';

// Fix 2: Point to correct path (if file is elsewhere):
import api from '../utils/api'; 

// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-endpoint.com',
});

export default api;