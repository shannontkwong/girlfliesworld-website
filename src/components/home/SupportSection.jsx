import React, { useState, useEffect } from 'react';

const SupportSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const supportOptions = [
    {
      id: 'join',
      title: 'JOIN',
      description: 'Follow Shannon\'s journey and be part of the aviation community inspiring the next generation of female pilots.',
      buttonText: 'Join us',
      link: 'https://www.instagram.com/girlfliesworld/',
      image: '/plan.png',
    },
    {
      id: 'donate',
      title: 'DONATE',
      description: 'Support Shannon\'s mission with the Malala Fund to champion education for girls worldwide. Together, we can help break barriers and create opportunities through learning and empowerment.',
      buttonText: 'Give today',
      link: 'https://secure.givelively.org/donate/malala-fund/malala-fund/shannon-wong-7',
      image: '/e.png',
    },
    {
      id: 'partner',
      title: 'PARTNER',
      description: 'Make a difference and join our mission through corporate partnerships and sponsorship opportunities.',
      buttonText: 'Become a partner',
      link: '/contact',
      image: '/part.png',
    },
  ];

  const handleClick = (link) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = link;
    }
  };

  // Check if screen is mobile - now using state instead of direct window check

  const sectionStyle = {
    backgroundColor: '#ffffff',
    padding: '5rem 2rem',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '3rem' : '4rem',
    alignItems: 'center',
    textAlign: isMobile ? 'center' : 'left',
  };

  const leftSideStyle = {
    paddingRight: isMobile ? '0' : '2rem',
  };

  const headingStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? 'clamp(2.5rem, 8vw, 4rem)' : 'clamp(3rem, 6vw, 5rem)',
    fontWeight: 900,
    textTransform: 'uppercase',
    lineHeight: 0.9,
    margin: isMobile ? '0 0 1.5rem 0' : '0 0 2rem 0',
    letterSpacing: '-0.02em',
    color: '#000000',
  };

  const paragraphStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'left',
    marginBottom: '1.5rem'
  };

  const rightSideStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  };

  const getCardStyle = (index) => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
    backgroundColor: '#ffffff',
    border: '2px solid #e5e7eb',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderBottom: index < supportOptions.length - 1 ? '2px solid #e5e7eb' : '2px solid #e5e7eb',
  });

  const imageContainerStyle = {
    width: isMobile ? '100%' : '200px',
    height: isMobile ? '150px' : '200px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const contentStyle = {
    padding: isMobile ? '1.5rem' : '2rem',
    color: '#000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const cardHeadingStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: '1.5rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    margin: '0 0 1rem 0',
    letterSpacing: '0.05em',
    color: '#000000',
  };

  const cardParagraphStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'left',
    marginBottom: '1.5rem'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#000000',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const arrowStyle = {
    fontSize: '1.2rem',
    transition: 'transform 0.3s ease',
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        {/* Left Side - Text Content */}
        <div style={leftSideStyle}>
          <h1 style={headingStyle}>
            SUPPORT GREATNESS
          </h1>

          <p style={paragraphStyle}>
            There are many ways you can support Shannon's mission and help inspire greatness and foster change in aviation and beyond.
          </p>
        </div>

        {/* Right Side - Support Options */}
        <div style={rightSideStyle}>
          {supportOptions.map((option, index) => (
            <div
              key={option.id}
              style={getCardStyle(index)}
              onClick={() => handleClick(option.link)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(10px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0px)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div style={imageContainerStyle}>
                <img
                  src={option.image}
                  alt={option.title}
                  style={imageStyle}
                  onError={(e) => {
                    // Fallback gradient if image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = `linear-gradient(135deg, 
                      ${option.id === 'join' ? '#667eea, #764ba2' : 
                        option.id === 'donate' ? '#f093fb, #f5576c' : 
                        '#4facfe, #00f2fe'})`;
                    e.target.parentElement.style.display = 'flex';
                    e.target.parentElement.style.alignItems = 'center';
                    e.target.parentElement.style.justifyContent = 'center';
                    
                    const fallbackText = document.createElement('div');
                    fallbackText.style.color = '#ffffff';
                    fallbackText.style.fontSize = '1rem';
                    fallbackText.style.fontWeight = 'bold';
                    fallbackText.textContent = option.title;
                    e.target.parentElement.appendChild(fallbackText);
                  }}
                />
              </div>

              {/* Content */}
              <div style={contentStyle}>
                <div>
                  <h3 style={cardHeadingStyle}>
                    {option.title}
                  </h3>

                  <p style={cardParagraphStyle}>
                    {option.description}
                  </p>
                </div>

                <div style={buttonStyle}>
                  {option.buttonText}
                  <span style={arrowStyle}>
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
