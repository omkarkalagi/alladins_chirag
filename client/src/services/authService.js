// Removed unused import api

// Simulated user database
const users = [
  { email: 'user@example.com', password: 'password123' }
];

export const signup = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userExists = users.some(user => user.email === email);
      if (userExists) {
        reject(new Error('User already exists'));
      } else {
        users.push({ email, password });
        localStorage.setItem('authToken', 'fake-auth-token');
        resolve({ user: { email } });
      }
    }, 1000);
  });
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('authToken', 'fake-auth-token');
        resolve({ user: { email } });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

export const logout = async () => {
  localStorage.removeItem('authToken');
  return Promise.resolve();
};

export const onAuthStateChanged = (callback) => {
  const token = localStorage.getItem('authToken');
  const user = token ? { email: 'user@example.com' } : null;
  callback(user);
  return () => {};
};

// Add default export object
const authService = {
  signup,
  login,
  logout,
  onAuthStateChanged
};

export default authService;

