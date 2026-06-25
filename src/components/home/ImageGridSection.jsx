import React, { useState, useEffect, useRef } from 'react';
import PressLogoBar from './PressLogoBar';
import PartnersCarousel from './PartnersCarousel';
import ScienceTeaserSection from './Scienceteasersection';
import CredentialsStrip from './BeyondFlight';

const quoteLines = [
  "I got intercepted by two F-18 Hornets over the Indian Ocean — during the Iran–US war — approaching a Lincoln carrier strike group. I escaped Oman two hours after it got bombed. I went viral.",
  "I am the youngest person in history to publish as sole author across physics, cosmology, and Antarctic science — all in Q1 peer-reviewed journals.",
  "I am an author of political philosophy book.",
  "Three transatlantic crossings as captain. Three seas. Two oceans.",
  "Florida to India in a PA28 — 13,000km — no autopilot.",
  "I just turned 20 years old.",
  "I am just getting started."
];

const ImageGridSection = () => {
  const [isMobile, setIsMobile]         = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard]   = useState(null);
  const [visibleLines, setVisibleLines] = useState([]);
  const scrollContainerRef = useRef(null);
  const quoteSectionRef    = useRef(null);
  const hasAnimated        = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap';
    link.rel  = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(p => (p + 1) % gridItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = isMobile ? container.offsetWidth * 0.8 + 16 : 478;
      container.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
    }
  }, [currentIndex, isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          quoteLines.forEach((_, i) => {
            setTimeout(() => setVisibleLines(prev => [...prev, i]), i * 300);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (quoteSectionRef.current) observer.observe(quoteSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const gridItems = [
    { href: '/news',    image: '/tr.png', title: 'LATEST NEWS',  description: "Stay updated with the latest developments and announcements about Shannon's record-breaking journey across all seven continents.", buttonText: 'Read More' },
    { href: '/blog',    image: '/l.png',  title: 'BLOG',         description: "Follow Shannon's personal insights, preparations, and reflections throughout her historic aviation adventure and polar expedition.", buttonText: 'Visit Blog' },
    { href: '/journey', image: '/r.png',  title: 'THE JOURNEY',  description: "Explore the complete flight route across all 7 continents and track the mission's progress in real-time.", buttonText: 'View Route' },
    { href: '/videos',  image: '/b.png',  title: 'VIDEOS',       description: "Watch exclusive footage, training sessions, and behind-the-scenes content from the preparation and mission.", buttonText: 'Watch Now' },
  ];

  const isLast       = i => i === quoteLines.length - 1;
  const isSecondLast = i => i === quoteLines.length - 2;

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .quote-line         { opacity: 0; }
        .quote-line.visible { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .scroll-hide::-webkit-scrollbar { display: none; }

        /* ── Mobile overrides ── */
        @media (max-width: 768px) {
          .patron-grid      { display: block !important; }
          .patron-portraits { max-width: 100% !important; margin: 2rem 0 0 !important; }
          .portrait-frame   { display: none !important; }
          .quote-grid       { display: block !important; }
          .quote-image-col  { display: block !important; margin-top: 2.5rem; }
          .accent-bar       { display: none !important; }
        }
      `}</style>

<PressLogoBar />
<PartnersCarousel />
<ScienceTeaserSection />
      {/* ══════════════════════════════════════
          1. CARD SLIDER
      ══════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '1.5rem 0 3rem' : '2rem 0 6rem', position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>

          {/* Header row */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            padding: isMobile ? '0 1.25rem' : '0 4rem',
            marginBottom: isMobile ? '1.5rem' : '3rem'
          }}>
            <div style={{ flex: 1, marginRight: isMobile ? 0 : '2rem' }}>
              <h2 style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                fontSize: isMobile ? 'clamp(2rem, 10vw, 3rem)' : '4rem',
                color: '#000', textTransform: 'uppercase',
                lineHeight: 0.9, margin: isMobile ? '2rem 0 1rem' : '4rem 0 1rem',
                letterSpacing: '-0.02em'
              }}>
                MUCH MORE<br />THAN A JOURNEY
              </h2>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 500, color: '#374151', maxWidth: 480, margin: 0 }}>
                Follow Shannon's record-breaking aviation adventure across all seven continents — exclusive content, real-time updates, and behind-the-scenes access to this historic polar expedition.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: isMobile ? '1.5rem' : 0 }}>
              <img src="/agnav.png" alt="AG Nav" style={{ height: isMobile ? 44 : 72, width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>

          {/* Slider */}
          <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
            {['left', 'right'].map(dir => (
              <button
                key={dir}
                onClick={dir === 'left'
                  ? () => setCurrentIndex(p => p === 0 ? gridItems.length - 1 : p - 1)
                  : () => setCurrentIndex(p => (p + 1) % gridItems.length)}
                aria-label={dir === 'left' ? 'Previous' : 'Next'}
                style={{
                  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                  [dir]: '1.5rem', width: 46, height: 46, borderRadius: '50%',
                  background: 'white', border: '1px solid rgba(0,0,0,0.12)',
                  cursor: 'pointer', display: isMobile ? 'none' : 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, color: '#222',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.12)', zIndex: 10
                }}
              >{dir === 'left' ? '‹' : '›'}</button>
            ))}

            <div
              ref={scrollContainerRef}
              className="scroll-hide"
              style={{
                display: 'flex',
                gap: isMobile ? '1rem' : '28px',
                overflowX: 'scroll',
                scrollSnapType: 'x mandatory',
                padding: isMobile ? '0 1.25rem' : '0 4rem',
                scrollBehavior: 'smooth',
                width: '100%',
                justifyContent: 'flex-start',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                boxSizing: 'border-box'
              }}
            >
              {gridItems.map((item, index) => (
                <a key={item.title} href={item.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <div
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      position: 'relative',
                      width: isMobile ? '80vw' : 450,
                      minWidth: isMobile ? '80vw' : 450,
                      maxWidth: isMobile ? '80vw' : 450,
                      height: isMobile ? 380 : 460,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      scrollSnapAlign: 'start',
                      transform: hoveredCard === index ? 'scale(1.025)' : 'scale(1)',
                      boxShadow: hoveredCard === index ? '0 20px 60px rgba(0,0,0,0.22)' : '0 8px 32px rgba(0,0,0,0.1)',
                      transition: 'transform 0.35s ease, box-shadow 0.35s ease'
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.82) 100%)',
                      zIndex: 1
                    }} />
                    <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '1.25rem' : '2rem', color: 'white' }}>
                      <h3 style={{
                        fontFamily: 'Impact, Arial Black, sans-serif',
                        fontSize: isMobile ? '1.1rem' : '1.5rem',
                        fontWeight: 900, marginBottom: '0.5rem',
                        textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.2
                      }}>{item.title}</h3>
                      <p style={{ fontSize: isMobile ? '0.8rem' : '0.875rem', lineHeight: 1.55, fontWeight: 500, marginBottom: '1.25rem', opacity: 0.93 }}>
                        {item.description}
                      </p>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: isMobile ? '0.6rem 1.2rem' : '0.85rem 1.8rem',
                        backgroundColor: 'rgba(255,255,255,0.92)', color: '#000',
                        fontWeight: 700, fontSize: isMobile ? '0.8rem' : '0.95rem',
                        borderRadius: 50, backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.25)'
                      }}>
                        {item.buttonText} <span>→</span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            {gridItems.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)} style={{
                width: i === currentIndex ? 28 : 10, height: 10,
                borderRadius: 50, border: 'none',
                backgroundColor: i === currentIndex ? '#111' : 'rgba(0,0,0,0.18)',
                cursor: 'pointer', transition: 'all 0.35s ease', padding: 0
              }} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <CredentialsStrip />
      {/* ══════════════════════════════════════
          2. CREDENTIALS QUOTE
      ══════════════════════════════════════ */}
      <section
        ref={quoteSectionRef}
        style={{
          padding: isMobile ? '4rem 1.25rem' : '8rem 4rem',
          background: '#faf9f6',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Watermark — hidden on mobile to avoid overflow */}
        {!isMobile && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '14vw',
            fontFamily: "'Caveat', cursive",
            color: 'rgba(0,0,0,0.03)',
            whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none'
          }}>Shannon Wong</div>
        )}

        {/* Left accent bar — desktop only */}
        <div className="accent-bar" style={{
          position: 'absolute', left: '4rem',
          top: '8rem', bottom: '8rem', width: 2,
          background: 'linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)',
          opacity: 0.1
        }} />

        {/* Two-column on desktop, single on mobile */}
        <div className="quote-grid" style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '5rem',
          alignItems: 'center'
        }}>

          {/* Quote text */}
          <div style={{ paddingLeft: isMobile ? 0 : '3rem' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '4rem' : '7rem',
              lineHeight: 0.6, color: '#000', opacity: 0.12,
              marginBottom: '1.25rem', fontStyle: 'italic'
            }}>"</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.25rem' : '1.75rem' }}>
              {quoteLines.map((line, i) => (
                <p
                  key={i}
                  className={`quote-line${visibleLines.includes(i) ? ' visible' : ''}`}
                  style={{
                    margin: 0,
                    fontFamily: "'Caveat', cursive",
                    fontSize: isLast(i)
                      ? isMobile ? '2rem' : '3rem'
                      : isSecondLast(i)
                      ? isMobile ? '1.6rem' : '2.4rem'
                      : isMobile ? '1.2rem' : '1.65rem',
                    fontWeight: isLast(i) ? 700 : isSecondLast(i) ? 600 : 400,
                    lineHeight: 1.4, color: '#1a1a1a',
                    opacity: isLast(i) ? 1 : 0.85,
                    borderLeft: isLast(i) ? '3px solid #000' : 'none',
                    paddingLeft: isLast(i) ? '1rem' : (!isMobile && i % 2 === 1) ? '2rem' : '0',
                  }}
                >{line}</p>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ width: 40, height: 1, background: '#000', opacity: 0.25, flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic', fontSize: isMobile ? '0.8rem' : '0.95rem',
                color: '#666', letterSpacing: '0.06em'
              }}>Shannon Wong, Mission Commander · GIRLFLIESWORLD</span>
            </div>
          </div>

          {/* Tailwheel image — full width on mobile below quotes, column on desktop */}
          <div className="quote-image-col" style={{ display: isMobile ? 'none' : 'block' }}>
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 580 }}>
              <div style={{
                position: 'absolute',
                top: 16, right: -12, bottom: -12, left: 12,
                border: '1px solid rgba(0,0,0,0.08)',
                pointerEvents: 'none', zIndex: 0
              }} />
              <img
                src="/tailwheel.png"
                alt="Shannon Wong"
                style={{
                  position: 'relative', zIndex: 1,
                  width: '100%', height: '100%', minHeight: 580,
                  objectFit: 'cover', objectPosition: 'center top',
                  filter: 'grayscale(100%) contrast(1.05)',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
                background: 'linear-gradient(to top, #faf9f6 0%, transparent 100%)',
                zIndex: 2, pointerEvents: 'none'
              }} />
            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════
          3. PATRON SECTION
      ══════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '3.5rem 1.25rem 4rem' : '6rem 4rem',
        background: '#0a0a0a', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          width: 60, height: 2, background: 'rgba(255,255,255,0.2)',
          margin: isMobile ? '0 auto 2rem' : '0 0 3rem'
        }} />

        <div className="patron-grid" style={{
          maxWidth: 1100, margin: '0 auto',
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: isMobile ? 0 : '6rem',
          alignItems: 'center'
        }}>

          {/* Text */}
          <div>
            <p style={{
              fontFamily: "'Georgia', serif", fontSize: '0.72rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem'
            }}>Official Patron</p>

            <h2 style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              fontSize: isMobile ? 'clamp(2rem, 9vw, 3rem)' : '3.25rem',
              color: '#fff', textTransform: 'uppercase',
              lineHeight: 0.95, letterSpacing: '-0.01em', margin: '0 0 1.5rem'
            }}>
              ALEXANDRA<br />SHACKLETON
            </h2>

            <p style={{
              fontSize: isMobile ? '0.875rem' : '0.9rem',
              lineHeight: 1.85, color: 'rgba(255,255,255,0.65)',
              marginBottom: '1.25rem', maxWidth: 420
            }}>
              Granddaughter of Sir Ernest Shackleton — the man who turned certain catastrophe into one of the greatest survival stories in human history — Alexandra Shackleton carries a name synonymous with endurance, courage, and the refusal to quit. She is the Official Patron of GIRLFLIESWORLD.
            </p>

            <p style={{
              fontSize: isMobile ? '0.875rem' : '0.9rem',
              lineHeight: 1.85, color: 'rgba(255,255,255,0.45)', maxWidth: 420
            }}>
              Her patronage is not ceremonial. It is a statement — that this expedition belongs to the same tradition of British polar exploration her grandfather defined, and that the spirit of <em>Endurance</em> burns in a new generation.
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              <span style={{
                fontFamily: "'Georgia', serif", fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em',
                textTransform: 'uppercase', whiteSpace: 'nowrap'
              }}>Fortitudine Vincimus</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
            </div>
          </div>

          {/* Split portraits — full width on mobile */}
          <div className="patron-portraits" style={{
            position: 'relative',
            width: '100%',
            maxWidth: isMobile ? '100%' : '100%',
            margin: isMobile ? '2.5rem 0 0' : 0
          }}>
            {/* Decorative frame — desktop only */}
            <div className="portrait-frame" style={{
              position: 'absolute', top: -16, left: -16, right: 16, bottom: 16,
              border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none', zIndex: 0
            }} />

            {/* Ernest — top */}
            <div style={{ position: 'relative', zIndex: 1, lineHeight: 0 }}>
              <img
                src="/shackleton.png"
                alt="Sir Ernest Shackleton"
                style={{
                  width: '100%', display: 'block',
                  filter: 'grayscale(100%) contrast(1.1)',
                  objectFit: 'cover', objectPosition: 'center top',
                  height: isMobile ? 240 : 280
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.5rem 1.25rem 0.75rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)'
              }}>
                <p style={{
                  fontFamily: "'Georgia', serif", fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em',
                  textTransform: 'uppercase', margin: 0
                }}>Sir Ernest Shackleton · 1874–1922</p>
              </div>
            </div>

            <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }} />

            {/* Alexandra — bottom */}
            <div style={{ position: 'relative', zIndex: 1, lineHeight: 0 }}>
              <img
                src="/alex.png"
                alt="Alexandra Shackleton"
                style={{
                  width: '100%', display: 'block',
                  filter: 'grayscale(15%) contrast(1.05)',
                  objectFit: 'cover', objectPosition: 'center top',
                  height: isMobile ? 240 : 280,
                  background: '#1a1a1a'
                }}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback */}
              <div style={{
                display: 'none', width: '100%',
                height: isMobile ? 240 : 280,
                background: '#1a1a1a',
                alignItems: 'center', justifyContent: 'center'
              }}>
                <p style={{
                  fontFamily: "'Georgia', serif", fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em',
                  textTransform: 'uppercase', margin: 0
                }}>Photo coming soon</p>
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.5rem 1.25rem 0.75rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)'
              }}>
                <p style={{
                  fontFamily: "'Georgia', serif", fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em',
                  textTransform: 'uppercase', margin: 0
                }}>Alexandra Shackleton · Official Patron</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageGridSection;
