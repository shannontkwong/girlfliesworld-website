import React, { useEffect, useRef, useState } from 'react';

/**
 * BoundariesSection — "Paper & Ink" register, narrow centered layout.
 *
 * THIS PASS: the Alexandra Shackleton patron credit is now a real
 * feature, not a single small italic aside — a larger serif name line
 * in Cormorant Garamond (the same elegant display serif used for
 * headline moments elsewhere on the site, matching the weight/family in
 * the reference image) plus one short description line underneath in
 * Lora, matching the reference's short-paragraph proportions rather than
 * a long biography.
 *
 * Everything else — the lead banner, the manifesto paragraphs, the
 * clickable photo row — is unchanged from the previous pass.
 *
 * ASSETS NEEDED in /public:
 *   /banner.png (lead banner)
 *   /zz.png (Pilot)  /ss.png (Scientist)  /pp.png (Programmer)
 *   /yy.png (Engineer)  /ii.png (Author)
 */

const INK = '#111111';
const PAPER = '#F5F2EB';
const MUTE = '#5b5748';

const IDENTITIES = [
  {
    key: 'pilot',
    label: 'Pilot',
    image: '/zz.png',
    caption: 'Three transatlantic crossings as captain. A solo 13,000km ferry flight, no autopilot.',
  },
  {
    key: 'scientist',
    label: 'Scientist',
    image: '/ss.png',
    caption: 'Sole-author, peer-reviewed research spanning physics and Antarctic glaciology.',
  },
  {
    key: 'programmer',
    label: 'Programmer',
    image: '/pp.png',
    caption: 'Self-taught coder turned software engineer, ex-Palantir.',
  },
  {
    key: 'engineer',
    label: 'Engineer',
    image: '/yy.png',
    caption: 'Co-designing the radar pod and fuel system that make the mission possible.',
  },
  {
    key: 'author',
    label: 'Author',
    image: '/ii.png',
    caption: 'Published author of a book on political philosophy.',
  },
];

const PARAGRAPHS = [
  {
    anchor: 'pilot',
    dropCap: true,
    text: "My name is Shannon. I am a 20-year-old British-Hong Kong commercial pilot and scientist. My goal is to advance the frontiers of aviation and science through the audacity of the human spirit. My mission is to build the largest solo, pilot-conducted scientific airborne expedition ever undertaken in human history. I want to push the boundaries of aviation by flying a light twin-engine aircraft solo across all seven continents \u2014 including a sixteen-to-twenty-hour nonstop crossing of the Antarctic interior to the South Pole, at the edge of what an aircraft like this has ever been asked to do.",
  },
  {
    anchor: 'scientist',
    text: "I have created a scientific program from the ground-up called EARS (East Antarctic Survey). In collaboration with researchers affiliated with NASA, ESA, and the University of Colorado Boulder (CIRES), my goal is to push the boundaries of science by carrying real instruments \u2014 radar, laser altimetry, a multispectral camera \u2014 into a sector of Antarctica that no space agency has ever surveyed from the air, and bringing back a dataset that becomes part of the permanent scientific record. The data will be published to NSIDC to improve our understanding and forecasting accuracy of sea-level projections and ice-sheet mass balance, and along the way I'll be surveying megadunes, rare dune formations only found only in Antarctica and on Mars. All of this data will contribute to novel climate research and past NASA and ESA satellite programs that were built to advance our understanding of planet Earth.",
  },
  {
    anchor: 'author',
    text: "As a result, my third goal is to inspire the next generation of scientists, explorers, and young curious minds to challenge the status quo, to do big things, and to toss their hat across the wall. Records will fall along the way: the first woman to fly solo to all seven continents and to the South Pole, the first twin-engine propeller aircraft to fly across the entire Antarctic continent. But the mission was never about the records \u2014 it was about moving entire fields forward and advancing humanity, no matter how hard the challenges.",
  },
];

const BoundariesSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeKey, setActiveKey] = useState(IDENTITIES[0].key);
  const [imgError, setImgError] = useState({});
  const [bannerError, setBannerError] = useState(false);
  const paraRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const anchor = entry.target.getAttribute('data-anchor');
            if (anchor) setActiveKey(anchor);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    paraRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Pushing the boundaries of aviation and science"
      style={{
        background: PAPER,
        padding: isMobile ? '4rem 1.5rem' : '7rem 4rem',
        borderTop: '1px solid rgba(17,17,17,0.08)',
        borderBottom: '1px solid rgba(17,17,17,0.08)',
      }}
    >
      <style>{`
        .bd-photo-btn {
          appearance: none;
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          width: 100%;
          cursor: pointer;
          font: inherit;
          text-align: center;
        }
        .bd-photo-btn:focus-visible .bd-photo {
          outline: 2px solid ${INK};
          outline-offset: 2px;
        }
        .bd-photo {
          transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.5s ease;
        }
        .bd-photo-btn:hover .bd-photo {
          opacity: 0.85;
        }
        .bd-para { scroll-margin-top: 40vh; }
        .bd-caption {
          display: block;
          min-height: 1.9rem;
        }
      `}</style>

      {/* ── Lead banner ── */}
      <div style={{
        maxWidth: '1000px',
        margin: isMobile ? '0 auto 2.5rem' : '0 auto 3.5rem',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(17,17,17,0.1)',
        height: isMobile ? '220px' : '380px',
        background: '#e9e5d9',
      }}>
        {!bannerError ? (
          <img
            src="/vogue.png"
            alt="Shannon Wong, GIRLFLIESWORLD"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%) contrast(1.05)' }}
            onError={() => setBannerError(true)}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '1.2rem', color: MUTE,
          }}>
            GIRLFLIESWORLD
          </div>
        )}
      </div>

      {/* ── Narrow centered paragraph column ── */}
      <div style={{ maxWidth: '740px', margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: MUTE,
          textAlign: 'center',
          margin: '0 0 3rem 0',
        }}>
          In Shannon&rsquo;s Words
        </p>

        {PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            ref={(el) => (paraRefs.current[i] = el)}
            data-anchor={p.anchor}
            className="bd-para"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              lineHeight: 1.7,
              color: INK,
              margin: '0 0 1.8rem 0',
              textAlign: 'left',
            }}
          >
            {p.dropCap && (
              <span style={{
                float: 'left',
                fontFamily: "'Lora', Georgia, serif",
                fontSize: isMobile ? '3.4rem' : '4.2rem',
                lineHeight: 0.8,
                fontWeight: 600,
                padding: '0.1rem 0.15rem 0 0',
                color: INK,
              }}>
                {p.text.charAt(0)}
              </span>
            )}
            {p.dropCap ? p.text.slice(1) : p.text}
          </p>
        ))}

        <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ width: 36, height: 1, background: 'rgba(17,17,17,0.3)' }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: MUTE,
          }}>
            Shannon Wong, Mission Commander 
          </span>
          <div style={{ width: 36, height: 1, background: 'rgba(17,17,17,0.3)' }} />
        </div>

        {/* Patron feature — now a real feature: a larger Cormorant
            Garamond name line (matching the reference's serif family),
            plus one short description line, not a small aside. */}
        <div style={{ marginTop: '2.25rem', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: isMobile ? '1.6rem' : '2rem',
            fontWeight: 600,
            color: INK,
            margin: '0 0 0.4rem 0',
            lineHeight: 1.2,
          }}>
            With the Support of Alexandra Shackleton
          </p>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: '0.95rem',
            color: MUTE,
            margin: 0,
          }}>
            Official Patron &middot; granddaughter of Sir Ernest Shackleton
          </p>
        </div>
      </div>

      {/* ── Full-width photo row underneath, YC-strip style — clickable ── */}
      <div style={{
        maxWidth: '1280px',
        margin: '4rem auto 0',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : `repeat(${IDENTITIES.length}, 1fr)`,
        gap: isMobile ? '0.75rem' : '1rem',
      }}>
        {IDENTITIES.map((id) => {
          const active = activeKey === id.key;
          return (
            <button
              key={id.key}
              type="button"
              className="bd-photo-btn"
              onClick={() => setActiveKey(id.key)}
              aria-pressed={active}
              aria-label={`Show ${id.label} details`}
            >
              <div
                className="bd-photo"
                style={{
                  position: 'relative',
                  height: isMobile ? '140px' : '190px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `2px solid ${active ? INK : 'rgba(17,17,17,0.1)'}`,
                  opacity: active ? 1 : 0.55,
                  transform: active ? 'scale(1.03)' : 'scale(1)',
                  background: '#e9e5d9',
                }}
              >
                {!imgError[id.key] ? (
                  <img
                    src={id.image}
                    alt={id.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%) contrast(1.05)' }}
                    onError={() => setImgError((prev) => ({ ...prev, [id.key]: true }))}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Lora', serif", fontSize: '1.8rem', color: MUTE,
                  }}>
                    {id.label.charAt(0)}
                  </div>
                )}
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: active ? INK : MUTE,
                margin: '0.6rem 0 0.2rem 0',
                transition: 'color 0.4s ease',
              }}>
                {id.label}
              </p>
              <span className="bd-caption" style={{
                fontFamily: "'Lora', Georgia, serif",
                fontStyle: 'italic',
                fontSize: isMobile ? '0.68rem' : '0.75rem',
                color: MUTE,
                lineHeight: 1.4,
                opacity: active ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}>
                {active ? id.caption : ''}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default BoundariesSection;
