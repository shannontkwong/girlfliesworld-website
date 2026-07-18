import React, { useState, useEffect, useRef } from 'react';

const Footer = () => (
  <footer style={{
    background: '#000',
    color: '#fff',
    padding: '4rem 2rem 2rem',
    marginTop: 0,
  }}>
    <style>{`
      .footer-grid {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
        align-items: start;
      }
      @media (max-width: 768px) {
        .footer-grid {
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .footer-logo-col {
          grid-column: 1 / -1;
          align-items: center !important;
        }
      }
      @media (max-width: 480px) {
        .footer-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
    <div className="footer-grid">
      <div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'rgb(255, 30, 154)' }}>Info</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[['About Me', '/aboutme'], ['My Journey', '/journey'], ['Contact', '/contact']].map(([label, href]) => (
            <li key={href} style={{ marginBottom: '0.75rem' }}>
              <a href={href} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.95rem' }}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'rgb(255, 30, 154)' }}>Explore</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[['The Science', '/science'], ['Become a Sponsor', '/sponsors'], ['Blog', '/blog']].map(([label, href]) => (
            <li key={href} style={{ marginBottom: '0.75rem' }}>
              <a href={href} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.95rem' }}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-logo-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
        <img src='/si.png' alt="GIRLFLIESWORLD Logo" style={{ maxWidth: '180px', height: 'auto', marginBottom: '1rem' }} />
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, maxWidth: '280px' }}>
          First woman to fly solo to all 7 continents and the South Pole.
        </p>
      </div>
    </div>
    <div style={{ textAlign: 'center', paddingTop: '2rem', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.15)', opacity: 0.6, fontSize: '0.85rem' }}>
      <p style={{ margin: 0 }}>&copy; 2025 GIRLFLIESWORLD. All rights reserved.</p>
    </div>
  </footer>
);

const GOLD = '#C4A574';
const PINK = '#ff1e9a';
const ICE = '#EEF3F2';
const ICE_LINE = '#B7CBC8';

const navItems = [
  { id: 'origin', label: 'The EARS Story' },
  { id: 'mission', label: 'The Mission' },
  { id: 'radar', label: 'Radar System' },
  { id: 'targets', label: 'Instruments' },
  { id: 'route', label: 'Survey Route' },
  { id: 'significance', label: 'Why It Matters' },
];

const routeStops = [
  { loc: 'Marsh Base', desc: 'Chilean Antarctic Peninsula — where Shannon enters the continent.', type: 'Start' },
  { loc: 'Marambio Base', desc: 'Trinity Peninsula & Vega Island — first ice layers logged by the radar.', type: 'Survey' },
  { loc: 'Weddell Sea', desc: 'Flying over tabular icebergs — bonus camera and altimeter passes.', type: 'Survey' },
  { loc: "Wolf's Fang", desc: 'Queen Maud Land — the radar survey box officially begins here.', type: 'Primary' },
  { loc: 'Blue Ice Point', desc: 'Exposed ancient ice, scoured bare by wind — and a known source of meteorites.', type: 'Survey' },
  { loc: 'Megadune Line I', desc: 'First pass across the megadune field, radar running the whole way.', type: 'Primary' },
  { loc: 'South Pole', desc: 'The turnaround point — and a milestone in its own right.', type: 'Milestone' },
  { loc: 'Megadune Line II', desc: 'A second, offset pass back across the same dune field.', type: 'Primary' },
  { loc: "Wolf's Fang (return)", desc: 'The radar survey box closes — the core science leg is complete.', type: 'Survey' },
  { loc: 'Cape Town', desc: 'Mission egress — data is offloaded for delivery to NSIDC.', type: 'End' },
];

const routeTagStyles = {
  Start: { background: '#000', color: '#fff' },
  Survey: { background: GOLD, color: '#000' },
  Primary: { background: PINK, color: '#fff' },
  Milestone: { background: '#C4A574', color: '#000' },
  End: { background: '#333', color: '#fff' },
};

// ── "Echo" callout: every radar pulse sends back an echo that has to be
// translated into something a scientist can read. This component is the
// page's version of that translation — turning a technical sentence into
// a plain answer to "so what?" It's the one device repeated everywhere,
// on purpose, because that repetition IS the point of the page.
const Echo = ({ children, label = 'Why it matters' }) => (
  <div className="sp-echo">
    <svg className="sp-echo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="32" r="2.5" fill={GOLD} />
      <path d="M8 32 A 10 10 0 0 1 18 22" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 32 A 18 18 0 0 1 26 14" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <path d="M8 32 A 26 26 0 0 1 34 6" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
    </svg>
    <div className="sp-echo-body">
      <div className="sp-echo-label">{label}</div>
      <p className="sp-echo-text">{children}</p>
    </div>
  </div>
);

const SciencePage = () => {
  const [activeTab, setActiveTab] = useState('origin');
  const [headerHeight, setHeaderHeight] = useState(120);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    const el = document.getElementById('site-header');
    if (el) setHeaderHeight(el.getBoundingClientRect().height);
    const handler = (e) => setHeaderHeight(e.detail.height);
    window.addEventListener('site-header-resize', handler);
    return () => window.removeEventListener('site-header-resize', handler);
  }, []);

  const scrollTo = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileNavRef.current) return;
    const activeEl = mobileNavRef.current.querySelector(`[data-id="${activeTab}"]`);
    if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeTab]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sp-mono { font-family: 'JetBrains Mono', 'Courier New', Consolas, monospace; }

        .sp-root {
          padding-top: ${headerHeight}px;
          display: flex;
          min-height: 100vh;
          background: #fff;
        }

        /* ── Desktop sidebar ── */
        .sp-sidebar {
          width: 280px;
          background: ${GOLD};
          position: fixed;
          left: 0;
          top: ${headerHeight}px;
          height: calc(100vh - ${headerHeight}px);
          padding: 2rem 0;
          overflow-y: auto;
          z-index: 20;
        }
        .sp-sidebar-item {
          display: block;
          padding: 1rem 2rem;
          color: #000;
          font-size: 0.9rem;
          font-weight: 500;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.25s;
          user-select: none;
        }
        .sp-sidebar-item.active {
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          background: rgba(0,0,0,0.2);
        }
        .sp-sidebar-item:hover:not(.active) { background: rgba(0,0,0,0.06); }

        /* ── Mobile tab nav ── */
        .sp-mobile-nav {
          display: none;
          position: fixed;
          top: ${headerHeight}px;
          left: 0;
          right: 0;
          z-index: 20;
          background: ${GOLD};
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          border-bottom: 2px solid rgba(0,0,0,0.15);
        }
        .sp-mobile-nav::-webkit-scrollbar { display: none; }
        .sp-mobile-nav-inner {
          display: flex;
          align-items: center;
          width: max-content;
          padding: 0 0.5rem;
        }
        .sp-mobile-nav-item {
          scroll-snap-align: center;
          padding: 0.75rem 1.25rem;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
          color: rgba(0,0,0,0.65);
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.2s;
          user-select: none;
        }
        .sp-mobile-nav-item.active {
          color: #000;
          border-bottom-color: #000;
        }

        .sp-main {
          margin-left: 280px;
          flex: 1;
          background: #fff;
          min-width: 0;
        }

        /* ── Hero ── */
        .sp-hero {
          background: #000 url('/ib.png') center/cover no-repeat;
          color: #fff;
          padding: 7rem 4rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .sp-ears-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 8px 14px;
          border-radius: 999px;
          margin-bottom: 1.5rem;
        }
        .sp-ears-badge b { color: ${GOLD}; font-weight: 700; }
        .sp-hero-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 4.6rem;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1.02;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
          color: #fff;
        }
        .sp-hero-sub {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.75);
          max-width: 720px;
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .sp-hero-meta {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 2rem;
          margin-top: 2rem;
        }

        /* ── Stats strip ── */
        .sp-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #000;
          border: 1px solid #000;
        }
        .sp-stat-num {
          font-family: 'JetBrains Mono', 'Courier New', Consolas, monospace;
          font-size: 2.6rem;
          font-weight: 700;
          color: #000;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .sp-stat-unit { font-size: 1.1rem; color: ${GOLD}; margin-left: 4px; }

        /* ── Sections ── */
        .sp-section { padding: 4rem 3rem; }
        .sp-section-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${GOLD};
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .sp-section-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 2.2rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #000;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .sp-para {
          font-size: 0.95rem;
          line-height: 1.8;
          font-weight: 500;
          color: #374151;
          margin-bottom: 1.25rem;
          max-width: 800px;
        }
        .sp-quote {
          border-left: 4px solid ${GOLD};
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          font-size: 1.05rem;
          color: #222;
          line-height: 1.7;
        }

        /* ── Echo callout (signature device) ── */
        .sp-echo {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          background: ${ICE};
          border: 1px solid ${ICE_LINE};
          border-left: 4px solid ${GOLD};
          padding: 1.1rem 1.4rem;
          margin: 0 0 1.75rem 0;
          max-width: 800px;
          border-radius: 2px;
        }
        .sp-echo-icon { width: 28px; height: 28px; flex-shrink: 0; margin-top: 2px; }
        .sp-echo-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3a5350;
          margin-bottom: 0.35rem;
        }
        .sp-echo-text {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #1f2d2b;
          margin: 0;
        }

        /* ── Cards grid ── */
        .sp-card-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        /* ── Target grid ── */
        .sp-target-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 2px solid #000;
          margin-top: 2rem;
        }
        .sp-target-card {
          padding: 2rem;
          border-right: 2px solid #000;
        }
        .sp-target-card:last-child { border-right: none; }

        /* ── Route section ── */
        .sp-route-stop {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-direction: row;
        }
        .sp-route-loc {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 220px;
        }

        /* ── Significance columns ── */
        .sp-sig-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 2rem;
        }

        /* ── CTA ── */
        .sp-cta { background: #000; padding: 5rem 4rem; text-align: center; }
        .sp-cta-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 3.5rem;
          font-weight: 900;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.05;
          margin-bottom: 1.5rem;
        }

        /* ── Origin / timeline strip ── */
        .sp-origin-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 2px solid #000;
          margin-top: 2.5rem;
        }
        .sp-origin-step {
          padding: 1.75rem;
          border-right: 2px solid #000;
        }
        .sp-origin-step:last-child { border-right: none; }
        .sp-origin-step-tag {
          font-family: 'JetBrains Mono', 'Courier New', Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 600;
          color: ${GOLD};
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.6rem;
        }
        .sp-origin-step h3 {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 1.15rem;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }
        .sp-origin-step p { font-size: 0.85rem; color: #555; line-height: 1.65; }

        /* ══════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ══════════════════════════════════════ */
        @media (max-width: 1024px) {
          .sp-sidebar { display: none; }
          .sp-mobile-nav { display: block; }
          .sp-root { padding-top: ${headerHeight}px; }
          .sp-main { margin-left: 0; padding-top: 46px; }
          .sp-hero { padding: 4rem 1.5rem 3rem; }
          .sp-hero-title { font-size: 3.1rem; }
          .sp-hero-sub { font-size: 1rem; }
          .sp-section { padding: 3rem 1.5rem; }
          .sp-section-title { font-size: 1.8rem; }
          .sp-stats { grid-template-columns: repeat(2, 1fr); }
          .sp-stat-num { font-size: 2rem; }
          .sp-stat-unit { font-size: 0.95rem; }
          .sp-card-grid-2 { grid-template-columns: 1fr; }
          .sp-target-grid { grid-template-columns: 1fr; }
          .sp-target-card { border-right: none; border-bottom: 2px solid #000; }
          .sp-target-card:last-child { border-bottom: none; }
          .sp-origin-steps { grid-template-columns: 1fr; }
          .sp-origin-step { border-right: none; border-bottom: 2px solid #000; }
          .sp-origin-step:last-child { border-bottom: none; }
          .sp-route-stop { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .sp-route-loc { min-width: auto; }
          .sp-sig-grid { grid-template-columns: 1fr; gap: 2rem; }
          .sp-cta { padding: 3rem 1.5rem; }
          .sp-cta-title { font-size: 2rem; }
          .sp-hero-meta { flex-direction: column; gap: 1rem; }
          .sp-echo { flex-direction: column; }
        }

        @media (max-width: 480px) {
          .sp-hero-title { font-size: 2.3rem; }
          .sp-section-title { font-size: 1.5rem; }
          .sp-stats { grid-template-columns: repeat(2, 1fr); }
          .sp-mobile-nav-item { padding: 0.75rem 1rem; font-size: 0.75rem; }
        }
      `}</style>

      <div className="sp-root">

        <nav className="sp-sidebar" aria-label="Section navigation">
          {navItems.map(item => (
            <div
              key={item.id}
              className={`sp-sidebar-item${activeTab === item.id ? ' active' : ''}`}
              onClick={() => scrollTo(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && scrollTo(item.id)}
            >
              {item.label}
            </div>
          ))}
        </nav>

        <nav className="sp-mobile-nav" aria-label="Section navigation" ref={mobileNavRef}>
          <div className="sp-mobile-nav-inner">
            {navItems.map(item => (
              <div
                key={item.id}
                data-id={item.id}
                className={`sp-mobile-nav-item${activeTab === item.id ? ' active' : ''}`}
                onClick={() => scrollTo(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && scrollTo(item.id)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </nav>

        <main className="sp-main">

          {/* HERO */}
          <div className="sp-hero">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.78) 100%)', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="sp-ears-badge">
                <span style={{ color: GOLD, fontWeight: 800 }}>EARS</span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>East Antarctic Radar Survey — an independent science program, built by one person</span>
              </div>
              <h1 className="sp-hero-title">
                One Pilot.<br />
                <span style={{ color: GOLD }}>One Radar.</span><br />
                A Blank Spot<br />On The Map.
              </h1>
              <p className="sp-hero-sub">
                Shannon Wong created her own Antarctic science program from nothing — no university,
                no space agency, no research institute standing behind her. She calls it <strong>EARS</strong>,
                the East Antarctic Radar Survey: a self-taught, self-built effort to fly real scientific
                instruments across a stretch of Antarctica that has barely ever been measured up close.
                Making it real meant learning the science herself, choosing the instruments herself, and
                personally pitching the idea to the world's leading polar scientists — with no institution,
                department, or press office opening doors for her. In October 2026 she flies the result
                herself, solo. This page explains what that took, what the mission actually collects, and
                why scientists who've spent their whole careers on this continent think it's worth paying
                attention to.
              </p>
              <div className="sp-hero-meta">
                {[
                  { label: 'Expedition Departure', value: 'October 2026' },
                  { label: 'Data Delivery', value: 'February–March 2027' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, fontWeight: 700 }}>{m.label}</span>
                    <span className="sp-mono" style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS STRIP */}
          <div className="sp-stats">
            {[
              { num: '2–8', unit: 'GHz', label: 'Radar Frequency' },
              { num: '100', unit: 'm', label: 'Snow Penetration Depth' },
              { num: '7,040', unit: 'km', label: 'Radar Transect Length' },
              { num: '1', unit: 'Pilot', label: 'Solo Operation' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div className="sp-stat-num">
                  {s.num}<span className="sp-stat-unit">{s.unit}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ORIGIN — THE EARS / SCAR STORY */}
          <div id="origin" className="sp-section" style={{ borderBottom: '1px solid #eee' }}>
            <p className="sp-section-label">How EARS Began</p>
            <h2 className="sp-section-title">A Program Built<br />By One Person</h2>

            <p className="sp-para">
              Big Antarctic science is normally a government job. Countries like the United States, the
              United Kingdom, Norway, and Japan run national polar programs: giant research planes, teams
              of scientists, and government budgets to match. Shannon has none of that. She has no
              university affiliation, no space agency behind her, and no research institute paying the
              bills. So she built her own program instead, from scratch, and named it <strong>EARS</strong> —
              the East Antarctic Radar Survey.
            </p>
            <Echo>
              This matters because it flips the usual rule of who gets to do serious Antarctic science.
              Normally you need a huge team and a huge budget just to get a radar over the ice. Shannon is
              proving that one prepared, determined person with a small aircraft can still collect data
              that professional glaciologists actually want and use.
            </Echo>

            <p className="sp-para">
              Building EARS meant doing every job herself that a whole department would normally split up:
              choosing the right radar for the job, working directly with the people who build it at the
              University of Kansas's CReSIS lab, and learning the science alongside <strong>Dr. Ted
              Scambos</strong> of CIRES at the University of Colorado Boulder, who has mentored her science
              for the past three years.
            </p>

            <p className="sp-para">
              Over that same period, Shannon has personally organized and pitched EARS to some of the
              world's leading scientists and institutions — researchers at NASA, ESA, universities, and
              national polar institutes — one email, one meeting, one presentation at a time, with no
              department or communications team doing that work for her.
            </p>

            <p className="sp-para">
              Then came the test that actually mattered: would the scientists who study this part of
              Antarctica for a living take it seriously? Shannon presented EARS to <strong>RINGS</strong> —
              a working group under SCAR, the Scientific Committee on Antarctic Research, the body that
              coordinates almost all Antarctic science on Earth. RINGS is made up of the specific
              researchers who study exactly the region Shannon plans to fly across, and she presented as
              the <strong>sole speaker</strong> at a closed RINGS meeting. That kind of invitation is
              genuinely rare — RINGS doesn't typically invite outside presenters at all, let alone someone
              with no co-author, no academic post, and no institution behind her name. For Shannon, getting
              through that door on the strength of self-taught knowledge alone was itself a sign that the
              science underneath EARS was worth taking seriously.
            </p>
            <Echo>
              Being handed the floor alone, with nothing but the work itself to speak for you, essentially
              never happens in a field this specialised. Most researchers wait years, publish repeatedly,
              and still present as one of several speakers, if they're invited at all. RINGS has since
              invited EARS to become a formally endorsed, affiliated project — the same kind of validation a
              university-backed mission would normally have to spend years earning.
            </Echo>

            <p className="sp-para">
              In August 2026, EARS goes to Oslo, Norway, for the <strong>12th SCAR Open Science
              Conference</strong> — hosted by the Norwegian Polar Institute and attended by the RINGS
              community and the wider international Antarctic science world in person. It's the moment EARS
              stops being "a project a few scientists have heard about" and becomes a program the entire
              field can see.
            </p>

            <div className="sp-origin-steps">
              {[
                { tag: 'Step 01', title: 'Built From Nothing', text: 'No university, no space agency. Shannon designed the science, chose the instruments, and found her own collaborators.' },
                { tag: 'Step 02', title: 'Tested By Experts', text: 'Presented solo to RINGS — a closed meeting of the specific researchers who study this exact region, as the only outside speaker invited.' },
                { tag: 'Step 03', title: 'Endorsed & Going Public', text: 'RINGS endorsement in progress. EARS is presented to the full international community at SCAR Oslo, August 2026.' },
              ].map((s, i) => (
                <div key={i} className="sp-origin-step">
                  <div className="sp-origin-step-tag">{s.tag}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MISSION */}
          <div id="mission" className="sp-section" style={{ background: '#fafafa', borderBottom: '1px solid #eee' }}>
            <p className="sp-section-label">The Mission</p>
            <h2 className="sp-section-title">No One Has Surveyed<br />This Ground Before</h2>
            <p className="sp-para">
              Between 2009 and 2019, NASA ran <strong>Operation IceBridge</strong> — the largest airborne
              survey of the polar regions ever flown, with more than <strong>100 separate Antarctic
              campaigns</strong>. It was enormous, and it was thorough, but it mostly focused on the parts
              of Antarctica that are changing fastest: West Antarctica, the Antarctic Peninsula, and the
              coast of East Antarctica.
            </p>
            <Echo>
              IceBridge is the benchmark every Antarctic radar mission gets compared to. The fact that even
              a survey that big, running for a decade, still left a major gap tells you how enormous
              Antarctica really is — and how much of it we still don't have close-up data for.
            </Echo>
            <p className="sp-para">
              One stretch was left largely untouched: the interior plateau between the Filchner-Ronne Ice
              Shelf and Queen Maud Land, facing the Atlantic side of the continent. High-resolution radar
              data here <strong>remains sparse in the published scientific record</strong>.
            </p>
            <p className="sp-para">
              Shannon's route crosses exactly this gap. The data she brings back will go straight to the
              scientists working on it — a real, usable dataset from a region where good data is genuinely
              hard to come by.
            </p>
            <div className="sp-para" style={{ background: '#f5f0e8', padding: '1.25rem 1.5rem', borderRadius: '4px', borderLeft: `4px solid ${GOLD}`, maxWidth: '100%' }}>
              <strong>The snow layering, the way snow builds up or blows away, and the strange dune shapes
              in this corridor are among the least understood ingredients in the computer models scientists
              use to predict future sea level rise.</strong>
            </div>
            <Echo>
              Ice sheet models are the tools scientists use to answer questions like "how much will sea
              level rise by 2100, and how fast?" Those models are only as good as the real-world data fed
              into them. A gap in the data is a gap in our ability to answer that question with confidence
              — and this corridor is one of the biggest remaining gaps on Earth for this kind of
              measurement.
            </Echo>
          </div>

          {/* RADAR */}
          <div id="radar" className="sp-section" style={{ borderBottom: '1px solid #eee' }}>
            <p className="sp-section-label">Radar System</p>
            <h2 className="sp-section-title">A Radar That<br />Sees Through Snow</h2>
            <p className="sp-para">
              The instrument at the heart of EARS is a <strong className="sp-mono">2–8 GHz</strong> compact
              snow radar, built by CReSIS at the University of Kansas — the same lab and technology behind
              instruments flown on NASA's Operation IceBridge. It can see roughly <strong>100 metres</strong>{' '}
              down into the snow, with enough precision to tell layers apart that are only{' '}
              <strong>4 centimetres</strong> thick.
            </p>
            <Echo>
              Snow doesn't fall all at once — it builds up in layers, year after year, storm after storm,
              like the rings of a tree. A radar that can "see" 100 metres down and tell apart layers just 4
              centimetres thick can effectively read years, sometimes centuries, of weather history straight
              out of the ice, without digging a single hole.
            </Echo>
            <p className="sp-para">
              Flying at 2,000–2,500 feet above the surface, the radar's footprint on the ground is about
              20–25 metres along the flight path and 17–21 metres across it — narrow enough to trace real
              detail in features that are themselves only tens of metres wide, like the dune patterns below.
            </p>
            <div className="sp-card-grid-2">
              {[
                {
                  title: 'Megadunes',
                  text: 'Long, shallow, wave-like ridges unique to the East Antarctic Plateau, made of alternating stripes of snow buildup and snow-scoured-bare ground. They form only where wind and snowfall are perfectly balanced against each other.',
                  color: GOLD,
                },
                {
                  title: 'Blue Ice Areas',
                  text: 'Patches where wind has stripped away all the loose snow, exposing very old, dense ice underneath. These same windswept patches are where most of the meteorites ever found on Earth have turned up.',
                  color: '#333',
                },
              ].map((card, i) => (
                <div key={i} style={{ border: '2px solid #000', padding: '1.75rem', background: '#fff' }}>
                  <div style={{ width: '40px', height: '4px', background: card.color, marginBottom: '1rem' }} />
                  <h3 style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '1.4rem', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 900 }}>{card.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.7, margin: 0 }}>{card.text}</p>
                </div>
              ))}
            </div>
            <Echo>
              Nobody fully understands why megadunes form where they do, or how fast blue ice areas grow or
              shrink over time. Both are considered open questions in glaciology. Close-up radar data — the
              kind only a low, slow aircraft like Shannon's can collect — is exactly what's missing to
              answer them.
            </Echo>
            <div style={{ marginTop: '1.5rem', border: '2px solid #000', overflow: 'hidden' }}>
              <img
                src="/meg.png"
                alt="Radar survey imagery showing Antarctic megadune fields"
                style={{ width: '100%', height: 'clamp(200px, 30vw, 380px)', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            </div>
          </div>

          {/* INSTRUMENTS & TARGETS */}
          <div id="targets" className="sp-section" style={{ background: '#fafafa', borderBottom: '1px solid #eee' }}>
            <p className="sp-section-label">Instruments</p>
            <h2 className="sp-section-title">What The Aircraft<br />Actually Carries</h2>
            <p className="sp-para">
              Four instruments fly together, all reading the same ground at the same moment, so every
              measurement can be cross-checked against the others.
            </p>
            <div className="sp-target-grid">
              {[
                {
                  n: '01',
                  title: 'Snow Radar',
                  text: 'CReSIS 2–8 GHz compact snow radar. Images internal snow and ice layers completely invisible from the surface or from satellites — down to 100 metres, at 4cm vertical resolution.',
                },
                {
                  n: '02',
                  title: 'Laser Altimeter',
                  text: 'AG-Nav precision GPS system measuring the exact height of the ice surface to within a decimetre, mapping the shape of the terrain along the entire route.',
                },
                {
                  n: '03',
                  title: 'Multispectral Camera',
                  text: 'MicaSense RedEdge-P. Photographs the surface in colours the human eye can\'t see, revealing snow grain size, ice type, and surface condition.',
                },
              ].map((t, i) => (
                <div key={i} className="sp-target-card">
                  <div style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '3rem', fontWeight: 900, color: '#eee', lineHeight: 1, marginBottom: '0.5rem' }}>{t.n}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.title}</div>
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, margin: 0 }}>{t.text}</p>
                </div>
              ))}
            </div>
            <p className="sp-para" style={{ marginTop: '1.75rem' }}>
              A VectorNav VN-200 GPS/INS unit and an Emlid Reach M2 RTK GNSS receiver run continuously in
              the background, recording the aircraft's exact position and orientation so every radar echo
              can be corrected and placed precisely on the map.
            </p>
            <Echo>
              Raw radar data is only useful if you know exactly where the aircraft was, and exactly which
              way it was tilted, at the instant each reading was taken. Without that, the images come out
              blurred and unusable. This is the unglamorous plumbing that makes the headline science
              possible at all.
            </Echo>
            <p className="sp-para">
              One specific target threaded through the whole route: a known ash layer from the eruption of{' '}
              <strong>Mount Tambora in 1815</strong>, buried in the snow. Because scientists already know
              exactly when that ash fell, finding it again gives an exact, independently-verified calendar
              date buried in the ice — a fixed point to check everything else against.
            </p>
            <Echo>
              Think of it as a bookmark that's over 200 years old with a known date already written on it.
              Finding the same bookmark at multiple points along Shannon's route lets scientists check
              whether their reading of the other snow layers is accurate, and how fast snow has built up in
              different places over two centuries.
            </Echo>
          </div>

          {/* ROUTE */}
          <div id="route" className="sp-section" style={{ background: '#111', borderBottom: '1px solid #222' }}>
            <p className="sp-section-label" style={{ color: GOLD }}>Survey Route</p>
            <h2 className="sp-section-title" style={{ color: '#fff' }}>Ten Stops,<br />One Continuous Read</h2>
            <p className="sp-para" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '700px' }}>
              The radar runs the entire time the aircraft is over ice — not just at the "interesting" spots.
              These are the key waypoints along the way, including the dedicated survey box near Wolf's
              Fang where most of the core science happens.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              {routeStops.map((stop, i) => {
                const tag = routeTagStyles[stop.type] || { background: '#eee', color: '#000' };
                return (
                  <div key={i} className="sp-route-stop">
                    <div className="sp-route-loc">
                      <div className="sp-mono" style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                      }}>{i + 1}</div>
                      <span style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{stop.loc}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', margin: 0, flex: 1 }}>{stop.desc}</p>
                    <span style={{
                      ...tag,
                      fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '4px 10px', borderRadius: '2px', whiteSpace: 'nowrap',
                    }}>{stop.type}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIGNIFICANCE */}
          <div id="significance" className="sp-section" style={{ borderBottom: '1px solid #eee' }}>
            <p className="sp-section-label">Why It Matters</p>
            <h2 className="sp-section-title">Why This Is<br />Historic</h2>
            <div className="sp-sig-grid">
              <div>
                <p className="sp-para">
                  The snow layering and dune physics in this corridor are among the least understood
                  ingredients in current ice sheet models — the tools scientists rely on to project future
                  sea level rise.
                </p>
                <Echo>
                  Sea level rise affects everyone who lives near a coastline — which is billions of people.
                  Better data in this one corridor makes the global prediction more accurate, which helps
                  every coastal city on Earth plan further ahead with more confidence.
                </Echo>
                <p className="sp-para">
                  No solo pilot has ever combined a scientific survey like this with a round-the-world
                  aviation record. Shannon's mission puts real scientific instruments into terrain that, until
                  now, only major national polar programs — with dedicated aircraft fleets and full science
                  teams — could reach at all.
                </p>
                <p className="sp-para">
                  All of the data will be delivered to the <strong>National Snow and Ice Data Center
                  (NSIDC)</strong> in the same open, standardised format NASA's IceBridge used — meaning it's
                  freely available to any scientist on Earth, immediately, with no embargo.
                </p>
                <Echo>
                  Data that sits on one person's hard drive helps no one. Data delivered in the standard
                  format the whole field already uses, with no strings attached, becomes part of the shared
                  scientific record forever — usable by researchers who haven't even started their careers
                  yet.
                </Echo>
                <div style={{ border: '2px solid #000', padding: '1.75rem' }}>
                  <p className="sp-section-label" style={{ marginBottom: '0.75rem' }}>A First In Aviation History</p>
                  <p style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.7, margin: 0 }}>
                    First woman to fly a small plane to the South Pole. First woman to fly solo across all
                    seven continents westbound. First solo pilot to carry a scientific radar survey over the
                    East Antarctic interior.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { num: '100+', label: 'Antarctic IceBridge Campaigns', sub: 'Flown by NASA over a decade — and this corridor still fell through the gap.' },
                  { num: '0', label: 'Prior Solo Scientific Surveys Here', sub: 'No solo pilot has ever carried instruments across this exact terrain.' },
                  { num: '1', label: 'Sole Presenter Invited By RINGS', sub: 'The specialists who study this region first-hand — and Shannon was the only outside speaker in the room.' },
                ].map((stat, i) => (
                  <div key={i} style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: '1.5rem' }}>
                    <div className="sp-mono" style={{ fontSize: '2.4rem', fontWeight: 700, color: '#000', lineHeight: 1 }}>{stat.num}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000', marginTop: '0.25rem', marginBottom: '0.4rem' }}>{stat.label}</div>
                    <p style={{ fontSize: '0.825rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="sp-cta">
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, fontWeight: 700, marginBottom: '1rem' }}>Support The Science</p>
            <h2 className="sp-cta-title">
              This Data Will Matter<br />
              <span style={{ color: GOLD }}>For Decades</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Becoming a sponsor means your name is part of a mission that advances Antarctic science and
              breaks world records at the same time.
            </p>
            <a href="/contact" style={{
              display: 'inline-block', background: GOLD, color: '#000',
              fontWeight: 700, fontSize: '0.9rem', padding: '14px 36px',
              textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '2px',
            }}>
              Become a Sponsor
            </a>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default SciencePage;
