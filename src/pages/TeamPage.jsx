
// src/pages/TeamPage.jsx
import React from 'react';
import Footer from '../components/layout/Footer';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'TBD',
      position: 'TBD',
      image: 'user.webp'
    },
    {
      name: 'TBD',
      position: 'TBD',
      image: 'user.webp'
    },
    {
      name: 'TBD',
      position: 'TBD',
      image: 'user.webp'
    }
  ];

  const socialLinks = [
    { href: 'https://www.twitter.com', icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg', alt: 'Twitter' },
    { href: 'https://www.facebook.com', icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg', alt: 'Facebook' },
    { href: 'https://www.gmail.com', icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg', alt: 'Email' },
    { href: 'https://www.instagram.com', icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg', alt: 'Instagram' }
  ];

  const pageStyle = {
    paddingTop: '80px',
    fontFamily: 'Poppins, sans-serif'
  };

  const outerContainerStyle = {
    paddingTop: '10px',
    paddingRight: '30px',
    paddingBottom: '10px',
    paddingLeft: '30px',
    backgroundColor: 'rgb(255, 255, 255)'
  };

  const innerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '80px',
    marginBottom: '50px'
  };

  const headingTextStyle = {
    fontWeight: 700,
    fontSize: '48px',
    fontFamily: 'Poppins',
    lineHeight: '35px',
    color: 'rgb(0, 0, 0)',
    marginBottom: '32px',
    textAlign: 'center'
  };

  const subHeadingTextStyle = {
    maxWidth: '470px',
    fontSize: '25px',
    lineHeight: '35px',
    textAlign: 'center',
    fontWeight: 700,
    fontFamily: 'Poppins',
    color: 'rgb(0, 0, 0)',
    margin: '0 0 70px 0'
  };

  const cardsContainerStyle = {
    maxWidth: '1320px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem'
  };

  const cardContainerStyle = {
    padding: '0 25px',
    margin: '0 0 30px 0',
    textAlign: 'center',
    flex: '0 1 300px'
  };

  const nameStyle = {
    fontSize: '22px',
    lineHeight: '35px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    fontFamily: 'Poppins',
    marginBottom: '5px'
  };

  const positionStyle = {
    color: 'rgb(0, 0, 0)',
    fontSize: '22px',
    lineHeight: '35px',
    fontWeight: 700,
    fontFamily: 'Poppins',
    marginBottom: '20px'
  };

  const teamMemberImageStyle = {
    width: '100%',
    marginBottom: '40px',
    borderRadius: '5%'
  };

  const socialIconsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px'
  };

  const socialMediaIconStyle = {
    cursor: 'pointer'
  };

  return (
    <div style={pageStyle}>
      <div style={outerContainerStyle}>
        <div style={innerContainerStyle}>
          <p style={headingTextStyle}>The Team</p>
          <p style={subHeadingTextStyle}>TO BE DECIDED</p>
          <div style={cardsContainerStyle}>
            {teamMembers.map((member, index) => (
              <div key={index} style={cardContainerStyle}>
                <p style={nameStyle}>{member.name}</p>
                <p style={positionStyle}>{member.position}</p>
                <img style={teamMemberImageStyle} src={member.image} alt="Team Member" />
                <div style={socialIconsStyle}>
                  {socialLinks.map((link, linkIndex) => (
                    <a key={linkIndex} href={link.href} target="_blank" rel="noopener noreferrer">
                      <img style={socialMediaIconStyle} src={link.icon} alt={link.alt} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
