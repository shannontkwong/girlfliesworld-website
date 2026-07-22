import React, { useState, useEffect } from 'react';

/**
 * PartnersPage — full redesign matching the a16z "Strategic Partnerships"
 * reference, not a recolor of the previous version:
 *
 *  - Deep maroon solid background with a repeating interlocking-lattice
 *    pattern (built from three overlapping CSS repeating-linear-gradients,
 *    since a hand-drawn CSS approximation gets the same visual texture
 *    without needing an SVG/image asset).
 *  - No photographic hero — the reference has none. Just a large serif
 *    headline and a short intro paragraph directly on the pattern.
 *  - Every partner is now a large tile (not a small card): logo, role,
 *    description, and a "Find Out More" link with the reference's long
 *    arrow flourish — arranged 2-per-row with hairline dividers, exactly
 *    like the Booz Allen / Lilly tiles in the reference.
 *  - Real logos here are full-color (not white monochrome wordmarks like
 *    the reference's Booz Allen/Lilly), so each sits on a small light
 *    plate for legibility rather than directly on the maroon — the one
 *    deliberate deviation, made for a real reason rather than by accident.
 *  - The "Become a Partner" pitch is folded into a final full-width tile
 *    at the end of the grid, using the exact same tile treatment, instead
 *    of two separate CTA blocks bookending the page — closer to how
 *    understated the reference's whole layout is.
 *
 * All partner data (names, roles, logos, descriptions, websites) is
 * completely unchanged — this pass is visual/layout only.
 */

const MAROON = '#4A1420';
const MAROON_DEEP = '#3A0F19';
const CREAM = '#F3ECE3';
const CREAM_MUTE = 'rgba(243,236,227,0.72)';
const CREAM_FAINT = 'rgba(243,236,227,0.45)';
const HAIRLINE = 'rgba(243,236,227,0.16)';

const ArrowLink = ({ href, children, external = true }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.85rem',
      fontFamily: "'Lora', Georgia, serif",
      fontStyle: 'italic',
      fontSize: '1rem',
      color: CREAM,
      textDecoration: 'none',
    }}
    className="pp-arrow-link"
  >
    {children}
    <svg width="42" height="10" viewBox="0 0 42 10" fill="none" style={{ flexShrink: 0 }}>
      <line x1="0" y1="5" x2="34" y2="5" stroke={CREAM} strokeWidth="1" />
      <path d="M30 1 L35 5 L30 9" stroke={CREAM} strokeWidth="1" fill="none" />
    </svg>
  </a>
);

const PartnerTile = ({ partner }) => (
  <div style={{
    border: `1px solid ${HAIRLINE}`,
    background: 'rgba(243,236,227,0.03)',
    padding: '3.5rem 2.5rem',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '460px',
  }}>
    <div style={{
      background: '#FBF8F3',
      borderRadius: '8px',
      height: '110px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem 1.5rem',
      marginBottom: '1.5rem',
      alignSelf: 'flex-start',
      maxWidth: '260px',
    }}>
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        style={{ maxHeight: '80px', maxWidth: '220px', width: 'auto', objectFit: 'contain' }}
        onError={e => { e.currentTarget.style.display = 'none'; }}
      />
    </div>

    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: CREAM_FAINT,
      marginBottom: '1rem',
    }}>
      {partner.role}
    </p>

    <h3 style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: '1.6rem',
      fontWeight: 600,
      color: CREAM,
      marginBottom: '1rem',
      lineHeight: 1.2,
    }}>
      {partner.name}
    </h3>

    <p style={{
      fontFamily: "'Lora', Georgia, serif",
      fontSize: '0.98rem',
      lineHeight: 1.75,
      color: CREAM_MUTE,
      marginBottom: '2rem',
      flex: 1,
    }}>
      {partner.description}
    </p>

    <ArrowLink href={partner.website}>Find Out More</ArrowLink>
  </div>
);

const PartnersPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const allPartners = [
    {
      name: "AG-NAV",
      role: "Official Geophysics Sponsor",
      logo: "/agnav.png",
      description: "AG-NAV is proud to be GIRLFLIESWORLD's very first sponsor. A leading provider of precision GPS navigation and flow control systems, trusted for aerial geophysical surveys and extreme environment missions — including Antarctica.",
      website: "https://www.agnav.com/",
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

  return (
    <>
      <style>{`
        .pp-root {
          background-color: ${MAROON};
          background-image:
            repeating-linear-gradient(60deg, rgba(243,236,227,0.035) 0px, rgba(243,236,227,0.035) 1px, transparent 1px, transparent 70px),
            repeating-linear-gradient(-60deg, rgba(243,236,227,0.035) 0px, rgba(243,236,227,0.035) 1px, transparent 1px, transparent 70px),
            repeating-linear-gradient(0deg, rgba(243,236,227,0.02) 0px, rgba(243,236,227,0.02) 1px, transparent 1px, transparent 70px);
          min-height: 100vh;
        }
        .pp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 900px) {
          .pp-grid { grid-template-columns: 1fr; }
        }
        .pp-arrow-link svg line, .pp-arrow-link svg path { transition: stroke 0.25s ease; }
        .pp-arrow-link:hover { color: #fff; }
        .pp-arrow-link:hover svg line, .pp-arrow-link:hover svg path { stroke: #fff; }
      `}</style>

      <div className="pp-root">

        {/* HERO — text only, no photo, matching the reference exactly */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '5rem 1.5rem 3rem' : '7rem 4rem 4rem' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.2rem)' : 'clamp(3.2rem, 5.5vw, 4.6rem)',
            fontWeight: 600,
            color: CREAM,
            marginTop: '4rem',
            lineHeight: 1.1,
          }}>
            Strategic Partnerships
          </h1>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: isMobile ? '1.05rem' : '1.25rem',
            lineHeight: 1.85,
            color: CREAM_MUTE,
            maxWidth: '820px',
          }}>
            An independent solo expedition only reaches as far as the people and institutions
            willing to stand behind it. Our partners bring the aviation expertise, scientific
            credibility, and educational reach that turn one pilot's plan into a mission the
            world can trust — and follow.
          </p>
        </div>

        {/* TILE GRID */}
        <div className="pp-grid">
          {allPartners.map((partner, i) => (
            <PartnerTile key={i} partner={partner} />
          ))}

          {/* CTA — same tile treatment, folded into the grid rather than
              bookending the page with separate blocks */}
          <div style={{
            border: `1px solid ${HAIRLINE}`,
            background: MAROON_DEEP,
            padding: isMobile ? '3rem 1.75rem' : '4rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gridColumn: isMobile ? 'auto' : '1 / -1',
            minHeight: '380px',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: CREAM_FAINT,
              marginBottom: '1rem',
            }}>
              Become a Partner
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: isMobile ? '2rem' : '2.8rem',
              fontWeight: 600,
              color: CREAM,
              marginBottom: '1.25rem',
              lineHeight: 1.15,
              maxWidth: '600px',
            }}>
              Want to be part of this?
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '1rem',
              lineHeight: 1.8,
              color: CREAM_MUTE,
              maxWidth: '640px',
              marginBottom: '2rem',
            }}>
              This expedition will be on BBC, Netflix, CNN, and every major aviation outlet, with
              a projected audience of over 100 million people. Your brand travels to Antarctica,
              across seven continents, and into scientific history. Sponsorship windows are
              closing ahead of the October 2026 departure.
            </p>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', alignItems: isMobile ? 'flex-start' : 'center' }}>
              <ArrowLink href="mailto:contact@girlfliesworld.com" external={false}>Get In Touch</ArrowLink>
              <a href="mailto:contact@girlfliesworld.com" style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: CREAM_FAINT, textDecoration: 'none',
              }}>
                contact@girlfliesworld.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default PartnersPage;
