import React, { useState, useEffect } from 'react';

const ContactPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialLinks = [
    {
      href: 'https://www.linkedin.com/company/girlfliesworld?trk=blended-typeahead',
      icon: 'https://img.icons8.com/ios-filled/50/linkedin.png',
      alt: 'LinkedIn'
    },
    {
      href: 'https://x.com/girlfliesworld',
      icon: 'https://img.icons8.com/ios-filled/50/twitterx--v1.png',
      alt: 'Twitter'
    },
    {
      href: 'https://www.instagram.com/girlfliesworld/',
      icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg',
      alt: 'Instagram'
    },
    {
      href: 'https://www.facebook.com/profile.php?id=61554771839720',
      icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg',
      alt: 'Facebook'
    },
    {
      href: 'https://www.youtube.com/channel/UCXQmU6WEELqxfk7sMPIQXXg',
      icon: 'https://img.icons8.com/sf-black-filled/64/youtube-play.png',
      alt: 'YouTube'
    }
  ];

  const pageStyle = {
    paddingTop: isMobile ? '60px' : '80px',
    fontFamily: 'Nunito, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: isMobile ? '0 15px' : '0'
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: isMobile ? '50px 10px' : '100px 20px',
    textAlign: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const headingStyle = {
    fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : '48px',
    lineHeight: isMobile ? '1.2' : '60px',
    fontWeight: 700,
    marginBottom: '20px',
    color: '#000000'
  };

  const subheadingStyle = {
    maxWidth: '600px',
    margin: '0 auto 60px auto',
    color: '#666666',
    fontSize: isMobile ? '18px' : '20px',
    lineHeight: '1.6',
    padding: isMobile ? '0 10px' : '0'
  };

  const contactSectionStyle = {
    marginBottom: isMobile ? '40px' : '60px'
  };

  const contactBoxStyle = {
    marginBottom: isMobile ? '30px' : '40px'
  };

  const textBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    gap: isMobile ? '15px' : '20px',
    flexDirection: isMobile ? 'column' : 'row',
    textAlign: 'center'
  };

  const contactSvgStyle = {
    width: isMobile ? '35px' : '40px',
    height: isMobile ? '35px' : '40px'
  };

  const contactTextStyle = {
    fontSize: isMobile ? '18px' : '22px',
    fontWeight: 600,
    color: '#000000',
    margin: 0
  };

  const emailLinkStyle = {
    color: '#ed1b99',
    textDecoration: 'none',
    fontSize: isMobile ? '20px' : '24px',
    fontWeight: 700,
    display: 'block',
    marginBottom: '10px',
    transition: 'all 0.3s ease',
    wordBreak: isMobile ? 'break-all' : 'normal'
  };

  const socialLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: isMobile ? '20px' : '30px',
    marginBottom: isMobile ? '40px' : '60px',
    flexWrap: 'wrap',
    padding: isMobile ? '0 10px' : '0'
  };

  const socialSvgStyle = {
    width: isMobile ? '35px' : '45px',
    height: isMobile ? '35px' : '45px',
    transition: 'all 0.3s ease',
    opacity: 0.8
  };

  const logoStyle = {
    width: isMobile ? '280px' : '400px',
    height: 'auto',
    borderRadius: '15px',
    margin: '0 auto',
    marginTop:'40px',
    marginBottom: isMobile ? '30px' : '40px'
  };

  const emailContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: isMobile ? '10px' : '0'
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <img src="Girlfliesworldlogo1.png" alt="GIRLFLIESWORLD Logo" style={logoStyle} />

        <h1 style={headingStyle}>Contact Us</h1>
        <p style={subheadingStyle}>
          For all media, sponsorship and general enquiries, reach out to us directly.
        </p>
        
        <div style={contactSectionStyle}>
          <div style={contactBoxStyle}>
            <div style={textBoxStyle}>
              <img style={contactSvgStyle} src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET22.jpg" alt="Email" />
              <div style={emailContainerStyle}>
                <a href="mailto:contact@girlfliesworld.com" style={emailLinkStyle}>
                  contact@girlfliesworld.com
                </a>
                <div style={{ 
                  fontSize: isMobile ? '14px' : '16px', 
                  color: '#666', 
                  fontWeight: 500,
                  textAlign: 'center'
                }}>
                  General Inquiries & Sponsorship Requests
                </div>
              </div>
            </div>
            
            <div style={textBoxStyle}>
              <img style={contactSvgStyle} src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET22.jpg" alt="Email" />
              <div style={emailContainerStyle}>
                <a href="mailto:press@girlfliesworld.com" style={emailLinkStyle}>
                  press@girlfliesworld.com
                </a>
                <div style={{ 
                  fontSize: isMobile ? '14px' : '16px', 
                  color: '#666', 
                  fontWeight: 500,
                  textAlign: 'center'
                }}>
                  Press & Media
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={socialLinksStyle}>
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.target.querySelector('img').style.opacity = '1';
                e.target.querySelector('img').style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.querySelector('img').style.opacity = '0.8';
                e.target.querySelector('img').style.transform = 'scale(1)';
              }}
            >
              <img style={socialSvgStyle} src={link.icon} alt={link.alt} />
            </a>
          ))}
        </div>
      </div>

      {/* Footer Component Placeholder */}
      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: isMobile ? '15px' : '20px',
        marginTop: isMobile ? '30px' : '50px'
      }}>
        <p>&copy; 2025 GIRLFLIESWORLD. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
