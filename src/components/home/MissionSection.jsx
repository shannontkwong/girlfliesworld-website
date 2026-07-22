import React, { useState, useEffect, useRef } from 'react';

const INK = '#111111';
const PAPER = '#F5F2EB';
const MUTE = '#5b5748';

const MissionSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const PARAGRAPHS = [
    {
      dropCap: true,
      text: "I\u2019m Shannon, a 20-year-old British\u2013Hong Kong aviator and the mission commander of the GIRLFLIESWORLD expedition. In October 2026, I will fly a solo airborne science expedition across all seven continents in a Diamond DA62 twin-engine aircraft \u2014 carrying radar, laser altimetry, and multispectral imaging over a sector of East Antarctica that no space agency has ever surveyed from the air. En route, I will attempt something no woman in history has ever done: to fly solo and unassisted to the South Pole.",
    },
    {
      text: "Working with researchers at the University of Colorado Boulder (CIRES) and the University of Kansas (CReSIS), I will lead low-altitude surveys over the Antarctic ice sheet that help validate satellite maps and improve the global climate models behind sea-level projections. All of the data is delivered open access, in the same format NASA\u2019s Operation IceBridge used \u2014 immediately usable by the scientists who need it most.",
    },
    {
      text: "The flying itself sits at the edge of what a small aircraft can do: interior Antarctic legs of up to 16 hours nonstop, solo, over some of the most remote, hostile, and breathtaking terrain on Earth, with nowhere to divert. Very few pilots ever attempt a route this extreme \u2014 and that is exactly why this dataset does not exist yet. Through this mission, I aim to show the next generation of scientists, explorers, and innovators \u2014 especially girls in STEM \u2014 what\u2019s possible when courage meets purpose.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={visible ? 'mission-visible' : ''}
      style={{ background: PAPER, padding: isMobile ? '3.5rem 1.5rem' : '6rem 4rem' }}
      id="mission"
    >
      <style>{`
        .mission-fade { opacity: 0; transform: translateY(22px); transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1); }
        .mission-visible .mission-fade { opacity: 1; transform: translateY(0); }
        .mission-visible .mission-fade:nth-child(1) { transition-delay: 0.05s; }
        .mission-visible .mission-fade:nth-child(2) { transition-delay: 0.15s; }
        .mission-visible .mission-fade:nth-child(3) { transition-delay: 0.25s; }
        .mission-visible .mission-fade:nth-child(4) { transition-delay: 0.35s; }
        .mission-visible .mission-fade:nth-child(5) { transition-delay: 0.42s; }
        .mission-btn:hover { background: ${INK}; color: #fff; }
        .mission-img:hover { transform: scale(1.02); }
      `}</style>

      {/* ── Narrow centered column, matching BoundariesSection ── */}
      <div style={{ maxWidth: '740px', margin: '0 auto', textAlign: 'center' }}>

        {/* Eyebrow */}
        <div className="mission-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ width: 28, height: 1, background: MUTE, flexShrink: 0 }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: MUTE,
          }}>The Mission &middot; GIRLFLIESWORLD 2026</span>
          <div style={{ width: 28, height: 1, background: MUTE, flexShrink: 0 }} />
        </div>

        <h2 className="mission-fade" style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: isMobile ? '2rem' : '2.6rem',
          fontWeight: 600,
          color: INK,
          margin: '0 0 2.5rem 0',
          lineHeight: 1.15,
        }}>
          Engines on. We have liftoff.
        </h2>

        {/* Paragraphs \u2014 left-aligned text inside a centered narrow column,
            drop cap on the first, matching the YC reference exactly */}
        <div style={{ textAlign: 'left' }}>
          {PARAGRAPHS.map((p, i) => (
            <p key={i} className="mission-fade" style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: isMobile ? '1.05rem' : '1.2rem',
              lineHeight: 1.75,
              color: INK,
              margin: '0 0 1.6rem 0',
            }}>
              {p.dropCap && (
                <span style={{
                  float: 'left',
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: isMobile ? '3.2rem' : '3.8rem',
                  lineHeight: 0.8,
                  fontWeight: 600,
                  padding: '0.1rem 0.15rem 0 0',
                  color: INK,
                }}>
                  {p.text.charAt(0)}
                </span>
              )}
              {p.dropCap ? p.text.slice(1) : p.text}
            </p>
          ))}
        </div>

        {/* Portrait, centered below the text */}
        <img
          src="/side.png"
          alt="Shannon in aircraft cockpit"
          className="mission-fade mission-img"
          style={{
            width: isMobile ? '220px' : '300px',
            height: isMobile ? '220px' : '300px',
            objectFit: 'cover',
            border: '1px solid rgba(17,17,17,0.15)',
            borderRadius: '6px',
            margin: '1rem auto 0',
            display: 'block',
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        <div className="mission-fade" style={{ marginTop: '2rem' }}>
          <a href="/journey" className="mission-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: isMobile ? '0.85rem 1.9rem' : '1rem 2.3rem',
            color: INK,
            background: 'transparent',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: isMobile ? '0.85rem' : '0.9rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRadius: '999px',
            border: `1px solid ${INK}`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Inter', sans-serif",
          }}>
            Follow Shannon&rsquo;s Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
