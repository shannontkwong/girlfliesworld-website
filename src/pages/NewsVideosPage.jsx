import React, { useState, useEffect, useRef } from 'react';

/**
 * NewsVideosPage — the "Coming Soon" placeholder is replaced with an
 * actual Featured Press section.
 *
 * WHY NOT LITERALLY EMBED THE ARTICLES: most publishers (CNN, AOPA,
 * regional papers) send X-Frame-Options / CSP headers that block their
 * pages from being iframed at all — an <iframe src="cnn.com/..."> would
 * just render blank or refuse to load. Beyond the technical block,
 * reproducing someone else's full paywalled/copyrighted article inline
 * isn't something to do regardless. The honest, functional version of
 * "feature the news coverage" is what real press pages actually do:
 * outlet name, a short line of OWN-WORDS context (not quoted from the
 * piece), and a clear link out to the real article.
 *
 * The four articles here are the same ones already confirmed elsewhere
 * on the site (PressLogoBar) — CNN, AOPA, Times Now, Hampshire
 * Chronicle — just given a full card treatment instead of a small logo
 * row, since this page's job is specifically to feature them.
 *
 * Design: Paper & Ink, matching the rest of the site.
 */

const PAPER = '#F5F2EB';
const INK = '#111111';
const MUTE = '#5b5748';
const HAIRLINE = 'rgba(17,17,17,0.12)';

const PRESS_ARTICLES = [
  {
    outlet: 'CNN',
    href: 'https://www.cnn.com/2026/04/12/middleeast/us-iran-war-propellor-plane-intl-hnk-ml-dst',
    blurb: "CNN's coverage of the F-18 intercept during Shannon's Florida-to-India ferry flight, amid heightened tensions in the region.",
  },
  {
    outlet: 'AOPA',
    href: 'https://www.aopa.org/news-and-media/all-news/2026/march/26/archer-intercepted-by-us-navy-super-hornets-near-iran',
    blurb: "AOPA's account of the Super Hornet intercept, reported from an aviation-industry perspective.",
  },
  {
    outlet: 'Times Now',
    href: 'https://www.timesnownews.com/india/its-us-dont-shoot-us-ferry-pilot-recalls-mid-air-interception-of-newly-procured-indian-trainer-aircraft-by-us-fighter-jet-article-154077628',
    blurb: 'Times Now on the mid-air interception, told through Shannon\u2019s own recollection of the moment.',
  },
  {
    outlet: 'Hampshire Chronicle',
    href: 'https://www.hampshirechronicle.co.uk/news/26057137.hampshire-airfield-welcomes-international-pilot-five-day-flight/',
    blurb: "Hampshire Chronicle's report on Shannon's return to a Hampshire airfield after a five-day international flight.",
  },
];

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

const NewsVideosPage = () => {
  const [headerHeight, setHeaderHeight] = useState(120);

  useEffect(() => {
    const el = document.getElementById('site-header');
    if (el) setHeaderHeight(el.getBoundingClientRect().height);
    const handler = (e) => setHeaderHeight(e.detail.height);
    window.addEventListener('site-header-resize', handler);
    return () => window.removeEventListener('site-header-resize', handler);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <>
      <style>{`
        .nv-card {
          border: 1px solid ${HAIRLINE};
          border-radius: 6px;
          padding: 1.75rem;
          background: #fff;
          transition: transform 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .nv-card:hover { transform: translateY(-4px); border-color: rgba(17,17,17,0.3); }
        .nv-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: ${INK};
          text-decoration: none;
          border-bottom: 1px solid ${INK};
          align-self: flex-start;
          padding-bottom: 2px;
        }
      `}</style>

      <div style={{ background: PAPER, minHeight: '100vh', paddingTop: `${headerHeight}px` }}>

        {/* HERO */}
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
            fontWeight: 700, color: INK, marginBottom: '1rem', lineHeight: 1.1,
          }}>
            News &amp; Videos
          </h1>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: '1.1rem', color: MUTE,
            maxWidth: '540px', margin: '0 auto', lineHeight: 1.7,
          }}>
            The latest coverage, flight reports, and updates from the mission.
          </p>
        </div>

        {/* FEATURED PRESS */}
        <Reveal style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.24em', textTransform: 'uppercase', color: MUTE,
            textAlign: 'center', marginBottom: '2.5rem',
          }}>
            Featured In The Press
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {PRESS_ARTICLES.map((a) => (
              <div key={a.outlet} className="nv-card">
                <p style={{
                  fontFamily: "'Lora', Georgia, serif", fontWeight: 700, fontSize: '1.15rem',
                  color: INK, marginBottom: '0.75rem',
                }}>
                  {a.outlet}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: MUTE,
                  lineHeight: 1.6, marginBottom: '1.25rem', flex: 1,
                }}>
                  {a.blurb}
                </p>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="nv-link">
                  Read the full article &rarr;
                </a>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '0.9rem',
            color: MUTE, textAlign: 'center', marginTop: '2.5rem',
          }}>
            More coverage will be added here as it's published.
          </p>
        </Reveal>

      </div>
    </>
  );
};

export default NewsVideosPage;
