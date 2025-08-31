import React from 'react';

const PlaneInfo = () => {
  const features = [
    'A fully tried and tested aircraft 4 seater aircraft',
    '260 HP Lycoming IO-540 Engine',
    'Many More Modifications',
    
  ];

  const containerStyle = {
    padding: '40px 20px',
    fontFamily: 'Poppins, sans-serif'
  };

  const imageContainerStyle = {
    textAlign: 'center',
    marginBottom: '40px'
  };

  const responsiveImageStyle = {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
    marginTop: '40px'
  };

  const headingTextStyle = {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: '40px',
    marginBottom: '30px',
    textAlign: 'center'
  };

  const sponsorListStyle = {
    listStyleType: 'disc',
    marginBottom: '30px',
    paddingLeft: '20px'
  };

  const listItemStyle = {
    marginBottom: '10px',
    fontSize: '18px'
  };

  const descriptionStyle = {
    fontSize: '18px',
    textAlign: 'justify',
    marginBottom: '30px',
    color: '#000000',
    lineHeight: '1.6'
  };

  const inspirationHeadingStyle = {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: '24px',
    marginBottom: '20px',
    marginTop: '40px'
  };

  const modificationsListStyle = {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginTop: '20px'
  };

  const modificationItemStyle = {
    marginBottom: '15px',
    fontSize: '16px',
    lineHeight: '1.5'
  };

  const linkStyle = {
    color: '#000000',
    textDecoration: 'underline'
  };

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img src="pla.jpg" alt="Experimental Vans RV-10" style={responsiveImageStyle} />
      </div>
      
      <h2 style={headingTextStyle}>Experimental Vans RV-10</h2>
      
      <ul style={sponsorListStyle}>
        {features.map((feature, index) => (
          <li key={index} style={listItemStyle}>{feature}</li>
        ))}
      </ul>
      
      <p style={descriptionStyle}>
        RV-10 is an experimental kit where you build the plane from scratch. I chose this type of aircraft for my journey because it enables modifications for increased range, minimizes potential sources of drag, and can be modified for flying in long-range cold winter conditions.
      </p>

      <h3 style={inspirationHeadingStyle}>Source of Inspiration: Michel Gordillo</h3>
      
      <p style={descriptionStyle}>
        My inspiration comes from Michel Gordillo, a Spanish pilot who became the first person to fly a single-engine aircraft across Antarctica and circumnavigate both poles in a homebuilt aircraft. He flew his Vans RV-8 named "Sky Polaris" for over 24+ hours continuously across Antarctica, covering 4,700 kilometers in a single flight over the South Pole.
      </p>


     
    </div>
  );
};

export default PlaneInfo;
