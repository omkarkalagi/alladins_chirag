import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css'; // Unified CSS import
import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
// Add this temporarily to test if background is working
import BackgroundTest from './components/BackgroundTest';

// Modify the render:
root.render(
  <React.StrictMode>
    <BackgroundTest /> {/* Temporary test */}
    <App />
  </React.StrictMode>
);