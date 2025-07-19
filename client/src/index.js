import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // Main global styles
import './styles/utilities.css'; // Utility classes
import './styles/components.css'; // Component-specific styles
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import './styles/App.css';
import './index.css'; 

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