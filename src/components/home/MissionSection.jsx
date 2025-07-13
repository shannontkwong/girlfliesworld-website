import React, { useState, useEffect } from 'react';

const MissionSection = () => {
  const [showAllSections, setShowAllSections] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionStyle = {
    padding: isMobile ? '2rem 1rem 4rem 1rem' : '2rem 6rem 6rem 6rem',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: isMobile ? '2rem' : '2.5rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '3rem',
    fontFamily: "'Outfit', sans-serif",
    marginTop: '0rem',
    color: '#000000',
    letterSpacing: '-0.02em'
  };

  const textStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight:'500',

    color: '#374151',
    fontWeight:'500',
    textAlign: 'left',
    marginBottom: '1.5rem'
  };

  const sectionParagraphStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight:'500',

    color: '#374151',
    textAlign: 'left',
    marginBottom: '2rem'
  };

  const inlineTitleStyle = {
    fontFamily: 'Impact, Arial Black, sans-serif',
    fontSize: '1rem',
    fontWeight: 900,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const headingTitleStyle = {
    fontFamily: 'Impact, Arial Black, sans-serif',
    fontSize: isMobile ? '3rem' : '6rem',
    fontWeight: 900,
    color: '#000000',
    textTransform: 'uppercase',
    textAlign: 'left',
    marginBottom: '3rem'
  };

  const headingTitleStyleTwo = {
    fontFamily: 'Impact, Arial Black, sans-serif',
    fontSize: isMobile ? '2.5rem' : '4rem',
    fontWeight: 900,
    color: '#000000',
    textTransform: 'uppercase',
    textAlign: isMobile ? 'center' : 'right',
    marginBottom: '3rem'
  };

  const toggleButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
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
    boxShadow: '0 2px 8px rgba(196, 166, 120, 0.2)'
  };

  const missionContentContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: isMobile ? '2rem' : '3rem',
    marginBottom: '3rem',
    flexDirection: isMobile ? 'column' : 'row'
  };
  
  const missionTextSectionStyle = {
    flex: 1,
    order: isMobile ? 2 : 1
  };
  
  const roundImageStyle = {
    width: isMobile ? '300px' : '400px',
    height: isMobile ? '300px' : '400px',
    borderRadius: '0%',
    objectFit: 'cover',
    flexShrink: 0,
    transform: 'rotate(5deg)',
    transition: 'transform 0.3s ease',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    border: '4px solid #C4A678',
    margin: isMobile ? '0 auto' : '0'
  };
  
  const imageContainerStyle = {
    flexShrink: 0,
    order: isMobile ? 1 : 2,
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-start'
  };

  const journeyButtonStyle = {
    display: 'inline-flex',
    alignItems: 'right',
    justifyContent: 'right',
    gap: '8px',
    padding: isMobile ? '12px 24px' : '16px 32px',
    color: 'black',
    backgroundColor: '#FF5500', // Orange color from the second image

    textDecoration: 'none',
    fontWeight: 600,
    fontSize: isMobile ? '0.9rem' : '1rem',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(197, 90, 71, 0.3)',
    fontFamily: "'Outfit', sans-serif",
    marginTop: '1.5rem',
    marginBottom: '1rem'
  };

  const journeyButtonContainerStyle = {
    textAlign: isMobile ? 'center' : 'left',
    marginTop: '2rem'
  };
  
  const chevronButtonHoverStyle = {
    backgroundColor: '#C4A678',
    color: 'white',
    transform: 'scale(1.1)'
  };

  // Function to highlight key words
  const highlightKeyWords = (text) => {
    const keyWords = [
      'transformative', 'young', 'daring', 'boundaries', 'possible', 'Kennedy', 'courage', 'bold',
      'polar regions', 'climate research', 'urgent', 'environmental change', 'scientists', 'satellite',
      'young people', 'dreams', 'passion', 'extraordinary', 'courage', 'catalyst',
      'educational philosophy', 'sciences', 'liberal arts', 'humanities', 'curiosity', 'determination'
    ];

    let highlightedText = text;
    
    keyWords.forEach(word => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span style="color: #C4A678; font-weight: 600;">$1</span>`);
    });

    return highlightedText;
  };

  const fourSections = [
    {
      title: 'EXPLORATION',
      text: 'Every flight into the unknown pushes the boundaries of what\'s possible. As President Kennedy once said, "When we were young, we weren\'t sure whether we could climb over the wall, so we threw our hats over first—then we knew we had to follow." History shows us that transformative change often comes from the young and daring—a young monk who began the Protestant Reformation, a young general who extended an empire from Macedonia to the borders of the earth, a young Italian explorer who discovered the New World, and a 32-year-old Thomas Jefferson who proclaimed that all men are created equal. "Give me a place to stand," said Archimedes, "and I will move the world." Today, that place to stand is in the cockpit of a small aircraft, proving that the greatest adventures aren\'t reserved for a select few, but for anyone bold enough to throw their hat over the wall first.'
    },
    {
      title: 'CLIMATE SCIENCE',
      text: 'The polar regions hold the keys to our planet\'s future, yet they remain among the most challenging places to study. By flying precision scientific instruments over Antarctica and Greenland\'s rapidly changing ice sheets, we\'re gathering critical atmospheric and glacial data that satellites alone cannot capture. This isn\'t just adventure—it\'s urgent climate research happening at the frontlines of environmental change. Every data point collected from these remote regions could help scientists better understand ice sheet dynamics, sea level rise, and atmospheric patterns that affect weather systems worldwide. When exploration meets science, we don\'t just push personal boundaries—we advance human knowledge at the moment when our planet needs it most.'
    },
    {
      title: 'YOUTH EMPOWERMENT',
      text: 'Too many young people are told to wait their turn, to be realistic, to follow conventional paths. But history\'s greatest achievements came from those who refused to accept age as a barrier to greatness. When a young person attempts what no woman has ever done, it sends a powerful message to every dreamer watching: your age is not your limitation—your courage is your catalyst. This mission proves that passion, preparation, and persistence matter more than years of experience. We\'re not just breaking aviation records; we\'re breaking the myth that youth must wait for permission to pursue the extraordinary. Your dreams aren\'t too big, you\'re not too young, and the world needs what only you can contribute.'
    },
    {
      title: 'EDUCATIONAL REFORM',
      text: 'Traditional education too often separates science from storytelling, adventure from academia, theory from practice. But the most pressing challenges we face—from climate change to space exploration—require both analytical thinking and creative problem-solving, both technical precision and bold imagination. This expedition embodies the educational philosophy I believe in: blending the sciences with liberal arts and humanities. Real learning happens when curiosity meets courage, when theoretical knowledge transforms into lived experience, when the classroom extends to the cockpit and beyond. One person\'s journey across seven continents can teach us more about geography, meteorology, human resilience, and the power of determination than any textbook alone. This is education in action—proving that the most profound lessons are learned not by sitting still, but by daring to move forward into the unknown.'
    }
  ];

  return (
    <section style={sectionStyle} id="mission">
<h2 style={headingTitleStyle}>Why This <span style={{color:'#FFAA00'}}>Matters</span></h2>      
      <p style={textStyle}>
        This mission is about more than records. It's about defying expectations—and showing that no obstacle, no background, and no limitation defines what we're capable of. Through GIRLFLIESWORLD, I hope to inspire a new generation of young explorers, scientists, engineers, and dreamers—especially young women—to challenge boundaries, think differently, and take flight toward their boldest ideas.
      </p>

      {/* Four Sections - Show only first by default */}
      <div style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        {/* Always show first section (EXPLORATION) */}
        <p style={sectionParagraphStyle}>
          <span style={inlineTitleStyle}>
            {fourSections[0].title}:
          </span>{' '}
          <span dangerouslySetInnerHTML={{ __html: highlightKeyWords(fourSections[0].text) }} />
        </p>

        {/* Show remaining sections only when expanded */}
        {showAllSections && (
          <>
            {fourSections.slice(1).map((section, index) => (
              <p key={index + 1} style={sectionParagraphStyle}>
                <span style={inlineTitleStyle}>
                  {section.title}:
                </span>{' '}
                <span dangerouslySetInnerHTML={{ __html: highlightKeyWords(section.text) }} />
              </p>
            ))}
          </>
        )}

        {/* Toggle Button */}
        <div style={toggleButtonStyle}>
          <button
            style={chevronButtonStyle}
            onClick={() => setShowAllSections(!showAllSections)}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, chevronButtonHoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, chevronButtonStyle);
            }}
            aria-label={showAllSections ? "Hide sections" : "Show more sections"}
          >
            <span style={{
              transform: showAllSections ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              fontSize: '24px'
            }}>
              ⌄
            </span>
          </button>
        </div>
      </div>

      <div style={missionContentContainerStyle}>
        <div style={missionTextSectionStyle}>
          <h2 style={headingTitleStyleTwo}>Engines on, we have liftoff!</h2>
          <p style={textStyle}>
            I'm Shannon, an 19-year-old pilot born in Hong Kong. In October 2026, I will attempt something no woman in history has ever done: to fly solo and unassisted to the South Pole in a small experimental aircraft.
          </p>
          <p style={textStyle}>
            On this mission, I will also circumnavigate the globe, crossing all 7 continents in a single-engine aircraft—breaking multiple Guinness World Records in the process. This isn't just a flight—it's a journey through some of the world's most remote, hostile, and breathtaking regions, many of which a small SEP aircraft was never designed to reach. Very few pilots ever attempt a route this extreme. It's aerial exploration at the edge of possibility—blending bold adventure with real-world science.
          </p>
          <p style={textStyle}>
            Alongside a team of researchers from the University of Colorado Boulder, I will lead an airborne scientific expedition, capturing critical data over the Antarctic and Greenland ice sheets, as well as remote desert dune systems. These low-altitude surveys will help validate satellite maps and enhance global climate models—an essential step in understanding how Earth's polar regions are changing.
          </p>
          
          {/* Journey Button */}
          <div style={journeyButtonContainerStyle}>
            <a 
              href="/journey" 
              style={journeyButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#C4A678';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(197, 90, 71, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FF5500';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(197, 90, 71, 0.3)';
              }}
            >
            
              Follow Shannon's Journey
            </a>
          </div>
        </div>
        
        <div style={imageContainerStyle}>
          <img 
            src="/side.png" 
            alt="Shannon in aircraft cockpit"
            style={roundImageStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'rotate(15deg) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'rotate(5deg) scale(1)';
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
