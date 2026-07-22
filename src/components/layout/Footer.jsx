import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer — layout rhythm matches the reference (logo + circular social
 * icons on one row, a link row, tagline + copyright on the bottom row)
 * but stays black per instruction, using /az.png as the logo instead of
 * the reference's maroon/pattern treatment or the old /si.png mark.
 *
 * Social links reuse the same real URLs already used on ContactPage.jsx
 * (LinkedIn, X/Twitter, Instagram, Facebook, YouTube) rather than
 * inventing new ones.
 */

const INK_BLACK = '#000000';
const PINK = 'rgb(255, 30, 154)';

const SOCIAL_LINKS = [
  { href: 'https://x.com/girlfliesworld', icon: 'https://img.icons8.com/ios-filled/50/twitterx--v1.png', alt: 'X (Twitter)' },
  { href: 'https://www.facebook.com/shannontkwong/', icon: 'https://img.icons8.com/windows/32/facebook-f--v1.png', alt: 'Facebook' },
  { href: 'https://www.instagram.com/girlfliesworld/', icon: 'https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg', alt: 'Instagram' },
  { href: 'https://www.youtube.com/channel/UCXQmU6WEELqxfk7sMPIQXXg', icon: 'https://img.icons8.com/sf-black-filled/64/youtube-play.png', alt: 'YouTube' },
];

const LINK_ROW = [
  { to: '/aboutme', label: 'About Me' },
  { to: '/journey', label: 'My Journey' },
  { to: '/team', label: 'Team' },
    { to: '/science', label: 'Science' },

  { to: '/contact', label: 'Contact' },
  { to: '/aboutme', label: 'The Record Attempt' },
  { to: '/sponsors', label: 'Become a Sponsor' },
  { to: '/blog', label: 'Blog' },
];

const Footer = () => {
  const footerStyle = {
    background: INK_BLACK,
    color: '#ffffff',
    padding: '3.5rem 2rem 2rem',
    marginTop: '4rem',
  };

  const wrapStyle = { maxWidth: '1200px', margin: '0 auto' };

  const topRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    paddingBottom: '2.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
  };

  const logoStyle = { maxWidth: '200px', height: 'auto', display: 'block' };

  const socialRowStyle = { display: 'flex', alignItems: 'center', gap: '0.85rem' };

  const socialCircleStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.25s ease, background 0.25s ease',
  };

  const socialIconStyle = { width: '18px', height: '18px', filter: 'brightness(0) invert(1)', opacity: 0.85 };

  const linkRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem 2rem',
    padding: '2rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.92rem',
    transition: 'color 0.3s ease',
  };

  const bottomRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    paddingTop: '2rem',
  };

  const missionTextStyle = {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    maxWidth: '440px',
    margin: 0,
  };

  const copyrightStyle = {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.85rem',
    margin: 0,
  };

  return (
    <footer style={footerStyle}>
      <div style={wrapStyle}>

        {/* Logo + social icons */}
        <div style={topRowStyle}>
          <Link to="/">
            <img src="/coin.png" alt="GIRLFLIESWORLD Logo" style={logoStyle} />
          </Link>
          <div style={socialRowStyle}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.alt}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.alt}
                style={socialCircleStyle}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <img src={s.icon} alt="" style={socialIconStyle} />
              </a>
            ))}
          </div>
        </div>

        {/* Site links */}
        <div style={linkRowStyle}>
          {LINK_ROW.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              style={linkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.color = PINK; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Tagline + copyright */}
        <div style={bottomRowStyle}>
          <p style={missionTextStyle}>
            
            Inspiring the next generation of explorers, scientists and young curious minds to challenge the status quo.
          </p>
          <p style={copyrightStyle}>&copy; 2025 GIRLFLIESWORLD. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
