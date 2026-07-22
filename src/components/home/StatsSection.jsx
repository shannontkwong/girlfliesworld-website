import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * StatsSection — continuous scroll-driven crossfade, zero friction.
 *
 * WHY THE OLD VERSION FELT LIKE IT HAD RESISTANCE: it only updated the
 * display at fixed 1/6 boundaries (Math.floor(progress * SPECS.length)),
 * so nothing visibly changed while scrolling *through* a spec's range —
 * then it jump-cut via a CSS keyframe animation the instant you crossed
 * a boundary. Dead zone, then a pop. That reads as friction.
 *
 * THE FIX: track scroll progress as a continuous float, not a stepped
 * integer. Every spec crossfades into the next in direct, linear
 * proportion to scroll position — opacity is SET each frame from the
 * scroll value itself, with no CSS transition/animation duration adding
 * lag. The visual always matches the scrollbar exactly: no dead zones,
 * no pauses, no pop. Scroll up, it runs backward the same way.
 *
 * DESKTOP: pinned scroll (position: sticky) — one continuous scrollable
 * range across all specs.
 * MOBILE: unchanged — stacked blocks revealed via IntersectionObserver,
 * no pin, no crossfade needed (normal page scroll has no "friction"
 * to fix here).
 *
 * IMAGES: local PNGs in /public — see IMG map below.
 */

const INK = '#111111';
const PAPER = '#F5F2EB';
const MUTE = '#5b5748';
const GHOST = 'rgba(17,17,17,0.22)';

const IMG = {
  cockpitCalm: '/moi.png',
  cockpitDramatic: '/rr.png',
  apronAircraft: '/cc.png',
  wingOverSnow: '/dd.png',
  auroraSnow: '/ff.png',
  satelliteDish: '/gg.png',
};

const SPECS = [
  {
    key: 'endurance',
    centerLine: '16+ Hours Nonstop',
    leftLabel: 'Training',
    leftCaption: 'Preparing for the coldest flying on Earth.',
    leftImage: IMG.cockpitCalm,
    rightLabel: 'The Flight',
    rightCaption: '16-hour interior Antarctic legs, solo.',
    rightImage: IMG.cockpitDramatic,
  },
  {
    key: 'range',
    centerLine: '3,000 NM Longest Leg',
    leftLabel: 'Departure',
    leftCaption: 'The start of the longest single leg of the route.',
    leftImage: IMG.apronAircraft,
    rightLabel: 'Arrival',
    rightCaption: '76,000 km of total distance, end to end.',
    rightImage: IMG.wingOverSnow,
  },
  {
    key: 'temperature',
    centerLine: '\u221250\u00b0C Harshest Cold',
    leftLabel: 'Ground',
    leftCaption: 'The coldest conditions on Earth, before takeoff.',
    leftImage: IMG.auroraSnow,
    rightLabel: 'Altitude',
    rightCaption: 'Alone in the cockpit, at altitude, in the cold.',
    rightImage: IMG.wingOverSnow,
  },
  {
    key: 'continents',
    centerLine: '7 Continents',
    leftLabel: 'Departure',
    leftCaption: 'United Kingdom, October 2026.',
    leftImage: IMG.apronAircraft,
    rightLabel: 'Arrival',
    rightCaption: 'A single-pilot circumnavigation, continent by continent.',
    rightImage: IMG.auroraSnow,
  },
  {
    key: 'nations',
    centerLine: '50+ Nations Crossed',
    leftLabel: 'Route',
    leftCaption: 'A cross-cultural path spanning six continents and both poles.',
    leftImage: IMG.satelliteDish,
    rightLabel: 'Ground',
    rightCaption: 'Every stop along the way, logged and flown.',
    rightImage: IMG.cockpitCalm,
  },
  {
    key: 'age',
    centerLine: '20 Years Old',
    leftLabel: 'Built',
    leftCaption: 'No institution. No lab. No supervisor.',
    leftImage: IMG.satelliteDish,
    rightLabel: 'Flown',
    rightCaption: 'October 2026 \u2014 wheels up.',
    rightImage: IMG.cockpitDramatic,
  },
];

// Center list: continuous fractional progress, not an integer index, so
// text size/opacity slides smoothly rather than snapping between two states.
const CenterColumn = ({ progress }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.4rem',
    height: '100%',
  }}>
    {SPECS.map((spec, i) => {
      const distance = Math.abs(i - progress);
      const closeness = Math.max(0, 1 - distance); // 1 at exact match, 0 a full step away
      const fontSize = 1.1 + closeness * 1.3; // rem, interpolated continuously
      const opacity = Math.max(0.22, 0.35 + closeness * 0.65);
      const weight = 500 + Math.round(closeness * 200);
      return (
        <span
          key={spec.key}
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: weight,
            fontSize: `${fontSize}rem`,
            color: closeness > 0.5 ? INK : GHOST,
            opacity,
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          {spec.centerLine}
        </span>
      );
    })}
  </div>
);

const Photo = ({ src, alt, imgError, setImgError, opacity }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    opacity,
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(17,17,17,0.1)',
  }}>
    {!imgError ? (
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={setImgError}
      />
    ) : (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Lora', serif", fontSize: '1.2rem', color: MUTE,
        background: 'rgba(17,17,17,0.04)',
      }}>
        {alt}
      </div>
    )}
  </div>
);

// One column (left or right), continuously crossfading between the
// current spec and the next one in direct proportion to scroll — no
// CSS transition duration, no delay, so it tracks the scrollbar exactly.
const PanelColumn = ({ specA, specB, t, side, imgErrors, markError }) => {
  const key = side === 'left' ? 'leftImage' : 'rightImage';
  const labelKey = side === 'left' ? 'leftLabel' : 'rightLabel';
  const capKey = side === 'left' ? 'leftCaption' : 'rightCaption';
  return (
    <div style={{ height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '1.6rem', marginBottom: '1rem' }}>
        <p style={{ position: 'absolute', inset: 0, opacity: 1 - t, fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '1.15rem', color: INK, margin: 0 }}>
          {specA[labelKey]}
        </p>
        <p style={{ position: 'absolute', inset: 0, opacity: t, fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '1.15rem', color: INK, margin: 0 }}>
          {specB[labelKey]}
        </p>
      </div>

      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <Photo src={specA[key]} alt={specA[labelKey]} imgError={imgErrors[specA[key]]} setImgError={() => markError(specA[key])} opacity={1 - t} />
        <Photo src={specB[key]} alt={specB[labelKey]} imgError={imgErrors[specB[key]]} setImgError={() => markError(specB[key])} opacity={t} />
      </div>

      <div style={{ position: 'relative', height: '1.4rem', marginTop: '1rem' }}>
        <p style={{ position: 'absolute', inset: 0, opacity: 1 - t, fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: MUTE, margin: 0 }}>
          {specA[capKey]}
        </p>
        <p style={{ position: 'absolute', inset: 0, opacity: t, fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: MUTE, margin: 0 }}>
          {specB[capKey]}
        </p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0); // continuous float, 0..SPECS.length-1
  const [imgErrors, setImgErrors] = useState({});
  const [mobileVisible, setMobileVisible] = useState({});
  const wrapperRef = useRef(null);
  const rafRef = useRef(null);
  const mobileRefs = useRef([]);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    handle();
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const markError = (key) => setImgErrors((p) => ({ ...p, [key]: true }));

  // ---- DESKTOP: continuous scroll → continuous progress, every frame ----
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = wrapperRef.current;
      if (!el || isMobile) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) return;

      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
      // Clamp just under the max index so there's always a valid "next" spec
      // to crossfade toward, except at the very last one where it holds.
      const p = Math.min(SPECS.length - 1, raw * SPECS.length);
      setProgress(p);
    });
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, handleScroll]);

  // ---- MOBILE: stacked reveal, no pin, no crossfade needed ----
  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setMobileVisible((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.25 }
    );
    mobileRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  const sharedStyle = (
    <style>{`
      .stat-dot { width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer; transition: background 0.3s ease; }
      .stat-mobile-panel { opacity: 0; transform: translateY(24px); transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1); }
      .stat-mobile-panel.visible { opacity: 1; transform: translateY(0); }
    `}</style>
  );

  if (isMobile) {
    return (
      <section style={{ background: PAPER, borderTop: '1px solid rgba(17,17,17,0.1)', borderBottom: '1px solid rgba(17,17,17,0.1)' }}>
        {sharedStyle}
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.26em', textTransform: 'uppercase', color: MUTE,
          textAlign: 'center', padding: '3rem 1.5rem 0',
        }}>
          The Mission in Numbers
        </p>
        {SPECS.map((spec, i) => (
          <div
            key={spec.key}
            ref={(el) => (mobileRefs.current[i] = el)}
            data-idx={i}
            className={`stat-mobile-panel${mobileVisible[i] ? ' visible' : ''}`}
            style={{ padding: '2.5rem 1.5rem', borderBottom: i < SPECS.length - 1 ? '1px solid rgba(17,17,17,0.08)' : 'none', textAlign: 'center' }}
          >
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 700, fontSize: '1.6rem', color: INK, margin: '0 0 1.5rem 0' }}>
              {spec.centerLine}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '0.95rem', color: INK, margin: '0 0 0.6rem 0' }}>{spec.leftLabel}</p>
                <div style={{ position: 'relative', height: '160px' }}>
                  <Photo src={spec.leftImage} alt={spec.leftLabel} imgError={imgErrors[spec.leftImage]} setImgError={() => markError(spec.leftImage)} opacity={1} />
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: MUTE, marginTop: '0.6rem' }}>{spec.leftCaption}</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '0.95rem', color: INK, margin: '0 0 0.6rem 0' }}>{spec.rightLabel}</p>
                <div style={{ position: 'relative', height: '160px' }}>
                  <Photo src={spec.rightImage} alt={spec.rightLabel} imgError={imgErrors[spec.rightImage]} setImgError={() => markError(spec.rightImage)} opacity={1} />
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: MUTE, marginTop: '0.6rem' }}>{spec.rightCaption}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  const idx = Math.min(SPECS.length - 1, Math.floor(progress));
  const isLast = idx === SPECS.length - 1;
  const t = isLast ? 0 : progress - idx;
  const nextIdx = isLast ? idx : idx + 1;
  const specA = SPECS[idx];
  const specB = SPECS[nextIdx];

  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: `${SPECS.length * 100}vh` }}>
      {sharedStyle}
      <section style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: PAPER,
        overflow: 'hidden',
        borderTop: '1px solid rgba(17,17,17,0.1)',
        borderBottom: '1px solid rgba(17,17,17,0.1)',
      }}>
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 4rem' }}>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.26em', textTransform: 'uppercase', color: MUTE,
            textAlign: 'center', margin: '0 0 3rem 0',
          }}>
            The Mission in Numbers
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            height: '52vh',
          }}>
            <PanelColumn specA={specA} specB={specB} t={t} side="left" imgErrors={imgErrors} markError={markError} />
            <CenterColumn progress={progress} />
            <PanelColumn specA={specA} specB={specB} t={t} side="right" imgErrors={imgErrors} markError={markError} />
          </div>

          {/* Progress dots — click still jumps, but the ride there is smooth */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '2.5rem' }}>
            {SPECS.map((spec, i) => (
              <button
                key={spec.key}
                className="stat-dot"
                onClick={() => {
                  const el = wrapperRef.current;
                  if (!el) return;
                  const vh = window.innerHeight;
                  const scrollable = el.offsetHeight - vh;
                  const targetY = el.offsetTop + (scrollable * (i / SPECS.length)) + 10;
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }}
                style={{ background: Math.round(progress) === i ? INK : 'rgba(17,17,17,0.2)' }}
                aria-label={`Jump to ${spec.key}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsSection;
