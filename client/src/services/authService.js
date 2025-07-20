const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Sign up a new user
export const signup = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }

  const data = await response.json();
  localStorage.setItem('authToken', data.token);
  return data;
};

// Login existing user
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('authToken', data.token);
  return data;
};

// Logout user
export const logout = async () => {
  localStorage.removeItem('authToken');
  return Promise.resolve();
};

// Listen for auth state changes
export const onAuthStateChanged = (callback) => {
  const token = localStorage.getItem('authToken');
  const user = token ? { email: 'user@example.com' } : null; // You can decode token for actual email if JWT encoded
  callback(user);
  return () => {};
};

const authService = {
  signup,
  login,
  logout,
  onAuthStateChanged
};

export default authService;
