import React, { useState, useEffect, useRef } from 'react';
import RouteGlobe from '../components/home/RouteGlobe';
import JourneyTradingCards from '../components/journey/JourneyTradingCards';

/**
 * JourneyPage — restores the full leg-by-leg flight schedule table and
 * the "fun facts" stat cards that existed before the earlier rebuild
 * condensed everything down to the 8-continent narrative timeline.
 * Both are back now, redesigned in the navy/gold system rather than
 * however they looked previously:
 *
 *  - FUN CARDS: a row of quick, playful stat cards (longest ground stop,
 *    Antarctic weather standby, southernmost point, etc.) — hover-lift
 *    panels, gold numerals, one glance each.
 *  - FULL SCHEDULE TABLE: every leg of the actual route, From / To /
 *    Date / Note, in one continuous table — gold header row, hairline
 *    row dividers, a hover highlight per row, small gold pills for notes
 *    like "Pat. Fields" or "SP transit."
 *
 * Placed between the intro and the narrative timeline: quick facts
 * first, then the exact schedule for anyone who wants the specifics,
 * then the continent-by-continent story version, then the globe.
 *
 * NOTE ON THE LEG COUNT: this schedule has 38 rows (matching the
 * original itinerary you provided). The stats row elsewhere on this
 * page still says "41 Legs," a figure already established across other
 * parts of the site (Hero, StatsSection). Worth reconciling to one
 * number everywhere — flagging rather than silently picking one.
 */

const NAVY = '#0B1330';
const NAVY_DEEP = '#070B1E';
const HAIRLINE = 'rgba(237,231,218,0.14)';
const CREAM = '#EDE7DA';
const CREAM_MUTE = 'rgba(237,231,218,0.62)';
const CREAM_FAINT = 'rgba(237,231,218,0.4)';
const GOLD = '#C9A227';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1758012391343-646478edd27b?auto=format&fit=crop&w=1800&q=80',
  uk: 'https://images.unsplash.com/photo-1652396516791-3366ca227954?auto=format&fit=crop&w=900&q=80',
  atlantic: 'https://images.unsplash.com/photo-1459789867050-92376a5e7fab?auto=format&fit=crop&w=900&q=80',
  americas: 'https://images.unsplash.com/photo-1483631224226-a219224bb76e?auto=format&fit=crop&w=900&q=80',
  antarctica: 'https://images.unsplash.com/photo-1759675739458-6e5a4a60a117?auto=format&fit=crop&w=900&q=80',
  africa: 'https://images.unsplash.com/photo-1744604030401-b24c5975a574?auto=format&fit=crop&w=900&q=80',
  asia: 'https://images.unsplash.com/photo-1776679768423-114637549209?auto=format&fit=crop&w=900&q=80',
  middleeast: 'https://images.unsplash.com/photo-1689770429297-bb8488af924c?auto=format&fit=crop&w=900&q=80',
  europe: 'https://images.unsplash.com/photo-1696519669474-3001c0e2b548?auto=format&fit=crop&w=900&q=80',
};

// ---- Full leg-by-leg schedule, restored ----
const SCHEDULE = [
  { from: 'Popham (EGHP)', to: 'Wick (EGPC)', date: '10/07/2026', note: '' },
  { from: 'Wick (EGPC)', to: 'Reykjavik (BIRK)', date: '10/09/2026', note: '' },
  { from: 'Reykjavik (BIRK)', to: 'Nuuk (BGQO)', date: '10/10/2026', note: '' },
  { from: 'Nuuk (BGQO)', to: 'Goose Bay (CYYR)', date: '10/11/2026', note: '' },
  { from: 'Goose Bay (CYYR)', to: 'Bangor (KBGR)', date: '10/12/2026', note: '' },
  { from: 'Bangor (KBGR)', to: 'Belmar (KBLM)', date: '10/14/2026', note: '' },
  { from: 'Belmar (KBLM)', to: 'Nashville (KJWN)', date: '10/15/2026', note: '' },
  { from: 'Nashville (KJWN)', to: 'Springdale (KASG)', date: '10/16/2026', note: '' },
  { from: 'Springdale (KASG)', to: 'Atlanta (KFFC)', date: '10/17/2026', note: '' },
  { from: 'Atlanta (KFFC)', to: 'Vero Beach (KVRB)', date: '10/25/2026', note: '' },
  { from: 'Vero Beach (KVRB)', to: 'Nassau (MYNN)', date: '10/26/2026', note: '' },
  { from: 'Nassau (MYNN)', to: 'Providenciales (TUPJ)', date: '10/27/2026', note: '' },
  { from: 'Providenciales (TUPJ)', to: 'Bel\u00e9m (SBBE)', date: '10/28/2026', note: '' },
  { from: 'Bel\u00e9m (SBBE)', to: 'Trinidad (SLTR)', date: '10/30/2026', note: '' },
  { from: 'Trinidad (SLTR)', to: 'Asunci\u00f3n (SGAS)', date: '10/31/2026', note: '' },
  { from: 'Asunci\u00f3n (SGAS)', to: 'Santiago (SCEL)', date: '11/01/2026', note: '' },
  { from: 'Santiago (SCEL)', to: 'Ushuaia (SAWH)', date: '11/02/2026', note: 'Pat. Fields' },
  { from: 'Ushuaia (SAWH)', to: 'Stanley (SAWB)', date: '11/03/2026', note: '' },
  { from: 'Stanley (SAWB)', to: "Wolf's Fang / Novo", date: '12/01/2026', note: '' },
  { from: "Wolf's Fang / Novo", to: "Wolf's Fang / Novo", date: '12/04/2026', note: 'SP transit' },
  { from: "Wolf's Fang / Novo", to: 'Cape Town (FACT)', date: '12/07/2026', note: '' },
  { from: 'Cape Town (FACT)', to: 'Antananarivo (FMMI)', date: '12/11/2026', note: '' },
  { from: 'Antananarivo (FMMI)', to: 'Mal\u00e9 (VRMG)', date: '12/14/2026', note: '' },
  { from: 'Mal\u00e9 (VRMG)', to: 'Cocos Islands (YPCC)', date: '12/17/2026', note: '' },
  { from: 'Cocos Islands (YPCC)', to: 'Karratha (YPKA)', date: '12/20/2026', note: '' },
  { from: 'Karratha (YPKA)', to: 'Darwin (YPDN)', date: '12/21/2026', note: '' },
  { from: 'Darwin (YPDN)', to: 'Ambon (WAPP)', date: '12/22/2026', note: '' },
  { from: 'Ambon (WAPP)', to: 'General Santos (RPMR)', date: '12/24/2026', note: '' },
  { from: 'General Santos (RPMR)', to: 'Manila (RPLL)', date: '12/25/2026', note: '' },
  { from: 'Manila (RPLL)', to: 'Hong Kong (VHHH)', date: '12/26/2026', note: '' },
  { from: 'Hong Kong (VHHH)', to: 'Cam Ranh (VVCR)', date: '12/27/2026', note: '' },
  { from: 'Cam Ranh (VVCR)', to: 'Bangkok (VTBD)', date: '12/29/2026', note: '' },
  { from: 'Bangkok (VTBD)', to: 'Kolkata (VEBS)', date: '12/30/2026', note: '' },
  { from: 'Kolkata (VEBS)', to: 'Ahmedabad (VAAH)', date: '12/31/2026', note: '' },
  { from: 'Ahmedabad (VAAH)', to: 'Muscat (OOMS)', date: '01/01/2027', note: '' },
  { from: 'Muscat (OOMS)', to: 'Riyadh (OERK)', date: '01/03/2027', note: '' },
  { from: 'Riyadh (OERK)', to: 'Hurghada (HEGN)', date: '01/04/2027', note: '' },
  { from: 'Hurghada (HEGN)', to: 'Santorini (LGST)', date: '01/05/2027', note: '' },
  { from: 'Santorini (LGST)', to: 'Cannes (LFMD)', date: '', note: 'Finish' },
];

// ---- Fun facts, restored ----
const FUN_FACTS = [
  { num: '38', label: 'Legs In The Schedule' },
  { num: '8', unit: 'Days', label: 'Longest Ground Stop \u2014 Atlanta' },
  { num: '4', unit: 'Weeks', label: 'Antarctic Weather Standby' },
  { num: '90\u00b0S', label: 'Southernmost Point' },
  { num: '36', label: 'Countries Crossed' },
  { num: '3', unit: 'Months', label: 'Door To Door' },
];

const TIMELINE = [
  { tag: 'Departure', title: 'United Kingdom', text: 'Popham, October 2026 \u2014 wheels up on a solo circumnavigation no woman has completed westbound in an aircraft like this.', image: IMG.uk },
  { tag: 'Leg 1', title: 'The North Atlantic', text: 'Wick, Reykjavik, Nuuk, Goose Bay \u2014 island-hopping the same cold-weather corridor ferry pilots have flown for decades, alone.', image: IMG.atlantic },
  { tag: 'Leg 2', title: 'The Americas', text: 'Bangor to Nassau to Santiago \u2014 a full run down two continents, closing on the gateway to Antarctica.', image: IMG.americas },
  { tag: 'Leg 3', title: 'Antarctica & The South Pole', text: 'Ushuaia, Stanley, Wolf\u2019s Fang, and an unsupported crossing to 90\u00b0S \u2014 the first solo flight to the South Pole by a woman.', image: IMG.antarctica },
  { tag: 'Leg 4', title: 'Africa & The Indian Ocean', text: 'Cape Town to Antananarivo to Mal\u00e9 \u2014 open ocean, island strips, and some of the longest overwater legs of the whole route.', image: IMG.africa },
  { tag: 'Leg 5', title: 'Australia & Southeast Asia', text: 'Cocos Islands, Karratha, Darwin, Ambon \u2014 crossing into the Pacific rim on the final stretch home.', image: IMG.asia },
  { tag: 'Leg 6', title: 'The Middle East', text: 'Bangkok to Muscat to Riyadh \u2014 desert corridors and some of the busiest airspace on the entire route.', image: IMG.middleeast },
  { tag: 'Arrival', title: 'Return To Europe', text: 'Hurghada, Santorini, Cannes \u2014 the circumnavigation closes where every solo record attempt eventually has to: back home.', image: IMG.europe },
];

const TYPED_LINE = 'Seven continents. One aircraft. No one flying it but me.';

const PlaneIcon = ({ size = 22, color = GOLD, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={style} aria-hidden="true">
    <path d="M2 34 L26 30 L40 8 L46 8 L38 30 L58 30 L62 34 L58 38 L38 38 L46 58 L40 58 L26 38 L2 34 Z" fill={color} />
  </svg>
);

const Footer = () => (
  <footer style={{ background: NAVY_DEEP, color: CREAM, padding: '4rem 2rem 2rem', borderTop: `1px solid ${HAIRLINE}` }}>
    <style>{`
      .jf-footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; align-items: start; }
      @media (max-width: 768px) { .jf-footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } .jf-footer-logo-col { grid-column: 1 / -1; align-items: center !important; } }
      @media (max-width: 480px) { .jf-footer-grid { grid-template-columns: 1fr; } }
    `}</style>
    <div className="jf-footer-grid">
      <div>
        <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.25rem', color: 'rgb(255, 30, 154)' }}>Info</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[['About Me', '/aboutme'], ['The Science', '/science'], ['Contact', '/contact']].map(([label, href]) => (
            <li key={href} style={{ marginBottom: '0.75rem' }}><a href={href} style={{ color: CREAM_MUTE, textDecoration: 'none', fontSize: '0.95rem', fontFamily: "'Lora', Georgia, serif" }}>{label}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.25rem', color: 'rgb(255, 30, 154)' }}>Explore</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[['The Journey', '/journey'], ['Become a Sponsor', '/sponsors'], ['Blog', '/blog']].map(([label, href]) => (
            <li key={href} style={{ marginBottom: '0.75rem' }}><a href={href} style={{ color: CREAM_MUTE, textDecoration: 'none', fontSize: '0.95rem', fontFamily: "'Lora', Georgia, serif" }}>{label}</a></li>
          ))}
        </ul>
      </div>
      <div className="jf-footer-logo-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
        <img src='/si.png' alt="GIRLFLIESWORLD Logo" style={{ maxWidth: '180px', height: 'auto', marginBottom: '1rem' }} />
        <p style={{ color: CREAM_MUTE, fontFamily: "'Lora', Georgia, serif", fontSize: '0.9rem', lineHeight: '1.6', margin: 0, maxWidth: '280px' }}>
          First woman to fly solo to all 7 continents and the South Pole.
        </p>
      </div>
    </div>
    <div style={{ textAlign: 'center', paddingTop: '2rem', marginTop: '2rem', borderTop: `1px solid ${HAIRLINE}`, opacity: 0.5, fontSize: '0.85rem', fontFamily: "'Lora', Georgia, serif" }}>
      <p style={{ margin: 0 }}>&copy; 2025 GIRLFLIESWORLD. All rights reserved.</p>
    </div>
  </footer>
);

const Reveal = ({ children, className = '', style = {} }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {children}
    </div>
  );
};

const TimelineItem = ({ item, index, isMobile }) => {
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
  const ref = useRef(null);
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const textBlock = (
    <div style={{ flex: 1, textAlign: isMobile ? 'center' : (fromLeft ? 'right' : 'left') }}>
      <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '0.85rem', color: GOLD, marginBottom: '0.4rem' }}>{item.tag}</p>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.7rem', fontWeight: 600, color: CREAM, textTransform: 'uppercase', marginBottom: '0.6rem', lineHeight: 1.15 }}>{item.title}</h3>
      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '0.92rem', color: CREAM_MUTE, lineHeight: 1.7, margin: '0 auto', maxWidth: '360px' }}>{item.text}</p>
    </div>
  );

  const imageBlock = (
    <div style={{ flex: 1, display: 'flex', justifyContent: isMobile ? 'center' : (fromLeft ? 'flex-start' : 'flex-end') }}>
      <div style={{ width: '100%', maxWidth: '320px', height: '200px', border: `1px solid ${HAIRLINE}`, overflow: 'hidden', borderRadius: '4px', background: 'rgba(237,231,218,0.03)' }}>
        {!imgError ? (
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.9) brightness(0.95)' }} onError={() => setImgError(true)} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', color: CREAM_FAINT, fontSize: '0.9rem' }}>{item.title}</div>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : (fromLeft ? 'row' : 'row-reverse'),
        alignItems: 'center',
        gap: isMobile ? '1.25rem' : '3rem',
        position: 'relative',
        padding: isMobile ? '2rem 0' : '3rem 0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {!isMobile && (
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: '12px', height: '12px', borderRadius: '50%',
          background: visible ? GOLD : 'rgba(237,231,218,0.2)',
          border: `2px solid ${NAVY}`, boxShadow: `0 0 0 1px ${HAIRLINE}`,
          transition: 'background 0.5s ease', zIndex: 2,
        }} />
      )}
      {isMobile ? (<>{imageBlock}{textBlock}</>) : fromLeft ? (<>{textBlock}{imageBlock}</>) : (<>{imageBlock}{textBlock}</>)}
    </div>
  );
};

const JourneyPage = () => {
  const [headerHeight, setHeaderHeight] = useState(120);
  const [isMobile, setIsMobile] = useState(false);
  const [typed, setTyped] = useState('');
  const [typedStarted, setTypedStarted] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const typedRef = useRef(null);

  useEffect(() => {
    const el = document.getElementById('site-header');
    if (el) setHeaderHeight(el.getBoundingClientRect().height);
    const handler = (e) => setHeaderHeight(e.detail.height);
    window.addEventListener('site-header-resize', handler);
    return () => window.removeEventListener('site-header-resize', handler);
  }, []);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 900);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) { setTyped(TYPED_LINE); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTypedStarted(true); }, { threshold: 0.5 });
    if (typedRef.current) obs.observe(typedRef.current);
    return () => obs.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!typedStarted) return;
    if (typed.length >= TYPED_LINE.length) return;
    const t = setTimeout(() => setTyped(TYPED_LINE.slice(0, typed.length + 1)), 28);
    return () => clearTimeout(t);
  }, [typedStarted, typed]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes jf-cursor-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @keyframes jf-gold-shine { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

        .jf-root {
          padding-top: ${headerHeight}px;
          min-height: 100vh;
          background-color: ${NAVY};
          background-image:
            radial-gradient(circle at 50% 0%, rgba(201,162,39,0.06) 0%, transparent 55%),
            repeating-linear-gradient(45deg, rgba(237,231,218,0.025) 0px, rgba(237,231,218,0.025) 1px, transparent 1px, transparent 46px),
            repeating-linear-gradient(-45deg, rgba(237,231,218,0.02) 0px, rgba(237,231,218,0.02) 1px, transparent 1px, transparent 46px);
        }
        .jf-section { max-width: 720px; margin: 0 auto; padding: 4.5rem 1.5rem; text-align: center; border-bottom: 1px solid ${HAIRLINE}; }
        .jf-section-wide { max-width: 1000px; }
        .jf-section-full { max-width: 1200px; }
        .jf-section:last-of-type { border-bottom: none; }
        .jf-label { font-family: 'Lora', Georgia, serif; font-style: italic; font-size: 0.85rem; color: ${GOLD}; margin-bottom: 0.6rem; }
        .jf-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.4rem; font-weight: 600; text-transform: uppercase; color: ${CREAM}; line-height: 1.15; margin-bottom: 1.25rem; }
        .jf-para { font-family: 'Lora', Georgia, serif; font-size: 1.05rem; line-height: 1.8; color: ${CREAM_MUTE}; margin: 0 auto 1.2rem; max-width: 560px; }
        .jf-para strong { color: ${CREAM}; font-weight: 600; }

        .jf-hero { position: relative; padding: 7rem 1.5rem 4rem; text-align: center; border-bottom: 1px solid ${HAIRLINE}; overflow: hidden; min-height: 460px; display: flex; flex-direction: column; justify-content: flex-end; }
        .jf-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; filter: saturate(0.8) brightness(0.55); z-index: 0; }
        .jf-hero-scrim { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to bottom, rgba(11,19,48,0.55) 0%, ${NAVY} 92%); }
        .jf-hero-content { position: relative; z-index: 2; }

        @keyframes jf-plane-fly {
          0%   { left: -8%; top: 22%; transform: rotate(6deg); opacity: 0; }
          8%   { opacity: 1; }
          50%  { left: 50%; top: 12%; transform: rotate(2deg); }
          92%  { opacity: 1; }
          100% { left: 108%; top: 18%; transform: rotate(6deg); opacity: 0; }
        }
        .jf-hero-plane { position: absolute; z-index: 2; animation: jf-plane-fly 14s linear infinite; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4)); }
        .jf-hero-plane::after { content: ''; position: absolute; right: 100%; top: 50%; width: 140px; height: 1px; background: linear-gradient(to left, ${GOLD}, transparent); opacity: 0.5; transform: translateY(-50%); }

        .jf-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(201,162,39,0.1); border: 1px solid rgba(201,162,39,0.35); color: ${CREAM}; font-family: 'Lora', Georgia, serif; font-size: 0.78rem; padding: 8px 16px; border-radius: 999px; margin-bottom: 2rem; backdrop-filter: blur(2px); }
        .jf-badge b { color: ${GOLD}; font-weight: 700; }
        .jf-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2.4rem, 6vw, 4.2rem); font-weight: 600;
          text-transform: uppercase; line-height: 1.08; margin: 0 auto 1.5rem; max-width: 780px;
          background: linear-gradient(135deg, #5C4A2F 0%, #8B7355 15%, #C9A96E 30%, #F1E2C0 50%, #C9A96E 70%, #8B7355 85%, #5C4A2F 100%);
          background-size: 260% 260%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
          animation: jf-gold-shine 7s ease-in-out infinite; filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5));
        }
        .jf-typed { font-family: 'IBM Plex Mono', 'JetBrains Mono', monospace; font-size: 0.95rem; letter-spacing: 0.02em; color: rgba(237,231,218,0.85); min-height: 1.6em; max-width: 560px; margin: 0 auto; }
        .jf-cursor { display: inline-block; width: 0.55em; background: ${GOLD}; animation: jf-cursor-blink 0.9s steps(1) infinite; }

        .jf-stats-row { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
        .jf-stat-num { font-family: 'JetBrains Mono', monospace; font-size: 2rem; font-weight: 600; color: ${CREAM}; line-height: 1; }
        .jf-stat-label { font-family: 'Lora', Georgia, serif; font-size: 0.75rem; color: ${CREAM_FAINT}; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.3rem; }

        /* ── Fun cards ── */
        .jf-fun-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 2rem; }
        .jf-fun-card {
          border: 1px solid ${HAIRLINE}; background: rgba(237,231,218,0.03); border-radius: 6px;
          padding: 1.5rem 1.25rem; text-align: center; transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .jf-fun-card:hover { transform: translateY(-4px); border-color: rgba(201,162,39,0.4); background: rgba(201,162,39,0.05); }
        .jf-fun-num { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.2rem; font-weight: 700; color: ${GOLD}; line-height: 1; }
        .jf-fun-unit { font-family: 'Lora', Georgia, serif; font-size: 1rem; color: ${GOLD}; margin-left: 4px; }
        .jf-fun-label { font-family: 'Lora', Georgia, serif; font-size: 0.78rem; color: ${CREAM_MUTE}; margin-top: 0.5rem; line-height: 1.4; }

        /* ── Schedule table ── */
        .jf-table-wrap { margin-top: 2rem; border: 1px solid ${HAIRLINE}; border-radius: 6px; overflow: hidden; }
        .jf-table { width: 100%; border-collapse: collapse; font-family: 'Lora', Georgia, serif; }
        .jf-table thead th {
          background: rgba(201,162,39,0.1); color: ${GOLD}; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em; padding: 0.85rem 1rem; text-align: left;
          border-bottom: 1px solid ${HAIRLINE};
        }
        .jf-table td { padding: 0.75rem 1rem; font-size: 0.88rem; color: ${CREAM_MUTE}; border-bottom: 1px solid ${HAIRLINE}; text-align: left; }
        .jf-table tr:last-child td { border-bottom: none; }
        .jf-table tr.jf-row-hover td { background: rgba(201,162,39,0.06); color: ${CREAM}; }
        .jf-row-num { font-family: 'JetBrains Mono', monospace; color: ${CREAM_FAINT}; font-size: 0.78rem; }
        .jf-row-arrow { color: ${GOLD}; margin: 0 0.4rem; }
        .jf-note-pill {
          display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.05em; text-transform: uppercase; color: ${NAVY_DEEP}; background: ${GOLD};
          padding: 2px 8px; border-radius: 999px; font-weight: 600;
        }
        .jf-table-scroll { max-height: 520px; overflow-y: auto; }
        .jf-table-scroll::-webkit-scrollbar { width: 6px; }
        .jf-table-scroll::-webkit-scrollbar-thumb { background: rgba(201,162,39,0.3); border-radius: 3px; }

        .jf-timeline-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: ${HAIRLINE}; transform: translateX(-50%); }
        @keyframes jf-timeline-plane {
          0%   { top: 0%; transform: translate(-50%, 0) rotate(90deg); opacity: 0; }
          6%   { opacity: 0.9; }
          94%  { opacity: 0.9; }
          100% { top: 100%; transform: translate(-50%, 0) rotate(90deg); opacity: 0; }
        }
        .jf-timeline-plane { position: absolute; left: 50%; z-index: 3; animation: jf-timeline-plane 10s linear infinite; }

        .jf-cta-btn { display: inline-block; background: ${GOLD}; color: ${NAVY_DEEP}; font-family: 'Lora', Georgia, serif; font-weight: 700; font-size: 0.95rem; padding: 14px 38px; text-decoration: none; border-radius: 999px; border: 1px solid ${GOLD}; transition: all 0.3s ease; }
        .jf-cta-btn:hover { background: transparent; color: ${GOLD}; }

        @media (max-width: 900px) {
          .jf-hero { padding: 5rem 1.25rem 3rem; min-height: 380px; }
          .jf-section { padding: 3rem 1.25rem; }
          .jf-title { font-size: 1.9rem; }
          .jf-stats-row { gap: 1.5rem; }
          .jf-hero-plane { display: none; }
          .jf-fun-grid { grid-template-columns: repeat(2, 1fr); }
          .jf-table { font-size: 0.78rem; }
          .jf-table td, .jf-table th { padding: 0.6rem 0.6rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jf-hero-plane, .jf-timeline-plane, .jf-hero-title { animation: none; }
        }
      `}</style>

      <div className="jf-root">

        {/* HERO */}
        <div className="jf-hero">
          {!heroImgError ? (
            <img src={IMG.hero} alt="" aria-hidden="true" className="jf-hero-bg" onError={() => setHeroImgError(true)} />
          ) : (
            <div className="jf-hero-bg" style={{ background: NAVY_DEEP }} />
          )}
          <div className="jf-hero-scrim" />
          {!isMobile && !reduced && (
            <div className="jf-hero-plane"><PlaneIcon size={26} /></div>
          )}
          <div className="jf-hero-content">
            <h1 className="jf-hero-title">The Journey</h1>
            <div ref={typedRef} className="jf-typed">
              {typed}
              {typed.length < TYPED_LINE.length && typedStarted && <span className="jf-cursor">&nbsp;</span>}
            </div>
          </div>
        </div>

        {/* STATS */}
        <Reveal className="jf-section" style={{ borderBottom: `1px solid ${HAIRLINE}`, maxWidth: '720px' }}>
          <div className="jf-stats-row">
            {[
              { num: '7', label: 'Continents' },
              { num: '41', label: 'Legs' },
              { num: '40,000+', unit: 'NM', label: 'Total Distance' },
              { num: '3', label: 'Months' },
            ].map((s, i) => (
              <div key={i}>
                <div className="jf-stat-num">{s.num}{s.unit && <span style={{ fontSize: '1rem', color: GOLD, marginLeft: '3px' }}>{s.unit}</span>}</div>
                <div className="jf-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* INTRO */}
        <Reveal className="jf-section">
          <p className="jf-label">Why This Route</p>
          <h2 className="jf-title">Every Continent, Alone</h2>
          <p className="jf-para">
            Three solo transatlantic crossings as captain. A 13,000km Florida-to-India ferry flight,
            no autopilot. This route is the sum of that experience, extended into the one crossing
            no aircraft like this has been asked to make before: an unsupported flight to the South
            Pole, threaded into a full westbound circumnavigation of all seven continents.
          </p>
        </Reveal>

        {/* FUN FACTS — restored */}
        <Reveal className="jf-section jf-section-wide">
          <p className="jf-label">Fun Facts</p>
          <h2 className="jf-title">The Numbers Behind The Route</h2>
          <div className="jf-fun-grid">
            {FUN_FACTS.map((f, i) => (
              <div key={i} className="jf-fun-card">
                <div className="jf-fun-num">{f.num}{f.unit && <span className="jf-fun-unit">{f.unit}</span>}</div>
                <div className="jf-fun-label">{f.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* FULL SCHEDULE TABLE — restored */}
        <Reveal className="jf-section jf-section-full">
          <p className="jf-label">The Full Schedule</p>
          <h2 className="jf-title">Every Leg, Start To Finish</h2>
          <div className="jf-table-wrap">
            <div className="jf-table-scroll">
              <table className="jf-table">
                <thead>
                  <tr>
                    <th style={{ width: '3rem' }}>#</th>
                    <th>Route</th>
                    <th style={{ width: '9rem' }}>Date</th>
                    <th style={{ width: '7rem' }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE.map((leg, i) => (
                    <tr
                      key={i}
                      className={hoveredRow === i ? 'jf-row-hover' : ''}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="jf-row-num">{String(i + 1).padStart(2, '0')}</td>
                      <td>{leg.from}<span className="jf-row-arrow">&rarr;</span>{leg.to}</td>
                      <td className="jf-row-num">{leg.date || 'TBD'}</td>
                      <td>{leg.note && <span className="jf-note-pill">{leg.note}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* NARRATIVE TIMELINE */}
        <div className="jf-section jf-section-wide" style={{ position: 'relative' }}>
          <Reveal>
            <p className="jf-label">The Route, Continent By Continent</p>
            <h2 className="jf-title">The Story Version</h2>
          </Reveal>
          <div style={{ position: 'relative', marginTop: '2rem' }}>
            {!isMobile && (
              <div className="jf-timeline-line">
                {!reduced && <div className="jf-timeline-plane"><PlaneIcon size={16} /></div>}
              </div>
            )}
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* GLOBE */}
        <div style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
          <RouteGlobe />
        </div>

        {/* RECORDS */}
        <Reveal className="jf-section">
          <p className="jf-label">What This Sets</p>
          <h2 className="jf-title">Five World Firsts</h2>
          <div className="jf-stats-row" style={{ marginTop: '1.5rem' }}>
            {[
              { num: '1st', label: 'Woman Solo To The South Pole' },
              { num: '1st', label: 'Solo Antarctic Continental Crossing' },
              { num: '1st', label: 'Twin-Engine Prop, Solo, All 7 Continents' },
            ].map((s, i) => (
              <div key={i} style={{ maxWidth: '170px' }}>
                <div className="jf-stat-num">{s.num}</div>
                <div className="jf-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
<JourneyTradingCards />
        {/* CTA */}
        <Reveal className="jf-section" style={{ borderBottom: 'none' }}>
          <p className="jf-label">Follow Along</p>
          <h2 className="jf-title">Live From The Cockpit</h2>
          <p className="jf-para">Track the route as it happens and back the mission that's flying it.</p>
          <a href="/donate" className="jf-cta-btn">Back The Mission</a>
        </Reveal>

        <Footer />
      </div>
    </>
  );
};

export default JourneyPage;
