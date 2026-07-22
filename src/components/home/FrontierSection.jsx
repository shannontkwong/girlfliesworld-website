import React, { useState, useEffect } from 'react';

// FrontierSection — replaces WhyThisMatters.
// Investor framing: frontier aviation + frontier science, stated operationally.
const RED = '#D0021B';
const PINK = '#FF1493';

const CARDS = [
  {
    kicker: 'THE FRONTIER',
    title: 'The flying no one else will do',
    body:
      'Interior Antarctic legs of up to 16 hours nonstop, solo, at 2,000\u20132,500 ft over the most remote ice on Earth \u2014 hand-managing aircraft, fuel, and a live science payload with nowhere to divert. This is the operational reason the dataset does not exist yet.',
  },
  {
    kicker: 'THE GAP',
    title: 'Where the space agencies stopped',
    body:
      "NASA's Operation IceBridge mapped West Antarctica with extraordinary precision \u2014 but never crossed the deep interior between the South Pole and Queen Maud Land. Satellites see the surface; only low-altitude airborne radar resolves the layering beneath it. That corridor is a documented gap in every major ice sheet model used by the IPCC.",
  },
  {
    kicker: 'THE DATA',
    title: 'A dataset with no owner but science',
    body:
      'Radar, altimetry, imaging, and in-flight atmospheric data collected across all seven continents on a single platform \u2014 delivered open access at CReSIS and NSIDC in the exact format the global glaciology community already uses. Immediately citable. Immediately usable as ground-truth for satellite programs.',
  },
  {
    kicker: 'THE ENGINEERING',
    title: 'Built, not bought',
    body:
      'Custom split nose/belly radar antenna pod co-engineered with CReSIS at the University of Kansas. Long-range ferry fuel system enabling the 16-hour legs. Aircraft integration, payload, and expedition systems designed from the ground up by the pilot flying them.',
  },
];

const FrontierSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{ background: '#111111', padding: isMobile ? '4rem 1.5rem' : '6rem 3rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{
          fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: PINK, margin: '0 0 1rem 0',
        }}>
          Why back this mission
        </p>
        <h2 style={{
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          fontSize: isMobile ? '2.2rem' : '3.2rem',
          fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95,
          color: '#fff', margin: '0 0 1.25rem 0', letterSpacing: '-0.02em',
        }}>
          Frontier aviation.<br />Frontier science.
        </h2>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.15rem', color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.6, maxWidth: '760px', margin: '0 0 3rem 0',
        }}>
          The records are the media vehicle. The mission is the science: a
          dedicated airborne survey of one of the least-measured large landmasses
          left on Earth &mdash; feeding directly into the sea-level and climate
          projections that coastal governments, insurers, and researchers depend on.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1.5rem',
        }}>
          {CARDS.map((card, i) => (
            <div key={i} style={{
              background: '#1B1B1B',
              padding: '2rem',
              borderRadius: '4px',
            }}>
              <p style={{
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em',
                textTransform: 'uppercase', color: RED, margin: '0 0 0.6rem 0',
              }}>
                {card.kicker}
              </p>
              <h3 style={{
                fontSize: isMobile ? '1.15rem' : '1.3rem', fontWeight: 800,
                color: '#fff', margin: '0 0 0.75rem 0', lineHeight: 1.25,
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.6, margin: 0,
              }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: isMobile ? 'center' : 'left' }}>
          <a href="/partners" style={{
            display: 'inline-block',
            background: RED, color: '#fff',
            padding: '1rem 2.5rem', borderRadius: '50px',
            fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
          }}>
            Back the Mission
          </a>
          <a href="/science" style={{
            display: 'inline-block',
            background: 'transparent', color: '#fff',
            border: '2px solid rgba(255,255,255,0.4)',
            padding: 'calc(1rem - 2px) 2.5rem', borderRadius: '50px',
            fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
            marginLeft: isMobile ? 0 : '1rem',
            marginTop: isMobile ? '0.75rem' : 0,
          }}>
            Read the Science Plan
          </a>
        </div>
      </div>
    </section>
  );
};

export default FrontierSection;
