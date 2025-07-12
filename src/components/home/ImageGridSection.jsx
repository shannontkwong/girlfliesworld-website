import React, { useState, useEffect } from 'react';

const ImageGridSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridItems = [
    {
      href: '/news',
      image: '/news.png',
      alt: 'Latest News',
      external: true
    },
    {
      href: 'https://gfwblog.weebly.com',
      image: '/blogs.png',
      alt: 'Blog',
      external: true
    },
    {
      href: '/journey',
      image: '/journey.png',
      alt: 'Journey',
      external: false
    },
    {
      href: '/plane',
      image: '/plane.png',
      alt: 'The Plane',
      external: false
    },
    {
      href: '/videos',
      image: '/videos.png',
      alt: 'Videos',
      external: true
    }
  ];

  const sectionStyle = {
    padding: isMobile ? '2rem 1rem 4rem 1rem' : '2rem 2rem 6rem 2rem'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : '2.5rem',
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: "'Outfit', sans-serif",
    marginBottom: isMobile ? '2rem' : '3rem',
    color: '#000000',
    letterSpacing: '-0.02em'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile 
      ? 'repeat(auto-fit, minmax(280px, 1fr))' 
      : 'repeat(5, 1fr)',
    gap: isMobile ? '1.5rem' : '2rem',
    justifyContent: 'center',
    maxWidth: '1300px',
    margin: '0 auto 4rem auto',
  };

  const gridItemStyle = {
    position: 'relative',
    height: isMobile ? '380px' : '200px',
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: '#f8f8f8',
    textDecoration: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '8px',
    cursor: 'pointer'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const handleImageError = (e) => {
    e.target.parentElement.style.background = '#f0f0f0';
  };

  const handleItemHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
      e.currentTarget.style.zIndex = '10';
    } else {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.zIndex = '1';
    }
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          <span style={{
            color: 'black',
            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : '3rem',
            marginRight: 8,
            fontFamily: "'Great Vibes', cursive",
          }}>
            Explore
          </span>{' '}
          the Mission
        </h2>
        
        <div style={gridStyle}>
          {gridItems.map((item, index) => {
            const content = (
              <div 
                style={gridItemStyle}
                onMouseEnter={(e) => handleItemHover(e, true)}
                onMouseLeave={(e) => handleItemHover(e, false)}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  style={imageStyle}
                  onError={handleImageError}
                />
              </div>
            );

            return item.external ? (
              <a 
                key={index} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'none' }}
              >
                {content}
              </a>
            ) : (
              <a 
                key={index} 
                href={item.href} 
                style={{ textDecoration: 'none' }}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageGridSection;
