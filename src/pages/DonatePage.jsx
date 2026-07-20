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

function timeAgo(unixSecs) {
  const diff = Math.floor(Date.now() / 1000) - unixSecs;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
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
  const [progressWidth, setProgressWidth] = useState(0);
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
          setTimeout(() => {
            if (!cancelled) {
              setProgressWidth(Math.min((data.totalCents / GOAL_CENTS) * 100, 100));
            }
          }, 300);
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
          Currently 15% funded. We need to raise USD $600K.
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
          <>
            {/* Big numbers */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.8rem' : '2.4rem', fontWeight: 900, color: '#E67E22' }}>
                  {formatUSD(summary.totalCents)}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>Raised</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.8rem' : '2.4rem', fontWeight: 900 }}>
                  {formatUSD(GOAL_CENTS)}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>Goal</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', gridColumn: isMobile ? 'span 2' : 'auto' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.8rem' : '2.4rem', fontWeight: 900 }}>
                  {summary.donationCount}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>Supporters</div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>Mission funding progress</span>
                <span style={{ color: '#E67E22', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}>{pct.toFixed(1)}%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progressWidth}%`,
                  background: 'linear-gradient(90deg, #E67E22, #f39c12)',
                  borderRadius: '999px',
                  transition: 'width 1s ease',
                  boxShadow: '0 0 12px rgba(230,126,34,0.5)',
                }} />
              </div>
            </div>

            {/* Donor list */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
                Recent Supporters
              </h2>

              {summary.donors.length === 0 ? (
                <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-body)' }}>
                  Be the first to support the mission.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {summary.donors.slice(0, 20).map((donor) => (
                    <div
                      key={donor.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        gap: '1rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', minWidth: 0 }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(230,126,34,0.15)',
                          border: '1px solid rgba(230,126,34,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: '#E67E22',
                          flexShrink: 0,
                          fontFamily: 'var(--font-body)',
                        }}>
                          {donor.name ? donor.name[0].toUpperCase() : '?'}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}>
                            {donor.name || 'Anonymous'}
                          </div>
                          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginTop: '0.15rem', fontFamily: 'var(--font-body)' }}>
                            {timeAgo(donor.createdAt)}
                          </div>
                          {donor.message && (
                            <div style={{
                              color: 'rgba(255,255,255,0.75)',
                              fontSize: '0.88rem',
                              marginTop: '0.4rem',
                              fontFamily: 'var(--font-body)',
                              fontStyle: 'italic',
                              wordBreak: 'break-word',
                            }}>
                              "{donor.message}"
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: '#E67E22', fontSize: '1rem', flexShrink: 0, fontFamily: 'var(--font-body)' }}>
                        {formatUSD(donor.amountCents)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
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
