import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import DonateModal from '../components/DonateModal';

const GOAL_CENTS = 60000000; // $600,000 — real fundraising target

// One-off manual fix for donations made before the metadata/custom-field
// approach was finalized in the backend. Find the real Checkout Session ID
// for Richard Stiennon's donation (Stripe Dashboard → Payments → click the
// payment → the ID starts with "cs_...") and paste it in below.
const DONOR_OVERRIDES = {
  // 'cs_REPLACE_WITH_REAL_SESSION_ID': { name: 'Richard Stiennon', message: 'Good luck!' },
};

/**
 * DonatePage — redesigned to match the a16z "College Talent Network"
 * reference: dark forest-green pinstripe background, large serif
 * headline + short paragraph on the left, a large coin/medallion image
 * on the right, and a solid wine-colored CTA button — instead of the
 * Paper & Ink cream system used elsewhere on the site. This page gets
 * its own identity the same way Science/Journey/Partners did, each
 * matched to a specific reference rather than reusing the same palette
 * everywhere.
 *
 * COIN IMAGE: expects /gold-coin.png in /public — drop your coin artwork
 * there. Falls back to a plain placeholder disc if the file is missing
 * so the layout never breaks while you're still sourcing the asset.
 *
 * Everything below the hero (raised-so-far, live progress bar, supporter
 * list, bottom CTA) keeps the exact same fetch/interval/donor-override
 * logic as before — only the colors and fonts changed, per "more info
 * below" matching this new palette instead of Paper & Ink.
 */

const GREEN = '#0E2620';
const GREEN_DEEP = '#0A1D18';
const CREAM = '#F3EFE6';
const CREAM_MUTE = 'rgba(243,239,230,0.7)';
const CREAM_FAINT = 'rgba(243,239,230,0.45)';
const WINE = '#8C2C46';
const HAIRLINE = 'rgba(243,239,230,0.14)';

function formatUSD(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function DonateCTAButton({ onClick, variant = 'solid' }) {
  const solid = variant === 'solid';
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: solid ? WINE : 'transparent',
        color: CREAM,
        fontWeight: 700,
        fontSize: '0.95rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '1.1rem 2.75rem',
        borderRadius: '6px',
        border: `1px solid ${WINE}`,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = solid ? 'transparent' : WINE; e.currentTarget.style.borderColor = WINE; }}
      onMouseLeave={e => { e.currentTarget.style.background = solid ? WINE : 'transparent'; }}
    >
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
  const [coinError, setCoinError] = useState(false);

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
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
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
    <div style={{ background: GREEN, minHeight: '100vh' }}>
      <style>{`
        .dp-root {
          background-color: ${GREEN};
          background-image:
            repeating-linear-gradient(90deg, rgba(243,239,230,0.05) 0px, rgba(243,239,230,0.05) 1px, transparent 1px, transparent 14px),
            repeating-linear-gradient(90deg, rgba(243,239,230,0.03) 0px, rgba(243,239,230,0.03) 1px, transparent 1px, transparent 84px);
        }
      `}</style>

      <div className="dp-root" style={{ paddingTop: `${headerHeight}px`, color: CREAM, fontFamily: "'Inter', sans-serif" }}>

        {/* HERO — headline + paragraph left, coin image right */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          minHeight: isMobile ? 'auto' : '82vh',
          maxWidth: '1500px',
          margin: '0 auto',
          padding: isMobile ? '3rem 1.5rem' : '2rem 4rem',
          gap: isMobile ? '2.5rem' : '3rem',
        }}>
          <div style={{ flex: 1, maxWidth: '620px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: CREAM_FAINT, fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
              <Heart size={13} fill={CREAM_FAINT} color={CREAM_FAINT} />
              Support the Mission
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: isMobile ? 'clamp(2.6rem, 11vw, 3.6rem)' : 'clamp(3.2rem, 5vw, 4.6rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              color: CREAM,
              marginBottom: '1.75rem',
            }}>
              Fund the Mission
            </h1>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: isMobile ? '1.05rem' : '1.2rem',
              lineHeight: 1.8,
              color: CREAM_MUTE,
              marginBottom: '2.5rem',
            }}>
              Shannon will be flying the largest solo, scientifically-instrumented airborne
              survey ever attempted across all seven continents, including Antarctica —
              collecting data scientists need for ice-sheet research, contributing to work
              behind NASA and ESA satellite missions, and closing a data gap that's remained
              unresolved for years. Currently 15% funded.
            </p>
            <DonateCTAButton onClick={() => setModalOpen(true)} />
          </div>

        <img src="/coin.png"></img>
        </div>

        {/* Stats + Progress */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '2rem 2rem 4rem', borderTop: `1px solid ${HAIRLINE}` }}>

          {loading && (
            <div style={{ textAlign: 'center', color: CREAM_MUTE, padding: '2rem' }}>
              Loading donation data...
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', color: CREAM_MUTE, padding: '2rem' }}>
              {error}
            </div>
          )}

          {!loading && !error && summary && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr',
              background: 'rgba(243,239,230,0.03)',
              border: `1px solid ${HAIRLINE}`,
              borderRadius: '12px',
              overflow: 'hidden',
              marginTop: '2.5rem',
            }}>
              {/* Left: raised so far + CTA */}
              <div style={{ padding: isMobile ? '2rem' : '2.75rem', borderBottom: isMobile ? `1px solid ${HAIRLINE}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: WINE, display: 'inline-block' }} />
                  <span style={{ color: CREAM_FAINT, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Raised so far
                  </span>
                </div>

                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? '2.6rem' : '3.4rem', fontWeight: 700, color: CREAM, lineHeight: 1, marginBottom: '0.5rem' }}>
                  {formatUSD(summary.totalCents)}
                </div>

                <p style={{ color: CREAM_FAINT, fontSize: '0.88rem', margin: '0 0 2rem 0' }}>
                  {summary.donationCount} donation{summary.donationCount === 1 ? '' : 's'} · updated {new Date(summary.updatedAt).toISOString().slice(0, 10)}
                </p>

                <DonateCTAButton onClick={() => setModalOpen(true)} />

                <div style={{ marginTop: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{ color: CREAM_FAINT, fontSize: '0.85rem' }}>
                      Goal: {formatUSD(GOAL_CENTS)}
                    </span>
                    <span style={{ color: CREAM, fontWeight: 700, fontSize: '0.92rem' }}>
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ background: 'rgba(243,239,230,0.1)', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${progressWidth}%`,
                      background: WINE,
                      borderRadius: '999px',
                      transition: 'width 1s ease',
                    }} />
                  </div>
                </div>

                <p style={{ color: CREAM_FAINT, fontSize: '0.75rem', margin: '1rem 0 0 0' }}>
                  Secure checkout by Stripe. One-time, any amount.
                </p>
              </div>

              {/* Right: supporters */}
              <div style={{ padding: isMobile ? '2rem' : '2.75rem', borderLeft: isMobile ? 'none' : `1px solid ${HAIRLINE}` }}>
                <div style={{ color: CREAM_FAINT, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                  Supporters
                </div>

                {summary.donors.length === 0 ? (
                  <p style={{ color: CREAM_MUTE, fontSize: '0.9rem' }}>
                    Be the first to support the mission.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: isMobile ? 'none' : '320px', overflowY: isMobile ? 'visible' : 'auto' }}>
                    {summary.donors.slice(0, 20).map((donor) => (
                      <div key={donor.id} style={{ borderBottom: `1px solid ${HAIRLINE}`, paddingBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                          <span style={{ color: CREAM, fontSize: '0.92rem' }}>
                            {donor.name || 'Anonymous'}
                          </span>
                          <span style={{ color: WINE, fontSize: '0.92rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            {formatUSD(donor.amountCents)}
                          </span>
                        </div>
                        {donor.message && (
                          <div style={{ color: CREAM_MUTE, fontSize: '0.8rem', marginTop: '0.3rem', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic' }}>
                            "{donor.message}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <p style={{ color: CREAM_FAINT, fontSize: '0.72rem', lineHeight: 1.5, margin: '1.25rem 0 0 0' }}>
                  Names appear only for donors who choose to add one at checkout; everyone else shows as Anonymous.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div style={{ borderTop: `1px solid ${HAIRLINE}`, textAlign: 'center', padding: isMobile ? '3rem 1.5rem' : '4rem 2rem' }}>
          <p style={{ color: CREAM_MUTE, marginBottom: '1.5rem', fontSize: '0.92rem' }}>
            Payments are processed securely by Stripe. Every amount helps.
          </p>
          <DonateCTAButton onClick={() => setModalOpen(true)} />
        </div>

        <DonateModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default DonatePage;
