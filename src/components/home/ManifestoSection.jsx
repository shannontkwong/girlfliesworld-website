import React, { useEffect, useRef, useState } from 'react';

/**
 * ManifestoSection — typed, line by line, in Shannon's voice.
 * Sits directly after HeroSection. Science-first; records explicitly secondary.
 * Uses IBM Plex Mono (brand telemetry face) + blinking cursor.
 * Respects prefers-reduced-motion (shows all lines instantly).
 */

const RED = '#D0021B';
const PINK = '#FF1493';

const LINES = [
  { text: 'I want to build the largest airborne science expedition ever flown by a single pilot.', style: 'lead' },
  { text: 'One aircraft. Seven continents. A 16-hour nonstop Antarctic crossing at the edge of what a small twin can do.', style: 'body' },
  { text: 'Every hour in the cockpit collects data \u2014 radar, atmospheric, in-flight \u2014 a global dataset no space agency has ever assembled on a single platform.', style: 'body' },
  { text: 'Yes, records will fall along the way. First woman to fly solo to the South Pole. Endurance marks no one has attempted in an aircraft like this.', style: 'muted' },
  { text: 'But records expire. Data compounds.', style: 'punch' },
  { text: 'The records are the headline. The science is the point.', style: 'close' },
];

// ms per character while typing
const TYPE_SPEED = 22;
// pause between lines
const LINE_PAUSE = 450;

const ManifestoSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [started, setStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);   // line currently typing
  const [charIndex, setCharIndex] = useState(0);   // chars revealed of that line
  const [reduced, setReduced] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Start typing when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Typewriter engine
  useEffect(() => {
    if (!started || reduced) return;
    if (lineIndex >= LINES.length) return;

    const line = LINES[lineIndex].text;
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), TYPE_SPEED);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, LINE_PAUSE);
    return () => clearTimeout(t);
  }, [started, reduced, lineIndex, charIndex]);

  const done = reduced || lineIndex >= LINES.length;

  const styleFor = (kind) => {
    const base = {
      fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
      margin: 0,
      lineHeight: 1.6,
      letterSpacing: '0.01em',
      whiteSpace: 'pre-wrap',
    };
    switch (kind) {
      case 'lead':
        return { ...base, fontSize: isMobile ? '1.05rem' : '1.35rem', fontWeight: 600, color: '#fff' };
      case 'body':
        return { ...base, fontSize: isMobile ? '0.9rem' : '1.05rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)' };
      case 'muted':
        return { ...base, fontSize: isMobile ? '0.85rem' : '0.95rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)' };
      case 'punch':
        return { ...base, fontSize: isMobile ? '1.15rem' : '1.5rem', fontWeight: 700, color: RED };
      case 'close':
        return { ...base, fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 700, color: '#fff' };
      default:
        return base;
    }
  };

  const renderLine = (line, i) => {
    // reduced motion: show everything. Otherwise show fully typed lines,
    // the partially typed current line, and nothing beyond it.
    let text = '';
    let showCursor = false;
    if (reduced || i < lineIndex) {
      text = line.text;
    } else if (i === lineIndex) {
      text = line.text.slice(0, charIndex);
      showCursor = true;
    } else {
      return null;
    }
    return (
      <p key={i} style={styleFor(line.style)}>
        {text}
        {showCursor && !reduced && (
          <span style={{
            display: 'inline-block',
            width: '0.6em',
            marginLeft: '2px',
            background: PINK,
            animation: 'gfw-cursor-blink 0.9s steps(1) infinite',
          }}>&nbsp;</span>
        )}
      </p>
    );
  };

  return (
    <section
      ref={ref}
      aria-label="Mission manifesto"
      style={{
        background: '#0D0D0D',
        padding: isMobile ? '4rem 1.5rem' : '6rem 4rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <style>{`
        @keyframes gfw-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* Eyebrow — the one pink text element on this page section */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: PINK,
          margin: '0 0 2rem 0',
        }}>
          Mission Commander's Log
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.1rem' : '1.4rem' }}>
          {LINES.map(renderLine)}
        </div>

        {/* Signature — appears when typing completes */}
        <div style={{
          marginTop: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          opacity: done ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.25)' }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>
            Shannon Wong &middot; Mission Commander, GIRLFLIESWORLD
          </span>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
