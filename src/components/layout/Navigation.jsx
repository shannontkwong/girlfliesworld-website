import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, User, Newspaper, Clapperboard, Compass, NotebookPen } from 'lucide-react';

/**
 * Navigation — "Paper & Ink" register (Y Combinator inspired).
 *
 * THIS PASS: the dropdown thumbnail photos (/side.png, /tr.png, etc.) are
 * replaced with 3D-styled icon badges instead — a real three.js/3D-model
 * dependency would be enormous overkill for a 56px nav thumbnail, so this
 * gets the actual "dimensional" look (beveled edge, inset highlight, soft
 * drop shadow — the same visual language as glossy dark app icons) using
 * pure CSS gradients/shadows around icons from lucide-react, which was
 * already a dependency here for the chevron/menu icons. No new library,
 * no external image assets to go missing.
 */

const SPONSOR_PERCENT = 15; // Update this single number as fundraising progresses
const SPONSOR_EMAIL = 'contact@girlfliesworld.com';

const PAPER = '#F5F2EB';
const INK = '#111111';

// ---- 3D-styled icon badge: beveled dark gradient + inset highlight +
//      drop shadow, standing in for the old photo thumbnails ----
const Icon3D = ({ icon: IconComponent }) => (
  <div style={{
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    flexShrink: 0,
    background: 'linear-gradient(145deg, #333333 0%, #161616 55%, #000000 100%)',
    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,0.18),
      inset 0 -3px 5px rgba(0,0,0,0.45),
      0 4px 10px rgba(0,0,0,0.22)
    `,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <IconComponent size={26} color={PAPER} strokeWidth={1.6} />
  </div>
);

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [journeyDropdown, setJourneyDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFundBanner, setShowFundBanner] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(96);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMobileMenuOpen(false);
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
    { title: 'About Shannon', description: "Learn about Shannon's incredible journey", href: '/aboutme', icon: User },
    { title: 'Latest News', description: 'Stay updated with the latest developments and announcements', href: '/news', icon: Newspaper },
    { title: 'Videos', description: 'Watch exclusive behind-the-scenes content and flight preparations', href: '/videos', icon: Clapperboard },
  ];

  const journeyMenuItems = [
    { title: 'Flight Route & LIVE Tracking', description: 'Explore the epic 7-continent route to the South Pole', href: '/journey', icon: Compass },
    { title: "Shannon's Blog", description: 'Read personal insights and updates from Shannon herself', href: '/blog', icon: NotebookPen },
  ];

  const headerWrapperStyle = { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 };

  const announceBarStyle = {
    width: '100%',
    background: INK,
    overflow: 'hidden',
    maxHeight: scrolled ? '0' : '48px',
    transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
  };

  const announceInnerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '0.6rem' : '1.1rem',
    padding: isMobile ? '0.6rem 1rem' : '0.65rem 2rem',
    fontFamily: "'Inter', sans-serif",
  };

  const announceLabelStyle = { color: PAPER, fontSize: isMobile ? '0.78rem' : '0.85rem', fontWeight: 400, textAlign: 'center' };
  const announceBoldStyle = { fontWeight: 700 };

  const announceCtaStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    background: PAPER,
    color: INK,
    fontSize: isMobile ? '0.75rem' : '0.8rem',
    fontWeight: 600,
    padding: isMobile ? '0.4rem 0.9rem' : '0.45rem 1.1rem',
    borderRadius: '999px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.25s ease',
    flexShrink: 0,
  };

  const navStyle = {
    background: PAPER,
    borderBottom: `1px solid rgba(17,17,17,0.1)`,
    transition: 'all 0.3s ease',
  };

  const fundBannerStyle = {
    position: 'fixed',
    right: isMobile ? '10px' : '20px',
    bottom: isMobile ? '20px' : 'auto',
    top: isMobile ? 'auto' : `${headerHeight + 20}px`,
    zIndex: 1001,
    background: INK,
    color: PAPER,
    padding: isMobile ? '12px 16px' : '14px 18px',
    borderRadius: '6px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
    display: showFundBanner ? 'flex' : 'none',
    alignItems: 'center',
    gap: '12px',
    maxWidth: isMobile ? '280px' : '320px',
    cursor: 'pointer',
    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
    border: '1px solid rgba(255,255,255,0.1)',
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
  const hamburgerStyle = { display: isMobile ? 'flex' : 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: INK, flexShrink: 0 };
  const desktopMenuStyle = { display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '2rem' };
  const itemsStyle = { display: 'flex', listStyle: 'none', gap: '2.25rem', alignItems: 'center', margin: 0, padding: 0, fontFamily: "'Inter', sans-serif" };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    textDecoration: 'none',
    color: INK,
    fontWeight: 500,
    fontSize: '0.98rem',
    transition: 'opacity 0.2s ease',
    position: 'relative',
    padding: '1.5rem 0',
    cursor: 'pointer',
  };

  const fundNavButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: PAPER,
    fontWeight: 600,
    fontSize: '0.88rem',
    background: INK,
    padding: '0.6rem 1.4rem',
    borderRadius: '999px',
    cursor: 'pointer',
    transition: 'opacity 0.25s ease',
    whiteSpace: 'nowrap',
  };

  const dropdownItemStyle = { position: 'relative' };

  const wideDropdownStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-14px)',
    background: PAPER,
    borderRadius: '10px',
    boxShadow: '0 24px 60px rgba(17,17,17,0.14)',
    border: '1px solid rgba(17,17,17,0.08)',
    width: '600px',
    padding: '1.75rem',
    zIndex: 9999,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
  };

  const wideDropdownVisibleStyle = { ...wideDropdownStyle, opacity: 1, visibility: 'visible', transform: 'translateX(-50%) translateY(0)' };
  const dropdownGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '0.75rem' };

  const dropdownItemCardStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.85rem',
    borderRadius: '8px',
    textDecoration: 'none',
    color: INK,
    transition: 'background 0.2s ease',
    border: '1px solid transparent',
  };

  const dropdownContentStyle = { flex: 1 };
  const dropdownTitleStyle = { fontSize: '0.98rem', fontWeight: 600, color: INK, marginBottom: '0.2rem', fontFamily: "'Inter', sans-serif" };
  const dropdownDescStyle = { fontSize: '0.83rem', color: '#5b5748', lineHeight: '1.4', fontFamily: "'Inter', sans-serif" };
  const socialSectionStyle = { display: 'flex', alignItems: 'center', gap: '1.1rem' };
  const socialIconStyle = { width: '20px', height: '20px', opacity: 0.65, transition: 'opacity 0.2s ease' };
  const dividerStyle = { width: '1px', height: '26px', background: 'rgba(17,17,17,0.15)', margin: '0 0.75rem' };

  const mobileMenuStyle = {
    display: isMobile && mobileMenuOpen ? 'block' : 'none',
    position: 'fixed',
    top: `${headerHeight}px`,
    left: 0,
    right: 0,
    background: PAPER,
    borderBottom: '1px solid rgba(17,17,17,0.1)',
    padding: '1rem',
    zIndex: 1001,
    maxHeight: `calc(100vh - ${headerHeight}px)`,
    overflowY: 'auto',
    fontFamily: "'Inter', sans-serif",
  };

  const mobileMenuItemStyle = { display: 'block', padding: '1rem 0', textDecoration: 'none', color: INK, fontSize: '1.05rem', fontWeight: 500, borderBottom: '1px solid rgba(17,17,17,0.1)' };
  const mobileFundItemStyle = { ...mobileMenuItemStyle, fontWeight: 700 };
  const mobileSectionHeaderStyle = { display: 'block', padding: '1rem 0 0.5rem 0', color: INK, fontSize: '1.05rem', fontWeight: 700 };
  const mobileSubItemStyle = { display: 'block', padding: '0.6rem 0 0.6rem 1rem', textDecoration: 'none', color: '#5b5748', fontSize: '0.98rem', fontWeight: 500, borderBottom: '1px solid rgba(17,17,17,0.06)' };
  const mobileSocialStyle = { display: 'flex', justifyContent: 'center', gap: '1.5rem', padding: '1rem 0', borderTop: '1px solid rgba(17,17,17,0.1)', marginTop: '1rem' };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .sponsor-cta-btn:hover { opacity: 0.75; }
        .fund-nav-btn:hover { opacity: 0.8; }
        .fund-banner-quiet:hover { transform: translateY(-3px); }
        @media (max-width: 480px) {
          .nav-container { padding: 0.5rem 0.75rem !important; }
          .mobile-logo { height: 60px !important; max-width: 70% !important; }
        }
      `}</style>

      <div
        className="fund-banner-quiet"
        style={fundBannerStyle}
        onClick={() => { window.location.href = '/donate'; }}
      >
        <div style={{ flex: 1, fontSize: isMobile ? '13px' : '14px', fontWeight: 500, lineHeight: '1.4', fontFamily: "'Inter', sans-serif" }}>
          <strong>Fund the Mission</strong><br />
          <span style={{ opacity: 0.7 }}>Every contribution gets us closer to the Pole</span>
        </div>
        <button
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: 'none',
            color: PAPER,
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            flexShrink: 0,
          }}
          onClick={(e) => { e.stopPropagation(); setShowFundBanner(false); }}
        >
          ×
        </button>
      </div>

      <div id="site-header" style={headerWrapperStyle}>

        <div style={announceBarStyle}>
          <div style={announceInnerStyle}>
            <div style={announceLabelStyle}>
              GIRLFLIESWORLD is <span style={announceBoldStyle}>{SPONSOR_PERCENT}% funded</span> and actively seeking mission sponsors.
            </div>
            <a href="/donate" className="sponsor-cta-btn" style={announceCtaStyle}>
              Fund the flight &rarr;
            </a>
          </div>
        </div>

        <nav style={navStyle}>
          <div style={containerStyle} className="nav-container">
            <a href="/" style={logoStyle}>
              <img
                src="/az.png"
                alt="GIRLFLIESWORLD Logo"
                style={{
                  height: isMobile ? '45px' : (scrolled ? '48px' : '72px'),
                  width: 'auto',
                  maxWidth: isMobile ? '100%' : '360px',
                  objectFit: 'contain',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  filter: 'invert(0)',
                }}
                className={isMobile ? 'mobile-logo' : ''}
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
                    <ChevronDown size={15} style={{ transition: 'transform 0.3s ease', transform: aboutDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    <div style={aboutDropdown ? wideDropdownVisibleStyle : wideDropdownStyle} onMouseEnter={() => setAboutDropdown(true)} onMouseLeave={() => setAboutDropdown(false)}>
                      <div style={dropdownGridStyle}>
                        {aboutMenuItems.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            style={dropdownItemCardStyle}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(17,17,17,0.04)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            <Icon3D icon={item.icon} />
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
                    <ChevronDown size={15} style={{ transition: 'transform 0.3s ease', transform: journeyDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    <div style={journeyDropdown ? wideDropdownVisibleStyle : wideDropdownStyle} onMouseEnter={() => setJourneyDropdown(true)} onMouseLeave={() => setJourneyDropdown(false)}>
                      <div style={dropdownGridStyle}>
                        {journeyMenuItems.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            style={dropdownItemCardStyle}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(17,17,17,0.04)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            <Icon3D icon={item.icon} />
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
                <li><a href="/science" style={linkStyle}><span>Airborne Science</span></a></li>
                <li><a href="/partners" style={linkStyle}><span>Partners</span></a></li>
                <li><a href="/contact" style={linkStyle}><span>Contact</span></a></li>
                <li>
                  <a href="/donate" className="fund-nav-btn" style={fundNavButtonStyle}>
                    <span>Fund the Mission</span>
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
                      onMouseOver={(e) => { e.target.style.opacity = '1'; }}
                      onMouseOut={(e) => { e.target.style.opacity = '0.65'; }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={mobileMenuStyle}>
            <a href="/donate" style={mobileFundItemStyle} onClick={() => setMobileMenuOpen(false)}>
              Fund the Mission
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
                  <img style={{ width: '26px', height: '26px', opacity: 0.75 }} src={link.icon} alt={link.alt} />
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
