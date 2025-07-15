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
    color: '#000',
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

  const btnSecondaryHover = {
    background: '#000',
    color: '#fff',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  };

  // Get hover props for buttons
  const primaryHoverProps = useHoverStyle(btnPrimaryBase, btnPrimaryHover);
  const secondaryHoverProps = useHoverStyle(btnSecondaryBase, btnSecondaryHover);

  if (isMobile) {
    return (
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '0px', // Removed margin to see if it helps
          paddingTop: '60px', // Moved top spacing here instead
        }}
      >
        {/* Mobile Orange Content Section */}
        <div style={{
          background: '#E67E22',
          padding: '4rem 1.5rem',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          {/* Main title */}
          <h1 style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(4rem, 6vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            marginBottom:'1rem',
            margin: '0 0 1.5rem 0',
            letterSpacing: '-0.02em',
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
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              margin: 0,
              color: '#fff',
              transition: 'opacity 0.3s ease-in-out',
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}>
              {subtitles[currentSubtitle]}
            </p>
          </div>

          {/* Small text */}
          <p style={{
            fontSize: '0.9rem',
            lineHeight: 1.4,
            margin: '0 0 1.5rem 0', // Reduced bottom margin from 2rem to 1.5rem
            fontWeight: 400,
            opacity: 0.9,
            textAlign: 'center',
          }}>
            in a small plane solo, unassisted
          </p>

          {/* Buttons - Mobile: Vertical Stack */}
          <div style={{
            display: 'flex',
            flexDirection: 'column', // Changed to column for vertical stacking
            gap: '1rem',
            alignItems: 'center',
            width: '100%',
            maxWidth: '280px',
          }}>
            <a href="#mission" {...primaryHoverProps} style={{
              ...primaryHoverProps.style,
              width: '100%',
            }}>
              Follow the Journey
            </a>
            <a href="/aboutme" {...secondaryHoverProps} style={{
              ...secondaryHoverProps.style,
              width: '100%',
            }}>
              Meet Shannon
            </a>
          </div>
        </div>

        {/* Mobile Image Section */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '50vh', // Reduced height for better proportions
          overflow: 'hidden',
        }}>
          <img
            src="/hero.png"
            alt="Shannon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center left',
              filter: 'grayscale(100%)',
            }}
          />
          
          {/* Simple text overlay */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
          }}>
            <p style={{
              margin: 0,
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
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
      {/* Left side - Orange background with content */}
      <div
        style={{
          width: '45%', // Smaller orange section
          background: '#E67E22',
          display: 'flex',
          alignItems: 'flex-end', // Move content to bottom
          justifyContent: 'center',
          padding: '6rem 2.5rem', // Reduced side padding
          position: 'relative',
        }}
      >
        <div style={{
          width: '100%', // Take full width instead of maxWidth constraint
          color: '#fff',
          marginBottom: '2rem', // Add some space from bottom
        }}>
          {/* Main title */}
          <h1
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 'clamp(6rem, 4vw, 4rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 1,
              margin: '0 0 2rem 0',
              letterSpacing: '-0.02em',
              textAlign: 'left',
            }}
          >
            FIRST WOMAN
            <br />
            TO FLY TO
          </h1>

          {/* Animated subtitle */}
          <div style={{
            minHeight: '1.5em',
            marginBottom: '0.5rem',
          }}>
            <p style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              margin: 0,
              color: '#fff',
              transition: 'opacity 0.3s ease-in-out',
              letterSpacing: '-0.02em',
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
            opacity: 0.9,
          }}>
            in a small plane solo, unassisted
          </p>

          {/* Buttons - Desktop: Horizontal layout */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row', // Explicitly set to row for horizontal layout
              gap: '1rem',
              flexWrap: 'nowrap', // Prevent wrapping to next line
              alignItems: 'center',
            }}
          >
            <a href="#mission" {...primaryHoverProps}>
              Follow the Journey
            </a>
            <a href="/aboutme" {...secondaryHoverProps}>
              Meet Shannon
            </a>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div
        style={{
          width: '55%', // Larger image section
          position: 'relative',
          overflow: 'hidden',
          background: '#f5f5f5',
        }}
      >
        <img
          src="/her.png"
          alt="Shannon"
          style={{
            width: '130%', // Make image larger
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left center',
            filter: 'grayscale(100%) contrast(1.1)',
            transform: 'translateX(-0%) translateY(-0.5%)', // Shift more left
          }}
        />
        
        {/* Black gradient overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
            zIndex: 1,
          }}
        />
        
        {/* Text overlay on image - Simple text */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '3rem',
            right: '3rem',
            zIndex: 2,
          }}
        >
          <p style={{
            margin: 0,
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: 400, // Remove bold
            lineHeight: 1.4,
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          }}>
            Aviator, explorer, artist, technologist.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
