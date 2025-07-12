import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Plane, FileText, Video, User, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [journeyDropdown, setJourneyDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const socialLinks = [
    {
      href: 'https://www.facebook.com/profile.php?id=61554771839720',
      icon: 'https://img.icons8.com/windows/32/facebook-f--v1.png',
      alt: 'Facebook'
    },
    {
      href: 'https://www.linkedin.com/company/girlfliesworld',
      icon: 'https://img.icons8.com/ios-filled/50/linkedin.png',
      alt: 'LinkedIn'
    },
    {
      href: 'https://www.instagram.com/girlfliesworld/',
      icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg',
      alt: 'Instagram'
    },
    {
      href: 'https://x.com/girlfliesworld',
      icon: 'https://img.icons8.com/ios-filled/50/twitterx--v1.png',
      alt: 'Twitter'
    },
    {
      href: 'https://www.youtube.com/channel/UCXQmU6WEELqxfk7sMPIQXXg',
      icon: 'https://img.icons8.com/sf-black-filled/64/youtube-play.png',
      alt: 'YouTube'
    }
  ];

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    padding: 0
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0.5rem 1rem' : '0rem 2rem'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    transition: 'transform 0.3s ease'
  };

  const logoTextStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: isMobile ? '1.8rem' : '3rem',
    fontWeight: 700,
    color: '#fe019a',
    letterSpacing: '-0.02em'
  };

  const hamburgerStyle = {
    display: isMobile ? 'flex' : 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    color: '#000'
  };

  const desktopMenuStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '2rem'
  };

  const mobileMenuStyle = {
    display: isMobile && mobileMenuOpen ? 'block' : 'none',
    position: 'fixed',
    top: '70px',
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    zIndex: 999
  };

  const mobileMenuItemStyle = {
    display: 'block',
    padding: '1rem 0',
    textDecoration: 'none',
    color: '#000',
    fontSize: '1.1rem',
    fontWeight: 500,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  };

  const mobileSocialStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem 0',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    marginTop: '1rem'
  };

  const itemsStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '3rem',
    alignItems: 'center',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#000',
    fontWeight: 500,
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    padding: '1rem 0',
    cursor: 'pointer'
  };

  const dropdownItemStyle = {
    position: 'relative'
  };

  const dropdownContentStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    minWidth: '220px',
    padding: '1rem 0',
    zIndex: 1001,
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateY(-10px)',
    transition: 'all 0.3s ease'
  };

  const dropdownContentVisibleStyle = {
    ...dropdownContentStyle,
    opacity: 1,
    visibility: 'visible',
    transform: 'translateY(0)'
  };

  const dropdownLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    color: '#000',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    borderLeft: '3px solid transparent'
  };

  const socialSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const socialIconStyle = {
    width: '24px',
    height: '24px',
    opacity: 0.6,
    transition: 'all 0.3s ease',
    filter: 'grayscale(100%)'
  };

  const dividerStyle = {
    width: '1px',
    height: '30px',
    background: 'rgba(0, 0, 0, 0.2)',
    margin: '0 1rem'
  };

  return (
    <nav style={navStyle} id="navbar">
      <div style={containerStyle}>
        {/* Logo */}
        <Link style={logoStyle} to="/">
          <span style={logoTextStyle}>GIRLFLIESWORLD</span>
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button 
          style={hamburgerStyle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div style={desktopMenuStyle}>
          <ul style={itemsStyle}>
            {/* About Dropdown */}
            <li style={dropdownItemStyle}>
              <div 
                style={linkStyle}
                onMouseEnter={() => setAboutDropdown(true)}
                onMouseLeave={() => setAboutDropdown(false)}
              >
                <span>About</span>
                <ChevronDown 
                  size={16} 
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: aboutDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
                
                <div 
                  style={aboutDropdown ? dropdownContentVisibleStyle : dropdownContentStyle}
                  onMouseEnter={() => setAboutDropdown(true)}
                  onMouseLeave={() => setAboutDropdown(false)}
                >
                  <Link 
                    to="/aboutme" 
                    style={dropdownLinkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(254, 1, 154, 0.05)';
                      e.target.style.borderLeft = '3px solid #fe019a';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderLeft = '3px solid transparent';
                    }}
                  >
                    <User size={16} />
                    <span>About Me</span>
                  </Link>
                  
                  <Link 
                    to="/news" 
                    style={dropdownLinkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(254, 1, 154, 0.05)';
                      e.target.style.borderLeft = '3px solid #fe019a';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderLeft = '3px solid transparent';
                    }}
                  >
                    <FileText size={16} />
                    <span>Latest News</span>
                  </Link>
                  
                  <Link 
                    to="/videos" 
                    style={dropdownLinkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(254, 1, 154, 0.05)';
                      e.target.style.borderLeft = '3px solid #fe019a';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderLeft = '3px solid transparent';
                    }}
                  >
                    <Video size={16} />
                    <span>Videos</span>
                  </Link>
                </div>
              </div>
            </li>

            {/* Journey Dropdown */}
            <li style={dropdownItemStyle}>
              <div 
                style={linkStyle}
                onMouseEnter={() => setJourneyDropdown(true)}
                onMouseLeave={() => setJourneyDropdown(false)}
              >
                <span>My Journey</span>
                <ChevronDown 
                  size={16} 
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: journeyDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} 
                />
                
                <div 
                  style={journeyDropdown ? dropdownContentVisibleStyle : dropdownContentStyle}
                  onMouseEnter={() => setJourneyDropdown(true)}
                  onMouseLeave={() => setJourneyDropdown(false)}
                >
                  <Link 
                    to="/journey" 
                    style={dropdownLinkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(254, 1, 154, 0.05)';
                      e.target.style.borderLeft = '3px solid #fe019a';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderLeft = '3px solid transparent';
                    }}
                  >
                    <Plane size={16} />
                    <span>Flight Route</span>
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link to="/contact" style={linkStyle}>
                <span>Become a Sponsor</span>
              </Link>
            </li>
          </ul>

          <div style={dividerStyle}></div>

          <div style={socialSectionStyle}>
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <img
                  style={socialIconStyle}
                  src={link.icon}
                  alt={link.alt}
                  onMouseOver={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.filter = 'grayscale(0%)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = '0.6';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.filter = 'grayscale(100%)';
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <Link 
          to="/aboutme" 
          style={mobileMenuItemStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          About Me
        </Link>
        <Link 
          to="/news" 
          style={mobileMenuItemStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          Latest News
        </Link>
        <Link 
          to="/videos" 
          style={mobileMenuItemStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          Videos
        </Link>
        <Link 
          to="/journey" 
          style={mobileMenuItemStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          Flight Route
        </Link>
        <Link 
          to="/contact" 
          style={mobileMenuItemStyle}
          onClick={() => setMobileMenuOpen(false)}
        >
          Become a Sponsor
        </Link>

        {/* Mobile Social Icons */}
        <div style={mobileSocialStyle}>
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img
                style={{ width: '28px', height: '28px', opacity: 0.8 }}
                src={link.icon}
                alt={link.alt}
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
