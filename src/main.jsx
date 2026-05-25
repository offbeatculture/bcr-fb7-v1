import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ThankYou from './ThankYou.jsx';
import './styles/index.css';

const path = window.location.pathname.replace(/\/+$/, '');
const isThankYou = /\/thank-you$/i.test(path) || /thank-you\.html$/i.test(window.location.pathname);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isThankYou ? <ThankYou /> : <App />}
  </React.StrictMode>
);
