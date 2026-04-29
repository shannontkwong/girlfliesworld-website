import React, { useState, useEffect } from 'react';

const pressItems = [
  {
    name: 'CNN',
    href: 'https://www.cnn.com/2026/04/12/middleeast/us-iran-war-propellor-plane-intl-hnk-ml-dst',
    // Using text-based logo for CNN — clean and no IP issues
    isText: true,
    textStyle: { fontFamily: "'Arial Black', sans-serif", fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }
  },
  {
    name: 'AOPA',
    href: 'https://www.aopa.org/news-and-media/all-news/2026/march/26/archer-intercepted-by-us-navy-super-hornets-near-iran',
    isText: true,
    textStyle: { fontFamily: "'Arial Black', sans-serif", fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.05em' }
  },
  {
    name: 'Times Now',
    href: 'https://www.timesnownews.com/india/its-us-dont-shoot-us-ferry-pilot-recalls-mid-air-interception-of-newly-procured-indian-trainer-aircraft-by-us-fighter-jet-article-154077628',
    isText: true,
    textStyle: { fontFamily: "'Georgia', serif", fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.02em' }
  },
  {
    name: 'Hampshire Chronicle',
    href: 'https://www.hampshirechronicle.co.uk/news/26057137.hampshire-airfield-welcomes-international-pilot-five-day-flight/',
    isText: true,
    textStyle: { fontFamily: "'Georgia', serif", fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.01em' }
  },
];

const PressLogoBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{
      padding: isMobile ? '2rem 1.25rem' : '2.5rem 4rem',
      background: '#fff',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      overflow: 'hidden'
    }}>
      {/* Label */}
      <p style={{
        textAlign: 'center',
        fontFamily: "'Georgia', serif",
        fontSize: '0.68rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.3)',
        margin: '0 0 1.5rem',
      }}>
        As featured in
      </p>

      {/* Logo row */}
      <div style={{
        display: 'flex',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '1.5rem 2rem' : '3.5rem',
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {pressItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Read the ${item.name} article`}
            style={{
              textDecoration: 'none',
              color: 'rgba(0,0,0,0.75)',  // strong black
              transition: 'color 0.25s ease, opacity 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#000'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.75)'}
          >
            <span style={{
              ...item.textStyle,
              color: 'inherit',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}>
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PressLogoBar;
