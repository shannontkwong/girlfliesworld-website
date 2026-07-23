import React, { useEffect, useRef, useState } from 'react';
import { feature } from 'topojson-client';

/**
 * AntarcticaMap — animated polar-projection map of the EARS route.
 *
 * THIS PASS: real contrast bug fixed. INK (#111111) and MUTE (#5b5748)
 * are near-black colors, chosen so the map would read clearly against
 * the light cream Paper & Ink background it was originally built for
 * (where it's embedded inside ScienceTeaserSection). But this same
 * component is ALSO embedded directly inside SciencePage, which sits on
 * a dark teal chapter background — so every line, dot, and label was
 * rendering dark-on-dark, essentially invisible (exactly what the
 * screenshot showed).
 *
 * Fixed with a `dark` prop: pass <AntarcticaMap dark /> when embedding
 * on a dark background (SciencePage) to switch the whole palette to
 * light-on-dark; omit it (default) for the original light-background
 * usage (ScienceTeaserSection) — behavior there is unchanged.
 *
 * PROJECTION: polar azimuthal-equidistant, centered on the South Pole.
 * The canvas itself resizes correctly via a ResizeObserver on its actual
 * container width, not a hardcoded pixel size — unchanged from before.
 *
 * COASTLINE DATA: same source/dependency as RouteGlobe:
 *   https://unpkg.com/world-atlas@2.0.2/land-110m.json
 *   npm install topojson-client
 *
 * Coordinates are approximate (base/station level) — fine for this
 * decorative animation, not for flight planning.
 */

const WORLD_TOPOJSON_URL = 'https://unpkg.com/world-atlas@2.0.2/land-110m.json';

// [code, label, lat, lon]
const ROUTE = [
  ['MARSH', 'Marsh',            -62.190, -58.980],
  ['MARAMBIO', 'Marambio',      -64.240, -56.630],
  ['WOLF1', "Wolf's Fang",      -71.830,   8.410],
  ['SP', 'South Pole',          -90.000,   0.000],
  ['WOLF2', "Wolf's Fang",      -71.830,   8.410],
  ['CAPE', 'to Cape Town',      -55.000,   8.410],
];

const ANNOTATIONS = [
  { text: 'Tabular Icebergs', lat: -60.0, lon: -25.0 },
  { text: 'Blue Ice Areas',   lat: -74.0,  lon: 12.0 },
  { text: 'Megadune Regions', lat: -81.0,  lon:  5.0 },
];

// Which annotation is "active" while the marker flies each leg
// (5 legs: Marsh->Marambio, Marambio->Wolf's, Wolf's->SP, SP->Wolf's, Wolf's->CapeTown)
const ACTIVE_ANNOTATION_BY_LEG = [0, 1, 2, 2, 1];

const LOOP_SECONDS = 24;
const MAX_COLAT = 42;

const toRad = (d) => (d * Math.PI) / 180;

const AntarcticaMap = ({ dark = false }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const [size, setSize] = useState({ w: 560, h: 560 });
  const [landRings, setLandRings] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLabel, setCurrentLabel] = useState({ from: ROUTE[0][1], to: ROUTE[1][1] });
  const [activeAnnotation, setActiveAnnotation] = useState(0);

  // ---- Palette: light-on-dark when `dark`, dark-on-light otherwise ----
  const INK = dark ? '#E9EBE6' : '#111111';
  const MUTE = dark ? 'rgba(233,235,230,0.7)' : '#5b5748';
  const RING_STRONG = dark ? 'rgba(233,235,230,0.32)' : 'rgba(17,17,17,0.25)';
  const RING_FAINT = dark ? 'rgba(233,235,230,0.14)' : 'rgba(17,17,17,0.1)';
  const SPOKE = dark ? 'rgba(233,235,230,0.12)' : 'rgba(17,17,17,0.08)';
  const LAND_FILL = dark ? 'rgba(233,235,230,0.06)' : 'rgba(17,17,17,0.05)';
  const LAND_STROKE = dark ? 'rgba(233,235,230,0.4)' : 'rgba(17,17,17,0.35)';
  const ROUTE_FADED = dark ? 'rgba(233,235,230,0.28)' : 'rgba(17,17,17,0.2)';
  const DOT_FADED = dark ? 'rgba(233,235,230,0.4)' : 'rgba(17,17,17,0.3)';
  const LABEL_FADED = dark ? 'rgba(233,235,230,0.5)' : 'rgba(17,17,17,0.4)';

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
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setSize({ w, h: w });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(WORLD_TOPOJSON_URL);
        const topo = await res.json();
        const geo = feature(topo, topo.objects.land);
        const rings = [];
        geo.features.forEach((f) => {
          const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
          polys.forEach((poly) => {
            poly.forEach((ring) => {
              const relevant = ring.some(([, lat]) => lat < -40);
              if (relevant) rings.push(ring.map(([lon, lat]) => [lat, lon]));
            });
          });
        });
        if (!cancelled) setLandRings(rings);
      } catch (e) {
        console.warn('AntarcticaMap: coastline load failed, falling back to graticule only.', e);
        if (!cancelled) setLoadError(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    ctx.scale(dpr, dpr);

    const R = Math.min(size.w, size.h) * 0.46;
    const cx = size.w / 2;
    const cy = size.h / 2;
    const squash = 0.92;

    const project = (lat, lon, rotation) => {
      const colat = 90 + lat;
      const r = Math.min(1, colat / MAX_COLAT) * R;
      const theta = toRad(lon) + rotation;
      const x = cx + r * Math.sin(theta);
      const y = cy - r * Math.cos(theta) * squash;
      const visible = colat <= MAX_COLAT;
      return { x, y, visible };
    };

    let rotation = 0;
    let lastLeg = -1;

    const draw = (rot, progressFrac) => {
      ctx.clearRect(0, 0, size.w, size.h);

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, R, R * squash, 0, 0, Math.PI * 2);
      ctx.clip();

      for (let c = MAX_COLAT; c >= 0; c -= 10) {
        const rr = (c / MAX_COLAT) * R;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rr, rr * squash, 0, 0, Math.PI * 2);
        ctx.strokeStyle = c === MAX_COLAT ? RING_STRONG : RING_FAINT;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let lon = 0; lon < 360; lon += 30) {
        const theta = toRad(lon) + rot;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.sin(theta), cy - R * Math.cos(theta) * squash);
        ctx.strokeStyle = SPOKE;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (landRings) {
        landRings.forEach((ring) => {
          ctx.beginPath();
          let started = false;
          ring.forEach(([lat, lon]) => {
            const p = project(lat, lon, rot);
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          });
          ctx.closePath();
          ctx.fillStyle = LAND_FILL;
          ctx.fill();
          ctx.strokeStyle = LAND_STROKE;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      const legFloat = progressFrac * (ROUTE.length - 1);
      const currentLeg = Math.min(ROUTE.length - 2, Math.floor(legFloat));
      const legT = legFloat - currentLeg;

      for (let i = 0; i < ROUTE.length - 1; i++) {
        const [, , latA, lonA] = ROUTE[i];
        const [, , latB, lonB] = ROUTE[i + 1];
        const pA = project(latA, lonA, rot);
        const endLat = i === currentLeg ? latA + (latB - latA) * legT : latB;
        const endLon = i === currentLeg ? lonA + (lonB - lonA) * legT : lonB;
        const pB = project(i < currentLeg ? latB : endLat, i < currentLeg ? lonB : endLon, rot);

        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.strokeStyle = i <= currentLeg ? INK : ROUTE_FADED;
        ctx.lineWidth = i <= currentLeg ? 2.2 : 1.2;
        ctx.stroke();

        if (i <= currentLeg) {
          const ang = Math.atan2(pB.y - pA.y, pB.x - pA.x);
          const ah = 7;
          ctx.beginPath();
          ctx.moveTo(pB.x, pB.y);
          ctx.lineTo(pB.x - ah * Math.cos(ang - 0.4), pB.y - ah * Math.sin(ang - 0.4));
          ctx.lineTo(pB.x - ah * Math.cos(ang + 0.4), pB.y - ah * Math.sin(ang + 0.4));
          ctx.closePath();
          ctx.fillStyle = INK;
          ctx.fill();
        }
      }

      ROUTE.forEach(([code, label, lat, lon], i) => {
        const p = project(lat, lon, rot);
        const visited = i <= currentLeg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, visited ? 3.2 : 2, 0, Math.PI * 2);
        ctx.fillStyle = visited ? INK : DOT_FADED;
        ctx.fill();

        ctx.font = `${visited ? '700' : '500'} ${isMobile ? '10px' : '12px'} 'Lora', Georgia, serif`;
        ctx.fillStyle = visited ? INK : LABEL_FADED;
        ctx.textAlign = p.x > cx ? 'left' : 'right';
        ctx.fillText(label, p.x + (p.x > cx ? 8 : -8), p.y - 6);
      });

      ANNOTATIONS.forEach((a, ai) => {
        const p = project(a.lat, a.lon, rot);
        const isActive = ai === ACTIVE_ANNOTATION_BY_LEG[currentLeg];
        ctx.font = `italic ${isActive ? '600' : '400'} ${isMobile ? '9px' : '11px'} 'Lora', Georgia, serif`;
        ctx.fillStyle = isActive ? INK : MUTE;
        ctx.textAlign = 'center';
        ctx.fillText(a.text, p.x, p.y);
      });

      ctx.restore();

      if (currentLeg !== lastLeg) {
        lastLeg = currentLeg;
        setCurrentLabel({ from: ROUTE[currentLeg][1], to: ROUTE[currentLeg + 1][1] });
        setActiveAnnotation(ACTIVE_ANNOTATION_BY_LEG[currentLeg]);
      }
    };

    const tick = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const progressFrac = reduced ? 0 : (elapsed % LOOP_SECONDS) / LOOP_SECONDS;
      rotation += reduced ? 0 : 0.0015;
      draw(rotation, progressFrac);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [size, landRings, reduced, isMobile, dark]);

  return (
    <div style={{ width: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', maxWidth: isMobile ? '340px' : '560px', margin: '0 auto', position: 'relative' }}>
        <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }} />
        {!landRings && !loadError && (
          <p style={{
            position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center',
            fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: MUTE, margin: 0,
          }}>
            Loading coastline&hellip;
          </p>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: isMobile ? '1rem' : '1.5rem' }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic',
          fontSize: isMobile ? '0.9rem' : '1rem', color: INK, margin: '0 0 0.75rem 0',
        }}>
          {currentLabel.from} &rarr; {currentLabel.to}
        </p>

        {/* Science labels — same telemetry-line pattern as the route
            label above, with whichever zone the marker is currently
            flying through shown in ink and the others muted. */}
        <p style={{
          fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
          fontSize: isMobile ? '0.6rem' : '0.68rem',
          letterSpacing: isMobile ? '0.08em' : '0.14em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          {ANNOTATIONS.map((a, i) => (
            <React.Fragment key={a.text}>
              {i > 0 && <span style={{ color: MUTE }}> &middot; </span>}
              <span style={{ color: i === activeAnnotation ? INK : MUTE, fontWeight: i === activeAnnotation ? 700 : 500 }}>
                {a.text}
              </span>
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default AntarcticaMap;
