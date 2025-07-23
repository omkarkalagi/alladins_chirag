// authService.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const loginWithEmail = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const loginWithMobile = async (mobile, otp) => {
  const res = await fetch(`${API_URL}/auth/login/mobile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, otp }),
  });
  return res.json();
};

export const sendOTP = async (mobile) => {
  const res = await fetch(`${API_URL}/auth/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile }),
  });
  return res.json();
};

export const verifyOTP = async (mobile, otp) => {
  const res = await fetch(`${API_URL}/auth/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, otp }),
  });
  return res.json();
};

export const register = async (email, password, mobile) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, mobile }),
  });
  return res.json();
};