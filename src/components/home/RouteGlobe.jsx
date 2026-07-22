import React, { useEffect, useRef, useState } from 'react';
import { feature } from 'topojson-client';

/**
 * RouteGlobe — rotating 3D wireframe globe with REAL continent outlines
 * (not hand-drawn approximations), the full route plotted as great-circle
 * arcs, and an animated marker flying it continuously.
 *
 * CONTINENT DATA — why this instead of Mapbox: Mapbox needs an account, an
 * API token, and their vector-tile runtime (mapbox-gl-js) — built for
 * interactive pannable/zoomable maps, not a small decorative rotating
 * globe. This pulls the same underlying kind of source data (Natural
 * Earth, public domain — the dataset most lightweight web maps are built
 * from) as a single static file, no API key and no account:
 *
 *   https://unpkg.com/world-atlas@2.0.2/land-110m.json
 *
 * That file is TopoJSON (a compressed encoding of GeoJSON), so it needs
 * ONE small library to decode into plain coordinates:
 *
 *   npm install topojson-client
 *
 * That's the only new dependency this file needs — no map SDK, no tokens,
 * no three.js. Rotation, projection, and route arcs are the same
 * hand-rolled trigonometry as before; the continent outlines are just
 * another set of lat/lon rings run through that same projection.
 *
 * 110m resolution = coastline detail appropriate for a globe this small
 * (islands smaller than ~a few hundred km may be simplified away or
 * merged). For more detail later, swap the URL for world-atlas's 50m
 * file — same code, more points per ring.
 *
 * ANIMATION MODEL: continuous, not stepped — progress advances every
 * frame via requestAnimationFrame using real elapsed time. Loops the full
 * route every LOOP_SECONDS for a decorative, always-moving visualization
 * (NOT literally date-synced — the real itinerary spans Oct 2026 to Jan
 * 2027; the date label below the globe shows the REAL date for whichever
 * leg is currently animating).
 *
 * Waypoint coordinates are approximate (airport-city level) — fine for
 * this decorative globe, not for flight planning.
 */

const INK = '#111111';
const PAPER = '#F5F2EB';
const MUTE = '#5b5748';

const WORLD_TOPOJSON_URL = 'https://unpkg.com/world-atlas@2.0.2/land-110m.json';

// [code, city label, lat, lon, date, note]
const WAYPOINTS = [
  ['EGHP', 'Popham',            51.204,  -1.238, '',          ''],
  ['EGPC', 'Wick',               58.454,  -3.093, '10/07/2026', ''],
  ['BIRK', 'Reykjavik',          64.130, -21.940, '10/09/2026', ''],
  ['BGQO', 'Nuuk',               64.191, -51.678, '10/10/2026', ''],
  ['CYYR', 'Goose Bay',          53.319, -60.426, '10/11/2026', ''],
  ['KBGR', 'Bangor',             44.807, -68.828, '10/12/2026', ''],
  ['KBLM', 'Belmar',             40.181, -74.126, '10/14/2026', ''],
  ['KJWN', 'Nashville',          36.175, -86.880, '10/15/2026', ''],
  ['KASG', 'Springdale',         36.176, -94.119, '10/16/2026', ''],
  ['KFFC', 'Atlanta',            33.359, -84.571, '10/17/2026', ''],
  ['KVRB', 'Vero Beach',         27.656, -80.418, '10/25/2026', ''],
  ['MYNN', 'Nassau',             25.039, -77.466, '10/26/2026', ''],
  ['TUPJ', 'Providenciales',     21.773, -72.266, '10/27/2026', ''],
  ['SBBE', 'Bel\u00e9m',         -1.379, -48.476, '10/28/2026', ''],
  ['SLTR', 'Trinidad',          -14.818, -64.916, '10/30/2026', ''],
  ['SGAS', 'Asunci\u00f3n',     -25.240, -57.519, '10/31/2026', ''],
  ['SCEL', 'Santiago',          -33.393, -70.786, '11/01/2026', ''],
  ['SAWH', 'Ushuaia',           -54.843, -68.296, '11/02/2026', 'Pat. Fields'],
  ['SAWB', 'Stanley',           -51.700, -57.850, '11/03/2026', ''],
  ["WOLF", "Wolf's Fang",       -71.830,   8.410, '12/01/2026', ''],
  ['SP',   'South Pole',        -90.000,   0.000, '12/04/2026', 'SP transit'],
  ["WOLF2","Wolf's Fang",       -71.830,   8.410, '12/04/2026', ''],
  ['FACT', 'Cape Town',         -33.965,  18.602, '12/07/2026', ''],
  ['FMMI', 'Antananarivo',      -18.797,  47.479, '12/11/2026', ''],
  ['VRMG', 'Mal\u00e9',           4.192,  73.529, '12/14/2026', ''],
  ['YPCC', 'Cocos Islands',     -12.188,  96.834, '12/17/2026', ''],
  ['YPKA', 'Karratha',          -20.712, 116.773, '12/20/2026', ''],
  ['YPDN', 'Darwin',            -12.415, 130.877, '12/21/2026', ''],
  ['WAPP', 'Ambon',              -3.710, 128.089, '12/22/2026', ''],
  ['RPMR', 'General Santos',      6.058, 125.096, '12/24/2026', ''],
  ['RPLL', 'Manila',             14.509, 121.020, '12/25/2026', ''],
  ['VHHH', 'Hong Kong',          22.309, 113.915, '12/26/2026', ''],
  ['VVCR', 'Cam Ranh',           11.998, 109.219, '12/27/2026', ''],
  ['VTBD', 'Bangkok',            13.912, 100.607, '12/29/2026', ''],
  ['VEBS', 'Kolkata',            20.244,  85.818, '12/30/2026', ''],
  ['VAAH', 'Ahmedabad',          23.077,  72.635, '12/31/2026', ''],
  ['OOMS', 'Muscat',             23.593,  58.284, '01/01/2027', ''],
  ['OERK', 'Riyadh',             24.958,  46.699, '01/03/2027', ''],
  ['HEGN', 'Hurghada',           27.178,  33.799, '01/04/2027', ''],
  ['LGST', 'Santorini',          36.399,  25.479, '01/05/2027', ''],
  ['LFMD', 'Cannes',             43.542,   6.953, '',           ''],
];

const LOOP_SECONDS = 42;
const SLERP_STEPS = 24;

const toRad = (d) => (d * Math.PI) / 180;

const toVec3 = (lat, lon) => {
  const la = toRad(lat);
  const lo = toRad(lon);
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};

const slerp = (a, b, t) => {
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const theta = Math.acos(dot) * t;
  if (Math.abs(dot) > 0.9999) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }
  const relB = [b[0] - a[0] * dot, b[1] - a[1] * dot, b[2] - a[2] * dot];
  const relLen = Math.sqrt(relB[0] ** 2 + relB[1] ** 2 + relB[2] ** 2) || 1;
  const rel = [relB[0] / relLen, relB[1] / relLen, relB[2] / relLen];
  const sinT = Math.sin(theta);
  const cosT = Math.cos(theta);
  return [a[0] * cosT + rel[0] * sinT, a[1] * cosT + rel[1] * sinT, a[2] * cosT + rel[2] * sinT];
};

const NODE_VECS = WAYPOINTS.map(([, , lat, lon]) => toVec3(lat, lon));

const buildPath = () => {
  const segments = [];
  for (let i = 0; i < NODE_VECS.length - 1; i++) {
    const a = NODE_VECS[i];
    const b = NODE_VECS[i + 1];
    const pts = [];
    for (let s = 0; s <= SLERP_STEPS; s++) pts.push(slerp(a, b, s / SLERP_STEPS));
    segments.push({ points: pts, legIndex: i });
  }
  return segments;
};

const PATH_SEGMENTS = buildPath();
const TOTAL_LEGS = PATH_SEGMENTS.length;

const RouteGlobe = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const [size, setSize] = useState({ w: 640, h: 640 });
  const [currentLabel, setCurrentLabel] = useState({ from: '', to: '', date: '' });
  const [reduced, setReduced] = useState(false);
  const [landRings, setLandRings] = useState(null);
  const [loadError, setLoadError] = useState(false);

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
      setSize({ w, h: Math.min(w, 560) });
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
              rings.push(ring.map(([lon, lat]) => toVec3(lat, lon)));
            });
          });
        });
        if (!cancelled) setLandRings(rings);
      } catch (e) {
        console.warn('RouteGlobe: continent outline failed to load, falling back to graticule only.', e);
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

    const R = Math.min(size.w, size.h) * 0.42;
    const cx = size.w / 2;
    const cy = size.h / 2;
    const tilt = toRad(18);

    const project = (v, spin) => {
      const cosY = Math.cos(spin), sinY = Math.sin(spin);
      const x1 = v[0] * cosY + v[2] * sinY;
      const z1 = -v[0] * sinY + v[2] * cosY;
      const y1 = v[1];
      const cosX = Math.cos(tilt), sinX = Math.sin(tilt);
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;
      return { x: cx + x1 * R, y: cy - y2 * R, z: z2, front: z2 > -0.05 };
    };

    let spin = 0;
    let lastLegShown = -1;

    const strokeRing = (ringVecs, spinAngle, color, width) => {
      ctx.beginPath();
      let started = false;
      ringVecs.forEach((v) => {
        const p = project(v, spinAngle);
        if (!p.front) { started = false; return; }
        if (!started) { ctx.moveTo(p.x, p.y); started = true; }
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    const draw = (spinAngle, progressFrac) => {
      ctx.clearRect(0, 0, size.w, size.h);

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(17,17,17,0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(17,17,17,0.06)';
      ctx.lineWidth = 1;
      [0].forEach((lat) => {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 4) {
          const p = project(toVec3(lat, lon), spinAngle);
          if (!p.front) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
      [-90, -60, -30, 0, 30, 60, 90, 120, 150, 180].forEach((lon) => {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 4) {
          const p = project(toVec3(lat, lon), spinAngle);
          if (!p.front) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });

      if (landRings) {
        landRings.forEach((ring) => strokeRing(ring, spinAngle, 'rgba(17,17,17,0.4)', 1.1));
      }

      const legFloat = progressFrac * TOTAL_LEGS;
      const currentLeg = Math.min(TOTAL_LEGS - 1, Math.floor(legFloat));

      PATH_SEGMENTS.forEach((seg, li) => {
        const traveled = li < currentLeg;
        const isCurrent = li === currentLeg;
        const legT = isCurrent ? legFloat - currentLeg : 0;

        ctx.beginPath();
        let started = false;
        seg.points.forEach((v, si) => {
          const frac = si / SLERP_STEPS;
          if (isCurrent && frac > legT) return;
          const p = project(v, spinAngle);
          if (!p.front) { started = false; return; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; }
          else ctx.lineTo(p.x, p.y);
        });
        ctx.strokeStyle = traveled || isCurrent ? INK : 'rgba(17,17,17,0.22)';
        ctx.lineWidth = traveled || isCurrent ? 1.8 : 1.1;
        ctx.stroke();
      });

      WAYPOINTS.forEach((wp, i) => {
        const p = project(NODE_VECS[i], spinAngle);
        if (!p.front) return;
        const visited = i <= currentLeg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, visited ? 2.6 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = visited ? INK : 'rgba(17,17,17,0.3)';
        ctx.fill();
      });

      const seg = PATH_SEGMENTS[currentLeg];
      const legT = legFloat - currentLeg;
      const idxF = legT * SLERP_STEPS;
      const i0 = Math.min(SLERP_STEPS, Math.floor(idxF));
      const markerVec = seg.points[i0];
      const mp = project(markerVec, spinAngle);
      if (mp.front) {
        ctx.beginPath();
        ctx.arc(mp.x, mp.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = INK;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mp.x, mp.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(17,17,17,0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (currentLeg !== lastLegShown) {
        lastLegShown = currentLeg;
        const from = WAYPOINTS[currentLeg];
        const to = WAYPOINTS[currentLeg + 1] || from;
        setCurrentLabel({
          from: `${from[1]} (${from[0]})`,
          to: `${to[1]} (${to[0]})`,
          date: to[3] || from[3] || 'TBD',
        });
      }
    };

    const tick = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const progressFrac = reduced ? 0 : (elapsed % LOOP_SECONDS) / LOOP_SECONDS;
      const legFloat = progressFrac * TOTAL_LEGS;
      const currentLeg = Math.min(TOTAL_LEGS - 1, Math.floor(legFloat));
      const seg = PATH_SEGMENTS[currentLeg];
      const legT = legFloat - currentLeg;
      const idxF = legT * SLERP_STEPS;
      const i0 = Math.min(SLERP_STEPS, Math.floor(idxF));
      const markerVec = seg.points[i0];
      const markerLon = Math.atan2(markerVec[0], markerVec[2]);
      const targetSpin = -markerLon;
      spin += (targetSpin - spin) * 0.02;

      draw(spin, progressFrac);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [size, reduced, landRings]);

  return (
    <section style={{ background: PAPER, padding: '6rem 1.5rem', borderTop: '1px solid rgba(17,17,17,0.1)', borderBottom: '1px solid rgba(17,17,17,0.1)' }}>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 700,
        letterSpacing: '0.26em', textTransform: 'uppercase', color: MUTE,
        textAlign: 'center', margin: '0 0 2.5rem 0',
      }}>
        The Route
      </p>

      <div ref={containerRef} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
        <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} />
        {!landRings && !loadError && (
          <p style={{
            position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center',
            fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: MUTE, margin: 0,
          }}>
            Loading coastlines&hellip;
          </p>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic',
          fontSize: '1.05rem', color: INK, margin: '0 0 0.4rem 0',
        }}>
          {currentLabel.from} &rarr; {currentLabel.to}
        </p>
        <p style={{
          fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
          fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: MUTE, margin: 0,
        }}>
          {currentLabel.date}
        </p>
      </div>
    </section>
  );
};

export default RouteGlobe;
