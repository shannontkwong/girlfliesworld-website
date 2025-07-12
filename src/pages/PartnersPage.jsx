
// src/pages/PartnersPage.jsx
import React from 'react';
import Footer from '../components/layout/Footer';

const PartnersPage = () => {
  const benefits = [
    'Logo appearance on the plane\'s fuselage',
    'Appearance in documentary film',
    'Presence on social media'
  ];

  const pageStyle = {
    paddingTop: '80px',
    fontFamily: 'Poppins, sans-serif'
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '40px 20px',
    gap: '2rem',
    alignItems: 'center'
  };

  const imageContainerStyle = {
    flex: '1',
    minWidth: '300px'
  };

  const textContainerStyle = {
    flex: '1',
    minWidth: '300px',
    paddingLeft: '40px'
  };

  const responsiveImageStyle = {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
    marginTop: '40px',
    marginLeft: '30px'
  };

  const headingTextStyle = {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: '60px',
    marginBottom: '40px'
  };

  const sponsorListStyle = {
    listStyleType: 'disc',
    paddingLeft: '20px'
  };

  const listItemStyle = {
    marginBottom: '10px',
    fontSize: '18px'
  };

  const contactItemStyle = {
    marginBottom: '10px',
    fontSize: '18px',
    listStyleType: 'none'
  };

  const mailIconStyle = {
    fontSize: '20px',
    color: '#0569ff',
    marginRight: '10px'
  };

  const emailLinkStyle = {
    color: '#0569ff',
    textDecoration: 'none'
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={imageContainerStyle}>
          <img src="sponsored.png" alt="Sponsorship opportunities" style={responsiveImageStyle} />
        </div>
        <div style={textContainerStyle}>
          <h2 style={headingTextStyle}>SPONSOR ME</h2>
          <ul style={sponsorListStyle}>
            {benefits.map((benefit, index) => (
              <li key={index} style={listItemStyle}>{benefit}</li>
            ))}
            <li style={contactItemStyle}>
              <span style={mailIconStyle}>✉</span>
              Interested in sponsoring? 
              <a href="mailto:contact@girlfliesworld.com" style={emailLinkStyle}> contact@girlfliesworld.com</a>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnersPage;
