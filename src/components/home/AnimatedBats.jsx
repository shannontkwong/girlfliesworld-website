import React from 'react';

const AnimatedBats = () => {
  const batStyle = {
    position: 'fixed',
    zIndex: 50,
    pointerEvents: 'none',
    top: '10%',
    left: '5%',
    animation: 'float1 15s ease-in-out infinite'
  };

  const imgStyle = {
    width: '80px',
    height: 'auto',
    opacity: 0.7
  };

  return (
    <div style={batStyle}>
      <img 
        src="https://img1.picmix.com/output/stamp/normal/7/7/4/8/1798477_a61ed.gif" 
        alt="Flying Bat"
        style={imgStyle}
      />
    </div>
  );
};

export default AnimatedBats;
