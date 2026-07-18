import React, { useState, useEffect } from 'react';

const WhyThisMattersSection = () => {
  const [showAllSections, setShowAllSections] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gold = '#FFAA00';
  const impact = `'Impact', 'Arial Black', sans-serif`;
  const outfit = `'Outfit', sans-serif`;

  const sectionStyle = {
    padding: isMobile ? '3rem 1.25rem 4rem' : '5rem 4rem 6rem',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  const headingTitleStyle = {
    fontFamily: impact,
    fontSize: isMobile ? '3rem' : '6rem',
    fontWeight: 900,
    color: '#000',
    textTransform: 'uppercase',
    textAlign: 'left',
    marginBottom: '1.5rem',
    lineHeight: 0.95,
    letterSpacing: '-0.02em',
  };

  const textStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.7,
    fontWeight: 500,
    color: '#374151',
    textAlign: 'left',
    marginBottom: '1.5rem',
    fontFamily: outfit,
  };

  const sectionParagraphStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.7,
    fontWeight: 500,
    color: '#374151',
    textAlign: 'left',
    marginBottom: '2rem',
    fontFamily: outfit,
  };

  const inlineTitleStyle = {
    fontFamily: impact,
    fontSize: '1rem',
    fontWeight: 900,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const toggleButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  };

  const chevronButtonStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '2px solid #C4A678',
    backgroundColor: 'white',
    color: '#C4A678',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(196, 166, 120, 0.2)',
  };

  const chevronButtonHoverStyle = {
    backgroundColor: '#C4A678',
    color: 'white',
    transform: 'scale(1.1)',
  };

  const highlightKeyWords = (text) => {
    const keyWords = [
      'transformative', 'young', 'daring', 'boundaries', 'possible', 'Kennedy',
      'courage', 'bold', 'polar regions', 'climate research', 'urgent',
      'environmental change', 'scientists', 'satellite', 'young people', 'dreams',
      'passion', 'extraordinary', 'catalyst', 'educational philosophy', 'sciences',
      'liberal arts', 'humanities', 'curiosity', 'determination',
    ];
    let highlighted = text;
    keyWords.forEach(word => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      highlighted = highlighted.replace(regex, `<span style="color:#C4A678;font-weight:600;">$1</span>`);
    });
    return highlighted;
  };

  const fourSections = [
    {
      title: 'EXPLORATION',
      text: 'Every flight into the unknown pushes the boundaries of what\'s possible. As President Kennedy once said, "When we were young, we weren\'t sure whether we could climb over the wall, so we threw our hats over first—then we knew we had to follow." History shows us that transformative change often comes from the young and daring—a young monk who began the Protestant Reformation, a young general who extended an empire from Macedonia to the borders of the earth, a young Italian explorer who discovered the New World, and a 32-year-old Thomas Jefferson who proclaimed that all men are created equal. "Give me a place to stand," said Archimedes, "and I will move the world." Today, that place to stand is in the cockpit of a small aircraft, proving that the greatest adventures aren\'t reserved for a select few, but for anyone bold enough to throw their hat over the wall first.',
    },
    {
      title: 'CLIMATE SCIENCE',
      text: 'The polar regions hold the keys to our planet\'s future, yet they remain among the most challenging places to study. By flying precision scientific instruments over Antarctica and Greenland\'s rapidly changing ice sheets, we\'re gathering critical atmospheric and glacial data that satellites alone cannot capture. This isn\'t just adventure—it\'s urgent climate research happening at the frontlines of environmental change. Every data point collected from these remote regions could help scientists better understand ice sheet dynamics, sea level rise, and atmospheric patterns that affect weather systems worldwide. When exploration meets science, we don\'t just push personal boundaries—we advance human knowledge at the moment when our planet needs it most.',
    },
    {
      title: 'YOUTH EMPOWERMENT',
      text: 'Too many young people are told to wait their turn, to be realistic, to follow conventional paths. But history\'s greatest achievements came from those who refused to accept age as a barrier to greatness. When a young person attempts what no woman has ever done, it sends a powerful message to every dreamer watching: your age is not your limitation—your courage is your catalyst. This mission proves that passion, preparation, and persistence matter more than years of experience. We\'re not just breaking aviation records; we\'re breaking the myth that youth must wait for permission to pursue the extraordinary. Your dreams aren\'t too big, you\'re not too young, and the world needs what only you can contribute.',
    },
    {
      title: 'EDUCATIONAL REFORM',
      text: 'Traditional education too often separates science from storytelling, adventure from academia, theory from practice. But the most pressing challenges we face—from climate change to space exploration—require both analytical thinking and creative problem-solving, both technical precision and bold imagination. This expedition embodies the educational philosophy I believe in: blending the sciences with liberal arts and humanities. Real learning happens when curiosity meets courage, when theoretical knowledge transforms into lived experience, when the classroom extends to the cockpit and beyond. One person\'s journey across seven continents can teach us more about geography, meteorology, human resilience, and the power of determination than any textbook alone.',
    },
  ];

  const educationPartners = [
    {
      name: 'Estes Rockets',
      logo: '/estes.png',
      label: 'Estes Rockets',
      role: 'Official Education Partner',
    },
    {
      name: 'Reach the World',
      logo: '/rtw.png',
      label: 'Reach the World',
      role: 'Official Education Partner',
    },
  ];

  const partnerBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 1.25rem 0.6rem 0.75rem',
    border: '1px solid #e5e5e5',
    borderRadius: '16px',
    background: '#fafafa',
    maxWidth: '100%',
  };

  const partnerLabelStyle = {
    fontFamily: outfit,
    fontSize: isMobile ? '0.7rem' : '0.9rem',
    fontWeight: 700,
    color: '#555',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    lineHeight: 1.5,
  };

  return (
    <section style={{ borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
      <div style={sectionStyle}>
        {/* Heading */}
        <h2 style={headingTitleStyle}>
          Why This <span style={{ color: gold }}>Matters</span>
        </h2>

        {/* Intro */}
        <p style={textStyle}>
          This mission is about more than records. It's about defying expectations — and showing that no obstacle, no background, and no limitation defines what we're capable of. Through GIRLFLIESWORLD, I hope to inspire a new generation of young explorers, scientists, engineers, and dreamers — especially young women — to challenge boundaries, think differently, and take flight toward their boldest ideas.
        </p>

        {/* Education partner badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}>
          {educationPartners.map((partner) => (
            <div key={partner.name} style={partnerBadgeStyle}>
              <img
                src={partner.logo}
                alt={partner.name}
                style={{ height: isMobile ? '60px' : '80px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
              <span style={partnerLabelStyle}>
                {partner.label} —{' '}
                <span style={{ color: '#D4AF37' }}>{partner.role}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Four sections */}
        <div style={{ marginBottom: '3rem' }}>
          {/* Always show first */}
          <p style={sectionParagraphStyle}>
            <span style={inlineTitleStyle}>{fourSections[0].title}: </span>
            <span dangerouslySetInnerHTML={{ __html: highlightKeyWords(fourSections[0].text) }} />
          </p>

          {/* Remaining — toggle */}
          {showAllSections && (
            <>
              {fourSections.slice(1).map((section, index) => (
                <p key={index + 1} style={sectionParagraphStyle}>
                  <span style={inlineTitleStyle}>{section.title}: </span>
                  <span dangerouslySetInnerHTML={{ __html: highlightKeyWords(section.text) }} />
                </p>
              ))}
            </>
          )}

          {/* Toggle chevron */}
          <div style={toggleButtonStyle}>
            <button
              style={chevronButtonStyle}
              onClick={() => setShowAllSections(!showAllSections)}
              onMouseEnter={e => Object.assign(e.currentTarget.style, chevronButtonHoverStyle)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, {
                backgroundColor: 'white',
                color: '#C4A678',
                transform: 'scale(1)',
              })}
              aria-label={showAllSections ? 'Hide sections' : 'Show more sections'}
            >
              <span style={{
                display: 'inline-block',
                transform: showAllSections ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                fontSize: '24px',
                lineHeight: 1,
              }}>⌄</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyThisMattersSection;
