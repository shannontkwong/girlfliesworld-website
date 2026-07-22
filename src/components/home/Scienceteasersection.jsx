import React, { useEffect, useRef, useState } from 'react';
import AntarcticaMap from './AntarcticaMap';

// FLAT STRUCTURE: this section renders ONLY itself.
//
// THIS PASS: fixed the "only shows up when I hover over it" bug. The
// reveal animation depends entirely on the IntersectionObserver firing
// once and flipping `visible` to true — if it never fires (there are a
// few real ways this can happen: the observer attaching a beat after the
// section is already in view, the ref not being attached yet on first
// paint, or just an edge case in how a given browser schedules the
// callback), every .sci-item stays stuck at `opacity: 0` permanently.
// What then looks like "hovering makes it appear" is actually the
// content having been there the whole time, un-painted, until something
// (a hover, a resize, anything that forces a style recalculation) makes
// the browser repaint and reveal what was already sitting at opacity 1
// in the DOM, OR the observer genuinely never ran and the content really
// was invisible. Either way, the fix is the same: don't depend on the
// observer as the ONLY path to visible=true. A short safety-net timeout
// forces visible=true regardless, so content can never get permanently
// stuck invisible even if the observer misfires.
//
// Also: mobile overflow hardening carried over from last pass (the
// credibility badges wrapping properly, the map wrapper constrained to
// 100% width) is unchanged. NOTE ON THE MAP SPECIFICALLY: if the layout
// still looks wrong on mobile after this, the most likely remaining
// cause is inside AntarcticaMap.jsx itself (e.g. a hardcoded pixel width
// on its own canvas/container that doesn't shrink to fit) — that file
// wasn't shared this pass, so its internals couldn't be checked or fixed
// here. Worth pasting that file next if the map is still the problem.

const INK = '#111111';
const PAPER = '#F5F2EB';
const MUTE = '#5b5748';

const ScienceTeaserSection = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    // Primary path: reveal when the section actually scrolls into view.
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);

    // Safety-net path: if the observer hasn't fired within 1.2s of mount
    // for ANY reason, reveal anyway. This is what actually fixes "stuck
    // invisible until I hover" — content can no longer be permanently
    // stuck at opacity 0 no matter what the observer does or doesn't do.
    const fallback = setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const stats = [
    { num: '2\u20138', unit: 'GHz', label: 'Radar frequency' },
    { num: '100m', unit: '', label: 'Snow penetration depth' },
    { num: '1', unit: 'pilot', label: 'Solo operation' },
  ];

  return (
    <section
      ref={ref}
      className={visible ? 'sci-visible' : ''}
      aria-label="Science mission teaser"
      style={{
        background: PAPER,
        padding: isMobile ? '4rem 1.5rem' : '6rem 4rem',
        borderTop: '1px solid rgba(17,17,17,0.1)',
        borderBottom: '1px solid rgba(17,17,17,0.1)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes sci-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sci-item { opacity: 0; }
        .sci-visible .sci-item { animation: sci-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .sci-visible .sci-item:nth-child(1) { animation-delay: 0.05s; }
        .sci-visible .sci-item:nth-child(2) { animation-delay: 0.14s; }
        .sci-visible .sci-item:nth-child(3) { animation-delay: 0.22s; }
        .sci-visible .sci-item:nth-child(4) { animation-delay: 0.30s; }
        .sci-visible .sci-item:nth-child(5) { animation-delay: 0.38s; }
        .sci-visible .sci-item:nth-child(6) { animation-delay: 0.46s; }
        .sci-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: transparent;
          color: ${INK};
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 999px;
          border: 1px solid ${INK};
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .sci-btn:hover {
          background: ${INK};
          color: ${PAPER};
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '3rem' : '5rem',
          alignItems: 'center',
        }}>

          {/* ── LEFT: text ── */}
          <div>

            <div className="sci-item" style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.25rem',
              maxWidth: '100%',
            }}>
              <div style={{ width: 28, height: 1, background: MUTE, flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: MUTE,
                fontWeight: 700,
              }}>EARS &middot; An Independent Antarctic Science Program</span>
            </div>

            <h2 className="sci-item" style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: isMobile ? '2.2rem' : '3rem',
              fontWeight: 700,
              color: INK,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}>
              The EARS Program
            </h2>

            {/* Body — font-family, size, and line-height match
                BoundariesSection's paragraph: 'Lora', Georgia, serif,
                1.1rem/1.3rem responsive, line-height 1.7. */}
            <p className="sci-item" style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              lineHeight: 1.7,
              fontWeight: 400,
              color: MUTE,
              marginBottom: '2rem',
              maxWidth: isMobile ? '100%' : '480px',
            }}>
              EARS is an independant science program created by Shannon. It will aim to collect airborne science data across East Antarctica (Queen Maud Land specifically). 
              Shannon will use a snow radar that was integrated within same lineage NASA flew on Operation IceBridge (the largest airborne polar survey in history) &mdash; into a
              documented gap in the ice-sheet record. NASA's Operation Icebridge has never systematically collected data in the Eastern Region, which is a gap Shannon will fill.
            </p>

            <div className="sci-item" style={{
              display: 'flex',
              gap: '1.75rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: INK,
                    lineHeight: 1,
                  }}>
                    {s.num}
                    {s.unit && <span style={{ fontSize: '0.9rem', color: MUTE, marginLeft: '2px' }}>{s.unit}</span>}
                  </span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.65rem',
                    color: MUTE,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="sci-item" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 1rem',
                border: '1px solid rgba(17,17,17,0.12)',
                borderRadius: '8px',
                background: '#fff',
                width: isMobile ? '100%' : 'auto',
                boxSizing: 'border-box',
              }}>
                <img
                  src="/rings.png"
                  alt="SCAR RINGS"
                  style={{ height: '48px', width: 'auto', maxWidth: '100%', objectFit: 'contain', flexShrink: 0 }}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: MUTE,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  minWidth: 0,
                }}>
                  Sole outside presenter,<br />
                  <span style={{ color: INK }}>SCAR RINGS DML/EL Meeting</span>
                </span>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 1rem',
                border: '1px solid rgba(17,17,17,0.12)',
                borderRadius: '8px',
                background: '#fff',
                width: isMobile ? '100%' : 'auto',
                boxSizing: 'border-box',
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: MUTE,
                  fontWeight: 600,
                  lineHeight: 1.4,
                  minWidth: 0,
                }}>
                  In formal collaboration with<br />
                  <span style={{ color: INK }}>CReSIS, University of Kansas</span>
                </span>
              </div>
            </div>

            <div className="sci-item">
              <a href="/science" className="sci-btn">
                Explore The Science &rarr;
              </a>
            </div>
          </div>

          {/* ── RIGHT: map — wrapper constrained to 100% width. If the
              map still overflows or looks broken on mobile after this,
              the cause is very likely inside AntarcticaMap.jsx's own
              markup (e.g. a hardcoded pixel width on its canvas/root
              element that ignores this wrapper) — that file hasn't been
              shared, so it couldn't be checked or fixed here. ── */}
          <div className="sci-item" style={{ position: 'relative', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            <AntarcticaMap />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScienceTeaserSection;
