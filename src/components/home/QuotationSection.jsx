import React, { useState, useEffect } from 'react';

const QuotationSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        height: isMobile ? 'auto' : '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Quote container */}
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: isMobile ? '2rem 1.5rem' : '3rem',
          height: isMobile ? 'auto' : '80vh',
          width: isMobile ? '100%' : 'auto',
          minWidth: isMobile ? 'unset' : '400px',
          flex: isMobile ? 'none' : '0 0 auto',
        }}
      >
        <div
          style={{
            fontFamily: '"Permanent Marker", cursive',
            fontSize: isMobile ? '2rem' : '3rem',
            lineHeight: '1.4',
          }}
        >
          <p style={{ margin: 0 }}>Don't be absurd.</p>
          <p style={{ margin: 0 }}>Be absurdly different.</p>
          <p style={{ marginTop: '1rem', fontSize: isMobile ? '1.4rem' : '2rem' }}>– Shannon Wong</p>
        </div>
      </div>

      {/* Image container */}
      <div
        style={{
          height: isMobile ? '50vh' : '80vh',
          width: '100%',
          flex: isMobile ? 'none' : 1,
          overflow: 'hidden',
        }}
      >
        <img
          src="/ww.png"
          alt="Inspiring landscape"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'bottom center',
          }}
        />
      </div>
    </section>
  );
};

export default QuotationSection;
