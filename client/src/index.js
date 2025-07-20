import React from 'react';
import ReactDOM from 'react-dom/client';

// Import all global and component CSS
import './styles/base.css';
import './styles/global.css';
import './styles/main.css';
import './styles/components.css';
import './styles/utilities.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals (optional for performance monitoring)
reportWebVitals();
