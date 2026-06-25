import React, { useState, useEffect } from 'react';

const partnerLogos = [
  { name: 'AG-NAV',                        src: '/agnav.png' },
  { name: 'Platinum Jets International',   src: '/plaj.png' },
  { name: 'Estes Rockets',                 src: '/estes.png' },
  { name: 'Emergent Ventures',             src: '/ge.png' },
  { name: 'James Caird Society',           src: '/jc.png' },
  { name: 'Dick Smith AC',                 src: '/dsc.png' },
];

const PartnersCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const doubled = [...partnerLogos, ...partnerLogos];
  const gold = '#D4AF37';
  const outfit = "'Outfit', sans-serif";

  return (
    <section style={{
      padding: isMobile ? '1.75rem 0 0' : '2.5rem 0 0',
      background: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes gfw-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gfw-partners-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: gfw-marquee 36s linear infinite;
          will-change: transform;
        }
        .gfw-partners-track:hover {
          animation-play-state: paused;
        }
        .gfw-see-all-btn {
          display: inline-block;
          background-color: #D4AF37;
          color: #000;
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          font-size: 0.85rem;
          padding: 0.6rem 1.8rem;
          border-radius: 999px;
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background-color 0.3s ease;
        }
        .gfw-see-all-btn:hover {
          background-color: #b7972a;
        }
        .gfw-become-btn {
          display: inline-block;
          background-color: transparent;
          color: #000;
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          font-size: 0.85rem;
          padding: 0.6rem 1.8rem;
          border-radius: 999px;
          border: 1.5px solid #000;
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .gfw-become-btn:hover {
          background-color: #000;
          color: #fff;
        }
      `}</style>

      {/* Eyebrow */}
      <p style={{
        textAlign: 'center',
        fontFamily: "'Georgia', serif",
        fontSize: '0.68rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.3)',
        margin: isMobile ? '0 0 1.25rem' : '0 0 1.75rem',
      }}>
        Our Partners
      </p>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div className="gfw-partners-track">
          {doubled.map((p, i) => (
            <div key={i} style={{
              flexShrink: 0,
              padding: isMobile ? '0 2rem' : '0 3.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={p.src}
                alt={p.name}
                style={{
                  height: isMobile ? 60 : 90,
                  width: 'auto',
                  maxWidth: isMobile ? 160 : 220,
                  objectFit: 'contain',
                  display: 'block',
                }}
                onError={e => { e.currentTarget.parentElement.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{
        textAlign: 'center',
        marginTop: isMobile ? '1.5rem' : '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}>
        <a href="/partners" className="gfw-see-all-btn">See All Partners</a>
        <a href="/partners" className="gfw-become-btn">Become a Partner</a>
      </div>

      {/* Significance strip */}
      <div style={{
        marginTop: isMobile ? '1.75rem' : '2.5rem',
        borderTop: '1px solid #f0f0f0',
        background: '#fafafa',
        padding: isMobile ? '1rem 1.25rem' : '1rem 4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '1rem' : '2.5rem',
        flexWrap: 'wrap',
      }}>
        {[
     { num: '100M+', label: 'Projected audience reach' },
     { num: '7', label: 'Continents' },
     { num: '40,000+', label: 'Nautical miles' },
     { num: '50+', label: 'Schools reached worldwide' },
     { num: '2', label: 'Educational partners' },
     { num: 'BBC · Netflix · CNN', label: 'Media in discussion' },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.5rem' : '0.75rem',
            flexShrink: 0,
          }}>
            {i > 0 && !isMobile && (
              <div style={{ width: 1, height: 24, background: '#e0e0e0' }} />
            )}
            <div>
              <div style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 900,
                color: '#000',
                lineHeight: 1,
              }}>{s.num}</div>
              <div style={{
                fontFamily: outfit,
                fontSize: '0.6rem',
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                marginTop: '2px',
              }}>{s.label}</div>
            </div>
          </div>
        ))}

        {/* Contact nudge */}
        <div style={{
          marginLeft: isMobile ? '0' : 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexShrink: 0,
        }}>
          <div style={{ width: 16, height: 2, background: gold, flexShrink: 0 }} />
          <a
            href="mailto:contact@girlfliesworld.com"
            style={{
              fontFamily: outfit,
              fontSize: '1.4rem',
              color: '#666',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              fontWeight: 600,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = gold}
            onMouseLeave={e => e.currentTarget.style.color = '#666'}
          >
            contact@girlfliesworld.com
          </a>
        </div>
      </div>

    </section>
  );
};

export default PartnersCarousel;
