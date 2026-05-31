import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ThankYou from './ThankYou.jsx';
import { RouteProvider } from './components/RouteContext.jsx';
import { isThankYouPage } from './data/routeConfig.js';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouteProvider>
      {isThankYouPage() ? <ThankYou /> : <App />}
    </RouteProvider>
  </React.StrictMode>
);
