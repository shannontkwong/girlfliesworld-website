import React from 'react';

const QuotationSection = () => {
  const containerHeight = '80vh'; // Consistent height for both elements
  
  return (
    <section
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center', // centers the entire section vertically
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
          padding: '3rem',
          height: containerHeight, // match image height
          minWidth: '400px', // ensure minimum width
          flex: '0 0 auto', // don't grow or shrink
        }}
      >
        <div
          style={{
            fontFamily: '"Permanent Marker", cursive',
            fontSize: '3rem',
            lineHeight: '1.4',
          }}
        >
          <p style={{ margin: 0 }}>Don't be absurd.</p>
          <p style={{ margin: 0 }}>Be absurdly different.</p>
          <p style={{ marginTop: '1rem', fontSize: '2rem' }}>– Shannon Wong</p>
        </div>
      </div>

      {/* Image container */}
      <div
        style={{
          height: containerHeight, // same as quote container
          width: 'auto', // let flex handle the width
        flex: 1, // take up equal space with quote
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src="/j.png"
          alt="Inspiring landscape"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
    </section>
  );
};

export default QuotationSection;
