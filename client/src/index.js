// src/index.js

// 1. React imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// 2. Third-party libraries
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// 3. Local CSS/Assets
import './index.css';
import './tailwind.output.css';

// 4. Local Components
import App from './App';

// 5. Local Utilities/Services
import reportWebVitals from './reportWebVitals';
import store from './app/store';

// 6. Code execution comes LAST
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();