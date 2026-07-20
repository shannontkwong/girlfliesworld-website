import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Publishable keys are meant to be public — safe to keep in frontend code.
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51PZNTwS65vWrYbfQ5lZvddJ4vitCkuJKLSg4AtpIfutc0BqAQOsNLYj7ggEO4OK5kWXvxzm7U8lIYaXBBV0p3Cwh00RTXwIDF7';

let stripePromise = null;
function getStripe() {
  if (!stripePromise) stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  return stripePromise;
}

// One click, one modal: opening this immediately requests a Checkout
// Session and mounts Stripe's own embedded checkout — no separate
// amount-picker step first. The donor sets their own amount and adds an
// optional name/message directly inside Stripe's form.
const DonateModal = ({ open, onClose }) => {
  const [error, setError] = useState(null);
  const checkoutRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      if (checkoutRef.current) {
        checkoutRef.current.destroy();
        checkoutRef.current = null;
      }
      setError(null);
      return;
    }

    let cancelled = false;

    async function start() {
      try {
        const res = await fetch('/api/create-checkout-session', { method: 'POST' });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || 'Could not start checkout.');
        if (cancelled) return;

        const stripe = await getStripe();
        const checkout = await stripe.createEmbeddedCheckoutPage({ clientSecret: body.clientSecret });
        if (cancelled) {
          checkout.destroy();
          return;
        }
        checkoutRef.current = checkout;
        checkout.mount(containerRef.current);
      } catch (err) {
        console.error('Checkout init failed:', err);
        if (!cancelled) setError(err.message || 'Something went wrong. Try again.');
      }
    }

    start();
    return () => { cancelled = true; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: error ? '2rem' : '0.5rem',
          position: 'relative',
          fontFamily: 'var(--font-body)',
          color: '#fff',
          minHeight: '480px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.12)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            zIndex: 10,
          }}
        >
          <X size={16} />
        </button>

        {error ? (
          <div style={{ paddingTop: '3rem', textAlign: 'center' }}>
            <p style={{ color: '#E67E22', marginBottom: '1rem' }}>{error}</p>
            <button
              onClick={onClose}
              style={{
                background: '#E67E22',
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                padding: '0.7rem 1.5rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div ref={containerRef} style={{ minHeight: '480px' }} />
        )}
      </div>
    </div>
  );
};

export default DonateModal;
