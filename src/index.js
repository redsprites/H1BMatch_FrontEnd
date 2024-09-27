import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("ed api", VITE_API_BASE_URL)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_KEY;

console.log("js api ", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);