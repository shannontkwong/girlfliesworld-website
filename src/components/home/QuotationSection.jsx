import React from 'react';

const QuotationSection = () => {
  return (
    <section
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* Quote container */}
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            fontFamily: '"Permanent Marker", cursive', // replace with Lumios Marker if available
            fontSize: '3rem',
            lineHeight: '1.4',
          }}
        >
          <p style={{ margin: 0 }}>Don’t be absurd.</p>
          <p style={{ margin: 0 }}>Be absurdly different.</p>
          <p style={{ marginTop: '1rem', fontSize: '2rem' }}>– Shannon Wong</p>
        </div>
      </div>

      {/* Image container */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden', // hide extra parts of the image
          position: 'relative',
        }}
      >
        <img
          src="/k.png" // replace with your image path
          alt="Inspiring"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '120%', // make image wider than container
            height: '100%',
            objectFit: 'cover',
            transform: 'translateX(-20%)', // shift image left to show more right side
          }}
        />
      </div>
    </section>
  );
};

export default QuotationSection;
