import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Publishable keys are meant to be public — safe to keep in frontend code.
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51PZNTwS65vWrYbfQ5lZvddJ4vitCkuJKLSg4AtpIfutc0BqAQOsNLYj7ggEO4OK5kWXvxzm7U8lIYaXBBV0p3Cwh00RTXwIDF7';

const PRESET_AMOUNTS = [10, 25, 50, 100];

let stripePromise = null;
function getStripe() {
  if (!stripePromise) stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  return stripePromise;
}

const DonateModal = ({ open, onClose }) => {
  const [step, setStep] = useState('amount'); // 'amount' | 'checkout'
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const checkoutRef = useRef(null); // holds the mounted Embedded Checkout instance
  const containerRef = useRef(null);

  // Reset everything each time the modal is closed, so reopening starts fresh.
  useEffect(() => {
    if (!open) {
      setStep('amount');
      setError(null);
      setSubmitting(false);
      if (checkoutRef.current) {
        checkoutRef.current.destroy();
        checkoutRef.current = null;
      }
    }
  }, [open]);

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  async function handleContinue() {
    const cents = Math.round(effectiveAmount * 100);
    if (!Number.isFinite(cents) || cents < 100) {
      setError('Enter an amount of at least $1.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: cents, name, message }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Could not start checkout.');

      setStep('checkout');

      const stripe = await getStripe();
      const checkout = await stripe.createEmbeddedCheckoutPage({ clientSecret: body.clientSecret });
      checkoutRef.current = checkout;
      checkout.mount(containerRef.current);
    } catch (err) {
      console.error('Checkout init failed:', err);
      setError(err.message || 'Something went wrong. Try again.');
      setStep('amount');
    } finally {
      setSubmitting(false);
    }
  }

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
          maxWidth: step === 'checkout' ? '520px' : '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          fontFamily: 'var(--font-body)',
          color: '#fff',
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
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          <X size={16} />
        </button>

        {step === 'amount' && (
          <>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
              Fund the Mission
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', marginBottom: '1rem' }}>
              {PRESET_AMOUNTS.map((val) => (
                <button
                  key={val}
                  onClick={() => { setAmount(val); setCustomAmount(''); }}
                  style={{
                    padding: '0.7rem 0.5rem',
                    borderRadius: '10px',
                    border: !customAmount && amount === val ? '2px solid #E67E22' : '1px solid rgba(255,255,255,0.2)',
                    background: !customAmount && amount === val ? 'rgba(230,126,34,0.15)' : 'transparent',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  ${val}
                </button>
              ))}
            </div>

            <input
              type="number"
              min="1"
              placeholder="Custom amount (USD)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#fff',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
              }}
            />

            <input
              type="text"
              placeholder="Your name (optional — blank shows as Anonymous)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#fff',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
              }}
            />

            <textarea
              placeholder="Leave a message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={300}
              rows={2}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: '#fff',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                resize: 'vertical',
              }}
            />

            {error && (
              <div style={{ color: '#E67E22', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <button
              onClick={handleContinue}
              disabled={submitting}
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '999px',
                border: 'none',
                background: '#E67E22',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: submitting ? 'default' : 'pointer',
                opacity: submitting ? 0.6 : 1,
                fontFamily: 'var(--font-body)',
              }}
            >
              {submitting ? 'Loading...' : `Continue — $${effectiveAmount || 0}`}
            </button>
          </>
        )}

        {step === 'checkout' && (
          <div ref={containerRef} style={{ minHeight: '400px' }} />
        )}
      </div>
    </div>
  );
};

export default DonateModal;
