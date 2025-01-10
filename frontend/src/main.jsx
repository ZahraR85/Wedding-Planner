import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App.jsx';
import './index.css';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51QfqZ64ZILbzFClJqUkwY9tPX9JKuN6HtAlpNxZ4VVZhMMqgnU8oRAvsNjbxfTct2qhvUascmYkgb966bqwEajnT00UXpFmhTm'); // Replace with your actual public key

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your app with the Elements component to provide Stripe context */}
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>
);
