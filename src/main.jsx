import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Automatically remove any injected Netlify drawer/badge elements
if (typeof window !== 'undefined') {
  const removeNetlifyBadge = () => {
    const badgeElements = document.querySelectorAll(
      'netlify-drawer, #netlify-drawer, iframe#netlify-drawer, [data-netlify-drawer], a[href*="netlify.com/powered-by"], .netlify-badge'
    );
    badgeElements.forEach(el => el.remove());
  };
  window.addEventListener('DOMContentLoaded', removeNetlifyBadge);
  window.addEventListener('load', removeNetlifyBadge);
  try {
    const observer = new MutationObserver(removeNetlifyBadge);
    observer.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {
    // ignore
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
