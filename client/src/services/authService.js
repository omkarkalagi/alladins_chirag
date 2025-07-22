import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const loginUser = async (email, password, phone) => {
  const res = await axios.post(`${API}/login`, { email, password, phone });
  return res.data;
};

export const verifyOtp = async (email, otp) => {
  const res = await axios.post(`${API}/verify-otp`, { email, otp });
  return res.data;
};
