import React from 'react';

const ITEMS = [
  'FIRST WOMAN TO FLY SOLO TO THE SOUTH POLE',
  '7 CONTINENTS',
  '40,000+ NAUTICAL MILES',
  'SOLO & UNASSISTED',
  'ONE SMALL AIRCRAFT',
  'GUINNESS WORLD RECORDS',
  'OCTOBER 2026',
  'AIRBORNE SCIENCE PROGRAM',
  'GREENLAND & ANTARCTICA',
  'AGE 20',
];

const SEP = <span style={{ color: '#E67E22', fontSize: '0.45rem', flexShrink: 0, lineHeight: 1 }}>◆</span>;

const MissionTicker = () => (
  <>
    <style>{`
      @keyframes gfw-ticker {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .gfw-ticker-track {
        display: flex;
        align-items: center;
        animation: gfw-ticker 50s linear infinite;
        width: max-content;
        will-change: transform;
      }
      .gfw-ticker-track:hover {
        animation-play-state: paused;
      }
    `}</style>

    <div
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        padding: '0.75rem 0',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <div className="gfw-ticker-track">
        {[...ITEMS, ...ITEMS].map((text, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: "'Space Grotesk', sans-serif",
              whiteSpace: 'nowrap',
              padding: '0 1.75rem',
            }}>
              {text}
            </span>
            {SEP}
          </span>
        ))}
      </div>
    </div>
  </>
);

export default MissionTicker;
