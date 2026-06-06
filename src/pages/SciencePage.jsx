import React, { useState, useEffect } from 'react';

const Footer = () => {
  const footerStyle = {
    background: '#000000',
    color: '#ffffff',
    padding: '4rem 2rem 2rem',
    marginTop: '4rem'
  };
  const footerRowStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    alignItems: 'start'
  };
  const h4Style = { fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem', color: 'rgb(255, 30, 154)' };
  const linksStyle = { listStyle: 'none', padding: 0 };
  const linkItemStyle = { marginBottom: '0.8rem' };
  const linkStyle = { color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' };
  const logoColStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' };
  const logoStyle = { maxWidth: '200px', height: 'auto', marginBottom: '1rem' };
  const missionTextStyle = { color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '300px' };
  const footerBottomStyle = { textAlign: 'center', paddingTop: '2rem', marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)', opacity: 0.7 };
  return (
    <footer style={footerStyle}>
      <div style={footerRowStyle}>
        <div><h4 style={h4Style}>Info</h4><ul style={linksStyle}><li style={linkItemStyle}><a href="/aboutme" style={linkStyle}>About Me</a></li><li style={linkItemStyle}><a href="/journey" style={linkStyle}>My Journey</a></li><li style={linkItemStyle}><a href="/contact" style={linkStyle}>Contact</a></li></ul></div>
        <div><h4 style={h4Style}>Explore</h4><ul style={linksStyle}><li style={linkItemStyle}><a href="/science" style={linkStyle}>The Science</a></li><li style={linkItemStyle}><a href="/sponsors" style={linkStyle}>Become a Sponsor</a></li><li style={linkItemStyle}><a href="/blog" style={linkStyle}>Blog</a></li></ul></div>
        <div style={logoColStyle}><img src='/si.png' alt="GIRLFLIESWORLD Logo" style={logoStyle} /><p style={missionTextStyle}>First woman to fly solo to all 7 continents and the South Pole.</p></div>
      </div>
      <div style={footerBottomStyle}><p>&copy; 2025 GIRLFLIESWORLD. All rights reserved.</p></div>
    </footer>
  );
};

const SciencePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'mission', label: 'The Mission' },
    { id: 'radar', label: 'Radar System' },
    { id: 'targets', label: 'Science Targets' },
    { id: 'route', label: 'Survey Route' },
    { id: 'instruments', label: 'Instruments' },
    { id: 'significance', label: 'Why It Matters' },
  ];

  const scrollTo = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sidebarBg = '#C4A574';
  const gold = '#C4A574';
  const red = '#ff1e9a';

  const pageStyle = {
    paddingTop: isMobile ? '60px' : '80px',
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fff',
  };

  const heroStyle = {
    background: '#000',
    backgroundImage: 'url(/ib.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
    padding: isMobile ? '4rem 1.5rem 3rem' : '7rem 4rem 5rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const heroBadgeStyle = {
    display: 'inline-block',
    background: gold,
    color: '#000',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '6px 16px',
    borderRadius: '2px',
    marginBottom: '1.5rem',
  };

  const heroTitleStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? '2.8rem' : '5rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
    color: '#fff',
  };

  const heroSubStyle = {
    fontSize: isMobile ? '1rem' : '1.2rem',
    color: 'rgba(255,255,255,0.7)',
    maxWidth: '700px',
    lineHeight: 1.8,
    marginBottom: '2rem',
  };

  const heroMetaStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.15)',
    paddingTop: '2rem',
    marginTop: '2rem',
  };

  const heroMetaLabelStyle = {
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: gold,
    fontWeight: 700,
  };

  const heroMetaValueStyle = {
    fontSize: '0.95rem',
    color: '#fff',
    fontWeight: 500,
  };

  const sidebarStyle = {
    width: isMobile ? '0' : '280px',
    backgroundColor: sidebarBg,
    position: 'fixed',
    left: 0,
    top: isMobile ? '60px' : '80px',
    height: 'calc(100vh - 80px)',
    padding: '2rem 0',
    overflowY: 'auto',
    zIndex: 10,
    display: isMobile ? 'none' : 'block',
  };

  const navItemStyle = (active) => ({
    display: 'block',
    padding: '1rem 2rem',
    color: active ? '#fff' : '#000',
    textDecoration: 'none',
    fontSize: active ? '1rem' : '0.9rem',
    fontWeight: active ? '700' : '500',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: active ? 'rgba(0,0,0,0.2)' : 'transparent',
  });

  const mainStyle = {
    marginLeft: isMobile ? '0' : '280px',
    flex: 1,
    backgroundColor: '#fff',
  };

  const sectionPadding = isMobile ? '3rem 1.5rem' : '4rem 3rem';

  const sectionLabelStyle = {
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: gold,
    fontWeight: 700,
    marginBottom: '0.75rem',
  };

  const sectionTitleStyle = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? '1.8rem' : '2.2rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: '#000',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  };

  const paragraphStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.75,
    fontWeight: '500',
    color: '#374151',
    marginBottom: '1.5rem',
    maxWidth: '800px',
  };

  const statsGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
    gap: '1px',
    background: '#000',
    border: '1px solid #000',
    marginTop: '0',
    marginBottom: '0',
  };

  const statCard = {
    background: '#fff',
    padding: '2rem 1.5rem',
    textAlign: 'center',
  };

  const statNum = {
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    fontSize: isMobile ? '2.2rem' : '3rem',
    fontWeight: 900,
    color: '#000',
    lineHeight: 1,
    marginBottom: '0.5rem',
  };

  const statLabel = {
    fontSize: '0.75rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600,
  };

  const quoteBlock = {
    borderLeft: `4px solid ${gold}`,
    paddingLeft: '1.5rem',
    margin: '2rem 0',
    fontStyle: 'italic',
    fontSize: '1.05rem',
    color: '#222',
    lineHeight: 1.7,
  };

  const targetGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: '0',
    border: '2px solid #000',
    marginTop: '2rem',
  };

  const targetCard = (index) => ({
    padding: '2rem',
    borderRight: index < 2 && !isMobile ? '2px solid #000' : 'none',
    borderBottom: isMobile && index < 2 ? '2px solid #000' : 'none',
  });

  const routeStops = [
    { loc: 'Marsh Base', desc: 'Chilean Antarctic Peninsula — entry point', type: 'Start' },
    { loc: 'Marambio Base', desc: 'Trinity Peninsula & Vega Island Ice Cap — internal ice layering targets', type: 'Survey' },
    { loc: 'Weddell Sea', desc: 'Tabular icebergs — opportunistic altimeter & camera passes', type: 'Survey' },
    { loc: "Wolf's Fang", desc: 'Queen Maud Land — megadune fields & blue ice areas', type: 'Primary' },
    { loc: 'South Pole', desc: 'Transit pass — historic milestone', type: 'Milestone' },
    { loc: 'Cape Town', desc: 'Mission egress — data offload to NSIDC', type: 'End' },
  ];

  const routeTagColor = (type) => ({
    Start: { bg: '#000', text: '#fff' },
    Survey: { bg: gold, text: '#000' },
    Primary: { bg: red, text: '#fff' },
    Milestone: { bg: '#C4A574', text: '#000' },
    End: { bg: '#333', text: '#fff' },
  }[type] || { bg: '#eee', text: '#000' });

  return (
    <div style={pageStyle}>

      <nav style={sidebarStyle}>
        {navItems.map(item => (
          <div key={item.id} style={navItemStyle(activeTab === item.id)} onClick={() => scrollTo(item.id)}>
            {item.label}
          </div>
        ))}
      </nav>

      <main style={mainStyle}>

        {/* HERO */}
        <div style={heroStyle}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.75) 100%)',
            zIndex: 1,
          }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={heroBadgeStyle}>Historic First · Antarctic Airborne Science</div>
            <h1 style={heroTitleStyle}>
              A Mini<br />IceBridge<br />
              <span style={{ color: gold }}>For One</span><br />Profile
            </h1>
            <p style={heroSubStyle}>
              No solo pilot has ever carried scientific instruments of this kind to the South Pole. Shannon's 2026 expedition will collect airborne radar and altimetry data over terrain unreachable by any large research aircraft — and deliver it directly to the international Antarctic science community.
            </p>
            <div style={heroMetaStyle}>
              {[
                { label: 'Expedition Departure', value: 'October 2026' },
                { label: 'Data Delivery', value: 'February–March 2027' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={heroMetaLabelStyle}>{m.label}</span>
                  <span style={heroMetaValueStyle}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STAT STRIP */}
        <div style={statsGrid}>
          {[
            { num: '600–900', unit: 'MHz', label: 'Radar Frequency' },
            { num: '100', unit: 'm', label: 'Snow Penetration Depth' },
            { num: '1', unit: 'Pilot', label: 'Solo Operation' },
            { num: '7', unit: 'Continents', label: 'Full Global Traverse' },
          ].map((s, i) => (
            <div key={i} style={statCard}>
              <div style={statNum}>{s.num}<span style={{ fontSize: isMobile ? '1rem' : '1.4rem', color: gold }}>{s.unit}</span></div>
              <div style={statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* MISSION */}
        <div id="mission" style={{ padding: sectionPadding, borderBottom: '1px solid #eee' }}>
          <p style={sectionLabelStyle}>The Mission</p>
          <h2 style={sectionTitleStyle}>No One Has Done This Before</h2>
          <div style={quoteBlock}>
            "Shannon's traverse is, in the words of her scientific collaborators, 'a mini-IceBridge for one profile' — a single-pilot scientific transect that crosses terrain no large research aircraft can access economically."
          </div>
          <p style={paragraphStyle}>
            NASA's Operation IceBridge — the largest airborne polar survey in history — flew more than 1,000 missions over 13 years. Its Antarctic campaigns focused on rapidly changing glaciers in West Antarctica, the Antarctic Peninsula, and coastal East Antarctica. Systematic high-resolution radar coverage of the deep East Antarctic interior, particularly the Atlantic-facing plateau between the Filchner-Ronne Ice Shelf and Queen Maud Land, <strong>remains sparse in the published record</strong>.
          </p>
          <p style={paragraphStyle}>
            Shannon's route crosses exactly this under-surveyed corridor. The data she returns will be directly usable by the international Antarctic community — contributing a novel airborne dataset to a region where dedicated survey data is critically limited.
          </p>
          <p style={{ ...paragraphStyle, background: '#f5f0e8', padding: '1.25rem 1.5rem', borderRadius: '4px', borderLeft: `4px solid ${gold}`, maxWidth: '100%' }}>
            <strong>The internal layering, surface mass balance, and megadune physics of this corridor are among the most poorly constrained boundary conditions in current ice sheet models — with direct implications for sea level projections worldwide.</strong>
          </p>
        </div>

        {/* RADAR */}
        <div id="radar" style={{ padding: sectionPadding, background: '#fafafa', borderBottom: '1px solid #eee' }}>
          <p style={sectionLabelStyle}>Radar System</p>
          <h2 style={sectionTitleStyle}>Radar<br />Frequency & Type</h2>
          <p style={paragraphStyle}>
            The airborne radar selected for the flight is a high-frequency, shallow-penetrating profiling system. Operating at <strong>600 to 900 MHz</strong>, it is capable of resolving layering in the snow up to 100 metres depth, and resolving dust and impurity layers in blue ice regions.
          </p>
          <p style={paragraphStyle}>
            This system specialises in exploring internal snow structures caused by wind, or structures within the upper ice sheet formed by folding or stretching of ice as it flows. Mapping these in detail reveals the history of accumulation, areas of wind erosion or enhanced deposition, crevassing, and exposure of older ice at the surface.
          </p>

          {/* Two cards */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              {
                title: 'Megadunes',
                text: 'Linear, shallow dune features unique to the East Antarctic Plateau. Formed by stripes of accumulating snow alternating with areas where persistent wind removes all new snow — leaving older snow layers exposed between dunes.',
                color: gold,
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

          {/* Image below the two cards — replace /your-radar-image.jpg with your actual image */}
          <div style={{ marginTop: '1.5rem', border: '2px solid #000', overflow: 'hidden' }}>
            <img
              src="/meg.png"
              alt="Radar survey imagery"
              style={{
                width: '100%',
                height: isMobile ? '220px' : '380px',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
            
          </div>
        </div>

        {/* TARGETS */}
        <div id="targets" style={{ padding: sectionPadding, borderBottom: '1px solid #eee' }}>
          <p style={sectionLabelStyle}>Science Targets</p>
          <h2 style={sectionTitleStyle}>What The Aircraft<br />Will Carry</h2>
          <div style={targetGrid}>
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
              <div key={i} style={targetCard(i)}>
                <div style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '3rem', fontWeight: 900, color: '#eee', lineHeight: 1, marginBottom: '0.5rem' }}>{t.n}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#000', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.title}</div>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, margin: 0 }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROUTE */}
        <div id="route" style={{ padding: sectionPadding, background: '#111', borderBottom: '1px solid #222' }}>
          <p style={{ ...sectionLabelStyle, color: gold }}>Survey Route</p>
          <h2 style={{ ...sectionTitleStyle, color: '#fff' }}>Scientific<br />Survey Locations</h2>
          <p style={{ ...paragraphStyle, color: 'rgba(255,255,255,0.65)', maxWidth: '700px' }}>
            The planned traverse begins at Marsh Base on the Chilean Antarctic Peninsula, crosses the continental interior to Wolf's Fang in Queen Maud Land, passes over the South Pole region, and exits to Cape Town — covering terrain never surveyed by a solo scientific pilot.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            {routeStops.map((stop, i) => {
              const tag = routeTagColor(stop.type);
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: '1.5rem',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  flexDirection: isMobile ? 'column' : 'row',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: isMobile ? 'auto' : '200px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{stop.loc}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', margin: 0, flex: 1 }}>{stop.desc}</p>
                  <span style={{ background: tag.bg, color: tag.text, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '2px', whiteSpace: 'nowrap' }}>{stop.type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIGNIFICANCE — full width, two columns of equal weight */}
        <div id="significance" style={{ padding: sectionPadding, borderBottom: '1px solid #eee' }}>
          <p style={sectionLabelStyle}>Why It Matters</p>
          <h2 style={sectionTitleStyle}>Why This Is<br />Historic</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '3rem',
            marginTop: '2rem',
          }}>
            {/* Left column — text */}
            <div>
              <p style={paragraphStyle}>
                The internal layering and megadune physics of the East Antarctic corridor between the Filchner-Ronne Ice Shelf and Queen Maud Land are among the most poorly constrained boundary conditions in current ice sheet models. These gaps have direct implications for global sea level projections.
              </p>
              <p style={paragraphStyle}>
                No previous solo pilot has combined scientific data collection of this kind with a world-record aviation attempt. Shannon's mission bridges exploration and research in a way never before achieved — placing scientific instruments in terrain previously accessible only to major national polar programs with dedicated fleets and teams of scientists.
              </p>
              <p style={paragraphStyle}>
                The data will be delivered to the <strong>National Snow and Ice Data Center (NSIDC)</strong> — making it freely available to the global research community.
              </p>
              <div style={{ border: '2px solid #000', padding: '1.75rem' }}>
                <p style={{ ...sectionLabelStyle, marginBottom: '0.75rem' }}>A First In Aviation History</p>
                <p style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.7, margin: 0 }}>
                  First woman to fly a small plane to the South Pole. First woman to fly solo across all seven continents westbound. First solo pilot to carry airborne radar instrumentation over the East Antarctic interior.
                </p>
              </div>
            </div>

            {/* Right column — three stat highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { num: '13', label: 'Years of NASA IceBridge', sub: 'The benchmark Shannon\'s mission extends into uncovered terrain.' },
                { num: '1,000+', label: 'IceBridge Missions Flown', sub: 'Zero of them solo. Zero over this corridor.' },
                { num: '0', label: 'Prior Solo Scientific Transects', sub: 'No pilot has ever done this. Shannon will be the first.' },
              ].map((stat, i) => (
                <div key={i} style={{ borderLeft: `4px solid ${gold}`, paddingLeft: '1.5rem' }}>
                  <div style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '2.8rem', fontWeight: 900, color: '#000', lineHeight: 1 }}>{stat.num}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#000', marginTop: '0.25rem', marginBottom: '0.4rem' }}>{stat.label}</div>
                  <p style={{ fontSize: '0.825rem', color: '#666', lineHeight: 1.6, margin: 0 }}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#000', padding: isMobile ? '3rem 1.5rem' : '5rem 4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: gold, fontWeight: 700, marginBottom: '1rem' }}>Support The Science</p>
          <h2 style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            This Data Will Matter<br />
            <span style={{ color: gold }}>For Decades</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Becoming a sponsor means your name is part of a mission that advances Antarctic science and breaks world records simultaneously.
          </p>
          <a href="/contact" style={{ display: 'inline-block', background: gold, color: '#000', fontWeight: 700, fontSize: '0.9rem', padding: '14px 36px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '2px' }}>
            Become a Sponsor
          </a>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default SciencePage;
