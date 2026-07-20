import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Heart } from 'lucide-react';

const SPONSOR_PERCENT = 15; // Update this single number as fundraising progresses
const SPONSOR_EMAIL = 'contact@girlfliesworld.com';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [journeyDropdown, setJourneyDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFundBanner, setShowFundBanner] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(96);
  const [progressWidth, setProgressWidth] = useState(0);

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

  useEffect(() => {
    const timer = setTimeout(() => setProgressWidth(SPONSOR_PERCENT), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const broadcast = () => {
      const height = headerEl.getBoundingClientRect().height;
      setHeaderHeight(height);
      document.documentElement.style.setProperty('--header-height', `${height}px`);
      window.dispatchEvent(new CustomEvent('site-header-resize', { detail: { height } }));
    };

    broadcast();

    const ro = new ResizeObserver(broadcast);
    ro.observe(headerEl);
    window.addEventListener('resize', broadcast);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', broadcast);
    };
  }, [isMobile]);

  const socialLinks = [
    { href: 'https://x.com/realshannonwong', icon: 'https://img.icons8.com/ios-filled/50/twitterx--v1.png', alt: 'X (Twitter)', isX: true },
    { href: 'https://www.facebook.com/shannontkwong/', icon: 'https://img.icons8.com/windows/32/facebook-f--v1.png', alt: 'Facebook' },
    { href: 'https://www.instagram.com/girlfliesworld/', icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg', alt: 'Instagram' },
    { href: 'https://www.youtube.com/channel/UCXQmU6WEELqxfk7sMPIQXXg', icon: 'https://img.icons8.com/sf-black-filled/64/youtube-play.png', alt: 'YouTube' },
  ];

  const aboutMenuItems = [
    { title: 'About Shannon', description: 'Learn about Shannon\'s incredible journey', href: '/aboutme', image: '/side.png' },
    { title: 'Latest News', description: 'Stay updated with the latest developments and announcements', href: '/news', image: '/tr.png' },
    { title: 'Videos', description: 'Watch exclusive behind-the-scenes content and flight preparations', href: '/videos', image: '/se.png' },
  ];

  const journeyMenuItems = [
    { title: 'Flight Route & LIVE Tracking', description: 'Explore the epic 7-continent route to the South Pole', href: '/journey', image: '/routes.png' },
    { title: 'Shannon\'s Blog', description: 'Read personal insights and updates from Shannon herself', href: '/blog', image: '/bl.png' },
  ];

  const headerWrapperStyle = { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 };

  const sponsorBarStyle = {
    width: '100%',
    background: '#000000',
    overflow: 'hidden',
    position: 'relative',
    maxHeight: scrolled ? '0' : '120px',
    transition: 'max-height 0.3s ease',
  };

  const sponsorBarInnerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '0.6rem' : '1.25rem',
    padding: isMobile ? '0.65rem 1rem' : '0.7rem 2rem',
    position: 'relative',
    zIndex: 2,
  };

  const sponsorLabelStyle = { color: '#fff', fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: 400, letterSpacing: '0.01em', textAlign: 'center' };
  const sponsorLabelBoldStyle = { fontWeight: 700, color: '#E67E22' };

  const sponsorCtaStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: '#fff',
    color: '#000',
    fontSize: isMobile ? '0.78rem' : '0.85rem',
    fontWeight: 700,
    padding: isMobile ? '0.45rem 1rem' : '0.5rem 1.3rem',
    borderRadius: '50px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  };

  const navStyle = {
    background: scrolled ? 'rgba(0, 0, 0, 0.98)' : 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    padding: 0,
  };

  // Fund banner — now routes to /donate instead of straight to Stripe.
  const fundBannerStyle = {
    position: 'fixed',
    right: isMobile ? '10px' : '20px',
    bottom: isMobile ? '20px' : 'auto',
    top: isMobile ? 'auto' : `${headerHeight + 20}px`,
    zIndex: 1001,
    background: 'linear-gradient(135deg, #E67E22, #C4A574)',
    color: '#fff',
    padding: isMobile ? '12px 16px' : '16px 20px',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(230, 126, 34, 0.45)',
    display: showFundBanner ? 'flex' : 'none',
    alignItems: 'center',
    gap: '12px',
    maxWidth: isMobile ? '280px' : '320px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    animation: 'fundBannerSlide 0.5s ease-out',
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0.5rem 1rem' : '0rem 2rem',
    minHeight: isMobile ? '60px' : (scrolled ? '56px' : '80px'),
    transition: 'min-height 0.3s ease',
  };

  const logoStyle = { display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'transform 0.3s ease', flexShrink: 0, maxWidth: isMobile ? '70%' : 'none' };
  const hamburgerStyle = { display: isMobile ? 'flex' : 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#fff', flexShrink: 0 };
  const desktopMenuStyle = { display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '2rem' };
  const itemsStyle = { display: 'flex', listStyle: 'none', gap: '3rem', alignItems: 'center', margin: 0, padding: 0 };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    padding: '1.5rem 0',
    cursor: 'pointer',
  };

  const fundNavButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.9rem',
    background: 'linear-gradient(135deg, #E67E22, #C4A574)',
    padding: '0.65rem 1.4rem',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  };

  const dropdownItemStyle = { position: 'relative' };

  const wideDropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#000',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    width: '600px',
    padding: '2rem',
    zIndex: 9999,
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateX(-50%) translateY(-20px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(20px)',
  };

  const wideDropdownVisibleStyle = { ...wideDropdownStyle, opacity: 1, zIndex: 9999, visibility: 'visible', transform: 'translateX(-50%) translateY(0)' };
  const dropdownGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem' };

  const dropdownItemCardStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#fff',
    transition: 'all 0.3s ease',
    border: '1px solid transparent',
  };

  const dropdownImageStyle = { width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', background: '#f3f4f6', flexShrink: 0 };
  const dropdownContentStyle = { flex: 1 };
  const dropdownTitleStyle = { fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' };
  const dropdownDescStyle = { fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.4' };
  const socialSectionStyle = { display: 'flex', alignItems: 'center', gap: '1.2rem' };
  const socialIconStyle = { width: '24px', height: '24px', opacity: 0.7, transition: 'all 0.3s ease', filter: 'brightness(0) invert(1)' };
  const dividerStyle = { width: '1px', height: '30px', background: 'rgba(255, 255, 255, 0.2)', margin: '0 1rem' };

  const mobileMenuStyle = {
    display: isMobile && mobileMenuOpen ? 'block' : 'none',
    position: 'fixed',
    top: `${headerHeight}px`,
    left: 0,
    right: 0,
    background: '#0a0a0a',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1rem',
    zIndex: 1001,
    maxHeight: `calc(100vh - ${headerHeight}px)`,
    overflowY: 'auto',
  };

  const mobileMenuItemStyle = { display: 'block', padding: '1rem 0', textDecoration: 'none', color: '#fff', fontSize: '1.1rem', fontWeight: 500, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' };
  const mobileFundItemStyle = { ...mobileMenuItemStyle, color: '#E67E22', fontWeight: 700 };
  const mobileSectionHeaderStyle = { display: 'block', padding: '1rem 0 0.5rem 0', color: '#fff', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.01em' };
  const mobileSubItemStyle = { display: 'block', padding: '0.65rem 0 0.65rem 1rem', textDecoration: 'none', color: 'rgba(255, 255, 255, 0.75)', fontSize: '1rem', fontWeight: 500, borderBottom: '1px solid rgba(255, 255, 255, 0.06)' };
  const mobileSocialStyle = { display: 'flex', justifyContent: 'center', gap: '1.5rem', padding: '1rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '1rem' };

  return (
    <>
      <style>
        {`
          @keyframes fundBannerSlide {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes fundBannerPulse {
            0%, 100% { box-shadow: 0 8px 32px rgba(230, 126, 34, 0.45); }
            50% { box-shadow: 0 8px 32px rgba(230, 126, 34, 0.7), 0 0 20px rgba(196, 165, 116, 0.5); }
          }
          @keyframes sponsorGlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .sponsor-cta-btn:hover { background: #E67E22 !important; color: #fff !important; transform: translateY(-1px); }
          .fund-nav-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(230, 126, 34, 0.5); }
          @media (max-width: 480px) {
            .nav-container { padding: 0.5rem 0.75rem !important; }
            .mobile-logo { height: 60px !important; max-width: 70% !important; }
          }
          @media (max-width: 360px) {
            .mobile-logo { height: 55px !important; max-width: 65% !important; }
          }
          @media (max-width: 320px) {
            .mobile-logo { height: 50px !important; max-width: 60% !important; }
          }
        `}
      </style>

      {/* Floating "Help Fund the Mission" banner — routes to /donate */}
      <div
        style={fundBannerStyle}
        onClick={() => { window.location.href = '/donate'; }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(230, 126, 34, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(230, 126, 34, 0.45)';
        }}
      >
        <Heart size={20} fill="#fff" style={{ animation: 'sponsorGlow 2.2s ease-in-out infinite' }} />
        <div style={{ flex: 1, fontSize: isMobile ? '14px' : '15px', fontWeight: 600, lineHeight: '1.3' }}>
          <strong>Help Fund the Mission</strong><br />
          Every contribution gets us closer to the Pole
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
            transition: 'all 0.2s ease',
          }}
          onClick={(e) => { e.stopPropagation(); setShowFundBanner(false); }}
          onMouseEnter={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.3)'; }}
          onMouseLeave={(e) => { e.target.style.background = 'rgba(255, 255, 255, 0.2)'; }}
        >
          ×
        </button>
      </div>

      {/* Fixed header: sponsor bar + main nav, measured together */}
      <div id="site-header" style={headerWrapperStyle}>

        {/* Sponsor / Fundraising Bar — routes to /donate instead of Stripe directly */}
        <div style={sponsorBarStyle}>
          <div style={sponsorBarInnerStyle}>
            <div style={sponsorLabelStyle}>
              GIRLFLIESWORLD is <span style={sponsorLabelBoldStyle}>{SPONSOR_PERCENT}% funded</span> and actively seeking mission sponsors.
            </div>
            <a href="/donate" className="sponsor-cta-btn" style={sponsorCtaStyle}>
              Fund the flight →
            </a>
          </div>
        </div>

        <nav style={navStyle}>
          <div style={containerStyle} className="nav-container">
            <a href="/" style={logoStyle}>
              <img
                src="/dot.png"
                alt="GIRLFLIESWORLD Logo"
                style={{
                  height: isMobile ? '45px' : (scrolled ? '48px' : '80px'),
                  width: 'auto',
                  maxWidth: isMobile ? '100%' : '400px',
                  objectFit: 'contain',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                className={isMobile ? 'mobile-logo' : ''}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentNode.querySelector('.logo-fallback');
                  if (fallback) fallback.style.display = 'block';
                }}
              />
            </a>

            <button style={hamburgerStyle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div style={desktopMenuStyle}>
              <ul style={itemsStyle}>
                <li style={dropdownItemStyle}>
                  <div style={linkStyle} onMouseEnter={() => setAboutDropdown(true)} onMouseLeave={() => setAboutDropdown(false)}>
                    <span>About</span>
                    <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: aboutDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    <div style={aboutDropdown ? wideDropdownVisibleStyle : wideDropdownStyle} onMouseEnter={() => setAboutDropdown(true)} onMouseLeave={() => setAboutDropdown(false)}>
                      <div style={dropdownGridStyle}>
                        {aboutMenuItems.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            style={dropdownItemCardStyle}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
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

                <li style={dropdownItemStyle}>
                  <div style={linkStyle} onMouseEnter={() => setJourneyDropdown(true)} onMouseLeave={() => setJourneyDropdown(false)}>
                    <span>My Journey</span>
                    <ChevronDown size={16} style={{ transition: 'transform 0.3s ease', transform: journeyDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    <div style={journeyDropdown ? wideDropdownVisibleStyle : wideDropdownStyle} onMouseEnter={() => setJourneyDropdown(true)} onMouseLeave={() => setJourneyDropdown(false)}>
                      <div style={dropdownGridStyle}>
                        {journeyMenuItems.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            style={dropdownItemCardStyle}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
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
                  <a href="/science" style={linkStyle}><span>Airborne Science</span></a>
                </li>
                <li>
                  <a href="/partners" style={linkStyle}><span>Partners</span></a>
                </li>
                <li>
                  <a href="/contact" style={linkStyle}><span>Sponsor</span></a>
                </li>
                <li>
                  <a href="/donate" className="fund-nav-btn" style={fundNavButtonStyle}>
                    <Heart size={15} fill="#fff" />
                    <span>Help Fund</span>
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
                    style={{ display: 'flex', alignItems: 'center', marginLeft: link.isX ? '0.3rem' : '0', marginRight: link.isX ? '0.3rem' : '0' }}
                  >
                    <img
                      style={socialIconStyle}
                      src={link.icon}
                      alt={link.alt}
                      onMouseOver={(e) => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(-2px)'; e.target.style.filter = 'brightness(0) invert(1)'; }}
                      onMouseOut={(e) => { e.target.style.opacity = '0.7'; e.target.style.transform = 'translateY(0)'; e.target.style.filter = 'brightness(0) invert(1)'; }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={mobileMenuStyle}>
            <a href="/donate" style={mobileFundItemStyle} onClick={() => setMobileMenuOpen(false)}>
              ❤️ Help Fund
            </a>

            <span style={mobileSectionHeaderStyle}>About</span>
            {aboutMenuItems.map((item, index) => (
              <a key={index} href={item.href} style={mobileSubItemStyle} onClick={() => setMobileMenuOpen(false)}>
                {item.title}
              </a>
            ))}

            <span style={mobileSectionHeaderStyle}>My Journey</span>
            {journeyMenuItems.map((item, index) => (
              <a key={index} href={item.href} style={mobileSubItemStyle} onClick={() => setMobileMenuOpen(false)}>
                {item.title}
              </a>
            ))}

            <a href="/science" style={mobileMenuItemStyle} onClick={() => setMobileMenuOpen(false)}>Airborne Science</a>
            <a href="/partners" style={mobileMenuItemStyle} onClick={() => setMobileMenuOpen(false)}>Partners</a>
            <a href="/contact" style={mobileMenuItemStyle} onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href={`mailto:${SPONSOR_EMAIL}`} style={mobileMenuItemStyle} onClick={() => setMobileMenuOpen(false)}>{SPONSOR_EMAIL}</a>

            <div style={mobileSocialStyle}>
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                  <img style={{ width: '28px', height: '28px', opacity: 0.8, filter: 'brightness(0) invert(1)' }} src={link.icon} alt={link.alt} />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
