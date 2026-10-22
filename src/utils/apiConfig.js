// Centralized API endpoint helper for PrashWeb
// Automatically adapts between unified full-stack deployments (relative /api)
// and decoupled deployments (e.g., frontend on Render Static / Netlify + backend on Render Web Service)

const VITE_API_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint) => {
  const base = VITE_API_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${cleanEndpoint}`;
};

export const API_BASE_URL = VITE_API_URL;
