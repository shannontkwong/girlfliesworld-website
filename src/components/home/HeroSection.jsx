import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  // Subtitles to cycle through - faster switching
  const subtitles = [
    'ALL 7 CONTINENTS',
    'THE SOUTH POLE',
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      console.log('Window width:', window.innerWidth, 'Is mobile:', mobile);
      setIsMobile(mobile);
    };

    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 1500); // Faster switching - 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Hover hook for buttons
  const useHoverStyle = (base, hover) => {
    const [hovered, setHovered] = useState(false);
    return {
      style: hovered ? { ...base, ...hover } : base,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    };
  };

  // Button styles
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

  // Get hover props for buttons
  const primaryHoverProps = useHoverStyle(btnPrimaryBase, btnPrimaryHover);
  const secondaryHoverProps = useHoverStyle(btnSecondaryBase, btnSecondaryHover);

  if (isMobile) {
    return (
      <section
        style={{
          height: '100vh',
          display: 'flex',
          marginTop: '60px',
        }}
      >
        {/* Mobile: Full width image with content overlay (same as desktop) */}
        <div
          style={{
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            background: '#f5f5f5',
          }}
        >
          <img
            src="/cool.png"
            alt="Shannon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '-190px center',
              filter: 'contrast(1.1)',
            }}
          />
          
          {/* Black gradient overlay at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '350px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)',
              zIndex: 1,
            }}
          />
          
          {/* Content overlay at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '1.5rem',
              right: '1.5rem',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Main title - Single line */}
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

            {/* Animated subtitle */}
            <div style={{
              minHeight: '2em',
              marginBottom: '0.5rem',
            }}>
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

            {/* Small text */}
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

            {/* Buttons - Mobile: Vertical Stack */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              width: '100%',
              maxWidth: '280px',
            }}>
              <a href="#mission" style={{
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
            
            {/* Additional description */}
            <p style={{
              margin: '2rem 0 0 0',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 400,
              lineHeight: 1.4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              opacity: 0.9,
            }}>
              Aviator, explorer, artist, technologist.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        height: '100vh',
        display: 'flex',
        marginTop: '80px',
      }}
    >
      {/* Full width image with content overlay */}
      <div
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#f5f5f5',
        }}
      >
        <img
          src="/cool.png"
          alt="Shannon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left center',
            filter: 'contrast(1.1)',
          }}
        />
        
        {/* Black gradient overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
            zIndex: 1,
          }}
        />
        
        {/* Content overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '3rem',
            right: '3rem',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* Main title */}
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

          {/* Animated subtitle */}
          <div style={{
            minHeight: '2em',
            marginBottom: '0.5rem',
          }}>
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

          {/* Small text */}
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

          {/* Buttons - Desktop: Horizontal */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            <a href="#mission" {...primaryHoverProps}>
              Follow the Journey
            </a>
            <a href="/aboutme" {...secondaryHoverProps}>
              Meet Shannon
            </a>
          </div>
          
          {/* Additional description */}
          <p style={{
            margin: '2rem 0 0 0',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.4,
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            opacity: 0.9,
          }}>
            Aviator, explorer, artist, technologist.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
