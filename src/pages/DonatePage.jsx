import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import DonateModal from '../components/DonateModal';

const GOAL_CENTS = 10000000; // $100,000 — real fundraising target

// One-off manual fix for donations made before the metadata/custom-field
// approach was finalized in the backend. Find the real Checkout Session ID
// for Richard Stiennon's donation (Stripe Dashboard → Payments → click the
// payment → the ID starts with "cs_...") and paste it in below.
const DONOR_OVERRIDES = {
  // 'cs_REPLACE_WITH_REAL_SESSION_ID': { name: 'Richard Stiennon', message: 'Good luck!' },
};

function formatUSD(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function DonateCTAButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        background: '#E67E22',
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.1rem',
        padding: '1rem 2.5rem',
        borderRadius: '999px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 20px rgba(230,126,34,0.4)',
        fontFamily: 'var(--font-body)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(230,126,34,0.6)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(230,126,34,0.4)'; }}
    >
      <Heart size={18} fill="#fff" />
      Donate Now
    </button>
  );
}

const DonatePage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(120);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = document.getElementById('site-header');
    if (el) setHeaderHeight(el.getBoundingClientRect().height);
    const handler = (e) => setHeaderHeight(e.detail.height);
    window.addEventListener('site-header-resize', handler);
    return () => window.removeEventListener('site-header-resize', handler);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/donations/summary');
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `API returned ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) {
          const donors = data.donors.map((donor) => {
            const override = DONOR_OVERRIDES[donor.id];
            return override ? { ...donor, ...override } : donor;
          });

          setSummary({ ...data, donors });
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load donation summary:', err);
        if (!cancelled) {
          setError('Could not load donation data right now.');
          setLoading(false);
        }
      }
    }

    load();
    const interval = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const pct = summary ? Math.min((summary.totalCents / GOAL_CENTS) * 100, 100) : 0;

  return (
    <div style={{
      paddingTop: `${headerHeight}px`,
      background: '#0a0a0a',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'var(--font-body)',
    }}>

      {/* Hero */}
      <div style={{
        textAlign: 'center',
        padding: isMobile ? '3rem 1.5rem 3rem' : '4rem 2rem 4rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#E67E22', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>
          <Heart size={14} fill="#E67E22" />
          Support the Mission
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? '2.4rem' : '4rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: '1.25rem',
          letterSpacing: '-0.02em',
        }}>
          Fund the Mission
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? '1rem' : '1.15rem', maxWidth: '680px', margin: '0 auto 2.5rem', lineHeight: 1.7, fontFamily: 'var(--font-body)', textAlign: 'left' }}>
          Shannon will be flying the largest solo, scientifically-instrumented airborne survey
          ever attempted across all seven continents, including Antarctica.
          This 2026 mission will collect radar and other airborne survey data
          scientists need for ice-sheet research, contribute to work behind
          NASA and ESA satellite missions, and support novel climate research
          and more accurate sea-level projections — all while mapping
          megadunes and ice features rarely surveyed.
          <br /><br />
          Currently 15% funded.
          This mission will also advance frontier aviation and have global
          educational impact, with partners bringing STEM, science,
          engineering, and aviation education to classrooms worldwide.
          <br /><br />
          Every contribution helps close a data gap that's remained
          unresolved for years. Thank you for your support.
        </p>
        <DonateCTAButton onClick={() => setModalOpen(true)} />
      </div>

      {/* Stats + Progress */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '4rem 2rem' }}>

        {loading && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '2rem', fontFamily: 'var(--font-body)' }}>
            Loading donation data...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '2rem', fontFamily: 'var(--font-body)' }}>
            {error}
          </div>
        )}

        {!loading && !error && summary && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
          }}>
            {/* Left: raised so far + CTA */}
            <div style={{
              padding: isMobile ? '2rem' : '2.75rem',
              borderBottom: isMobile ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E67E22', display: 'inline-block' }} />
                <span style={{ color: '#E67E22', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Raised so far
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '3rem' : '4rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
                {formatUSD(summary.totalCents)}
              </div>

              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: '0 0 2rem 0', fontFamily: 'var(--font-body)' }}>
                {summary.donationCount} donation{summary.donationCount === 1 ? '' : 's'} · updated {new Date(summary.updatedAt).toISOString().slice(0, 10)}
              </p>

              <DonateCTAButton onClick={() => setModalOpen(true)} />

              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', margin: '1.25rem 0 0 0', fontFamily: 'var(--font-body)' }}>
                Secure checkout by Stripe. One-time, any amount. Goal: {formatUSD(GOAL_CENTS)} ({pct.toFixed(1)}% funded).
              </p>
            </div>

            {/* Right: supporters */}
            <div style={{
              padding: isMobile ? '2rem' : '2.75rem',
              borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ color: '#E67E22', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem', fontFamily: 'var(--font-body)' }}>
                Supporters
              </div>

              {summary.donors.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
                  Be the first to support the mission.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: isMobile ? 'none' : '320px', overflowY: isMobile ? 'visible' : 'auto' }}>
                  {summary.donors.slice(0, 20).map((donor) => (
                    <div key={donor.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                        <span style={{ color: '#fff', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}>
                          {donor.name || 'Anonymous'}
                        </span>
                        <span style={{ color: '#E67E22', fontSize: '0.95rem', fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'var(--font-body)' }}>
                          {formatUSD(donor.amountCents)}
                        </span>
                      </div>
                      {donor.message && (
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginTop: '0.3rem', fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>
                          "{donor.message}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', lineHeight: 1.5, margin: '1.25rem 0 0 0', fontFamily: 'var(--font-body)' }}>
                Names appear only for donors who choose to add one at checkout; everyone else shows as Anonymous.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center',
        padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}>
          Payments are processed securely by Stripe. Every amount helps.
        </p>
        <DonateCTAButton onClick={() => setModalOpen(true)} />
      </div>

      <DonateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default DonatePage;
