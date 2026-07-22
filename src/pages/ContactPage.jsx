import React, { useState, useEffect } from 'react';
import SocialMediaSection from '../components/home/SocialMediaSection';
import Footer from '../components/layout/Footer';

// ⚠️ Keep this in sync with the same constant in Navigation.jsx and HeroSection.jsx
// Create it in Stripe Dashboard → Payment Links → New. No backend/API keys needed —
// Stripe hosts the actual checkout, so this is fully PCI-compliant out of the box.
const STRIPE_PAYMENT_LINK = 'https://donate.stripe.com/dRm9AV8k0bCCgiBbCEdZ601';

const PAPER = '#F5F2EB';
const INK = '#111111';
const MUTE = '#5b5748';
const HAIRLINE = 'rgba(17,17,17,0.12)';

const ContactPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = document.getElementById('site-header');
    if (el) setHeaderHeight(el.getBoundingClientRect().height);
    const handler = (e) => setHeaderHeight(e.detail.height);
    window.addEventListener('site-header-resize', handler);
    return () => window.removeEventListener('site-header-resize', handler);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
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
      href: 'https://www.facebook.com/shannontkwong/',
      icon: 'https://img.icons8.com/windows/32/facebook-f--v1.png',
      alt: 'Facebook'
    },
    {
      href: 'https://www.youtube.com/channel/UCXQmU6WEELqxfk7sMPIQXXg',
      icon: 'https://img.icons8.com/sf-black-filled/64/youtube-play.png',
      alt: 'YouTube'
    }
  ];

  const FundSection = ({ mobile }) => (
    <div style={{
      background: '#fff',
      border: `1px solid ${HAIRLINE}`,
      borderRadius: '16px',
      padding: mobile ? '1.75rem' : '2.5rem',
      marginBottom: '2rem',
      color: INK,
    }}>
      <h3 style={{
        fontFamily: "'Lora', Georgia, serif",
        fontSize: mobile ? '1.3rem' : '1.5rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        margin: '0 0 0.75rem 0',
        letterSpacing: '0.005em',
      }}>
        Help Fund the Mission
      </h3>
      <p style={{
        margin: '0 0 1.5rem 0',
        fontFamily: "'Lora', Georgia, serif",
        fontSize: mobile ? '0.9rem' : '1rem',
        lineHeight: 1.7,
        color: MUTE,
      }}>
        The expedition is currently 15% funded. Every contribution — big or small —
        goes directly toward the aircraft, permits, insurance, and radar integration
        that make this flight possible.
      </p>
      <a
        href={STRIPE_PAYMENT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: INK,
          color: PAPER,
          fontFamily: "'Inter', sans-serif",
          padding: mobile ? '0.85rem 1.75rem' : '1rem 2.25rem',
          borderRadius: '999px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: mobile ? '0.85rem' : '0.9rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          border: `1px solid ${INK}`,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INK; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.color = PAPER; }}
      >
        Contribute via Stripe
      </a>
      <p style={{ margin: '1rem 0 0 0', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: MUTE }}>
        Secure checkout powered by Stripe. Want to sponsor at a larger level or
        become a strategic partner instead? Reach out at{' '}
        <a href="mailto:contact@girlfliesworld.com" style={{ color: INK, fontWeight: 700 }}>
          contact@girlfliesworld.com
        </a>.
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{ paddingTop: `${headerHeight}px`, minHeight: '100vh', background: PAPER, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          background: PAPER, padding: '4rem 1.5rem', color: INK, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flex: 1,
        }}>
          <h1 style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(2.6rem, 9vw, 3.6rem)',
            fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.05, margin: '0 0 1.5rem 0',
          }}>
            Let's Connect
          </h1>

          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: '1rem', lineHeight: 1.6,
            margin: '0 0 2rem 0', color: MUTE, textAlign: 'center', maxWidth: '400px',
          }}>
            Ready to support the journey or share our story? We'd love to hear from you.
          </p>

          <div style={{ width: '100%', maxWidth: '400px' }}>
            <FundSection mobile />
          </div>

          <div style={{ marginBottom: '3rem', width: '100%', maxWidth: '400px' }}>
            <div style={{ marginBottom: '1.25rem', padding: '1.5rem', background: '#fff', border: `1px solid ${HAIRLINE}`, borderRadius: '15px', textAlign: 'left' }}>
              <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.05rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 0.5rem 0', color: INK }}>
                General Inquiries
              </h3>
              <a href="mailto:contact@girlfliesworld.com" style={{ color: INK, textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 600, display: 'block' }}>
                contact@girlfliesworld.com
              </a>
              <p style={{ margin: '0.5rem 0 0 0', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: MUTE }}>
                Sponsorship & Partnership Requests
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#fff', border: `1px solid ${HAIRLINE}`, borderRadius: '15px', textAlign: 'left', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.05rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 0.5rem 0', color: INK }}>
                Press & Media
              </h3>
              <a href="mailto:press@girlfliesworld.com" style={{ color: INK, textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 600, display: 'block' }}>
                press@girlfliesworld.com
              </a>
              <p style={{ margin: '0.5rem 0 0 0', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: MUTE }}>
                Media Inquiries & Interview Requests
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: MUTE }}>
              Follow:
            </span>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                <img
                  style={{ width: '30px', height: '30px', filter: 'brightness(0)', opacity: 0.75, transition: 'all 0.3s ease' }}
                  src={link.icon}
                  alt={link.alt}
                  onMouseOver={(e) => { e.target.style.opacity = 1; e.target.style.transform = 'translateY(-3px)'; }}
                  onMouseOut={(e) => { e.target.style.opacity = 0.75; e.target.style.transform = 'translateY(0)'; }}
                />
              </a>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', width: '100%', height: '40vh', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src="/tailwheel.png"
            alt="Shannon walking"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(100%)' }}
          />
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
            <p style={{
              margin: 0, color: '#fff', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic',
              fontSize: '1rem', fontWeight: 500, lineHeight: 1.4, textShadow: '2px 2px 4px rgba(0,0,0,0.8)', textAlign: 'center',
            }}>
              Breaking barriers, inspiring change.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: `${headerHeight}px`, minHeight: '100vh', display: 'flex', background: PAPER, flexDirection: 'column' }}>
      <section style={{ flex: 1, display: 'flex', minHeight: `calc(100vh - ${headerHeight}px)` }}>
        <div style={{ width: '45%', background: PAPER, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2.5rem', position: 'relative' }}>
          <div style={{ width: '100%', color: INK }}>
            <h1 style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(3rem, 4vw, 4rem)', fontWeight: 700,
              textTransform: 'uppercase', lineHeight: 1.05, margin: '0 0 2rem 0', textAlign: 'left',
            }}>
              Let's<br />Connect
            </h1>

            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 400, color: MUTE, textAlign: 'left', marginBottom: '1.5rem' }}>
              Ready to support the journey or share our story?
              <br />We'd love to hear from you.
            </p>

            <FundSection />

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1.25rem', padding: '1.5rem', background: '#fff', border: `1px solid ${HAIRLINE}`, borderRadius: '15px' }}>
                <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 0.5rem 0', color: INK }}>
                  General Inquiries
                </h3>
                <a href="mailto:contact@girlfliesworld.com" style={{ color: INK, textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', fontWeight: 600, display: 'block' }}>
                  contact@girlfliesworld.com
                </a>
                <p style={{ margin: '0.5rem 0 0 0', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: MUTE }}>
                  Sponsorship & Partnership Requests
                </p>
              </div>

              <div style={{ padding: '1.5rem', background: '#fff', border: `1px solid ${HAIRLINE}`, borderRadius: '15px' }}>
                <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 0.5rem 0', color: INK }}>
                  Press & Media
                </h3>
                <a href="mailto:press@girlfliesworld.com" style={{ color: INK, textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', fontWeight: 600, display: 'block' }}>
                  press@girlfliesworld.com
                </a>
                <p style={{ margin: '0.5rem 0 0 0', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: MUTE }}>
                  Media Inquiries & Interview Requests
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: MUTE }}>
                Follow:
              </span>
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                  <img
                    style={{ width: '30px', height: '30px', filter: 'brightness(0)', opacity: 0.75, transition: 'all 0.3s ease' }}
                    src={link.icon}
                    alt={link.alt}
                    onMouseOver={(e) => { e.target.style.opacity = 1; e.target.style.transform = 'translateY(-3px)'; }}
                    onMouseOut={(e) => { e.target.style.opacity = 0.75; e.target.style.transform = 'translateY(0)'; }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: '55%', position: 'relative', overflow: 'hidden', background: '#f5f5f5' }}>
          <img
            src="/tailwheel.png"
            alt="Shannon walking"
            style={{
              width: '130%', height: '100%', objectFit: 'cover', objectPosition: 'center',
              filter: 'grayscale(100%) contrast(1.1)', transform: 'translateX(-15%)',
            }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px',
            background: 'linear-gradient(to top, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.3) 50%, transparent 100%)',
            zIndex: 1,
          }} />
          <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', right: '3rem', zIndex: 2 }}>
            <p style={{
              margin: 0, color: '#fff', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic',
              fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.4, textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}>
              Breaking barriers, inspiring change.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
