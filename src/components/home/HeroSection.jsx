import React, { useState, useEffect, useRef } from 'react';

/**
 * HeroSection — "Polar Gold" cinematic hero with local video.mp4.
 *
 * THIS PASS: the sound toggle button no longer uses the 🔊/🔇 emoji.
 * It's now a custom SVG icon matching the reference exactly — five thin
 * vertical bars (not a speaker shape at all), which pulse like a real
 * audio equalizer while sound is on, and freeze in place with a diagonal
 * slash drawn across them when muted. Each bar animates via CSS
 * transform: scaleY with its own animation-delay, staggered so they
 * don't all pulse in lockstep — that's what actually reads as "sound
 * moving" rather than one shape blinking. Respects prefers-reduced-motion
 * (the animation is skipped entirely, same as the rest of this hero).
 *
 * PRESS BADGE: bottom-right, using REAL logo marks via Google's favicon
 * service (https://www.google.com/s2/favicons?domain={domain}&sz=128) — a
 * free, no-signup public endpoint that serves a site's actual favicon.
 * NOTE: this used to run on the Clearbit Logo API, which was permanently
 * shut down December 8, 2025 (Clearbit was acquired by HubSpot, which then
 * sunset the free endpoint) — logo.clearbit.com no longer resolves at all,
 * which is why it was swapped for Google's favicon service here instead.
 * Trade-off worth knowing: favicons are small/simplified compared to a full
 * logo mark, so a text-heavy wordmark (like a newspaper's) may render as
 * just an icon rather than the full brand name. For higher-fidelity full
 * logos, the official Clearbit successor is logo.dev — same domain-based
 * lookup, but it requires a free account for an API key rather than being
 * a bare URL like this one. Logos render monochrome white by default
 * (filter: brightness(0) invert(1)) to sit cleanly on the dark video, and
 * reveal their true colors on hover. If a given outlet's favicon fails to
 * resolve, it falls back to a plain text label rather than a broken image.
 *
 * Sits ABOVE the existing bottom hairline meta row and sound toggle,
 * stacked so nothing overlaps: press badge > meta row > sound button,
 * top to bottom down the corner.
 *
 * ASSET NEEDED: /public/video.mp4 (and optionally /public/hero.jpg as a
 * poster/fallback frame for mobile + before the video loads).
 *
 * SOUND NOTE: no browser allows unmuted autoplay — it's a platform policy,
 * not a config option. This plays muted on load (so autoplay always works)
 * and silently unmutes itself the instant the visitor clicks, scrolls, or
 * presses a key anywhere on the page. A small toggle bottom-right lets them
 * mute back.
 */

const GOLD = '#C9A227';

const PRESS_ITEMS = [
  { name: 'CNN', domain: 'cnn.com', href: 'https://www.cnn.com/2026/04/12/middleeast/us-iran-war-propellor-plane-intl-hnk-ml-dst' },
  { name: 'AOPA', domain: 'aopa.org', href: 'https://www.aopa.org/news-and-media/all-news/2026/march/26/archer-intercepted-by-us-navy-super-hornets-near-iran' },
  { name: 'Times Now', domain: 'timesnownews.com', href: 'https://www.timesnownews.com/india/its-us-dont-shoot-us-ferry-pilot-recalls-mid-air-interception-of-newly-procured-indian-trainer-aircraft-by-us-fighter-jet-article-154077628' },
  { name: 'Hampshire Chronicle', domain: 'hampshirechronicle.co.uk', href: 'https://www.hampshirechronicle.co.uk/news/26057137.hampshire-airfield-welcomes-international-pilot-five-day-flight/' },
];

// ---- Custom sound icon: equalizer bars, pulsing while unmuted, frozen
//      with a diagonal slash when muted — matching the reference glyph,
//      not a speaker shape ----
const SoundIcon = ({ active, reduced }) => {
  const bars = [
    { x: 3,  h: 8  },
    { x: 6,  h: 13 },
    { x: 9,  h: 6  },
    { x: 12, h: 13 },
    { x: 15, h: 9  },
  ];
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {bars.map((b, i) => (
        <rect
          key={b.x}
          x={b.x - 0.75}
          y={(20 - b.h) / 2}
          width="1.5"
          height={b.h}
          rx="0.75"
          fill={GOLD}
          className={active && !reduced ? `gfw-eq-bar gfw-eq-bar-${i}` : ''}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
      {!active && (
        <line x1="2" y1="17" x2="18" y2="3" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
};

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(140);
  const [loaded, setLoaded] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [logoError, setLogoError] = useState({});
  const videoRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,500;1,400&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

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

  useEffect(() => {
    const headerEl = document.getElementById('site-header');
    if (headerEl) setHeaderHeight(headerEl.getBoundingClientRect().height);
    const handleHeaderResize = (e) => setHeaderHeight(e.detail.height);
    window.addEventListener('site-header-resize', handleHeaderResize);
    return () => window.removeEventListener('site-header-resize', handleHeaderResize);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const unlock = () => {
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        v.play().catch(() => {
          v.muted = true;
          setSoundOn(false);
        });
        if (v && !v.muted) setSoundOn(true);
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('scroll', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('scroll', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('scroll', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [reduced]);

  const toggleSound = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = soundOn;
    if (!soundOn) v.play().catch(() => {});
    setSoundOn(!soundOn);
  };

  const revealStyle = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(26px)',
    transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      style={{
        position: 'relative',
        height: `calc(100vh - ${headerHeight}px)`,
        minHeight: isMobile ? '600px' : '680px',
        marginTop: `${headerHeight}px`,
        overflow: 'hidden',
        background: '#0B0B0C',
      }}
    >
      <style>{`
        @keyframes gfw-hero-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        .gfw-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          animation: gfw-hero-zoom 28s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .gfw-hero-video::-webkit-media-controls,
        .gfw-hero-video::-webkit-media-controls-panel,
        .gfw-hero-video::-webkit-media-controls-play-button,
        .gfw-hero-video::-webkit-media-controls-start-playback-button,
        .gfw-hero-video::-webkit-media-controls-overlay-play-button {
          display: none !important;
          -webkit-appearance: none !important;
        }
        .gfw-hero-cta {
          display: inline-block;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 1rem 2.4rem;
          border-radius: 2px;
          text-decoration: none;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .gfw-hero-cta--gold {
          color: ${GOLD};
          border: 1px solid ${GOLD};
          background: transparent;
        }
        .gfw-hero-cta--gold:hover { background: ${GOLD}; color: #0B0B0C; }
        .gfw-hero-cta--ghost {
          color: rgba(245,242,235,0.85);
          border: 1px solid rgba(245,242,235,0.3);
          background: transparent;
        }
        .gfw-hero-cta--ghost:hover { border-color: #F5F2EB; color: #F5F2EB; }
        .gfw-sound-btn {
          position: absolute;
          z-index: 3;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(245,242,235,0.35);
          background: rgba(11,11,12,0.55);
          color: #F5F2EB;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .gfw-sound-btn:hover { border-color: ${GOLD}; background: rgba(201,162,39,0.12); }

        /* Equalizer bars — staggered pulse, not lockstep, so it reads as
           moving sound rather than one shape blinking */
        @keyframes gfw-eq {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .gfw-eq-bar { animation: gfw-eq 0.9s ease-in-out infinite; }
        .gfw-eq-bar-0 { animation-delay: 0s; }
        .gfw-eq-bar-1 { animation-delay: 0.15s; }
        .gfw-eq-bar-2 { animation-delay: 0.3s; }
        .gfw-eq-bar-3 { animation-delay: 0.45s; }
        .gfw-eq-bar-4 { animation-delay: 0.6s; }

        .gfw-press-logo {
          height: 34px;
          width: auto;
          max-width: 110px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.65;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .gfw-press-link:hover .gfw-press-logo {
          opacity: 1;
          filter: none;
        }
        .gfw-press-fallback {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: rgba(245,242,235,0.65);
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        .gfw-press-link:hover .gfw-press-fallback { color: ${GOLD}; }
        .gfw-press-link { text-decoration: none; display: inline-flex; align-items: center; }

        @keyframes gfw-chrome-shine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gfw-hero-video { animation: none; }
          .gfw-eq-bar { animation: none; }
        }
      `}</style>

      {!reduced ? (
        <video
          ref={videoRef}
          className="gfw-hero-video"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          poster="/hero.jpg"
          aria-hidden="true"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/hero.jpg" alt="" aria-hidden="true" className="gfw-hero-video" />
      )}

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 120% 90% at 50% 30%, transparent 40%, rgba(11,11,12,0.55) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.35) 40%, transparent 70%)',
      }} />

      {/* ── Content — bottom-left, a16z placement ── */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '2.5rem' : '4rem',
        left: isMobile ? '1.5rem' : '4rem',
        right: isMobile ? '1.5rem' : '4rem',
        zIndex: 2,
        textAlign: isMobile ? 'center' : 'left',
      }}>
        <p style={{
          ...revealStyle(0),
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: 'rgba(245,242,235,0.65)',
          margin: '0 0 1.25rem 0',
        }}>
          A Solo Airborne Science Expedition &middot; Seven Continents
        </p>

        <h1 style={{
          ...revealStyle(0.15),
          fontFamily: "'Cinzel', serif",
          fontSize: isMobile ? 'clamp(2rem, 8vw, 2.8rem)' : 'clamp(2.8rem, 5.5vw, 4.4rem)',
          fontWeight: 600,
          letterSpacing: '0.045em',
          textTransform: 'uppercase',
          lineHeight: 1.15,
          margin: '0 0 1.25rem 0',
          background: 'linear-gradient(135deg, #5C4A2F 0%, #8B7355 15%, #C9A96E 30%, #F1E2C0 50%, #C9A96E 70%, #8B7355 85%, #5C4A2F 100%)',
          backgroundSize: '250% 250%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          animation: loaded ? 'gfw-chrome-shine 6s ease-in-out infinite' : 'none',
          filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.45))',
        }}>
          Breaking The Limits
        </h1>

        <p style={{
          ...revealStyle(0.3),
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: isMobile ? '1.05rem' : '1.3rem',
          fontWeight: 500,
          lineHeight: 1.55,
          color: 'rgba(245,242,235,0.9)',
          maxWidth: '620px',
          margin: isMobile ? '0 auto 0.9rem' : '0 0 0.9rem 0',
        }}>
          One pilot. One aircraft. Seven continents. South Pole. The largest single pilot science airborne survey.
        </p>

        <p style={{
          ...revealStyle(0.4),
          fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,242,235,0.5)',
          margin: '0 0 2rem 0',
        }}>
          En route &middot; first solo flight to the south pole & seven continents by a woman &middot; 90.0000&deg; S
        </p>

        <div style={{
          ...revealStyle(0.5),
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          justifyContent: isMobile ? 'center' : 'flex-start',
          alignItems: 'center',
        }}>
          <a href="/donate" className="gfw-hero-cta gfw-hero-cta--gold" style={{ width: isMobile ? '100%' : 'auto' }}>
            Back the Mission
          </a>
          <a href="/science" className="gfw-hero-cta gfw-hero-cta--ghost" style={{ width: isMobile ? '100%' : 'auto' }}>
            Explore the Science
          </a>
        </div>

        {/* Press logos — mobile version. Placed in normal flow right
            after the CTAs (not absolutely positioned like the desktop
            version below) so it doesn't fight the headline/buttons for
            the same limited bottom-of-viewport space on a phone. */}
        {isMobile && (
          <div style={{ ...revealStyle(0.6), marginTop: '2rem', textAlign: 'center' }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(245,242,235,0.4)',
              margin: '0 0 0.75rem 0',
            }}>
              As Featured In
            </p>
            <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              {PRESS_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Read the ${item.name} article`}
                  className="gfw-press-link"
                >
                  {!logoError[item.name] ? (
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`}
                      alt={item.name}
                      className="gfw-press-logo"
                      style={{ height: '26px', maxWidth: '84px' }}
                      onError={() => setLogoError((p) => ({ ...p, [item.name]: true }))}
                    />
                  ) : (
                    <span className="gfw-press-fallback" style={{ fontSize: '0.85rem' }}>{item.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── "As Featured In" — bottom-right, real logos, stacked above the
          meta row and sound toggle so nothing overlaps ── */}
      {!isMobile && (
        <div style={{
          ...revealStyle(0.6),
          position: 'absolute',
          bottom: '5.4rem',
          right: '4rem',
          zIndex: 2,
          textAlign: 'right',
        }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,235,0.4)',
            margin: '0 0 0.75rem 0',
          }}>
            As Featured In
          </p>
          <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center', justifyContent: 'flex-end' }}>
            {PRESS_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Read the ${item.name} article`}
                className="gfw-press-link"
              >
                {!logoError[item.name] ? (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`}
                    alt={item.name}
                    className="gfw-press-logo"
                    onError={() => setLogoError((p) => ({ ...p, [item.name]: true }))}
                  />
                ) : (
                  <span className="gfw-press-fallback">{item.name}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Bottom hairline meta row — desktop only */}
      {!isMobile && (
        <div style={{
          ...revealStyle(0.65),
          position: 'absolute',
          bottom: '1.1rem',
          left: '4rem',
          right: '4rem',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(245,242,235,0.14)',
          paddingTop: '0.8rem',
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.62rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(245,242,235,0.45)',
          }}>
            Explore &middot; Measure &middot; Understand
          </span>
          <span style={{
            fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
            fontSize: '0.62rem', letterSpacing: '0.18em',
            color: 'rgba(245,242,235,0.45)',
          }}>
            OCT 2026 &middot; 41 LEGS &middot; 40,000+ NM
          </span>
        </div>
      )}

      {!reduced && (
        <button
          className="gfw-sound-btn"
          onClick={toggleSound}
          aria-label={soundOn ? 'Mute video' : 'Unmute video'}
          style={isMobile
            ? { top: '1.25rem', right: '1.25rem' }
            : { bottom: '1.25rem', right: '1.25rem' }}
        >
          <SoundIcon active={soundOn} reduced={reduced} />
        </button>
      )}
    </section>
  );
};

export default HeroSection;
