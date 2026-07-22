import React, { useEffect, useRef, useState } from 'react';
import AntarcticaMap from './AntarcticaMap';

// FLAT STRUCTURE: this section renders ONLY itself.
//
// THIS PASS: back to a two-column layout — text left, AntarcticaMap
// right — instead of the single centered column. Text is left-aligned
// again to match. Font-family/size/line-height on the body paragraph
// (Lora, Georgia, serif — matching BoundariesSection) are unchanged from
// last pass.

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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.25rem',
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
              maxWidth: '480px',
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
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 1rem',
                border: '1px solid rgba(17,17,17,0.12)',
                borderRadius: '8px',
                background: '#fff',
              }}>
                <img
                  src="/rings.png"
                  alt="SCAR RINGS"
                  style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: MUTE,
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}>
                  Sole outside presenter,<br />
                  <span style={{ color: INK }}>SCAR RINGS DML/EL Meeting</span>
                </span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 1rem',
                border: '1px solid rgba(17,17,17,0.12)',
                borderRadius: '8px',
                background: '#fff',
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: MUTE,
                  fontWeight: 600,
                  lineHeight: 1.4,
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

          {/* ── RIGHT: map ── */}
          <div className="sci-item" style={{ position: 'relative' }}>
            <AntarcticaMap />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ScienceTeaserSection;
