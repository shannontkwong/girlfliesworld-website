import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  // Subtitles to cycle through
  const subtitles = [
    'First Woman to Fly Solo to All 7 Continents (westbound)...',
    'First Woman to Fly Solo to the South Pole in a small plane',
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Colors
  const colors = {
    whiteOpaque: 'rgba(255, 255, 255, 0.95)',
    whiteTranslucent: 'rgba(255, 255, 255, 0.8)',
    blackOverlay: 'rgba(0, 0, 0, 0.3)',
    blackOpaque: 'rgba(0, 0, 0, 0.7)',
    pink: '#ff4081',
  };

  // Hover hook for buttons
  const useHoverStyle = (base, hover) => {
    const [hovered, setHovered] = useState(false);
    return {
      style: hovered ? { ...base, ...hover } : base,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    };
  };

  // Base and hover styles for primary button
  const btnPrimaryBase = {
    background: colors.whiteOpaque,
    color: '#000',
    padding: isMobile ? '0.75rem 1.25rem' : '1rem 2rem',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: isMobile ? '0.85rem' : '1rem',
    border: `2px solid ${colors.whiteOpaque}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backdropFilter: 'blur(10px)',
    borderRadius: 9999,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
    width: isMobile ? '100%' : 'auto',
    textAlign: 'center',
    maxWidth: isMobile ? '280px' : 'none',
    margin: isMobile ? '0 auto' : '0',
  };

  const btnPrimaryHover = {
    background: colors.pink,
    color: '#fff',
    borderColor: colors.pink,
    transform: 'scale(1.05)',
    boxShadow: `0 6px 12px ${colors.pink}80`,
  };

  // Base and hover styles for secondary button
  const btnSecondaryBase = {
    background: colors.blackOpaque,
    color: '#fff',
    padding: isMobile ? '0.75rem 1.25rem' : '1rem 2rem',
    textDecoration: 'none',
    fontWeight: 600,
    border: `2px solid ${colors.whiteTranslucent}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backdropFilter: 'blur(10px)',
    borderRadius: 9999,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
    width: isMobile ? '100%' : 'auto',
    textAlign: 'center',
    maxWidth: isMobile ? '280px' : 'none',
    margin: isMobile ? '0 auto' : '0',
  };

  const btnSecondaryHover = {
    background: 'rgba(255,255,255,0.2)',
    color: colors.pink,
    borderColor: colors.pink,
    transform: 'scale(1.05)',
    boxShadow: `0 6px 12px ${colors.pink}80`,
  };

  // Get hover props for buttons
  const primaryHoverProps = useHoverStyle(btnPrimaryBase, btnPrimaryHover);
  const secondaryHoverProps = useHoverStyle(btnSecondaryBase, btnSecondaryHover);

  // Fade styles for subtitle
  const fadeStyles = {
    transition: 'opacity 0.5s ease-in-out',
    height: isMobile ? '3em' : '2.5em',
    fontSize: isMobile ? '1.1rem' : '1.5rem',
    fontWeight: 500,
    lineHeight: isMobile ? '1.3' : '1.4',
    margin: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginTop: isMobile ? '60px' : '80px',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      >
        <img
          src="/hero.png"
          alt="Shannon and her aircraft"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? 'center left' : 'left center',
            filter: 'brightness(0.8) contrast(1.1)',
          }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: colors.blackOverlay,
            zIndex: 2,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: isMobile ? '100%' : 1400,
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          minHeight: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 80px)',
        }}
      >
        <div
          style={{
            maxWidth: isMobile ? '100%' : 700,
            color: '#fff',
            textAlign: isMobile ? 'center' : 'left',
            width: '100%',
          }}
        >
          {/* Title */}
          <h1 style={{ marginBottom: isMobile ? '1rem' : '1rem' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: "'Great Vibes', cursive",
                fontSize: isMobile
                  ? 'clamp(1.8rem, 6vw, 3rem)'
                  : 'clamp(2.5rem, 6vw, 4.5rem)',
                marginRight: isMobile ? '0.8rem' : '1rem',
                color: '#fff',
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
              }}
            >
              The
            </span>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: isMobile
                  ? 'clamp(2rem, 8vw, 3.5rem)'
                  : 'clamp(3rem, 8vw, 5.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginRight: isMobile ? '0.8rem' : '1.5rem',
                color: '#fff',
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
              }}
            >
              IMPOSSIBLE
            </span>
            {!isMobile && <br />}
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: isMobile
                  ? 'clamp(2rem, 8vw, 3.5rem)'
                  : 'clamp(3rem, 8vw, 5.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginRight: 0,
                color: '#fff',
                textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
              }}
            >
              DREAM
            </span>
          </h1>

          {/* Subtitle with fade */}
          <div style={{ 
            marginBottom: isMobile ? '2.5rem' : '1rem',
            minHeight: isMobile ? '3em' : '2.5em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <p style={fadeStyles}>{subtitles[currentSubtitle]}</p>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: isMobile ? '1rem' : '1rem',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'center' : 'flex-start',
              width: '100%',
              maxWidth: isMobile ? '320px' : 'none',
              margin: isMobile ? '0 auto' : '0',
            }}
          >
            <a href="#mission" aria-label="Follow the Journey" {...primaryHoverProps}>
              <i className="fa fa-rocket" aria-hidden="true"></i>
              Follow the Journey
            </a>
            <a href="/aboutme" aria-label="Meet Shannon" {...secondaryHoverProps}>
              <i className="fa fa-user" aria-hidden="true"></i>
              Meet Shannon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
