import React, { useState, useEffect } from 'react';

const PartnersPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const productSponsors = [
    {
      name: "AG-NAV",
      logo: "/agnav.png",
      description: "Leading provider of precision GPS navigation and flow control systems, trusted for aerial geophysical surveys and extreme environment missions like Antarctica.",
      website: "https://www.agnav.com/",
    },
    {
      name: "Prepare2Go",
      logo: "/prepare2go.png",
      description: "Prepare2go (the family business) specialises in ferry flying and long distance flight support. It’s what we do, all day, every day since 2008.",
      website: "https://prepare2go.com",
    },
    {
      name: "Iridium Communications",
      logo: "/iridium.png",
      description: "Iridium® is the only mobile voice and data satellite communications network that spans the entire globe, enabling connections in real time.",
      website: "https://iridium.com",
    },
    {
      name: "YB Tracking",
      logo: "/ybtracking.png",
      description: "YB Tracking provides satellite tracking services for global races and expeditions. Their two-way devices also allow messaging.",
      website: "https://ybtracking.com",
    },
    {
      name: "White Rose Aviation",
      logo: "/whiterose.png",
      description: "White Rose Aviation specialises in flight clearances all around the world.",
      website: "https://whiteroseaviation.com",
    },
    {
      name: "TurtlePac",
      logo: "/turtlepac.png",
      description: "Home of tough bladder tanks for aircraft and boats.",
      website: "https://turtlepac.com",
    },
  ];

  // Sample science partners, add your real ones here
  const sciencePartners = [
    {
      name: "UNIVERSITY OF COLARADO BOULDER/CIRES",
      logo: "/uc.png",
      description: "The Cooperative Institute for Research In Environmental Sciences (CIRES) is a leading research institute specializing in atmospheric and Earth system science, partnered with NOAA and CU Boulder. They advance vital climate and environmental research for global impact.",
      website: "https://cires.colorado.edu",
    },
    {
      name: "Antarctic Research Center",
      logo: "/antarctic.png",
      description: "Leading polar research institution studying Antarctic ice sheet dynamics and environment.",
      website: "https://www.antarctic-research.org",
    },
    {
      name: "Climate Science Initiative",
      logo: "/climate.png",
      description: "Driving innovation in climate science through global data and expedition partnerships.",
      website: "https://www.climatescience.org",
    },
  ];

  const impactFont = `'Impact', 'Arial Black', sans-serif`;
  const bodyFont = `'Arial', sans-serif`;

  const sectionStyle = {
    padding: isMobile ? '2rem 1rem' : '4rem',
    backgroundColor: '#fff',
  };

  const sectionTitleStyle = {
    fontFamily: impactFont,
    fontSize: isMobile ? '2.5rem' : '3rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: '#000',
    marginBottom: '2rem',
    textAlign: 'center',
  };

  const partnersGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const partnerCardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: bodyFont,
  };

  const partnerNameStyle = {
    fontFamily: impactFont,
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#000',
    marginBottom: '1rem',
  };

  const partnerLogoStyle = {
    width: '200px',
    height: 'auto',
    objectFit: 'contain',
    marginBottom: '1rem',
  };

  const partnerDescriptionStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight:'500',
    fontFamily: "'Outfit', sans-serif",

    color: '#374151',
    textAlign: 'left',
    marginBottom: '2rem'
  };

  // Updated button style - gold color
  const learnMoreButtonStyle = {
    backgroundColor: '#D4AF37', // Gold
    color: '#000',
    fontFamily: bodyFont,
    fontWeight: 'bold',
    fontSize: '0.9rem',
    padding: '0.6rem 1.4rem',
    borderRadius: '999px',
    textDecoration: 'none',
    letterSpacing: '0.05em',
    transition: 'background-color 0.3s ease',
  };

  // Optional: button hover effect
  const learnMoreButtonHoverStyle = {
    backgroundColor: '#b7972a',
  };

  const renderPartnerSection = (title, partners) => (
    <div style={sectionStyle}>
      <h2 style={sectionTitleStyle}>{title}</h2>
      <div style={partnersGridStyle}>
        {partners.map((partner, index) => (
          <div key={index} style={partnerCardStyle}>
            <h3 style={partnerNameStyle}>{partner.name}</h3>
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              style={partnerLogoStyle}
            />
            <p style={partnerDescriptionStyle}>{partner.description}</p>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              style={learnMoreButtonStyle}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b7972a'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#D4AF37'}
            >
              FIND OUT MORE
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', backgroundColor: '#ffffff' }}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '50vh' : '70vh',
        minHeight: '400px',
        backgroundImage: 'url("/open.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: isMobile ? '0 1rem' : '0 4rem'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          maxWidth: '800px'
        }}>
          <h1 style={{
            fontFamily: impactFont,
            fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : '4rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: '1rem',
            lineHeight: 1
          }}>
            Impact Partners
          </h1>
          <p style={{
    fontFamily: "'Outfit', sans-serif",
    fontSize: isMobile ? '1rem' : '1.25rem',
            lineHeight: 1.6,
            fontWeight: 400,
            maxWidth: '600px'
          }}>
            Be part of a mission to inspire and empower the next generation.
          </p>
        </div>
      </div>

      {renderPartnerSection("Product Sponsors", productSponsors)}

      {renderPartnerSection("Science Partners", sciencePartners)}
    </div>
  );
};

export default PartnersPage;
