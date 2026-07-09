import React, { useState, useEffect } from 'react';

const PartnersPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allPartners = [
    {
      name: "AG-NAV",
      role: "Official Geophysics Sponsor",
      logo: "/agnav.png",
      description: "AG-NAV is proud to be GIRLFLIESWORLD's very first sponsor. A leading provider of precision GPS navigation and flow control systems, trusted for aerial geophysical surveys and extreme environment missions — including Antarctica.",      website: "https://www.agnav.com/",
    },
    {
      name: "Platinum Jets International",
      role: "Official Ferry & Aviation Operations Partner",
      logo: "/plaj.png",
      description: "Platinum Jets International (PJI) is a U.S.-based aviation services company specializing in aircraft ferry flights, international flight operations, and global aviation logistics. As the Official Ferry & Aviation Operations Partner of GIRLFLIESWORLD, PJI supports the expedition's seven-continent journey with route planning, permit coordination, and international aviation support.",
      website: "https://platinumjets.org/",
    },
    {
      name: "Reach the World",
      role: "Education Partner",
      logo: "/rtw.png",
      description: "Reach the World is a New York-based nonprofit that has connected classrooms to real-world explorers since 1998 through live virtual exchange. Their Explorer Program previously brought the 2022 Endurance22 expedition — the search for Shackleton's lost ship — to 33,000 students across 29 countries. Reach the World has partnered with GIRLFLIESWORLD to bring the seven-continent expedition into thousands of K-12 classrooms worldwide, with live cockpit check-ins and real-time science as the journey unfolds. As part of RTW's flagship event of the year, this will be a 3-4 month live virtual program where Shannon will dedicate her time during flights to educate and inspire thousands of kids around the world.",
      website: "https://www.reachtheworld.org/",
    },
    {
      name: "Estes Rockets",
role: "Education Partner",
logo: "/estes.png",
description: "Estes Rockets is America's most iconic model rocketry brand, inspiring generations of engineers, scientists, and explorers since 1958. Estes has partnered with GIRLFLIESWORLD to bring the Antarctic expedition into classrooms across America, giving students hands-on experience in aerospace engineering and mission planning.",
website: "https://www.estesrockets.com/",
    },
    {
      name: "SCAR RINGS",
      role: "Scientific Community Engagement",
      logo: "/rings.png",
      description: "Shannon's Antarctic science mission has been invited to present to the DML/EL RINGS project meeting under the Scientific Committee on Antarctic Research (SCAR) RINGS initiative. The planned airborne radar survey addresses a significant data gap across the East Antarctic Plateau and has been recognised as scientifically relevant to ongoing international efforts to improve Antarctic ice-sheet observations.",
      website: "https://scar.org/science/rings/",
    },
    {
      name: "Emergent Ventures",
      role: "Official Supporter",
      logo: "/ge.png",
      description: "Emergent Ventures is championed by influential economist Tyler Cowen, who believes in backing bold, unconventional individuals who think differently. Tyler has personally invested in Shannon and her work across exploration, science, and technology.",
      website: "https://www.mercatus.org/emergent-ventures",
    },
    {
      name: "James Caird Society",
      role: "Supporting Partner",
      logo: "/jc.png",
      description: "The James Caird Society exists to honour the legacy of Sir Ernest Shackleton and promote the values of leadership, courage, and exploration he embodied. Through the support of Official Patron Alexandra Shackleton, GIRLFLIESWORLD is proud to have the backing of the Society as Shannon undertakes her historic solo Antarctic expedition.",
      website: "https://www.jamescairdsociety.com/",
    },
    {
      name: "Dick Smith AC",
      role: "Expedition Sponsor",
      logo: "/ds.png",
      description: "Dick Smith is a legendary Australian aviator, explorer, and entrepreneur who has completed numerous world-record aviation expeditions himself. A passionate supporter of bold aviation endeavours, Dick Smith is a proud sponsor of the GIRLFLIESWORLD expedition.",
      website: "https://dicksmithadventure.com.au/",
    },
    {
      name: "Alexandra Shackleton",
      role: "Official Patron",
      logo: "/as.png",
      description: "Alexandra Shackleton is the granddaughter of Sir Ernest Shackleton — the greatest polar explorer who ever lived. Carrying forward her family's extraordinary legacy of courage and exploration, Alexandra has joined GIRLFLIESWORLD as Official Patron, lending her support to Shannon's historic solo Antarctic expedition.",
      website: "https://ukaht.org/member/the-hon-alexandra-shackleton/",
    },
  ];

  const impactFont = `'Impact', 'Arial Black', sans-serif`;
  const bodyFont = `'Arial', sans-serif`;
  const gold = '#D4AF37';

  const roleTagStyle = {
    display: 'inline-block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#8B6914',
    backgroundColor: '#FDF3D8',
    border: '1px solid #E8CC7A',
    borderRadius: '999px',
    padding: '0.25rem 0.85rem',
    marginBottom: '0.85rem',
  };

  const PartnerCTA = ({ large }) => (
    <div style={{
      background: large ? '#000' : '#fafafa',
      border: large ? 'none' : '1px solid #f0f0f0',
      borderRadius: large ? '0' : '16px',
      padding: large
        ? isMobile ? '4rem 1.5rem' : '6rem 4rem'
        : isMobile ? '2.5rem 1.5rem' : '3rem 4rem',
      textAlign: 'center',
      maxWidth: large ? '100%' : '900px',
      margin: large ? '0' : '0 auto 4rem',
    }}>
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.7rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: large ? 'rgba(255,255,255,0.4)' : '#aaa',
        marginBottom: '1rem',
        fontWeight: 700,
      }}>
        Become a Partner
      </p>

      <h2 style={{
        fontFamily: impactFont,
        fontSize: large
          ? isMobile ? 'clamp(2.5rem, 10vw, 5rem)' : '5rem'
          : isMobile ? '2rem' : '2.75rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        color: large ? '#fff' : '#000',
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        marginBottom: '1.5rem',
      }}>
        {large ? (
          <>Your Brand on the<br /><span style={{ color: gold }}>World Stage</span></>
        ) : (
          <>Want to be Part<br />of <span style={{ color: gold }}>This?</span></>
        )}
      </h2>

      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: isMobile ? '0.9rem' : '1rem',
        lineHeight: 1.8,
        color: large ? 'rgba(255,255,255,0.65)' : '#555',
        maxWidth: '620px',
        margin: '0 auto 2rem',
        fontWeight: 500,
      }}>
        {large
          ? "This expedition will be on BBC, Netflix, CNN, and every major aviation outlet — with a projected audience of over 100 million people. Your brand travels to Antarctica, across seven continents, and into scientific history alongside NASA, Antarctic Exploration Legacy, and Elite universities/Credible Science Organizations. Sponsorship windows are closing ahead of the October 2026 departure. Get in touch to discuss a tailored partnership."
          : "Associate your brand with world-changing science, a historic world record, and a story that will be told for generations. Tailored sponsorship packages are available across aviation, science, education, and media. Departure is October 2026 — partnership windows are limited."}
      </p>

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}>
        <a
          href="mailto:contact@girlfliesworld.com"
          style={{
            backgroundColor: gold,
            color: '#000',
            fontFamily: bodyFont,
            fontWeight: 'bold',
            fontSize: '0.9rem',
            padding: '0.85rem 2rem',
            borderRadius: '999px',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            transition: 'background-color 0.3s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b7972a'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = gold}
        >
          GET IN TOUCH
        </a>
        <a
          href="mailto:contact@girlfliesworld.com"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.85rem',
            color: large ? 'rgba(255,255,255,0.5)' : '#999',
            textDecoration: 'none',
            letterSpacing: '0.03em',
          }}
        >
          contact@girlfliesworld.com
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', backgroundColor: '#ffffff' }}>

      {/* Hero */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '50vh' : '70vh',
        minHeight: '400px',
        backgroundImage: 'url("/open.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: isMobile ? '0 1rem' : '0 4rem',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1,
        }} />
        <div style={{ position: 'relative', zIndex: 2, color: 'white', maxWidth: '800px' }}>
          <h1 style={{
            fontFamily: impactFont,
            fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : '4rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: '1rem',
            lineHeight: 1,
          }}>
            Impact Partners
          </h1>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: isMobile ? '1rem' : '1.25rem',
            lineHeight: 1.6,
            fontWeight: 400,
            maxWidth: '600px',
          }}>
            Be part of a mission to inspire and empower the next generation.
          </p>
        </div>
      </div>

      {/* Partners Grid */}
      <div style={{ padding: isMobile ? '2rem 1.5rem' : '4rem 4rem', backgroundColor: '#fff' }}>
        <h2 style={{
          fontFamily: impactFont,
          fontSize: isMobile ? '2.5rem' : '3rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: '#000',
          marginBottom: '1rem',
          textAlign: 'center',
        }}>
          Our Partners &amp; Sponsors
        </h2>

        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.9rem',
          color: '#888',
          textAlign: 'center',
          marginBottom: '3rem',
          fontWeight: 500,
        }}>
          Proud partners of the GIRLFLIESWORLD expedition — October 2026
        </p>

        {/* Small CTA above grid */}
        <PartnerCTA large={false} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'stretch',
        }}>
          {allPartners.map((partner, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              fontFamily: bodyFont,
              border: '1px solid #f0f0f0',
              borderRadius: '12px',
              padding: '2rem 1.5rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <h3 style={{
                fontFamily: impactFont,
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#000',
                marginBottom: '0.6rem',
              }}>
                {partner.name}
              </h3>

              <span style={roleTagStyle}>{partner.role}</span>

              <div style={{
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                width: '100%',
              }}>
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  style={{
                    maxHeight: '100px',
                    maxWidth: '180px',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <p style={{
                fontSize: '0.875rem',
                lineHeight: 1.7,
                fontWeight: 500,
                fontFamily: "'Outfit', sans-serif",
                color: '#374151',
                textAlign: 'left',
                marginBottom: '1.5rem',
                flexGrow: 1,
              }}>
                {partner.description}
              </p>

              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 'auto',
                  backgroundColor: gold,
                  color: '#000',
                  fontFamily: bodyFont,
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  transition: 'background-color 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b7972a'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = gold}
              >
                FIND OUT MORE
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Large CTA at bottom */}
      <PartnerCTA large={true} />

    </div>
  );
};

export default PartnersPage;
