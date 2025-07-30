import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StatsSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageError = (imagePath) => {
    console.log('Image failed to load:', imagePath);
    setImageErrors(prev => ({ ...prev, [imagePath]: true }));
  };

  const handleImageLoad = (imagePath) => {
    console.log('Image loaded successfully:', imagePath);
    setImageLoaded(prev => ({ ...prev, [imagePath]: true }));
    setImageErrors(prev => ({ ...prev, [imagePath]: false }));
  };

  const sections = [
    {
      title: 'ENDURANCE',
      image: '/cd.png', // Replace with your actual image path
      stats: [
        { label: 'FLIGHT ENDURANCE', value: '24+', unit: 'hrs nonstop' },
        { label: 'LONGEST LEG', value: '4,000', unit: 'NM travelled' },
        { label: 'TOTAL DISTANCE', value: '76,000', unit: 'km travelled' },
        { label: 'POLAR COLD', value: '-50°C', unit: 'harshest environments' },
        { label: 'CO-PILOTS', value: '0', unit: 'solo, unassisted' },
      ],
    },
    {
      title: 'EXPLORATION',
      image: '/m.png', // Replace with your actual image path
      stats: [
        { label: 'CONTINENTS', value: '7', unit: 'all land masses' },
        { label: 'NATIONS', value: '50+', unit: 'cross-cultural journey' },
        { label: 'EXTREME LATITUDES', value: '2', unit: 'Greenland & Antarctica' },
        { label: 'HORIZONS', value: '∞', unit: 'expanding the known' },
      ],
    },
    {
      title: 'OVERVIEW',
      image: '/prop.png', // Replace with your actual image path
      stats: [
        { label: 'MISSION YEAR', value: '2026', unit: '' },
        { label: 'AGE', value: '19', unit: 'years old' },
        { label: 'ACHIEVEMENT', value: '1st', unit: 'Woman to Fly Solo to South Pole' },
        { label: 'IMPACT', value: 'International', unit: 'Breaking barriers in STEM' },
      ],
    },
  ];

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const goToSection = (index) => {
    setCurrentSection(index);
  };

  return (
    <section className="stats-section" style={{
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '4rem', // Added top padding
    }}>
      {/* Main Content */}
      <div className="stats-main-content" style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        minHeight: '80vh',
      }}>
        {/* Left Side - Stats */}
        <div className="stats-left-content" style={{
          paddingRight: '2rem',
        }}>
          {/* Title */}
          <h1 className="stats-title" style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            margin: '0 0 3rem 0',
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}>
            {sections[currentSection].title}
          </h1>

          {/* Description */}
          <p className="stats-description" style={{
             fontSize: '0.875rem',
             lineHeight: 1.6,
             fontWeight:'500',
         
             fontWeight:'500',
             textAlign: 'left',
             marginBottom: '1.5rem'
          }}>
            {sections[currentSection].title === 'ENDURANCE' && 
              "Extreme conditions and solo flights that test the limits of human endurance and aircraft capability in the world's most challenging environments."
            }
            {sections[currentSection].title === 'EXPLORATION' && 
              "A global journey spanning continents and cultures, pushing the boundaries of what's possible in small aircraft aviation."
            }
            {sections[currentSection].title === 'OVERVIEW' && 
              "Breaking barriers and setting new records in aviation history. Shannon's mission represents the pinnacle of human achievement and determination."
            }
          </p>

          {/* Stats Table */}
          <div style={{
            borderTop: '1px solid #333',
          }}>
            {sections[currentSection].stats.map((stat, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem 0',
                borderBottom: '1px solid #333',
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
                <div style={{
                  textAlign: 'right',
                }}>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#888',
                    marginTop: '0.25rem',
                  }}>
                    {stat.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="stats-image-container" style={{
          position: 'relative',
          height: '70vh',
          maxHeight: '600px',
          overflow: 'hidden',
          borderRadius: '8px',
          background: imageErrors[sections[currentSection].image] 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {!imageErrors[sections[currentSection].image] ? (
            <img
              key={sections[currentSection].image} // Force re-render when image changes
              src={sections[currentSection].image}
              alt={sections[currentSection].title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.8) contrast(1.1)',
                display: imageLoaded[sections[currentSection].image] ? 'block' : 'none',
              }}
              onError={() => handleImageError(sections[currentSection].image)}
              onLoad={() => handleImageLoad(sections[currentSection].image)}
            />
          ) : (
            <div style={{
              color: '#ffffff',
              fontSize: '1.2rem',
              textAlign: 'center',
              padding: '2rem',
              fontWeight: 600,
            }}>
              {sections[currentSection].title} IMAGE
              <br />
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                Image not found: {sections[currentSection].image}
              </span>
            </div>
          )}
          
          {/* Loading state */}
          {!imageLoaded[sections[currentSection].image] && !imageErrors[sections[currentSection].image] && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #333 0%, #555 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1rem',
            }}>
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="stats-nav-arrow"
        onClick={prevSection}
        style={{
          position: 'absolute',
          left: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronLeft size={24} color="#ffffff" />
      </button>

      <button
        className="stats-nav-arrow"
        onClick={nextSection}
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        <ChevronRight size={24} color="#ffffff" />
      </button>

      {/* Dot Navigation */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '1rem',
      }}>
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: index === currentSection ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Scope all styles to this specific stats section only */
          .stats-section {
            padding: 2rem 0 !important;
          }
          
          .stats-section .stats-main-content {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 0 2rem !important;
          }
          
          .stats-section .stats-left-content {
            padding-right: 0 !important;
          }
          
          .stats-section .stats-title {
            font-size: clamp(2.5rem, 8vw, 4rem) !important;
            margin-bottom: 2rem !important;
          }
          
          .stats-section .stats-description {
            margin-bottom: 2rem !important;
          }
          
          .stats-section .stats-image-container {
            height: 50vh !important;
            max-height: 400px !important;
          }
          
          .stats-section .stats-nav-arrow {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
