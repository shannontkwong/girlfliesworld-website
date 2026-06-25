import React, { useState, useEffect, useRef } from 'react';

const CredentialsStrip = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const trackRef = useRef(null);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  const gold = '#D4AF37';
  const impact = `'Impact', 'Arial Black', sans-serif`;
  const outfit = `'Outfit', sans-serif`;

  const credentials = [
    {
      tag: 'Physics',
      headline: 'Published in Classical & Quantum Gravity',
      body: 'The youngest recorded sole author without any institutional affiliation — self-taught — to publish in CQG, a top journal in gravitational physics. The paper: an original mathematical framework for how gravity switches off at cosmic scales.',
      detail: 'CQG-113971.R1',
    },
    {
      tag: 'Antarctic Science',
      headline: 'Derived the Formula on a 20-Year-Old Problem',
      body: 'Paper under review at Geophysical Research Letters deriving the first quantitative mechanism for Antarctic megadune wavelength selection — falsifying the standard model at p < 10⁻⁸.',
      detail: 'GRL · ESSOAr Preprint',
    },
    {
      tag: 'Recognition',
      headline: "Youngest Fellow in the RGS's History",
      body: "Elected the youngest Fellow in the Royal Geographical Society's history — recognised for contributions to geography, exploration, and science. Winner of one of the world's most competitive intellectual grants. Completed every pilot licence and rating in under four months.",
      detail: 'RGS · Founded 1830',
    },
    {
      tag: 'Science',
      headline: 'Four More Papers. All Solo. All Q1.',
      body: "Under submission: a theoretical ecology paper on Taylor's Power Law; a welfare economics paper on market preference formation; an orbital mechanics paper on satellite trajectory dynamics; and a further physics paper. All sole-authored.",
      detail: 'Ecology · Economics · Orbital Mechanics · Physics',
    },
    {
      tag: 'Political Philosophy',
      headline: 'Book Author, Threshold Century',
      body: 'A book on democratic institutional failure drawing on Girard, Schmitt, Strauss & Habermas. Leading scholars say she is onto something — described as containing groundbreaking insights. Solo extended session at COV&R 2026. Awarded international travel grant.',
      detail: 'COV&R Chicago 2026',
    },
    {
      tag: 'Invention',
      headline: 'Aviation Patent at 17',
      body: 'Designed and filed a patent for an airborne acoustic collision avoidance system for fully autonomous delivery drones — independently, at age 17.',
      detail: 'Acoustic Avoidance · Autonomous Systems',
    },
    {
      tag: 'Technology',
      headline: 'Builder of Four Platforms',
      body: 'Gap Index — live climate accountability infrastructure, shared by climate scientist Michael E. Mann. OriginVault — content provenance registry. Airdel — AI knowledge graph engine. Agora — civic deliberation infrastructure. All built independently.',
      detail: 'www.gapindex.org',
    },
    {
      tag: 'Engineering',
      headline: 'Self-Taught. Palantir-Level. Since Age 10.',
      body: "Taught herself to code at 10 — and promptly hacked into her school's system. Built electronics and filed a patent at 17. Engineered four independent technology platforms. No degree. No bootcamp. No mentor.",
      detail: 'Full Stack · AI · Systems Engineering',
    },
    {
      tag: 'Aviation',
      headline: 'Florida to India. No Autopilot.',
      body: '13,000km solo ferry flight across two oceans. Three transatlantic crossings as captain. Intercepted by US Navy F-18s and a surveillance drone near active hostilities. Escaped Oman two hours before it was bombed. Cleared Saudi Arabia three hours before it was attacked.',
      detail: 'Commercial MEII · IR · Tailwheel · HP',
    },
  ];

  const cardWidth = isMobile ? 260 : 300;

  return (
    <>
      <style>{`
        .cred-track {
          display: flex;
          gap: 1px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          background: #e8e8e8;
          scroll-behavior: smooth;
        }
        .cred-track::-webkit-scrollbar { display: none; }
        .cred-card {
          flex-shrink: 0;
          background: #fff;
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          transition: background 0.2s ease;
          cursor: default;
        }
        .cred-card:hover { background: #fdf9ee; }
        .cred-tag {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4AF37;
          font-family: 'Outfit', sans-serif;
        }
        .cred-headline {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 1.05rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #000;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .cred-body {
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          line-height: 1.7;
          color: #4B5563;
          font-weight: 500;
          flex-grow: 1;
          margin: 0;
        }
        .cred-detail {
          font-family: 'Outfit', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #bbb;
          border-top: 1px solid #f0f0f0;
          padding-top: 0.65rem;
        }
        .cred-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid #e0e0e0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1.1rem;
          color: #000;
          flex-shrink: 0;
        }
        .cred-arrow:hover:not(:disabled) {
          border-color: #D4AF37;
          color: #D4AF37;
          transform: scale(1.08);
        }
        .cred-arrow:disabled {
          opacity: 0.25;
          cursor: default;
        }
      `}</style>

      <section style={{
        background: '#fff',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee',
        padding: isMobile ? '2rem 0' : '2.5rem 0',
        overflow: 'hidden',
      }}>

        {/* Header row */}
        <div style={{
          padding: isMobile ? '0 1.25rem 1.5rem' : '0 4rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <div style={{ width: 24, height: 2, background: gold, flexShrink: 0 }} />
              <span style={{
                fontFamily: outfit,
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#888',
                fontWeight: 700,
              }}>Beyond The Flight</span>
            </div>
            <span style={{
              fontFamily: impact,
              fontSize: isMobile ? '1.4rem' : '1.75rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#000',
              letterSpacing: '-0.01em',
            }}>
              The Full Picture — At <span style={{ color: gold }}>20</span>
            </span>
          </div>

          {!isMobile && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="cred-arrow" onClick={() => scroll(-1)} disabled={!canScrollLeft} aria-label="Scroll left">‹</button>
              <button className="cred-arrow" onClick={() => scroll(1)} disabled={!canScrollRight} aria-label="Scroll right">›</button>
            </div>
          )}
        </div>

        {/* Track with fade masks */}
        <div style={{ position: 'relative' }}>
          {canScrollLeft && (
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: isMobile ? '2rem' : '4rem',
              background: 'linear-gradient(to right, #fff, transparent)',
              zIndex: 2, pointerEvents: 'none',
            }} />
          )}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: isMobile ? '3rem' : '6rem',
            background: 'linear-gradient(to left, #fff, transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <div
            ref={trackRef}
            className="cred-track"
            style={{
              paddingLeft: isMobile ? '1.25rem' : '4rem',
              paddingRight: isMobile ? '3rem' : '6rem',
            }}
          >
            {credentials.map((c, i) => (
              <div key={i} className="cred-card" style={{ width: cardWidth, minWidth: cardWidth }}>
                <div className="cred-tag">{c.tag}</div>
                <div className="cred-headline">{c.headline}</div>
                <p className="cred-body">{c.body}</p>
                <div className="cred-detail">{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile arrows */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button className="cred-arrow" onClick={() => scroll(-1)} disabled={!canScrollLeft} aria-label="Scroll left">‹</button>
            <button className="cred-arrow" onClick={() => scroll(1)} disabled={!canScrollRight} aria-label="Scroll right">›</button>
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: isMobile ? '1.25rem 1.25rem 0' : '1.5rem 4rem 0',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
        }}>
          {['No university affiliation', 'No supervisor', 'No institutional funding'].map((t, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 1, height: 12, background: '#ddd' }} />}
              <span style={{
                fontFamily: outfit,
                fontSize: '0.65rem',
                color: '#aaa',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>{t}</span>
            </React.Fragment>
          ))}
        </div>

      </section>
    </>
  );
};

export default CredentialsStrip;
