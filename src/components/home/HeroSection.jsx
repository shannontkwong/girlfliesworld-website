import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Common colors
  const colors = {
    whiteOpaque: 'rgba(255, 255, 255, 0.95)',
    whiteTranslucent: 'rgba(255, 255, 255, 0.8)',
    blackOverlay: 'rgba(0, 0, 0, 0.3)',
    blackOpaque: 'rgba(0, 0, 0, 0.7)',
    pink: '#ff4081',
  };

  const heroStyle = {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginTop: isMobile ? '60px' : '80px',
    overflow: 'hidden',
  };

  const heroBackgroundStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  const heroBgImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: isMobile ? 'center left' : 'left center', // Focus on left side
    filter: 'brightness(0.8) contrast(1.1)',
  };

  const heroOverlayStyle = {
    position: 'absolute',
    inset: 0,
    background: colors.blackOverlay,
    zIndex: 2,
  };

  const heroContainerStyle = {
    position: 'relative',
    zIndex: 3,
    maxWidth: isMobile ? '100%' : 1400,
    margin: '0 auto',
    padding: isMobile ? '0 1rem' : '0 2rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    minHeight: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 80px)',
  };

  const heroContentStyle = {
    maxWidth: isMobile ? '100%' : 700,
    color: '#fff',
    textAlign: isMobile ? 'center' : 'left',
  };

  const heroTitleStyle = {
    fontSize: isMobile ? 'clamp(2rem, 8vw, 3.5rem)' : 'clamp(3rem, 8vw, 5.5rem)',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
  };

  const spanBaseStyle = {
    color: '#fff',
    textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
  };

  const greatVibesStyle = {
    ...spanBaseStyle,
    display: 'inline-block',
    fontFamily: "'Great Vibes', cursive",
    fontSize: isMobile ? 'clamp(1.8rem, 6vw, 3rem)' : 'clamp(2.5rem, 6vw, 4.5rem)',
    marginRight: isMobile ? '0.8rem' : '1rem', // Increased spacing
  };

  const outfitBoldStyle = {
    ...spanBaseStyle,
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 800,
    fontSize: isMobile ? 'clamp(2rem, 8vw, 3.5rem)' : 'clamp(3rem, 8vw, 5.5rem)',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    marginRight: isMobile ? '0.8rem' : '1.5rem', // Increased spacing between words
  };

  const heroSubtitleStyle = {
    fontSize: isMobile ? 'clamp(0.9rem, 4vw, 1.1rem)' : 'clamp(1rem, 3vw, 1.3rem)',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '1.0rem',
    fontWeight: 500,
    lineHeight: 1.4,
  };

  const heroCTAStyle = {
    display: 'flex',
    gap: isMobile ? 12 : 16,
    flexWrap: 'wrap',
    justifyContent: isMobile ? 'center' : 'flex-start',
    flexDirection: isMobile ? 'row' : 'row', // Changed from column to row for mobile
  };

  // Button styles with hover managed by React state
  const useHoverStyle = (base, hover) => {
    const [hovered, setHovered] = useState(false);
    return {
      style: hovered ? { ...base, ...hover } : base,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    };
  };

  const btnPrimaryBase = {
    background: colors.whiteOpaque,
    color: '#000',
    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: isMobile ? '0.9rem' : '1rem',
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
    width: isMobile ? 'auto' : 'auto', // Changed from 100% to auto for mobile
    textAlign: 'center',
    minWidth: isMobile ? '160px' : 'auto', // Minimum width for mobile
  };

  const btnPrimaryHover = {
    background: colors.pink,
    color: '#fff',
    borderColor: colors.pink,
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(255, 64, 129, 0.5)',
  };

  const btnSecondaryBase = {
    background: colors.blackOpaque,
    color: '#fff',
    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
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
    width: isMobile ? 'auto' : 'auto', // Changed from 100% to auto for mobile
    textAlign: 'center',
    minWidth: isMobile ? '160px' : 'auto', // Minimum width for mobile
  };

  const btnSecondaryHover = {
    background: 'rgba(255,255,255,0.2)',
    color: colors.pink,
    borderColor: colors.pink,
    transform: 'scale(1.05)',
    boxShadow: '0 6px 12px rgba(255, 64, 129, 0.5)',
  };

  const primaryHoverProps = useHoverStyle(btnPrimaryBase, btnPrimaryHover);
  const secondaryHoverProps = useHoverStyle(btnSecondaryBase, btnSecondaryHover);

  return (
    <section style={heroStyle}>
      <div style={heroBackgroundStyle}>
        <img
          src="blac.jpeg"
          alt="Shannon and her aircraft"
          style={heroBgImageStyle}
          loading="lazy"
        />
        <div style={heroOverlayStyle} />
      </div>

      <div style={heroContainerStyle}>
        <div style={heroContentStyle}>
          <h1 style={{ marginBottom: '1.5rem' }}>
            <span style={greatVibesStyle}>
              The
            </span>
            <span style={{
              ...outfitBoldStyle,
              marginRight: isMobile ? '0.8rem' : '1.5rem' // Space after IMPOSSIBLE
            }}>
              IMPOSSIBLE
            </span>
            {!isMobile && <br />}
            <span style={{
              ...outfitBoldStyle,
              marginRight: 0 // No margin after DREAM
            }}>
              DREAM
            </span>
          </h1>

          <p style={heroSubtitleStyle}>
            First Woman to Fly Solo to All 7 Continents (westbound)
          </p>
          <p style={heroSubtitleStyle}>
            First Woman to Fly Solo to the South Pole in a small plane
          </p>

          <div style={heroCTAStyle}>
            <a
              href="#mission"
              aria-label="Follow the Journey"
              {...primaryHoverProps}
            >
              <i className="fa fa-rocket" aria-hidden="true"></i>
              Follow the Journey
            </a>
            <a
              href="/aboutme"
              aria-label="Meet Shannon"
              {...secondaryHoverProps}
            >
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
