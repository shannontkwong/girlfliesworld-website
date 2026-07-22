import React, { useEffect, useRef, useState } from 'react';

/**
 * VideosPage — replaces the "Coming Soon" placeholder with real embeds:
 *
 *  - YOUTUBE: a standard responsive iframe embed
 *    (https://www.youtube.com/embed/{videoId}) — no library needed, this
 *    is the same embed code YouTube itself gives you, just wrapped in a
 *    padding-based responsive container so it scales on mobile instead
 *    of staying a fixed 560x315.
 *
 *  - INSTAGRAM: Instagram's OFFICIAL embed method — a <blockquote
 *    class="instagram-media"> with the post's permalink, plus their
 *    embed.js script, which finds every such blockquote on the page and
 *    replaces it with the real rendered post (image/video, likes, caption).
 *    This is exactly the mechanism the code you pasted uses; the giant
 *    inline SVG/skeleton markup in your paste is just Instagram's
 *    loading placeholder — cosmetic, and safe to simplify, since their
 *    script overwrites the whole blockquote once it hydrates regardless.
 *    IMPORTANT FOR REACT: the script only scans the page once when it
 *    loads. If it's already loaded (e.g. from a previous page in the
 *    same session) it won't automatically notice new blockquotes added
 *    later — so this component explicitly calls
 *    window.instgrm.Embeds.process() after mount to force it to look
 *    again, whether the script was already present or just finished
 *    loading.
 *
 * Design: Paper & Ink, matching the rest of the site (Nav, Hero, Mission,
 * Boundaries, About Me) — cream background, ink text, Lora serif
 * headlines, hairline-bordered cards, scroll-reveal fade-ins.
 */

const PAPER = '#F5F2EB';
const INK = '#111111';
const MUTE = '#5b5748';
const HAIRLINE = 'rgba(17,17,17,0.12)';

const YOUTUBE_VIDEO_ID = 'ML5hLMPIxxQ';

const INSTAGRAM_POSTS = [
  { url: 'https://www.instagram.com/reel/DVoqpknE0Nn/', by: '@girlfliesworld' },
  { url: 'https://www.instagram.com/reel/DWe_842xmgr/', by: '@girlfliesworld' },
  { url: 'https://www.instagram.com/reel/DU6T5jlCW_2/', by: '@neophile.me' },
  { url: 'https://www.instagram.com/p/DVTrUVhiGZZ/', by: '@girlfliesworld' },
  { url: 'https://www.instagram.com/reel/DU0_v2FDNCD/', by: '@neophile.me' },
  { url: 'https://www.instagram.com/reel/DVntBJRkS2a/', by: '@girlfliesworld' },
];

// ---- Reveal-on-scroll wrapper ----
const Reveal = ({ children, style = {} }) => {
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
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {children}
    </div>
  );
};

// ---- One Instagram embed card. Minimal blockquote — Instagram's script
//      replaces the whole thing once it hydrates, so the full skeleton
//      markup isn't required, just the required data attributes. ----
const InstagramEmbed = ({ url }) => (
  <blockquote
    className="instagram-media"
    data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
    data-instgrm-version="14"
    style={{
      background: '#FFF',
      border: 0,
      borderRadius: '6px',
      margin: 0,
      maxWidth: '400px',
      minWidth: '280px',
      width: '100%',
      padding: 0,
    }}
  >
    <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: MUTE, textDecoration: 'underline' }}
      >
        View this post on Instagram
      </a>
    </div>
  </blockquote>
);

const VideosPage = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Load Instagram's embed script once, then force it to (re)scan the
  // page for .instagram-media blockquotes — needed because the script
  // only auto-scans on its own initial load, not on every mount.
  useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    if (window.instgrm) {
      processEmbeds();
      return;
    }

    const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existing) {
      existing.addEventListener('load', processEmbeds);
      return () => existing.removeEventListener('load', processEmbeds);
    }

    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <style>{`
        .vp-yt-wrap {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding-bottom: 45%; /* 16:9 relative to max-width, scales responsively */
          height: 0;
          overflow: hidden;
          border: 1px solid ${HAIRLINE};
          border-radius: 6px;
        }
        .vp-yt-wrap iframe {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border: 0;
        }
        .vp-ig-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          justify-items: center;
        }
        @media (max-width: 900px) {
          .vp-ig-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .vp-ig-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ background: PAPER, minHeight: '100vh', padding: '6rem 1.5rem 5rem' }}>

        {/* HEADER */}
        <Reveal style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.24em', textTransform: 'uppercase', color: MUTE, margin: '0 0 1rem',
          }}>
            Follow The Mission
          </p>
          <h1 style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 700, color: INK, margin: 0, lineHeight: 1.15,
          }}>
            Videos &amp; Reels
          </h1>
        </Reveal>

        {/* YOUTUBE */}
        <Reveal style={{ marginBottom: '5rem' }}>
          <div className="vp-yt-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="GIRLFLIESWORLD video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </Reveal>

        {/* INSTAGRAM GRID */}
        <Reveal style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '0.95rem',
            color: MUTE, textAlign: 'center', marginBottom: '2rem',
          }}>
            From Instagram
          </p>
          <div className="vp-ig-grid">
            {INSTAGRAM_POSTS.map((post) => (
              <InstagramEmbed key={post.url} url={post.url} />
            ))}
          </div>
        </Reveal>

      </div>
    </>
  );
};

export default VideosPage;
