import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    background: '#000000',
    color: '#ffffff',
    padding: '4rem 2rem 2rem',
    marginTop: '4rem'
  };

  const footerRowStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    alignItems: 'start'
  };

  const footerColStyle = { 
    color: '#ffffff' 
  };

  const logoColStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const h4Style = {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: 'rgb(255, 30, 154)'
  };

  const linksStyle = { 
    listStyle: 'none', 
    padding: 0 
  };

  const linkItemStyle = { 
    marginBottom: '0.8rem' 
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  const logoStyle = {
    maxWidth: '200px',
    height: 'auto',
    marginBottom: '1rem'
  };

  const missionTextStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    maxWidth: '300px'
  };

  const footerBottomStyle = {
    textAlign: 'center',
    paddingTop: '2rem',
    marginTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    opacity: 0.7
  };

  return (
    <footer style={footerStyle}>
      <div style={footerRowStyle}>
        <div style={footerColStyle}>
          <h4 style={h4Style}>Info</h4>
          <ul style={linksStyle}>
            <li style={linkItemStyle}><Link to="/aboutme" style={linkStyle}>About Me</Link></li>
            <li style={linkItemStyle}><Link to="/journey" style={linkStyle}>My Journey</Link></li>
            <li style={linkItemStyle}><Link to="/team" style={linkStyle}>Team</Link></li>
            <li style={linkItemStyle}><Link to="/contact" style={linkStyle}>Contact</Link></li>
          </ul>
        </div>

        <div style={footerColStyle}>
          <h4 style={h4Style}>Explore</h4>
          <ul style={linksStyle}>
            <li style={linkItemStyle}><Link to="/plane" style={linkStyle}>The Plane</Link></li>
            <li style={linkItemStyle}><Link to="/aboutme" style={linkStyle}>The Record Attempt</Link></li>
            <li style={linkItemStyle}><Link to="/sponsors" style={linkStyle}>Become a Sponsor</Link></li>
            <li style={linkItemStyle}><Link to="/blog" style={linkStyle}>Blog</Link></li>
          </ul>
        </div>

        <div style={logoColStyle}>
          <img 
            src='/si.png' 
            alt="GIRLFLIESWORLD Logo" 
            style={logoStyle}
          />
          <p style={missionTextStyle}>
            First woman to fly solo to all 7 continents and the South Pole. 
            Inspiring the next generation of aviators and explorers.
          </p>
        </div>
      </div>

      <div style={footerBottomStyle}>
        <p>&copy; 2025 GIRLFLIESWORLD. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
