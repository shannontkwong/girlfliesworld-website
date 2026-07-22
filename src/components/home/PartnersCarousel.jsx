import React, { useState, useEffect, useRef } from 'react';

/**
 * PartnersCarousel — two logo columns flanking a centered serif stat.
 * Now 8 logos total (4 left / 4 right, evenly split — no empty cell).
 *
 * CHANGES THIS PASS:
 *  - Logo grid block explicitly centered (justifyItems + justifySelf on
 *    every cell, not just the outer maxWidth/margin auto).
 *  - Significance strip explicitly centered as a single group; the small
 *    vertical divider lines between stats are removed (they read like
 *    stray hyphens) in favor of plain gap spacing.
 */

const INK = '#111111';
const PAPER = '#F5F2EB';
const MUTE = '#5b5748';

const partnerLogos = [
  { name: 'AG-NAV', src: '/agnav.png' },
  { name: 'Platinum Jets International', src: '/pj.png' },
  { name: 'Estes Rockets', src: '/estes.png' },
  { name: 'Reach The World', src: '/rrr.png' },
  { name: 'Emergent Ventures', src: '/ge.png' },
  { name: 'James Caird Society', src: '/jss.png' },
  { name: 'Dick Smith AC', src: '/dss.png' },
  { name: 'CReSIS', src: '/crr.png' },
];

const SIGNIFICANCE = [
  { num: '100M+', label: 'Projected audience reach' },
  { num: '7', label: 'Continents' },
  { num: '40,000+', label: 'Nautical miles' },
  { num: '50+', label: 'Schools reached worldwide' },
  { num: '2', label: 'Educational partners' },
];

const LEFT_LOGOS = partnerLogos.slice(0, 4);
const RIGHT_LOGOS = partnerLogos.slice(4);

const LogoCell = ({ logo, imgErrors, markError, size }) =>
  !imgErrors[logo.name] ? (
    <div className="pc-logo-cell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: size + 20 }}>
      <img
        src={logo.src}
        alt={logo.name}
        style={{ height: size, width: 'auto', maxWidth: size * 3.2, objectFit: 'contain', display: 'block' }}
        onError={() => markError(logo.name)}
      />
    </div>
  ) : (
    <div style={{ height: size + 20 }} />
  );

const PartnersCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imgErrors, setImgErrors] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const markError = (name) => setImgErrors((p) => ({ ...p, [name]: true }));

  return (
    <section
      ref={sectionRef}
      className={visible ? 'pc-visible' : ''}
      style={{
        background: PAPER,
        padding: isMobile ? '3.5rem 1.5rem' : '6rem 3rem',
        borderTop: '1px solid rgba(17,17,17,0.1)',
        borderBottom: '1px solid rgba(17,17,17,0.1)',
      }}
    >
      <style>{`
        .pc-fade { opacity: 0; transform: translateY(20px); transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1); }
        .pc-visible .pc-fade { opacity: 1; transform: translateY(0); }
        .pc-visible .pc-fade:nth-child(1) { transition-delay: 0.05s; }
        .pc-visible .pc-fade:nth-child(2) { transition-delay: 0.15s; }
        .pc-visible .pc-fade:nth-child(3) { transition-delay: 0.25s; }

        .pc-logo-cell { transition: transform 0.3s ease; }
        .pc-logo-cell:hover { transform: translateY(-3px); }

        .pc-all-link {
          font-family: 'Lora', Georgia, serif;
          font-style: italic;
          font-size: 1.05rem;
          color: ${INK};
          text-decoration: underline;
          text-underline-offset: 4px;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .pc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 2rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 999px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .pc-btn--fill { background: ${INK}; color: ${PAPER}; border: 1px solid ${INK}; }
        .pc-btn--fill:hover { background: transparent; color: ${INK}; }
        .pc-btn--outline { background: transparent; color: ${INK}; border: 1px solid ${INK}; }
        .pc-btn--outline:hover { background: ${INK}; color: ${PAPER}; }
      `}</style>

      <p className="pc-fade" style={{
        textAlign: 'center',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.68rem',
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color: MUTE,
        fontWeight: 700,
        margin: isMobile ? '0 0 2.5rem' : '0 0 4rem',
      }}>
        Our Partners
      </p>

      {/* ── Logo grid, explicitly centered as one block ── */}
      {!isMobile ? (
        <div className="pc-fade" style={{
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto 1fr 1fr',
          alignItems: 'center',
          justifyItems: 'center',
          columnGap: '2.5rem',
          marginBottom: '3.5rem',
        }}>
          {LEFT_LOGOS.map((logo, i) => (
            <div key={logo.name} style={{ gridColumn: (i % 2) + 1, gridRow: Math.floor(i / 2) + 1, justifySelf: 'center' }}>
              <LogoCell logo={logo} imgErrors={imgErrors} markError={markError} size={52} />
            </div>
          ))}

          <div style={{
            gridColumn: 3,
            gridRow: '1 / 3',
            textAlign: 'center',
            padding: '0 1.5rem',
            minWidth: '220px',
          }}>
            <div style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
              color: INK,
              lineHeight: 1,
            }}>
              100M+
            </div>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '1rem',
              color: MUTE,
              margin: '0.6rem 0 1.5rem',
            }}>
              in projected media reach
            </p>
            <a href="/partners" className="pc-all-link">
              All Partners <span>&rsaquo;</span>
            </a>
          </div>

          {RIGHT_LOGOS.map((logo, i) => (
            <div key={logo.name} style={{ gridColumn: 4 + (i % 2), gridRow: Math.floor(i / 2) + 1, justifySelf: 'center' }}>
              <LogoCell logo={logo} imgErrors={imgErrors} markError={markError} size={52} />
            </div>
          ))}
        </div>
      ) : (
        <div className="pc-fade" style={{ marginBottom: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 700,
              fontSize: '2.4rem',
              color: INK,
              lineHeight: 1,
            }}>
              100M+
            </div>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: MUTE,
              margin: '0.5rem 0 1rem',
            }}>
              in projected media reach
            </p>
            <a href="/partners" className="pc-all-link" style={{ fontSize: '0.95rem' }}>
              All Partners <span>&rsaquo;</span>
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem 1rem', justifyItems: 'center' }}>
            {partnerLogos.map((logo) => (
              <LogoCell key={logo.name} logo={logo} imgErrors={imgErrors} markError={markError} size={40} />
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="pc-fade" style={{
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        marginBottom: isMobile ? '2.5rem' : '3.5rem',
      }}>
        <a href="/partners" className="pc-btn pc-btn--fill">See All Partners</a>
        <a href="/partners" className="pc-btn pc-btn--outline">Become a Partner</a>
      </div>

      {/* ── Significance strip — centered as one group, no divider lines ── */}
      <div className="pc-fade" style={{
        maxWidth: '1100px',
        margin: '0 auto',
        borderTop: '1px solid rgba(17,17,17,0.1)',
        paddingTop: isMobile ? '1.75rem' : '2.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '1.75rem' : '3.5rem',
        flexWrap: 'wrap',
        textAlign: 'center',
      }}>
        {SIGNIFICANCE.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: isMobile ? '1.05rem' : '1.2rem',
              fontWeight: 700,
              color: INK,
              lineHeight: 1,
            }}>{s.num}</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.62rem',
              color: MUTE,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
              marginTop: '3px',
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersCarousel;
