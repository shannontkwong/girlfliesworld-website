import React, { useState, useEffect } from 'react';

// ⚠️ Keep this in sync with the same constant in Navigation.jsx and ContactPage.jsx
const STRIPE_PAYMENT_LINK = 'https://donate.stripe.com/dRm9AV8k0bCCgiBbCEdZ601';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  // Real height of the fixed header (sponsor bar + nav), read from the DOM
  // via Navigation's ResizeObserver broadcast, so this never has to guess.
  const [headerHeight, setHeaderHeight] = useState(140);

  const subtitles = [
    'ALL 7 CONTINENTS',
    'THE SOUTH POLE',
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Keep in sync with the actual header element's height at all times.
  useEffect(() => {
    const headerEl = document.getElementById('site-header');
    if (headerEl) {
      setHeaderHeight(headerEl.getBoundingClientRect().height);
    }

    const handleHeaderResize = (e) => {
      setHeaderHeight(e.detail.height);
    };

    window.addEventListener('site-header-resize', handleHeaderResize);
    return () => window.removeEventListener('site-header-resize', handleHeaderResize);
  }, []);

  const useHoverStyle = (base, hover) => {
    const [hovered, setHovered] = useState(false);
    return {
      style: hovered ? { ...base, ...hover } : base,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    };
  };

  const btnPrimaryBase = {
    background: '#000',
    color: '#fff',
    padding: isMobile ? '0.875rem 2rem' : '1rem 2.5rem',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: isMobile ? '0.875rem' : '1rem',
    border: '2px solid #000',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
    display: 'inline-block',
    textAlign: 'center',
  };

  const btnPrimaryHover = {
    background: '#333',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  };

  const btnSecondaryBase = {
    background: 'transparent',
    color: '#fff',
    padding: isMobile ? '0.875rem 2rem' : '1rem 2.5rem',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: isMobile ? '0.875rem' : '1rem',
    border: '2px solid #fff',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
    display: 'inline-block',
    textAlign: 'center',
  };

  const btnSecondaryHover = {
    background: '#fff',
    color: '#000',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(255,255,255,0.3)',
  };

  // "Help Fund the Mission" — visually distinct (gradient), sits alongside the other two
  const btnFundBase = {
    background: 'linear-gradient(135deg, #E67E22, #C4A574)',
    color: '#fff',
    padding: isMobile ? '0.875rem 2rem' : '1rem 2.5rem',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: isMobile ? '0.875rem' : '1rem',
    border: '2px solid transparent',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
    display: 'inline-block',
    textAlign: 'center',
  };

  const btnFundHover = {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(230,126,34,0.5)',
  };

  const primaryHoverProps = useHoverStyle(btnPrimaryBase, btnPrimaryHover);
  const secondaryHoverProps = useHoverStyle(btnSecondaryBase, btnSecondaryHover);
  const fundHoverProps = useHoverStyle(btnFundBase, btnFundHover);
  const fundHoverPropsMobile = useHoverStyle(
    { ...btnFundBase, width: '100%' },
    btnFundHover
  );

  if (isMobile) {
    return (
      <section className="hero-full-height" style={{ display: 'flex', marginTop: `${headerHeight}px` }}>
        <div style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#f5f5f5' }}>
          {/* Mobile-only hero image — a dedicated asset/crop rather than
              reusing the desktop image, since the framing needs differ. */}
          <img
            src="/cockpit.png"
            alt="Shannon in the cockpit"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'right center',
              filter: 'contrast(1.1)',
            }}
          />

          {/* Bottom gradient */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '350px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)',
            zIndex: 1,
          }} />

          {/* Content */}
          <div style={{
            position: 'absolute',
            bottom: '2rem', left: '1.5rem', right: '1.5rem',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <h1 style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 'clamp(2.2rem, 6vw, 3rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              FIRST WOMAN TO FLY TO
            </h1>

            <div style={{ minHeight: '2em', marginBottom: '0.5rem' }}>
              <p style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                margin: 0,
                color: '#E67E22',
                transition: 'opacity 0.3s ease-in-out',
                letterSpacing: '-0.02em',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}>
                {subtitles[currentSubtitle]}
              </p>
            </div>

            <p style={{
              fontSize: '0.9rem',
              lineHeight: 1.4,
              margin: '0 0 2rem 0',
              fontWeight: 400,
              color: '#fff',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              opacity: 0.9,
            }}>
              in a small plane solo, unassisted
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              width: '100%',
              maxWidth: '280px',
            }}>
              <a
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                {...fundHoverPropsMobile}
              >
                ❤️ Help Fund the Mission
              </a>
              <a href="/journey" style={{
                background: '#000',
                color: '#fff',
                padding: '0.875rem 2rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '2px solid #fff',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                userSelect: 'none',
                display: 'inline-block',
                textAlign: 'center',
                width: '100%',
              }}>
                Follow the Journey
              </a>
              <a href="/aboutme" style={{
                background: 'transparent',
                color: '#fff',
                padding: '0.875rem 2rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '2px solid #fff',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                userSelect: 'none',
                display: 'inline-block',
                textAlign: 'center',
                width: '100%',
              }}>
                Meet Shannon
              </a>
            </div>

            <p style={{
              margin: '2rem 0 0 0',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 400,
              lineHeight: 1.4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              opacity: 0.9,
            }}>
              Aviator, scientist-explorer, technologist + STEAM advocate, philosopher
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Desktop
  return (
    <section className="hero-full-height" style={{ display: 'flex', marginTop: `${headerHeight}px` }}>
      <div style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#f5f5f5' }}>
        <img
          src="/vogue.png"
          alt="Shannon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left 100%',
            filter: 'contrast(1.1)',
          }}
        />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '300px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
          zIndex: 1,
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute',
          bottom: '3rem', left: '3rem', right: '3rem',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <h1 style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(3rem, 5vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            margin: '0 0 1rem 0',
            letterSpacing: '-0.02em',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          }}>
            FIRST WOMAN
            <br />
            TO FLY TO
          </h1>

          <div style={{ minHeight: '2em', marginBottom: '0.5rem' }}>
            <p style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              margin: 0,
              color: '#E67E22',
              transition: 'opacity 0.3s ease-in-out',
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            }}>
              {subtitles[currentSubtitle]}
            </p>
          </div>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.4,
            margin: '0 0 2rem 0',
            fontWeight: 400,
            color: '#fff',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          }}>
            in a small plane solo, unassisted
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              {...fundHoverProps}
            >
              ❤️ Help Fund the Mission
            </a>
            <a href="/journey" {...primaryHoverProps}>
              Follow the Journey
            </a>
            <a href="/aboutme" {...secondaryHoverProps}>
              Meet Shannon
            </a>
          </div>

          <p style={{
            margin: '2rem 0 0 0',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.4,
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            opacity: 0.9,
          }}>
            Aviator, scientist-explorer, technologist + STEAM advocate, philosopher
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
