import React, { useEffect, useRef, useState } from 'react';
import CredentialsStrip from './BeyondFlight';
import WhyThisMattersSection from './WhyThisMatters';

/**
 * ScienceTeaserSection
 * Drop into HomePage.jsx between MissionSection and StatsSection:
 *
 *   import ScienceTeaserSection from '../components/home/ScienceTeaserSection';
 *   ...
 *   <MissionSection />
 *   <ScienceTeaserSection />
 *   <StatsSection />
 */

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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const orange = '#FFAA00';

  const stats = [
    { num: '600–900', unit: 'MHz', label: 'Radar frequency' },
    { num: '100m', unit: '', label: 'Ice penetration depth' },
    { num: '1', unit: 'pilot', label: 'Solo operation' },
  ];

  return (
    <>
      <style>{`
        @keyframes sci-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sci-item { opacity: 0; }
        .sci-visible .sci-item { animation: sci-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .sci-visible .sci-item:nth-child(1) { animation-delay: 0.05s; }
        .sci-visible .sci-item:nth-child(2) { animation-delay: 0.15s; }
        .sci-visible .sci-item:nth-child(3) { animation-delay: 0.22s; }
        .sci-visible .sci-item:nth-child(4) { animation-delay: 0.30s; }
        .sci-visible .sci-item:nth-child(5) { animation-delay: 0.38s; }
        .sci-visible .sci-item:nth-child(6) { animation-delay: 0.46s; }
        .sci-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          background: #000;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          border-radius: 50px;
          letter-spacing: 0.02em;
          transition: background 0.2s ease, transform 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .sci-btn:hover {
          background: ${orange};
          color: #000;
          transform: translateY(-2px);
        }
        .sci-stat { border-right: 1px solid #e5e5e5; padding-right: 1.5rem; }
        .sci-stat:last-child { border-right: none; }
        .sci-map-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.6s ease;
        }
        .sci-map-wrap:hover .sci-map-img {
          transform: scale(1.03);
        }
      `}</style>

{/* Full-width route banner */}
<div style={{
  width: '100%',
  height: isMobile ? '240px' : '420px',
  overflow: 'hidden',
  position: 'relative',
}}>
  <img
    src="/rout.png"
    alt="GIRLFLIESWORLD global expedition route"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
    }}
  />
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.95) 100%)',
  }} />
  <div style={{
    position: 'absolute',
    bottom: isMobile ? '1rem' : '2rem',
    left: isMobile ? '1.25rem' : '4rem',
  }}>
    <span style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: '0.65rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#555',
      fontWeight: 700,
    }}>41 legs · 7 continents · 40,000+ nautical miles</span>
  </div>
</div>
      <section
        ref={ref}
        className={visible ? 'sci-visible' : ''}
        aria-label="Science mission teaser"
        style={{
          background: '#fff',
          padding: isMobile ? '4rem 1.25rem' : '6rem 4rem',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '3rem' : '5rem',
            alignItems: 'center',
          }}>

            {/* ── LEFT: text ── */}
            <div>

              {/* Label */}
              <div className="sci-item" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.25rem',
              }}>
                <div style={{ width: 28, height: 2, background: orange, flexShrink: 0 }} />
                <span style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#888',
                  fontWeight: 700,
                }}>Historic Antarctic Airborne Science</span>
              </div>

              {/* Headline */}
              <h2 className="sci-item" style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontSize: isMobile ? '3rem' : '4.5rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#000',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                marginBottom: '1.75rem',
              }}>
                Mini-IceBridge: <br />The Data
                <span style={{ color: orange }}> No One</span><br />
                Has Collected
              </h2>

              {/* Body */}
              <p className="sci-item" style={{
                fontSize: '0.875rem',
                lineHeight: 1.8,
                fontWeight: 500,
                color: '#374151',
                marginBottom: '1.5rem',
                maxWidth: '460px',
              }}>
                Equipped with snow-penetrating radar, precision laser altimetry, and multispectral imaging, Shannon’s aircraft will extend high-quality geophysical observations into remote Antarctic terrain that is currently beyond the practical reach of most large research aircraft. The resulting airborne dataset will be openly shared with the international Antarctic science community.
The corridor targeted by the mission constitutes one of the most poorly constrained boundary conditions in contemporary ice-sheet models, making it a key source of uncertainty in projections of future sea-level rise. By collecting observations across this understudied region, the mission will deliver valuable constraints on ice-sheet processes and provide data where dedicated survey coverage has historically been limited.
</p>
              {/* Quote */}
              <div className="sci-item" style={{
                borderLeft: `3px solid ${orange}`,
                paddingLeft: '1.25rem',
                marginBottom: '2.5rem',
                fontStyle: 'italic',
                fontSize: '0.82rem',
                color: '#888',
                lineHeight: 1.7,
                maxWidth: '420px',
              }}>
                "A mini-IceBridge for one profile" — Dr. Ted Scambos, CIRES / University of Colorado Boulder
              </div>

              {/* Stats row */}
              <div className="sci-item" style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem',
              }}>
                {stats.map((s, i) => (
                  <div key={i} className="sci-stat" style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{
                      fontFamily: "'Impact', 'Arial Black', sans-serif",
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      color: '#000',
                      lineHeight: 1,
                    }}>
                      {s.num}
                      {s.unit && <span style={{ fontSize: '0.9rem', color: orange, marginLeft: '2px' }}>{s.unit}</span>}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      color: '#999',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}>{s.label}</span>
                  </div>
                ))}
              </div>
{/* RINGS badge */}
<div className="sci-item" style={{
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.6rem 1rem',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  marginBottom: '2rem',
  background: '#fafafa',
}}>
  <img
    src="/rings.png"
    alt="SCAR RINGS"
    style={{
      height: '78px',
      width: 'auto',
      objectFit: 'contain',
    }}
    onError={e => { e.currentTarget.style.display = 'none'; }}
  />
  <span style={{
    fontSize: '1.00rem',
    color: '#555',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight: 1.4,
  }}>
    Invited to present at<br />
    <span style={{ color: '#000' }}>SCAR RINGS DML/EL Meeting</span>
  </span>
</div>
              {/* CTA */}
              <div className="sci-item">
                <a href="/science" className="sci-btn">
                  Explore The Science →
                </a>
              </div>
            </div>

            {/* ── RIGHT: map image ── */}
            <div className="sci-item" style={{
              position: 'relative',
            }}>
         

              <div
                className="sci-map-wrap"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  overflow: 'hidden',
                  lineHeight: 0,
                  border: '1px solid #e8e8e8',
                }}
              >
                <img
                  src="/mapa.png"
                  alt="Antarctic survey route map showing Marsh, Marambio, Wolf's Fang, South Pole and Cape Town"
                  className="sci-map-img"
                  style={{
                    width: '100%',
                    height: isMobile ? '300px' : '480px',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                  onError={e => {
                    // Fallback if image path differs
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div style={{
                  display: 'none',
                  width: '100%',
                  height: isMobile ? '300px' : '480px',
                  background: '#f5f5f5',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}>
                  <span style={{ fontSize: '2rem' }}>🗺️</span>
                  <span style={{ fontSize: '0.8rem', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Antarctic Route Map
                  </span>
                </div>

                {/* Overlay caption */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '1.5rem 1.25rem 1rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                  zIndex: 2,
                }}>
                 
                </div>
              </div>

              {/* Below-image note */}
              <div style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: orange, flexShrink: 0 }} />
                <p style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  Data delivered to the{' '}
                  <span style={{ color: '#333', fontWeight: 600 }}>National Snow and Ice Data Center (NSIDC)</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      
      </section>
      <WhyThisMattersSection />
    </>
  );
};

export default ScienceTeaserSection;
