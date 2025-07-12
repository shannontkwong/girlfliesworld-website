import React from 'react';

const StatsSection = () => {
  const backgroundImageUrl = '/ice.jpg'; // Replace with your image path

  const sectionStyle = {
    position: 'relative',
    padding: '5rem 2rem',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
    color: '#111',
    fontFamily: "'Outfit', sans-serif",
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.15, // Adjust to control fade
    zIndex: 0,
    pointerEvents: 'none', // Prevent interference with clicks
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 1,
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#222',
  };

  const gridStyle = {
    maxWidth: '1200px',
    margin: '0 auto 4rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
  };

  const cardStyle = {
    backgroundColor: '#ffffffee',
    borderRadius: '1.25rem',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    textAlign: 'center',
  };

  const topTextStyle = {
    fontSize: '2rem',
    fontWeight: 600,
    color: '#1e3a8a',
  };

  const bottomTextStyle = {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#111827',
    marginTop: '0.3rem',
  };

  const subTextStyle = {
    fontSize: '0.95rem',
    fontWeight: 400,
    color: '#6b7280',
    marginTop: '1rem',
  };

  const sections = [
    {
      title: 'STATS',
      stats: [
        { titleTop: '2026', titleBottom: 'Mission Year', subtext: 'Launching the Antarctic science expedition' },
        { titleTop: '19', titleBottom: 'Years Old', subtext: 'Solo pilot and founder' },
        { titleTop: '1st', titleBottom: 'Woman to Fly Solo to South Pole', subtext: 'Changing what’s possible in history and STEM' },
      ],
    },
    {
      title: 'EXPLORATION',
      stats: [
        { titleTop: '7', titleBottom: 'Continents', subtext: 'Global mission spanning all land masses' },
        { titleTop: '50+', titleBottom: 'Nations', subtext: 'Cross-cultural journey of unity and discovery' },
        { titleTop: '2', titleBottom: 'Extreme Latitudes', subtext: 'Scientific Expedition in Greenland & Antarctica' },
        { titleTop: '∞', titleBottom: 'Horizons', subtext: 'Exploring the unknown to expand the known' },
      ],
    },
    {
      title: 'ENDURANCE',
      stats: [
        { titleTop: '24+ Hrs', titleBottom: 'Flight Endurance', subtext: 'Nonstop legs over oceans and ice' },
        { titleTop: '76,000 KM', titleBottom: 'Distance Travelled', subtext: 'Nonstop flying, limited rests' },
        { titleTop: '-50°C', titleBottom: 'Polar Cold', subtext: 'Navigating the world’s harshest environments' },
        { titleTop: '0', titleBottom: 'Co-Pilots', subtext: 'Solo, unassisted, and fearless' },
      ],
    },
  ];

  return (
    <section style={sectionStyle}>
      <div style={backgroundStyle}></div>

      <div style={contentWrapperStyle}>
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 style={sectionTitleStyle}>{section.title}</h2>
            <div style={gridStyle}>
              {section.stats.map((stat, index) => (
                <div key={index} style={cardStyle}>
                  <div>
                    <div style={topTextStyle}>{stat.titleTop}</div>
                    <div style={bottomTextStyle}>{stat.titleBottom}</div>
                  </div>
                  <div style={subTextStyle}>{stat.subtext}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
