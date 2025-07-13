import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Preload all Earth texture images
    const imageUrls = [
      'https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg',
      'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
      'https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg'
    ];

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true); // Still show even if some images fail
        }
      };
      img.src = url;
    });

    // Only start the timer after images are loaded
    let timer;
    if (imagesLoaded) {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [imagesLoaded]);

  if (!isLoading) return null;

  const loadingStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#000000',
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 1.5s ease-in-out',
    padding: isMobile ? '1rem' : '0'
  };

  const logoAnimationStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: isMobile ? '2rem' : '3rem',
    textAlign: 'center'
  };

  const logoTextStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : '4rem',
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    marginBottom: isMobile ? '1rem' : '2rem'
  };

  const planetContainerStyle = {
    borderRadius: '50%',
    boxShadow: isMobile 
      ? '3px -2px 15px 3px #5e90f1' 
      : '5px -3px 20px 5px #5e90f1',
    height: isMobile ? '200px' : '300px',
    overflow: 'hidden',
    position: 'relative',
    width: isMobile ? '200px' : '300px',
    zIndex: 1,
    opacity: imagesLoaded ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out'
  };

  const nightStyle = {
    animation: 'rotate-night 80s linear infinite',
    backgroundImage: 'url(https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg)',
    backgroundSize: '200%',
    height: isMobile ? '200px' : '300px',
    position: 'absolute',
    width: isMobile ? '200px' : '300px',
    zIndex: 2
  };

  const dayStyle = {
    animation: 'rotate-day 80s linear infinite',
    backgroundImage: 'url(https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg)',
    backgroundSize: '200%',
    borderLeft: 'solid 1px black',
    borderRadius: '50%',
    boxShadow: isMobile 
      ? '2px 0 8px 4px #040615 inset' 
      : '3px 0 12px 6px #040615 inset',
    height: isMobile ? '200px' : '300px',
    marginLeft: isMobile ? '44px' : '66px',
    position: 'absolute',
    width: isMobile ? '200px' : '300px',
    zIndex: 3
  };

  const cloudsStyle = {
    animation: 'rotate-day 50s linear infinite, spin-clouds 100s ease infinite',
    backgroundImage: 'url(https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg)',
    backgroundSize: '200%',
    borderRadius: '50%',
    boxShadow: isMobile
      ? '2px 0 8px 4px #040615 inset, -3px 0px 8px 4px #5e90f1 inset'
      : '3px 0 12px 6px #040615 inset, -5px 0px 12px 6px #5e90f1 inset',
    height: isMobile ? '200px' : '300px',
    marginLeft: isMobile ? '40px' : '60px',
    opacity: 0.45,
    position: 'absolute',
    width: isMobile ? '200px' : '300px',
    zIndex: 4
  };

  const innerShadowStyle = {
    background: 'transparent',
    borderRadius: '50%',
    boxShadow: isMobile
      ? '-2px 0 4px 1px #152b57 inset, 2px 0 4px 1px #040615 inset'
      : '-3px 0 6px 1px #152b57 inset, 3px 0 6px 1px #040615 inset',
    height: isMobile ? '200px' : '300px',
    marginLeft: '0',
    position: 'absolute',
    width: isMobile ? '200px' : '300px',
    zIndex: 5
  };

  const loadingSpinnerStyle = {
    width: isMobile ? '200px' : '300px',
    height: isMobile ? '200px' : '300px',
    borderRadius: '50%',
    border: '4px solid #333',
    borderTop: '4px solid #5e90f1',
    animation: 'spin 1s linear infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const loadingTextStyle = {
    color: '#fff',
    fontSize: isMobile ? '12px' : '14px',
    fontFamily: "'Outfit', sans-serif",
    textAlign: 'center'
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes rotate-day {
          0% { background-position: 120% 0; }
          100% { background-position: -80% 0; }
        }
        
        @keyframes rotate-night {
          0% { background-position: calc(120% + ${isMobile ? '48px' : '72px'}) 0; }
          100% { background-position: calc(-80% + ${isMobile ? '48px' : '72px'}) 0; }
        }
        
        @keyframes spin-clouds {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div style={loadingStyle}>
        <div style={logoAnimationStyle}>
          <span style={{
            ...logoTextStyle,
            animation: 'slideIn 2s ease-out 0.3s forwards',
            opacity: 0
          }}>
            GIRLFLIESWORLD
          </span>
          
         
          
          {/* Earth animation - only show when images are loaded */}
          <div style={planetContainerStyle}>
            <div style={nightStyle}></div>
            <div style={dayStyle}></div>
            <div style={cloudsStyle}></div>
            <div style={innerShadowStyle}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
