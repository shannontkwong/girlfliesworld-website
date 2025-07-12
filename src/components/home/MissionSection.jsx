import React from 'react';

const MissionSection = () => {
  const sectionStyle = {
    padding: '2rem 2rem 6rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'justify',  // makes both left and right edges aligned
    textJustify: 'inter-word', // improves spacing distribution
  };
  

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '3rem',
    fontFamily: "'Outfit', sans-serif",

    marginTop: '0rem',
    color: '#000000',
    letterSpacing: '-0.02em'
  };
  const titleStyleTwo = {
    fontSize: '2.5rem',
    fontFamily: "'Outfit', sans-serif",

    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '3rem',
    marginTop: '3rem',
    color: '#000000',
    letterSpacing: '-0.02em'
  };

  const textStyle = {
    fontSize: '1.0rem',
    lineHeight: 1.8,
    color: '#000000',
    opacity: 0.9
  };

  return (
    <section style={sectionStyle} id="mission">
            <h2 style={titleStyle}>Why This Matters </h2>
            <p style={textStyle}>

            This mission is about more than records.
It’s about defying expectations—and showing that no obstacle, no background, and no limitation defines what we’re capable of.

Through GIRLFLIESWORLD, I hope to inspire a new generation of young explorers, scientists, engineers, and dreamers—especially young women—to challenge boundaries, think differently, and take flight toward their boldest ideas.
</p>
      <h2 style={titleStyleTwo}>Our Mission</h2>
      <p style={textStyle}>
      I’m Shannon, an 18-year-old pilot born in Hong Kong. In October 2026, I will attempt something no woman in history has ever done: to fly solo and unassisted to the South Pole in a small experimental aircraft.  
 
        <br /><br />
        On this mission, I will also circumnavigate the globe, crossing all 7 continents in a single-engine aircraft—breaking multiple Guinness World Records in the process. This isn’t just a flight—it’s a journey through some of the world’s most remote, hostile, and breathtaking regions, many of which a small SEP aircraft was never designed to reach. Very few pilots ever attempt a route this extreme. It’s aerial exploration at the edge of possibility—blending bold adventure with real-world science.        <br /><br />
        Alongside a team of researchers from the University of Colorado Boulder, I will lead an airborne scientific expedition, capturing critical data over the Antarctic and Greenland ice sheets, as well as remote desert dune systems. These low-altitude surveys will help validate satellite maps and enhance global climate models—an essential step in understanding how Earth’s polar regions are changing.      </p>
    </section>
  );
};

export default MissionSection;
