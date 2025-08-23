import React, { useState, useEffect, useRef } from 'react';

const ImageGridSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gridItems.length);
    }, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll to specific index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = isMobile ? container.offsetWidth / 2 : 450; // Get the width of half the container or fixed desktop width
      container.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isMobile]);

  const gridItems = [
    {
      href: '/news',
      image: '/tr.png',
      title: 'LATEST NEWS',
      description: 'Stay updated with the latest developments and announcements about Shannon\'s record-breaking journey across all seven continents.',
      buttonText: 'Read More',
      external: false
    },
    {
      href: '/blog',
      image: '/bl.png',
      title: 'BLOG',
      description: 'Follow Shannon\'s personal insights, preparations, and reflections throughout her historic aviation adventure and polar expedition.',
      buttonText: 'Visit Blog',
      external: false
    },
    {
      href: '/journey',
      image: '/r.png',
      title: 'THE JOURNEY',
      description: 'Explore the complete flight route across all 7 continents and track the mission\'s progress in real-time.',
      buttonText: 'View Route',
      external: false
    },
    {
      href: '/plane',
      image: '/pl.png',
      title: 'THE AIRCRAFT',
      description: 'Discover the specially modified aircraft that will make this historic polar expedition and world record attempt possible.',
      buttonText: 'Learn More',
      external: false
    },
    {
      href: '/videos',
      image: '/se.png',
      title: 'VIDEOS',
      description: 'Watch exclusive footage, training sessions, and behind-the-scenes content from the preparation and mission.',
      buttonText: 'Watch Now',
      external: false
    }
  ];

  const sectionStyle = {
    padding: isMobile ? '2rem 0 4rem 0' : '2rem 0 6rem 0',
    position: 'relative',
    width: '100%'
  };

  const containerStyle = {
    width: '100%',
    margin: '0 auto',
    position: 'relative'
  };

  const titleStyle = {
    fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : '2.5rem',
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: "'Outfit', sans-serif",
    marginBottom: isMobile ? '2rem' : '3rem',
    color: '#000000',
    letterSpacing: '-0.02em',
    padding: '0 1rem'
  };

  const sliderContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const scrollContainerStyle = {
    display: 'flex',
    gap: isMobile ? '1rem' : '30px', // Adds space between the cards
    overflowX: 'scroll', // Allows horizontal scrolling
    scrollSnapType: isMobile ? 'x mandatory' : 'none', // Improves the mobile swiping experience
    padding: isMobile ? '0 1rem' : '0', // Adds padding on the sides
    scrollBehavior: 'smooth',
    width: '100%',
    justifyContent: isMobile ? 'flex-start' : 'center', // Aligns cards to the start on mobile
    scrollbarWidth: 'none', // Hide scrollbar for Firefox
    '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
    WebkitOverflowScrolling: 'touch', // Improves scrolling on iOS devices
    '&::-webkit-scrollbar': {
      display: 'none' // Hide scrollbar for Chrome, Safari, and Opera
    }
  };

  const cardStyle = {
    position: 'relative',
    minWidth: isMobile ? '80vw' : '450px', // Adjusted to show one card at a time with some padding
    height: isMobile ? '400px' : '450px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexShrink: 0,
    scrollSnapAlign: 'start' // Aligns the start of the card to the scroll container's start
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
    zIndex: 1
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    padding: isMobile ? '1.5rem' : '2rem',
    color: 'white'
  };

  const cardTitleStyle = {
    fontFamily: 'Impact, Arial Black, sans-serif',
    fontSize: isMobile ? '1.3rem' : '1.5rem',
    fontWeight: 900,
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    lineHeight: 1.2
  };

  const descriptionStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight: 500,
    marginBottom: '1.5rem',
    opacity: 0.95
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#000',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: isMobile ? '0.875rem' : '1rem',
    borderRadius: '50px', // Fully rounded button
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  // Navigation button styles
  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    display: isMobile ? 'none' : 'flex', // Hide buttons on mobile for a swipe-based experience
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: '#333',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 10
  };

  const leftButtonStyle = {
    ...navButtonStyle,
    left: isMobile ? '1rem' : '2rem'
  };

  const rightButtonStyle = {
    ...navButtonStyle,
    right: isMobile ? '1rem' : '2rem'
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? gridItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gridItems.length);
  };

  const handleCardHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.transform = 'scale(1.02)';
      e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2)';
    } else {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
  };

  const handleButtonHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.backgroundColor = 'white';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = 'none';
    }
  };

  const handleNavButtonHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.backgroundColor = '#f8f9fa';
      e.target.style.transform = 'translateY(-50%) scale(1.1)';
      e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    } else {
      e.target.style.backgroundColor = 'white';
      e.target.style.transform = 'translateY(-50%) scale(1)';
      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
  };

  // Show all cards in the scroll container
  const visibleCards = gridItems;
  
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <div style={{
          display: isMobile ? 'block' : 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 4rem',
          marginBottom: isMobile ? '2rem' : '3rem'
        }}>
          {/* Left side - Title and Description */}
          <div style={{
            flex: isMobile ? 'none' : '1',
            marginRight: isMobile ? '0' : '2rem'
          }}>
            <h2 style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              fontSize: isMobile ? 'clamp(2.5rem, 12vw, 6rem)' : '4rem',
              color: '#000000',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              margin: 0,
              marginTop: '4rem',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              MUCH MORE<br />
              THAN A JOURNEY
            </h2>
            
            <p style={{
              fontSize: '0.875rem',
              lineHeight: 1.6,
              fontWeight: '500',
              color: '#374151',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              {isMobile ? (
                // Mobile: natural text wrapping
                "Follow Shannon's record-breaking aviation adventure across all seven continents, featuring exclusive content, real-time updates, and behind-the-scenes access to this historic polar expedition."
              ) : (
                // Desktop: manual line breaks
                <>
                  Follow Shannon's record-breaking aviation adventure across
                  <br />all seven continents, featuring exclusive content, real-time
                  <br />updates, and behind-the-scenes access to this historic
                  <br />polar expedition.
                </>
              )}
            </p>
          </div>

          {/* Right side - Logos */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? '1.5rem' : '6rem',
            marginTop: isMobile ? '2rem' : '0',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <img 
              src="/agnav.png" 
              alt="AG Nav Logo"
              style={{
                height: isMobile ? '60px' : '80px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          
          </div>
        </div>
        
        <div style={sliderContainerStyle}>
          {/* Left Navigation Button */}
          <button 
            style={leftButtonStyle}
            onClick={handlePrevious}
            onMouseEnter={(e) => handleNavButtonHover(e, true)}
            onMouseLeave={(e) => handleNavButtonHover(e, false)}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Right Navigation Button */}
          <button 
            style={rightButtonStyle}
            onClick={handleNext}
            onMouseEnter={(e) => handleNavButtonHover(e, true)}
            onMouseLeave={(e) => handleNavButtonHover(e, false)}
            aria-label="Next"
          >
            ›
          </button>

          <div 
            ref={scrollContainerRef}
            style={scrollContainerStyle}
          >
            {visibleCards.map((item, index) => (
              <a 
                key={`${item.title}-${index}`}
                href={item.href}
                style={{ textDecoration: 'none' }}
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <div 
                  style={{
                    ...cardStyle,
                    backgroundImage: `url(${item.image})`
                  }}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div style={overlayStyle}></div>
                  <div style={contentStyle}>
                    <h3 style={cardTitleStyle}>{item.title}</h3>
                    <p style={descriptionStyle}>{item.description}</p>
                    <span 
                      style={buttonStyle}
                      onMouseEnter={(e) => handleButtonHover(e, true)}
                      onMouseLeave={(e) => handleButtonHover(e, false)}
                    >
                      {item.buttonText}
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '2rem'
        }}>
          {gridItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentIndex ? '#333' : 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGridSection;
