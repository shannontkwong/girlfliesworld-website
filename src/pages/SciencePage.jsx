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

const navItems = [
  { id: 'mission', label: 'The Mission' },
  { id: 'radar', label: 'Radar System' },
  { id: 'targets', label: 'Science Targets' },
  { id: 'route', label: 'Survey Route' },
  { id: 'instruments', label: 'Instruments' },
  { id: 'significance', label: 'Why It Matters' },
];

const routeStops = [
  { loc: 'Marsh Base', desc: 'Chilean Antarctic Peninsula — entry point', type: 'Start' },
  { loc: 'Marambio Base', desc: 'Trinity Peninsula & Vega Island Ice Cap — internal ice layering targets', type: 'Survey' },
  { loc: 'Weddell Sea', desc: 'Tabular icebergs — opportunistic altimeter & camera passes', type: 'Survey' },
  { loc: "Wolf's Fang", desc: 'Queen Maud Land — megadune fields & blue ice areas', type: 'Primary' },
  { loc: 'South Pole', desc: 'Transit pass — historic milestone', type: 'Milestone' },
  { loc: 'Cape Town', desc: 'Mission egress — data offload to NSIDC', type: 'End' },
];

const routeTagStyles = {
  Start: { background: '#000', color: '#fff' },
  Survey: { background: GOLD, color: '#000' },
  Primary: { background: PINK, color: '#fff' },
  Milestone: { background: '#C4A574', color: '#000' },
  End: { background: '#333', color: '#fff' },
};

const SciencePage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const mobileNavRef = useRef(null);

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

  // Scroll active tab into view in mobile nav
  useEffect(() => {
    if (!mobileNavRef.current) return;
    const activeEl = mobileNavRef.current.querySelector(`[data-id="${activeTab}"]`);
    if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeTab]);

  return (
    <>
      <style>{`
        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Science page layout ── */
        .sp-root {
          padding-top: 80px;
          display: flex;
          min-height: 100vh;
          background: #fff;
        }

        /* ── Desktop sidebar ── */
        .sp-sidebar {
          width: 280px;
          background: #C4A574;
          position: fixed;
          left: 0;
          top: 80px;
          height: calc(100vh - 80px);
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
          top: 60px;
          left: 0;
          right: 0;
          z-index: 20;
          background: #C4A574;
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

        /* ── Main content area ── */
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
        .sp-hero-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 5rem;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          color: #fff;
        }
        .sp-hero-sub {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.7);
          max-width: 700px;
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
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 3rem;
          font-weight: 900;
          color: #000;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .sp-stat-unit { font-size: 1.4rem; color: ${GOLD}; }

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
          font-size: 0.875rem;
          line-height: 1.75;
          font-weight: 500;
          color: #374151;
          margin-bottom: 1.5rem;
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
          border-radius: 0;
        }

        /* ── Cards grid ── */
        .sp-card-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 2.5rem;
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
          padding: 1.25rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-direction: row;
        }
        .sp-route-loc {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 200px;
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

        /* ══════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ══════════════════════════════════════ */

        /* ── Tablet & below (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .sp-sidebar { display: none; }
          .sp-mobile-nav { display: block; }
          .sp-root { padding-top: 60px; }
          .sp-main { margin-left: 0; padding-top: 46px; /* height of mobile nav */ }
          .sp-hero { padding: 4rem 1.5rem 3rem; }
          .sp-hero-title { font-size: 3.5rem; }
          .sp-hero-sub { font-size: 1rem; }
          .sp-section { padding: 3rem 1.5rem; }
          .sp-section-title { font-size: 1.8rem; }
          .sp-stats { grid-template-columns: repeat(2, 1fr); }
          .sp-stat-num { font-size: 2.2rem; }
          .sp-stat-unit { font-size: 1rem; }
          .sp-card-grid-2 { grid-template-columns: 1fr; }
          .sp-target-grid { grid-template-columns: 1fr; }
          .sp-target-card { border-right: none; border-bottom: 2px solid #000; }
          .sp-target-card:last-child { border-bottom: none; }
          .sp-route-stop { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .sp-route-loc { min-width: auto; }
          .sp-sig-grid { grid-template-columns: 1fr; gap: 2rem; }
          .sp-cta { padding: 3rem 1.5rem; }
          .sp-cta-title { font-size: 2rem; }
          .sp-hero-meta { flex-direction: column; gap: 1rem; }
        }

        /* ── Small mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .sp-hero-title { font-size: 2.6rem; }
          .sp-section-title { font-size: 1.6rem; }
          .sp-stats { grid-template-columns: repeat(2, 1fr); }
          .sp-mobile-nav-item { padding: 0.75rem 1rem; font-size: 0.75rem; }
        }
      `}</style>

      <div className="sp-root">

        {/* ── Desktop Sidebar ── */}
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

        {/* ── Mobile Tab Nav ── */}
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

        {/* ── Main Content ── */}
        <main className="sp-main">

          {/* HERO */}
          <div className="sp-hero">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.75) 100%)', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                display: 'inline-block',
                background: GOLD, color: '#000',
                fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '6px 16px', borderRadius: '2px', marginBottom: '1.5rem',
              }}>
                Historic First · Antarctic Airborne Science
              </div>
              <h1 className="sp-hero-title">
                A Mini<br />IceBridge<br />
                <span style={{ color: GOLD }}>For One</span><br />Profile
              </h1>
              <p className="sp-hero-sub">
                No solo pilot has ever carried scientific instruments of this kind to the South Pole. Shannon's 2026 expedition will collect airborne radar and altimetry data over terrain unreachable by any large research aircraft — and deliver it directly to the international Antarctic science community.
              </p>
              <div className="sp-hero-meta">
                {[
                  { label: 'Expedition Departure', value: 'October 2026' },
                  { label: 'Data Delivery', value: 'February–March 2027' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, fontWeight: 700 }}>{m.label}</span>
                    <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS STRIP */}
          <div className="sp-stats">
            {[
              { num: '600–900', unit: 'MHz', label: 'Radar Frequency' },
              { num: '100', unit: 'm', label: 'Snow Penetration Depth' },
              { num: '1', unit: 'Pilot', label: 'Solo Operation' },
              { num: '7', unit: 'Continents', label: 'Full Global Traverse' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div className="sp-stat-num">
                  {s.num}<span className="sp-stat-unit">{s.unit}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* MISSION */}
          <div id="mission" className="sp-section" style={{ borderBottom: '1px solid #eee' }}>
            <p className="sp-section-label">The Mission</p>
            <h2 className="sp-section-title">No One Has Done This Before</h2>
            <blockquote className="sp-quote">
              "Shannon's traverse is, in the words of her scientific collaborators, 'a mini-IceBridge for one profile' — a single-pilot scientific transect that crosses terrain no large research aircraft can access economically."
            </blockquote>
            <p className="sp-para">
              NASA's Operation IceBridge — the largest airborne polar survey in history — flew more than 1,000 missions over 13 years. Its Antarctic campaigns focused on rapidly changing glaciers in West Antarctica, the Antarctic Peninsula, and coastal East Antarctica. Systematic high-resolution radar coverage of the deep East Antarctic interior, particularly the Atlantic-facing plateau between the Filchner-Ronne Ice Shelf and Queen Maud Land, <strong>remains sparse in the published record</strong>.
            </p>
            <p className="sp-para">
              Shannon's route crosses exactly this under-surveyed corridor. The data she returns will be directly usable by the international Antarctic community — contributing a novel airborne dataset to a region where dedicated survey data is critically limited.
            </p>
            <p className="sp-para" style={{ background: '#f5f0e8', padding: '1.25rem 1.5rem', borderRadius: '4px', borderLeft: `4px solid ${GOLD}`, maxWidth: '100%' }}>
              <strong>The internal layering, surface mass balance, and megadune physics of this corridor are among the most poorly constrained boundary conditions in current ice sheet models — with direct implications for sea level projections worldwide.</strong>
            </p>
          </div>

          {/* RADAR */}
          <div id="radar" className="sp-section" style={{ background: '#fafafa', borderBottom: '1px solid #eee' }}>
            <p className="sp-section-label">Radar System</p>
            <h2 className="sp-section-title">Radar<br />Frequency &amp; Type</h2>
            <p className="sp-para">
              The airborne radar selected for the flight is a high-frequency, shallow-penetrating profiling system. Operating at <strong>600 to 900 MHz</strong>, it is capable of resolving layering in the snow up to 100 metres depth, and resolving dust and impurity layers in blue ice regions.
            </p>
            <p className="sp-para">
              This system specialises in exploring internal snow structures caused by wind, or structures within the upper ice sheet formed by folding or stretching of ice as it flows. Mapping these in detail reveals the history of accumulation, areas of wind erosion or enhanced deposition, crevassing, and exposure of older ice at the surface.
            </p>
            <div className="sp-card-grid-2">
              {[
                {
                  title: 'Megadunes',
                  text: 'Linear, shallow dune features unique to the East Antarctic Plateau. Formed by stripes of accumulating snow alternating with areas where persistent wind removes all new snow — leaving older snow layers exposed between dunes.',
                  color: GOLD,
                },
                {
                  title: 'Blue Ice Areas',
                  text: 'Regions of exposed very old ice where ice flow over bedrock forces ice into strong winds, ablating upper layers and exposing deep interior ice. Also the source of thousands of meteorites brought to the surface over millennia.',
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
            <div style={{ marginTop: '1.5rem', border: '2px solid #000', overflow: 'hidden' }}>
              <img
                src="/meg.png"
                alt="Radar survey imagery showing Antarctic megadune fields"
                style={{ width: '100%', height: 'clamp(200px, 30vw, 380px)', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            </div>
          </div>

          {/* TARGETS */}
          <div id="targets" className="sp-section" style={{ borderBottom: '1px solid #eee' }}>
            <p className="sp-section-label">Science Targets</p>
            <h2 className="sp-section-title">What The Aircraft<br />Will Carry</h2>
            <div className="sp-target-grid">
              {[
                {
                  n: '01',
                  title: 'Snow Radar',
                  text: 'Imaging internal snow and ice layers invisible from the surface or satellite. 600–900 MHz, penetrating up to 100 metres.',
                },
                {
                  n: '02',
                  title: 'Precision Laser Altimetry',
                  text: 'High-accuracy GPS measuring ice surface elevation to decimetre precision — mapping surface topography along the full transect.',
                },
                {
                  n: '03',
                  title: 'Multispectral Imaging',
                  text: 'Capturing surface conditions, snow and ice grain size, and ice features across the visible-NIR spectrum. MicaSense RedEdge-P.',
                },
              ].map((t, i) => (
                <div key={i} className="sp-target-card">
                  <div style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '3rem', fontWeight: 900, color: '#eee', lineHeight: 1, marginBottom: '0.5rem' }}>{t.n}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.title}</div>
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, margin: 0 }}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ROUTE */}
          <div id="route" className="sp-section" style={{ background: '#111', borderBottom: '1px solid #222' }}>
            <p className="sp-section-label" style={{ color: GOLD }}>Survey Route</p>
            <h2 className="sp-section-title" style={{ color: '#fff' }}>Scientific<br />Survey Locations</h2>
            <p className="sp-para" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '700px' }}>
              The planned traverse begins at Marsh Base on the Chilean Antarctic Peninsula, crosses the continental interior to Wolf's Fang in Queen Maud Land, passes over the South Pole region, and exits to Cape Town — covering terrain never surveyed by a solo scientific pilot.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              {routeStops.map((stop, i) => {
                const tag = routeTagStyles[stop.type] || { background: '#eee', color: '#000' };
                return (
                  <div key={i} className="sp-route-stop">
                    <div className="sp-route-loc">
                      <div style={{
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
                  The internal layering and megadune physics of the East Antarctic corridor between the Filchner-Ronne Ice Shelf and Queen Maud Land are among the most poorly constrained boundary conditions in current ice sheet models. These gaps have direct implications for global sea level projections.
                </p>
                <p className="sp-para">
                  No previous solo pilot has combined scientific data collection of this kind with a world-record aviation attempt. Shannon's mission bridges exploration and research in a way never before achieved — placing scientific instruments in terrain previously accessible only to major national polar programs with dedicated fleets and teams of scientists.
                </p>
                <p className="sp-para">
                  The data will be delivered to the <strong>National Snow and Ice Data Center (NSIDC)</strong> — making it freely available to the global research community.
                </p>
                <div style={{ border: '2px solid #000', padding: '1.75rem' }}>
                  <p className="sp-section-label" style={{ marginBottom: '0.75rem' }}>A First In Aviation History</p>
                  <p style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.7, margin: 0 }}>
                    First woman to fly a small plane to the South Pole. First woman to fly solo across all seven continents westbound. First solo pilot to carry airborne radar instrumentation over the East Antarctic interior.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { num: '13', label: 'Years of NASA IceBridge', sub: "The benchmark Shannon's mission extends into uncovered terrain." },
                  { num: '1,000+', label: 'IceBridge Missions Flown', sub: 'Zero of them solo. Zero over this corridor.' },
                  { num: '0', label: 'Prior Solo Scientific Transects', sub: 'No pilot has ever done this. Shannon will be the first.' },
                ].map((stat, i) => (
                  <div key={i} style={{ borderLeft: `4px solid ${GOLD}`, paddingLeft: '1.5rem', borderRadius: 0 }}>
                    <div style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '2.8rem', fontWeight: 900, color: '#000', lineHeight: 1 }}>{stat.num}</div>
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
              Becoming a sponsor means your name is part of a mission that advances Antarctic science and breaks world records simultaneously.
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
