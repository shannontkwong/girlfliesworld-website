import React, { useState, useEffect } from 'react';
import FlightSchedule from '../components/journey/FlightSchedule';
import Footer from '../components/layout/Footer';
import JourneyTradingCards from '../components/journey/JourneyTradingCards';

// Main Journey Page Component
const JourneyPage = () => {
  const [activeSection, setActiveSection] = useState('route');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { id: 'route', label: 'Flight Route' },
    { id: 'schedule', label: 'Flight Schedule' },
    { id: 'trading-cards', label: 'Trading Cards' },
    { id: 'preparation', label: 'Preparation' },
    { id: 'challenges', label: 'Challenges Ahead' },
    { id: 'progress', label: 'Live Progress' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close mobile sidebar after selection
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = isMobile ? 60 : 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Styles
  const pageStyle = {
    paddingTop: isMobile ? '60px' : '80px',
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fff'
  };

  const sidebarStyle = {
    width: isMobile ? '280px' : '280px',
    backgroundColor: '#51D37C',
    position: 'fixed',
    left: isMobile ? (sidebarOpen ? '0' : '-280px') : '0',
    top: isMobile ? '60px' : '80px',
    height: 'calc(100vh - 80px)',
    padding: '2rem 0',
    overflowY: 'auto',
    zIndex: 1000,
    transition: 'left 0.3s ease',
    boxShadow: isMobile ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    display: isMobile && sidebarOpen ? 'block' : 'none'
  };

  const mobileMenuButtonStyle = {
    position: 'fixed',
    top: isMobile ? '70px' : '90px',
    left: '1rem',
    zIndex: 1001,
    backgroundColor: '#51D37C',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: isMobile ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease'
  };

  const mainContentStyle = {
    marginLeft: isMobile ? '0' : '280px',
    flex: 1,
    padding: isMobile ? '1rem' : '2rem 3rem',
    backgroundColor: '#fff',
    width: isMobile ? '100%' : 'calc(100% - 280px)'
  };

  const navigationItemStyle = (isActive) => ({
    display: 'block',
    padding: '1rem 2rem',
    color: isActive ? '#fff' : '#000',
    textDecoration: 'none',
    fontSize: isActive ? (isMobile ? '0.95rem' : '1rem') : (isMobile ? '0.85rem' : '0.9rem'),
    fontWeight: isActive ? '700' : '500',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : 'transparent'
  });

  const sectionStyle = {
    marginBottom: isMobile ? '3rem' : '4rem',
    paddingBottom: isMobile ? '1.5rem' : '2rem'
  };

  const titleStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : '3.5rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: '#000',
    marginBottom: isMobile ? '1.5rem' : '2rem',
    lineHeight: 1.1,
    marginTop: '3rem',
    letterSpacing: '-0.02em',
    textAlign: 'center',
    padding: isMobile ? '0 0.5rem' : '0'
  };

  const sectionTitleStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? 'clamp(1.3rem, 5vw, 1.8rem)' : '2.2rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: '#000',
    marginBottom: '1.5rem',
    textAlign: isMobile ? 'center' : 'left'
  };

  const paragraphStyle = {
    fontSize: isMobile ? '0.8rem' : '0.875rem',
    lineHeight: 1.6,
    fontWeight: '500',
    color: '#374151',
    textAlign: isMobile ? 'center' : 'left',
    marginBottom: '1.5rem',
    maxWidth: '800px',
    margin: '0 auto 1.5rem',
    padding: isMobile ? '0 0.5rem' : '0'
  };

  const imageStyle = {
    width: '100%',
    maxWidth: isMobile ? '100%' : '900px',
    height: 'auto',
    borderRadius: isMobile ? '8px' : '10px',
    margin: '0 auto 3rem',
    display: 'block',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    padding: isMobile ? '0 0.5rem' : '0'
  };

  const progressGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: isMobile ? '1.5rem' : '2rem',
    marginBottom: '2rem'
  };

  const progressCardStyle = {
    backgroundColor: '#f8f9fa',
    padding: isMobile ? '1.5rem' : '2rem',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    textAlign: 'center'
  };

  const progressStatStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? '1.5rem' : '2rem',
    fontWeight: 900,
    marginBottom: '0.5rem'
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        style={mobileMenuButtonStyle}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        onMouseEnter={(e) => {
          if (!isMobile) return;
          e.target.style.transform = 'scale(1.1)';
          e.target.style.backgroundColor = '#45c46e';
        }}
        onMouseLeave={(e) => {
          if (!isMobile) return;
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = '#51D37C';
        }}
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      <div 
        style={overlayStyle}
        onClick={() => setSidebarOpen(false)}
      />

      <div style={pageStyle}>
        {/* Sidebar Navigation */}
        <nav style={sidebarStyle}>
          {/* Close button for mobile */}
          {isMobile && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: '#000',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 1002
            }}
            onClick={() => setSidebarOpen(false)}
            >
              ×
            </div>
          )}
          
          {navigationItems.map((item) => (
            <div
              key={item.id}
              style={navigationItemStyle(activeSection === item.id)}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </div>
          ))}
        </nav>

        {/* Main Content */}
        <main style={mainContentStyle}>
          {/* Hero Section */}
          <section id="route" style={sectionStyle}>
            <h1 style={titleStyle}>Shannon's Journey Around the World</h1>
            <p style={{ ...paragraphStyle, textAlign: 'center', fontSize: isMobile ? '0.9rem' : '1rem', marginBottom: '2rem' }}>
              My goal is to fly around the world solo, which includes flying across the entire Antarctic continent, unassisted. I have chosen a route that crosses all 7 continents, large oceans, as well as the entirety of the Antarctic continent – a route that has rarely been successful before in a small plane.
            </p>
            <p style={{ ...paragraphStyle, textAlign: 'center', fontSize: isMobile ? '0.9rem' : '1rem', marginBottom: '3rem' }}>
              To qualify for the GWR, I must land or overfly the South Pole successfully and touch all continents.
            </p>
            <div style={{ padding: isMobile ? '0 0.5rem' : '0' }}>
              <img 
                style={imageStyle}
                src='/routes.png'
                alt="Shannon's Flight Route Map"
                onMouseEnter={(e) => {
                  if (!isMobile) e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) e.target.style.transform = 'scale(1)';
                }}
              />
            </div>
          </section>

          {/* Flight Schedule Section */}
          <section id="schedule" style={sectionStyle}>
            <FlightSchedule />
          </section>

          {/* Trading Cards Section */}
          <section id="trading-cards" style={sectionStyle}>
            <JourneyTradingCards />
          </section>

          {/* Preparation Section */}
          <section id="preparation" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>
              Preparation & Training
            </h2>
            <p style={paragraphStyle}>
              This journey requires extensive preparation including winter survival training, aircraft modifications for extreme conditions, and comprehensive flight planning. Shannon has completed survival courses in Norwegian mountains, pulling 50kg sleds in -15°C weather to prepare for potential emergency situations over Antarctica.
            </p>
          </section>

          {/* Challenges Section */}
          <section id="challenges" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>
              Challenges Ahead
            </h2>
            <p style={paragraphStyle}>
              The journey presents unprecedented challenges including extreme weather conditions, limited fuel stops over vast oceans, navigation through polar regions, and the technical demands of flying a small aircraft across all seven continents. Each leg of the journey has been carefully planned to account for weather windows, fuel capacity, and emergency procedures.
            </p>
          </section>

          {/* Live Progress Section */}
          <section id="progress" style={sectionStyle}>
            <h2 style={sectionTitleStyle}>
              Live Progress Tracking
            </h2>
            <div style={progressCardStyle}>
              <div style={progressGridStyle}>
                <div>
                  <h3 style={{
                    ...progressStatStyle,
                    color: '#10b981'
                  }}>
                    0%
                  </h3>
                  <p style={{ 
                    ...paragraphStyle, 
                    margin: 0, 
                    textAlign: 'center',
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}>
                    Journey Complete
                  </p>
                </div>
                <div>
                  <h3 style={{
                    ...progressStatStyle,
                    color: '#ec4899'
                  }}>
                    0/7
                  </h3>
                  <p style={{ 
                    ...paragraphStyle, 
                    margin: 0, 
                    textAlign: 'center',
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}>
                    Continents Visited
                  </p>
                </div>
                <div>
                  <h3 style={{
                    ...progressStatStyle,
                    color: '#3b82f6'
                  }}>
                    0 km
                  </h3>
                  <p style={{ 
                    ...paragraphStyle, 
                    margin: 0, 
                    textAlign: 'center',
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }}>
                    Distance Flown
                  </p>
                </div>
              </div>
              <div style={{
                backgroundColor: '#e5e7eb',
                height: isMobile ? '15px' : '20px',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                <div style={{
                  backgroundColor: '#10b981',
                  height: '100%',
                  width: '0%',
                  borderRadius: '10px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <p style={{ 
                ...paragraphStyle, 
                margin: 0, 
                textAlign: 'center', 
                fontStyle: 'italic',
                fontSize: isMobile ? '0.8rem' : '0.875rem'
              }}>
                Journey begins October 2026. Follow along for real-time updates!
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* Footer positioned outside main content for full width */}
      <Footer />
    </>
  );
};

export default JourneyPage;
