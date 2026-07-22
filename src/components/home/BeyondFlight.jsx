import React, { useState, useEffect, useRef } from 'react';

const INK = '#111111';
const PAPER = '#F5F2EB';
const MUTE = '#5b5748';

const CredentialsStrip = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visible, setVisible] = useState(false);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap';
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

  const credentials = [
    {
      tag: 'Physics',
      headline: 'Published in Classical & Quantum Gravity',
      body: 'The youngest recorded sole author without any institutional affiliation \u2014 self-taught \u2014 to publish in CQG, a top journal in gravitational physics. The paper: an original mathematical framework for how gravity switches off at cosmic scales.',
      detail: 'CQG-113971.R1',
    },
    {
      tag: 'Antarctic Science',
      headline: 'A Mechanism for a 20-Year-Old Problem',
      body: 'Paper under review at Geophysical Research Letters proposing a quantitative mechanism for Antarctic megadune wavelength selection, tested against the standard model.',
      detail: 'GRL \u00b7 ESSOAr Preprint',
    },
    {
      tag: 'Recognition',
      headline: "Youngest Fellow in the RGS's History",
      body: "Elected the youngest Fellow in the Royal Geographical Society's history \u2014 recognised for contributions to geography, exploration, and science. Completed every pilot licence and rating in under four months.",
      detail: 'RGS \u00b7 Founded 1830',
    },
    {
      tag: 'Science',
      headline: 'Four More Papers Under Review. All Solo.',
      body: "In review: a theoretical ecology paper on Taylor's Power Law; a welfare economics paper on market preference formation; an orbital mechanics paper on satellite trajectory dynamics; and a further physics paper. All sole-authored.",
      detail: 'Ecology \u00b7 Economics \u00b7 Orbital Mechanics \u00b7 Physics',
    },
    {
      tag: 'Political Philosophy',
      headline: 'Book Author, Threshold Century',
      body: 'A book on democratic institutional failure drawing on Girard, Schmitt, Strauss & Habermas. Solo extended session at COV&R 2026.',
      detail: 'COV&R Chicago 2026',
    },
    {
      tag: 'Invention',
      headline: 'Aviation Patent at 16',
      body: 'Designed and filed a patent for an airborne acoustic collision-avoidance system for autonomous delivery drones \u2014 independently, at age 16.',
      detail: 'Acoustic Avoidance \u00b7 Autonomous Systems',
    },
    {
      tag: 'Technology',
      headline: 'Builder of Four Platforms',
      body: 'Gap Index \u2014 climate accountability infrastructure. OriginVault \u2014 content provenance registry. Airdel \u2014 AI knowledge graph engine. Agora \u2014 civic deliberation infrastructure. All built independently.',
      detail: 'www.gapindex.org',
    },
    {
      tag: 'Engineering',
      headline: 'Self-Taught Since Age 10',
      body: "Taught herself to code at 10 \u2014 and, by her own admission, promptly hacked into her school's server. Built electronics and filed a patent at 16. Engineered four independent technology platforms. No degree. No bootcamp. No mentor.",
      detail: 'Full Stack \u00b7 AI \u00b7 Systems Engineering',
    },
    {
      tag: 'Aviation',
      headline: 'Florida to India. No Autopilot.',
      body: '13,000km solo ferry flight across two oceans. Three transatlantic crossings as captain. Intercepted by a US Navy F-18 near active hostilities.',
      detail: 'Commercial MEII \u00b7 IR \u00b7 Tailwheel \u00b7 HP',
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
          background: rgba(17,17,17,0.08);
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
          transition: background 0.25s ease, opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
          opacity: 0;
          transform: translateY(22px);
        }
        .cred-visible .cred-card { opacity: 1; transform: translateY(0); }
        .cred-visible .cred-card:nth-child(1) { transition-delay: 0.02s; }
        .cred-visible .cred-card:nth-child(2) { transition-delay: 0.08s; }
        .cred-visible .cred-card:nth-child(3) { transition-delay: 0.14s; }
        .cred-visible .cred-card:nth-child(4) { transition-delay: 0.20s; }
        .cred-visible .cred-card:nth-child(5) { transition-delay: 0.26s; }
        .cred-visible .cred-card:nth-child(6) { transition-delay: 0.32s; }
        .cred-visible .cred-card:nth-child(7) { transition-delay: 0.38s; }
        .cred-visible .cred-card:nth-child(8) { transition-delay: 0.44s; }
        .cred-visible .cred-card:nth-child(9) { transition-delay: 0.50s; }
        .cred-card:hover { background: ${PAPER}; }
        .cred-tag {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${MUTE};
          font-family: 'Inter', sans-serif;
        }
        .cred-headline {
          font-family: 'Lora', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: ${INK};
          line-height: 1.25;
        }
        .cred-body {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          line-height: 1.65;
          color: ${MUTE};
          font-weight: 400;
          flex-grow: 1;
          margin: 0;
        }
        .cred-detail {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(17,17,17,0.35);
          border-top: 1px solid rgba(17,17,17,0.1);
          padding-top: 0.65rem;
        }
        .cred-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(17,17,17,0.2);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          font-size: 1.1rem;
          color: ${INK};
          flex-shrink: 0;
        }
        .cred-arrow:hover:not(:disabled) {
          background: ${INK};
          color: #fff;
          border-color: ${INK};
        }
        .cred-arrow:disabled { opacity: 0.25; cursor: default; }
      `}</style>

      <section
        ref={sectionRef}
        className={visible ? 'cred-visible' : ''}
        style={{
          background: PAPER,
          borderTop: '1px solid rgba(17,17,17,0.1)',
          borderBottom: '1px solid rgba(17,17,17,0.1)',
          padding: isMobile ? '3rem 0' : '4rem 0',
          overflow: 'hidden',
        }}
      >
        {/* Header row */}
        <div style={{
          padding: isMobile ? '0 1.25rem 1.5rem' : '0 4rem 2rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: MUTE,
              fontWeight: 700,
              margin: '0 0 0.6rem 0',
            }}>
              Beyond The Flight
            </p>
            <h2 style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: isMobile ? '1.6rem' : '2.1rem',
              fontWeight: 600,
              color: INK,
              margin: 0,
            }}>
              The full picture, at <em>twenty</em>
            </h2>
          </div>

          {!isMobile && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="cred-arrow" onClick={() => scroll(-1)} disabled={!canScrollLeft} aria-label="Scroll left">&lsaquo;</button>
              <button className="cred-arrow" onClick={() => scroll(1)} disabled={!canScrollRight} aria-label="Scroll right">&rsaquo;</button>
            </div>
          )}
        </div>

        {/* Track with fade masks */}
        <div style={{ position: 'relative' }}>
          {canScrollLeft && (
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: isMobile ? '2rem' : '4rem',
              background: `linear-gradient(to right, ${PAPER}, transparent)`,
              zIndex: 2, pointerEvents: 'none',
            }} />
          )}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: isMobile ? '3rem' : '6rem',
            background: `linear-gradient(to left, ${PAPER}, transparent)`,
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

        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button className="cred-arrow" onClick={() => scroll(-1)} disabled={!canScrollLeft} aria-label="Scroll left">&lsaquo;</button>
            <button className="cred-arrow" onClick={() => scroll(1)} disabled={!canScrollRight} aria-label="Scroll right">&rsaquo;</button>
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: isMobile ? '1.5rem 1.25rem 0' : '2rem 4rem 0',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
        }}>
          {[''].map((t, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 1, height: 12, background: 'rgba(17,17,17,0.2)' }} />}
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.68rem',
                color: MUTE,
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
