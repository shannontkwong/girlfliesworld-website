import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [journeyDropdown, setJourneyDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showBlogBanner, setShowBlogBanner] = useState(true);

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
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const socialLinks = [
    {
      href: 'https://www.facebook.com/shannontkwong/',
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

  const aboutMenuItems = [
    {
      title: 'About Shannon',
      description: 'Learn about Shannon\'s incredible journey',
      href: '/aboutme',
      image: '/side.png'
    },
    {
      title: 'Latest News',
      description: 'Stay updated with the latest developments and announcements',
      href: '/news',
      image: '/tr.png'
    },
    {
      title: 'Videos',
      description: 'Watch exclusive behind-the-scenes content and flight preparations',
      href: '/videos',
      image: '/se.png'
    }
  ];

  const journeyMenuItems = [
    {
      title: 'Flight Route & LIVE Tracking',
      description: 'Explore the epic 7-continent route to the South Pole',
      href: '/journey',
      image: '/routes.png'
    },
    {
      title: 'Shannon\'s Blog',
      description: 'Read personal insights and updates from Shannon herself',
      href: '/blog',
      image: '/bl.png'
    },
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
  
  const blogBannerStyle = {
    position: 'fixed',
    right: isMobile ? '10px' : '20px',
    bottom: isMobile ? '20px' : 'auto',
    top: isMobile ? 'auto' : '100px',
    zIndex: 1001,
    background: '#C4A574',
    color: '#fff',
    padding: isMobile ? '12px 16px' : '16px 20px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(196, 165, 116, 0.4)',
    display: showBlogBanner ? 'flex' : 'none',
    alignItems: 'center',
    gap: '12px',
    maxWidth: isMobile ? '280px' : '320px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    animation: 'blogBannerSlide 0.5s ease-out, blogBannerPulse 3s ease-in-out infinite'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0.5rem 1rem' : '0rem 2rem',
    minHeight: isMobile ? '60px' : '80px'
  };

  // Mobile-optimized logo styles
  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
    flexShrink: 0,
    maxWidth: isMobile ? '70%' : 'none'
  };

  const logoImageStyle = {
    height: isMobile ? '50px' : '80px',
    width: 'auto',
    maxWidth: isMobile ? '240px' : '400px',
    objectFit: 'contain',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const hamburgerStyle = {
    display: isMobile ? 'flex' : 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    color: '#000',
    flexShrink: 0
  };

  const desktopMenuStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '2rem'
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
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    padding: '1.5rem 0',
    cursor: 'pointer'
  };

  const dropdownItemStyle = {
    position: 'relative'
  };

  const wideDropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    width: '600px',
    padding: '2rem',
    zIndex: 9999,
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateX(-50%) translateY(-20px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(20px)'
  };

  const wideDropdownVisibleStyle = {
    ...wideDropdownStyle,
    opacity: 1,
    zIndex: 9999,
    visibility: 'visible',
    transform: 'translateX(-50%) translateY(0)'
  };

  const dropdownGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem'
  };

  const dropdownItemCardStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#000',
    transition: 'all 0.3s ease',
    border: '1px solid transparent'
  };

  const dropdownImageStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover',
    background: '#f3f4f6',
    flexShrink: 0
  };

  const dropdownContentStyle = {
    flex: 1
  };

  const dropdownTitleStyle = {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '0.25rem'
  };

  const dropdownDescStyle = {
    fontSize: '0.875rem',
    color: '#6b7280',
    lineHeight: '1.4'
  };

  const socialSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const socialIconStyle = {
    width: '24px',
    height: '24px',
    opacity: 0.7,
    transition: 'all 0.3s ease',
    filter: 'grayscale(100%)'
  };

  const dividerStyle = {
    width: '1px',
    height: '30px',
    background: 'rgba(0, 0, 0, 0.2)',
    margin: '0 1rem'
  };

  const mobileMenuStyle = {
    display: isMobile && mobileMenuOpen ? 'block' : 'none',
    position: 'fixed',
    top: isMobile ? '60px' : '70px',
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    zIndex: 999,
    maxHeight: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 70px)',
    overflowY: 'auto'
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

  return (
    <>
      <style>
        {`
          @keyframes blogBannerSlide {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes blogBannerPulse {
            0%, 100% {
              box-shadow: 0 8px 32px rgba(196, 165, 116, 0.4);
            }
            50% {
              box-shadow: 0 8px 32px rgba(196, 165, 116, 0.6), 0 0 20px rgba(196, 165, 116, 0.4);
            }
          }

          /* Additional mobile optimizations */
          @media (max-width: 480px) {
            .nav-container {
              padding: 0.5rem 0.75rem !important;
            }
            .mobile-logo {
              height: 35px !important;
              max-width: 65% !important;
            }
          }

          @media (max-width: 360px) {
            .mobile-logo {
              height: 30px !important;
              max-width: 60% !important;
            }
          }

          @media (max-width: 320px) {
            .mobile-logo {
              height: 28px !important;
              max-width: 55% !important;
            }
          }
        `}
      </style>

      {/* Blog Banner */}
      <div
        style={blogBannerStyle}
        onClick={() => window.location.href = '/blog'}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(196, 165, 116, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(196, 165, 116, 0.4)';
        }}
      >
        <Sparkles size={20} style={{ animation: 'spin 3s linear infinite', color: '#fff' }} />
        <div style={{
          flex: 1,
          fontSize: isMobile ? '14px' : '15px',
          fontWeight: 600,
          lineHeight: '1.3'
        }}>
          <strong>Shannon's Blog is Live!</strong><br />
          Read about the incredible journey 
        </div>
        <button
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowBlogBanner(false);
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          ×
        </button>
      </div>

      <nav style={navStyle}>
        <div style={containerStyle} className="nav-container">
          {/* Logo - Mobile Compatible Image */}
          <a href="/" style={logoStyle}>
            <img
              src="/o.png"
              alt="GIRLFLIESWORLD Logo"
              style={{
                height: isMobile ? '45px' : '80px',
                width: 'auto',
                maxWidth: isMobile ? '100%' : '400px',
                objectFit: 'contain',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={isMobile ? 'mobile-logo' : ''}
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
                const fallback = e.target.parentNode.querySelector('.logo-fallback');
                if (fallback) fallback.style.display = 'block';
              }}
            />
            {/* Fallback text logo */}
            <div 
              className="logo-fallback"
              style={{
                display: 'none',
                fontFamily: "'Arial Black', 'Helvetica', sans-serif",
                fontSize: isMobile ? '1.4rem' : '2.5rem',
                fontWeight: 900,
                color: '#e91e8c',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
            >
              GIRLFLIESWORLD
            </div>
          </a>

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
                    style={aboutDropdown ? wideDropdownVisibleStyle : wideDropdownStyle}
                    onMouseEnter={() => setAboutDropdown(true)}
                    onMouseLeave={() => setAboutDropdown(false)}
                  >
                    <div style={dropdownGridStyle}>
                      {aboutMenuItems.map((item, index) => (
                        <a 
                          key={index}
                          href={item.href} 
                          style={dropdownItemCardStyle}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <img src={item.image} alt={item.title} style={dropdownImageStyle} />
                          <div style={dropdownContentStyle}>
                            <div style={dropdownTitleStyle}>{item.title}</div>
                            <div style={dropdownDescStyle}>{item.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
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
                    style={journeyDropdown ? wideDropdownVisibleStyle : wideDropdownStyle}
                    onMouseEnter={() => setJourneyDropdown(true)}
                    onMouseLeave={() => setJourneyDropdown(false)}
                  >
                    <div style={dropdownGridStyle}>
                      {journeyMenuItems.map((item, index) => (
                        <a 
                          key={index}
                          href={item.href} 
                          style={dropdownItemCardStyle}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <img src={item.image} alt={item.title} style={dropdownImageStyle} />
                          <div style={dropdownContentStyle}>
                            <div style={dropdownTitleStyle}>{item.title}</div>
                            <div style={dropdownDescStyle}>{item.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
           
              <li>
                <a href="/contact" style={linkStyle}>
                  <span>Become a Sponsor</span>
                </a>
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
                      e.target.style.opacity = '0.7';
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
          <a 
            href="/aboutme" 
            style={mobileMenuItemStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Me
          </a>
          <a 
            href="/news" 
            style={mobileMenuItemStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            Latest News
          </a>
          <a 
            href="/videos" 
            style={mobileMenuItemStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            Videos
          </a>
          <a 
            href="/journey" 
            style={mobileMenuItemStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            Flight Route & LIVE Tracking
          </a>
          <a 
            href="/blog" 
            style={mobileMenuItemStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </a>
          <a 
            href="/contact" 
            style={mobileMenuItemStyle}
            onClick={() => setMobileMenuOpen(false)}
          >
            Become a Sponsor
          </a>

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
    </>
  );
};

export default Navigation;
