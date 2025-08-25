import React, { useState, useEffect } from 'react';
import SocialMediaSection from '../components/home/SocialMediaSection';
import Footer from '../components/layout/Footer';

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

  if (isMobile) {
    return (
      <div style={{
        paddingTop: '60px',
        minHeight: '100vh',
        background:'black',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Mobile Blue Content Section */}
        <div style={{
          background: '#3583FD',
          padding: '4rem 1.5rem',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flex: 1,
        }}>
          {/* Main title */}
          <h1 style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 4rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            margin: '0 0 1.5rem 0',
            letterSpacing: '-0.02em',
          }}>
            LET'S CONNECT
          </h1>

          {/* Subtitle */}
          <p style={{
    fontSize: '0.875rem',
    lineHeight: 1.4,
            margin: '0 0 2rem 0',
            fontWeight: 400,
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: '400px',
          }}>
            Ready to support the journey or share our story? We'd love to hear from you.
          </p>

          {/* Contact information - same as desktop */}
          <div style={{
            marginBottom: '3rem',
            width: '100%',

            maxWidth: '400px',
          }}>
            {/* General contact */}
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',

              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              textAlign: 'left',
            }}>
              <h3 style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                margin: '0 0 0.5rem 0',
                letterSpacing: '0.02em',
              }}>
                General Inquiries
              </h3>
              <a href="mailto:contact@girlfliesworld.com" style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                display: 'block',
              }}>
                contact@girlfliesworld.com
              </a>
              <p style={{
                margin: '0.5rem 0 0 0',
                fontSize: '0.85rem',
                opacity: 0.8,
              }}>
                Sponsorship & Partnership Requests
              </p>
            </div>

            {/* Press contact */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)',
              textAlign: 'left',
              marginBottom: '2rem',
            }}>
              <h3 style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                margin: '0 0 0.5rem 0',
                letterSpacing: '0.02em',
              }}>
                Press & Media
              </h3>
              <a href="mailto:press@girlfliesworld.com" style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                display: 'block',
              }}>
                press@girlfliesworld.com
              </a>
              <p style={{
                margin: '0.5rem 0 0 0',
                fontSize: '0.85rem',
                opacity: 0.8,
              }}>
                Media Inquiries & Interview Requests
              </p>
            </div>
          </div>

          {/* Social links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              opacity: 0.8,
            }}>
              Follow:
            </span>
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  style={{
                    width: '32px',
                    height: '32px',
                    filter: 'brightness(0) invert(1)',
                    opacity: 1,
                    transition: 'all 0.3s ease',
                  }}
                  src={link.icon} 
                  alt={link.alt}
                  onMouseOver={(e) => {
                    e.target.style.opacity = 1;
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = 1;
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Image Section */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '40vh',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <img
            src="/walk.png"
            alt="Shannon walking"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'grayscale(100%)',
            }}
          />
          
          {/* Text overlay */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
          }}>
            <p style={{
              margin: 0,
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}>
              Breaking barriers, inspiring change.
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      display: 'flex',
      background:'black',
      flexDirection: 'column',
    }}>
      <section style={{
        flex: 1,
        display: 'flex',
        minHeight: 'calc(100vh - 80px)',
      }}>
        {/* Left side - Blue background with content */}
        <div style={{
          width: '45%',
          background: '#3583FD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 2.5rem',
          position: 'relative',
        }}>
          <div style={{
            width: '100%',
            color: '#fff',
          }}>
            {/* Main title */}
            <h1 style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 'clamp(4rem, 4vw, 5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              lineHeight: 0.9,
              margin: '0 0 2rem 0',
              letterSpacing: '-0.02em',
              textAlign: 'left',
            }}>
              LET'S
              <br />
              CONNECT
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '0.875rem',
              lineHeight: 1.6,
              fontWeight: '500',
              color: 'white',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              Ready to support the journey or share our story? 
              <br />We'd love to hear from you.
            </p>

            {/* Contact information */}
            <div style={{
              marginBottom: '3rem',
            }}>
              {/* General contact */}
              <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
              }}>
                <h3 style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  margin: '0 0 0.5rem 0',
                  letterSpacing: '0.02em',
                }}>
                  General Inquiries
                </h3>
                <a href="mailto:contact@girlfliesworld.com" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  display: 'block',
                }}>
                  contact@girlfliesworld.com
                </a>
                <p style={{
                  margin: '0.5rem 0 0 0',
                  fontSize: '0.9rem',
                  opacity: 0.8,
                }}>
                  Sponsorship & Partnership Requests
                </p>
              </div>

              {/* Press contact */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
              }}>
                <h3 style={{
                  fontFamily: "'Impact', 'Arial Black', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  margin: '0 0 0.5rem 0',
                  letterSpacing: '0.02em',
                }}>
                  Press & Media
                </h3>
                <a href="mailto:press@girlfliesworld.com" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  display: 'block',
                }}>
                  press@girlfliesworld.com
                </a>
                <p style={{
                  margin: '0.5rem 0 0 0',
                  fontSize: '0.9rem',
                  opacity: 0.8,
                }}>
                  Media Inquiries & Interview Requests
                </p>
              </div>
            </div>

            {/* Social links */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: 0.8,
              }}>
                Follow:
              </span>
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    style={{
                      width: '32px',
                      height: '32px',
                      filter: 'brightness(0) invert(1)',
                      opacity: 1,
                      transition: 'all 0.3s ease',
                    }}
                    src={link.icon} 
                    alt={link.alt}
                    onMouseOver={(e) => {
                      e.target.style.opacity = 1;
                      e.target.style.transform = 'translateY(-3px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = 1;
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div style={{
          width: '55%',
          position: 'relative',
          overflow: 'hidden',
          background: '#f5f5f5',
        }}>
          <img
            src="/walk.png"
            alt="Shannon walking"
            style={{
              width: '130%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'grayscale(100%) contrast(1.1)',
              transform: 'translateX(-15%)',
            }}
          />
          
          {/* Black gradient overlay at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
            zIndex: 1,
          }} />
          
          {/* Text overlay on image */}
          <div style={{
            position: 'absolute',
            bottom: '3rem',
            left: '3rem',
            right: '3rem',
            zIndex: 2,
          }}>
            <p style={{
              margin: 0,
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 400,
              lineHeight: 1.4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}>
              Breaking barriers, inspiring change.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
