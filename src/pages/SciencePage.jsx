import React, { useState, useEffect, useRef } from 'react';
import AntarcticaMap from '../components/home/AntarcticaMap';

/**
 * SciencePage — timeline expanded.
 *
 * THIS PASS: the survey targets Shannon actually presented to RINGS
 * included more than the radar/megadunes/blue-ice/Tambora set already
 * on the page — tabular icebergs (Weddell Sea passes) were part of that
 * same presentation. And the timeline was listing INSTRUMENTS/TARGETS
 * but never the actual scientific OUTCOMES those targets feed into —
 * ice sheet mass balance, sea-level projections, and the broader climate
 * research this contributes to. Both are added now, so the timeline
 * reads: the gap -> the instrument -> every target actually surveyed
 * (icebergs, megadunes, blue ice, the Tambora tie-point) -> what that
 * data actually produces (mass balance, sea-level forecasts, climate
 * research) -> delivery. The origin paragraph now names the targets
 * explicitly as what was presented to RINGS, tying the two together.
 *
 * Everything else (structure, typed hero line, embedded AntarcticaMap,
 * centered layout) is unchanged from the prior rebuild.
 *
 * ASSETS NEEDED in /public for the timeline (falls back to a labeled
 * placeholder tile if missing):
 *   /ibb.png  /nn.png  /iceberg.png  /mm.png  /bii.png  /va.png
 *   /massbalance.png  /sealevel.png  /climate.png  /nss.png
 */

const TEAL = '#0B211E';
const TEAL_DEEP = '#081815';
const HAIRLINE = 'rgba(231,233,228,0.14)';
const CREAM = '#E9EBE6';
const CREAM_MUTE = 'rgba(233,235,230,0.62)';
const CREAM_FAINT = 'rgba(233,235,230,0.4)';
const SILVER = '#C9CDD6';

const TIMELINE = [
  {
    tag: 'The Gap',
    title: 'Where IceBridge Stopped',
    text: "NASA flew over 100 Antarctic campaigns in a decade and never crossed this corridor. It's one of the largest blank spots left in the global radar record.",
    image: '/ibb.png',
  },
  {
    tag: 'Instrument',
    title: 'A Radar That Sees Through Snow',
    text: '2\u20138 GHz, resolving layers 100 metres deep and just 4 centimetres apart \u2014 reading centuries of weather history out of the ice without digging a hole.',
    image: '/nn.png',
  },
  {
    tag: 'Target',
    title: 'Tabular Icebergs',
    text: 'Weddell Sea passes captured with camera and laser altimeter alongside the radar \u2014 contributing directly to the iceberg structure and melt-rate datasets the community already tracks.',
    image: '/tb.png',
  },
  {
    tag: 'Target',
    title: 'Megadunes',
    text: 'Wave-like ridges found only on the East Antarctic Plateau \u2014 and on Mars. Nobody fully understands why they form at the wavelength they do.',
    image: '/mm.png',
  },
  {
    tag: 'Target',
    title: 'Blue Ice Areas',
    text: 'Wind-scoured patches of ancient exposed ice \u2014 the same terrain where most of the meteorites ever found on Earth have turned up.',
    image: '/bii.png',
  },
  {
    tag: 'Tie-Point',
    title: 'The 1815 Tambora Ash Layer',
    text: 'A dated volcanic ash horizon buried in the snow \u2014 an exact calendar bookmark to check every other reading against.',
    image: '/va.png',
  },
  {
    tag: 'Result',
    title: 'Ice Sheet Mass Balance',
    text: 'Every accumulation layer the radar reads feeds directly into how scientists calculate whether East Antarctica is gaining or losing mass \u2014 the core number behind every downstream forecast.',
    image: '/mb.png',
  },
  {
    tag: 'Result',
    title: 'Sea-Level Projections',
    text: 'Better mass-balance data means a tighter error bar on how fast, and how much, global sea level rises \u2014 the number coastal governments actually plan around.',
    image: '/sl.png',
  },
  {
    tag: 'Result',
    title: 'Novel Climate Research',
    text: 'A dataset from a corridor this under-surveyed doesn\u2019t just fill a gap \u2014 it becomes a reference point other climate models get checked against for years afterward.',
    image: '/re.png',
  },
  {
    tag: 'Delivery',
    title: 'Open Access, No Embargo',
    text: "Every dataset goes to NSIDC in the same format NASA's IceBridge used \u2014 usable by any scientist on Earth, immediately.",
    image: '/nss.png',
  },
];

const TYPED_LINE = 'One pilot. One radar. A gap in the map no one else has closed.';



const Reveal = ({ children, className = '', style = {} }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
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
      <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '0.85rem', color: SILVER, marginBottom: '0.4rem' }}>{item.tag}</p>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.7rem', fontWeight: 600, color: CREAM, textTransform: 'uppercase', marginBottom: '0.6rem', lineHeight: 1.15 }}>{item.title}</h3>
      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '0.92rem', color: CREAM_MUTE, lineHeight: 1.7, margin: '0 auto', maxWidth: '360px' }}>{item.text}</p>
    </div>
  );

  const imageBlock = (
    <div style={{ flex: 1, display: 'flex', justifyContent: isMobile ? 'center' : (fromLeft ? 'flex-start' : 'flex-end') }}>
      <div style={{ width: '100%', maxWidth: '320px', height: '200px', border: `1px solid ${HAIRLINE}`, overflow: 'hidden', borderRadius: '4px', background: 'rgba(233,235,230,0.03)' }}>
        {!imgError ? (
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85) brightness(0.92)' }} onError={() => setImgError(true)} />
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
          background: visible ? SILVER : 'rgba(233,235,230,0.2)',
          border: `2px solid ${TEAL}`, boxShadow: `0 0 0 1px ${HAIRLINE}`,
          transition: 'background 0.5s ease', zIndex: 2,
        }} />
      )}
      {isMobile ? (<>{imageBlock}{textBlock}</>) : fromLeft ? (<>{textBlock}{imageBlock}</>) : (<>{imageBlock}{textBlock}</>)}
    </div>
  );
};

const SciencePage = () => {
  const [headerHeight, setHeaderHeight] = useState(120);
  const [isMobile, setIsMobile] = useState(false);
  const [typed, setTyped] = useState('');
  const [typedStarted, setTypedStarted] = useState(false);
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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setTyped(TYPED_LINE); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTypedStarted(true); }, { threshold: 0.5 });
    if (typedRef.current) obs.observe(typedRef.current);
    return () => obs.disconnect();
  }, []);

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

        @keyframes sp-cursor-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @keyframes sp-chrome-shine { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

        .sp-root {
          padding-top: ${headerHeight}px;
          min-height: 100vh;
          background-color: ${TEAL};
          background-image:
            radial-gradient(circle at 50% 0%, rgba(233,235,230,0.05) 0%, transparent 55%),
            repeating-linear-gradient(90deg, rgba(233,235,230,0.02) 0px, rgba(233,235,230,0.02) 1px, transparent 1px, transparent 64px);
        }
        .sp-section { max-width: 720px; margin: 0 auto; padding: 4.5rem 1.5rem; text-align: center; border-bottom: 1px solid ${HAIRLINE}; }
        .sp-section-wide { max-width: 1000px; }
        .sp-section:last-of-type { border-bottom: none; }
        .sp-label { font-family: 'Lora', Georgia, serif; font-style: italic; font-size: 0.85rem; color: ${SILVER}; margin-bottom: 0.6rem; }
        .sp-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.4rem; font-weight: 600; text-transform: uppercase; color: ${CREAM}; line-height: 1.15; margin-bottom: 1.25rem; }
        .sp-para { font-family: 'Lora', Georgia, serif; font-size: 1.05rem; line-height: 1.8; color: ${CREAM_MUTE}; margin: 0 auto 1.2rem; max-width: 560px; }
        .sp-para strong { color: ${CREAM}; font-weight: 600; }

        .sp-hero { padding: 7rem 1.5rem 4rem; text-align: center; border-bottom: 1px solid ${HAIRLINE}; }
        .sp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(233,235,230,0.05); border: 1px solid ${HAIRLINE};
          color: ${CREAM}; font-family: 'Lora', Georgia, serif; font-size: 0.78rem;
          padding: 8px 16px; border-radius: 999px; margin-bottom: 2rem;
        }
        .sp-badge b { color: ${SILVER}; font-weight: 700; }
        .sp-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 600; text-transform: uppercase; line-height: 1.08;
          margin: 0 auto 1.5rem; max-width: 780px;
          background: linear-gradient(135deg, #6b6f77 0%, #9195a0 14%, #cfd2d9 28%, #ffffff 46%, #cfd2d9 60%, #9195a0 76%, #6b6f77 90%, #4c4f56 100%);
          background-size: 260% 260%;
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
          animation: sp-chrome-shine 7s ease-in-out infinite;
        }
        .sp-typed {
          font-family: 'IBM Plex Mono', 'JetBrains Mono', monospace;
          font-size: 0.95rem; letter-spacing: 0.02em;
          color: ${CREAM_MUTE}; min-height: 1.6em; max-width: 560px; margin: 0 auto;
        }
        .sp-cursor { display: inline-block; width: 0.55em; background: ${SILVER}; animation: sp-cursor-blink 0.9s steps(1) infinite; }

        .sp-stats-row { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
        .sp-stat-num { font-family: 'JetBrains Mono', monospace; font-size: 2rem; font-weight: 600; color: ${CREAM}; line-height: 1; }
        .sp-stat-label { font-family: 'Lora', Georgia, serif; font-size: 0.75rem; color: ${CREAM_FAINT}; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.3rem; }

        .sp-timeline-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: ${HAIRLINE}; transform: translateX(-50%); }

        .sp-cta-btn {
          display: inline-block; background: ${CREAM}; color: ${TEAL_DEEP};
          font-family: 'Lora', Georgia, serif; font-weight: 600; font-size: 0.95rem;
          padding: 14px 38px; text-decoration: none; border-radius: 999px;
          border: 1px solid ${CREAM}; transition: all 0.3s ease;
        }
        .sp-cta-btn:hover { background: transparent; color: ${CREAM}; }

        @media (max-width: 900px) {
          .sp-hero { padding: 5rem 1.25rem 3rem; }
          .sp-section { padding: 3rem 1.25rem; }
          .sp-title { font-size: 1.9rem; }
          .sp-stats-row { gap: 1.5rem; }
        }
      `}</style>

      <div className="sp-root">

        <div className="sp-hero">
          <div className="sp-badge">
            <b>EARS</b><span style={{ opacity: 0.4 }}>&middot;</span>
            <span>East Antarctic Radar Survey</span>
          </div>
          <h1 className="sp-hero-title">One Pilot.<br />One Radar.</h1>
          <div ref={typedRef} className="sp-typed">
            {typed}
            {typed.length < TYPED_LINE.length && typedStarted && <span className="sp-cursor">&nbsp;</span>}
          </div>
        </div>
<AntarcticaMap />
        <Reveal className="sp-section" style={{ borderBottom: `1px solid ${HAIRLINE}`, maxWidth: '720px' }}>
          <div className="sp-stats-row">
            {[
              { num: '2\u20138', unit: 'GHz', label: 'Radar Frequency' },
              { num: '100m', label: 'Snow Penetration' },
              { num: '7,040km', label: 'Transect Length' },
              { num: '1', label: 'Solo Pilot' },
            ].map((s, i) => (
              <div key={i}>
                <div className="sp-stat-num">{s.num}{s.unit && <span style={{ fontSize: '1rem', color: SILVER, marginLeft: '3px' }}>{s.unit}</span>}</div>
                <div className="sp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="sp-section">
          <p className="sp-label">How EARS Began</p>
          <h2 className="sp-title">Built By One Person</h2>
          <p className="sp-para">
            No university. No space agency. No research institute paying the bills. Shannon designed
            the science, chose the instruments, and built <strong>EARS</strong> (East Antarctic Survey)
            from scratch &mdash; then presented it, alone, as the sole outside speaker ever invited to a
            closed RINGS meeting, Antarctica's most established radio-glaciology working group. That
            presentation covered every target on this page: tabular icebergs in the Weddell Sea,
            megadune fields, blue ice areas, and the dated Tambora ash layer &mdash; the same survey
            targets that feed the mass-balance and sea-level results below.
          </p>
        </Reveal>

        <div className="sp-section sp-section-wide" style={{ position: 'relative' }}>
          <Reveal>
            <p className="sp-label">The Survey</p>
            <h2 className="sp-title">What The Radar Finds &mdash; And What It Produces</h2>
          </Reveal>
          <div style={{ position: 'relative', marginTop: '2rem' }}>
            {!isMobile && <div className="sp-timeline-line" />}
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} isMobile={isMobile} />
            ))}
          </div>
        </div>


        <Reveal className="sp-section">
          <p className="sp-label">Why It Matters</p>
          <h2 className="sp-title">Climate Change</h2>
          <p className="sp-para">
            This corridor feeds directly into the ice-sheet models the world uses to project sea-level
            rise. Every dataset is delivered open access to <strong>NSIDC</strong>, no embargo &mdash;
            usable by any scientist on Earth the day it lands.
          </p>
          <div className="sp-stats-row" style={{ marginTop: '2rem' }}>
            {[
              { num: '100+', label: 'IceBridge Campaigns, Never Crossed This' },
              { num: '0', label: 'Prior Solo Surveys Here' },
              { num: '1', label: 'Sole Presenter Invited By RINGS' },
            ].map((s, i) => (
              <div key={i} style={{ maxWidth: '160px' }}>
                <div className="sp-stat-num">{s.num}</div>
                <div className="sp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="sp-section" style={{ borderBottom: 'none' }}>
          <p className="sp-label">Support The Science</p>
          <h2 className="sp-title">This Data Will Matter For Decades</h2>
          <p className="sp-para">
            Becoming a sponsor means your name is part of a mission that advances Antarctic science and
            breaks world records at the same time.
          </p>
          <a href="/contact" className="sp-cta-btn">Become a Sponsor</a>
        </Reveal>

      
      </div>
    </>
  );
};

export default SciencePage;
