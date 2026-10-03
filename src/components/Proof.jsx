import { useEffect, useRef, useState } from 'react';
import useInView, { prefersReducedMotion } from '../hooks/useInView.js';

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' };
const LOGOS = [
  ['Northwind', <><circle cx="12" cy="12" r="9" {...S} /><circle cx="12" cy="12" r="3.4" fill="currentColor" /></>],
  ['Lumina', <path d="M12 3l9 16H3z" {...S} />],
  ['Aperture', <rect x="4" y="4" width="16" height="16" rx="5" fill="currentColor" />],
  ['Vertex', <path d="M4 6l8 13 8-13" {...S} strokeWidth="2.8" />],
  ['Helix', <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z" {...S} />],
  ['Orbitly', <><circle cx="8" cy="12" r="5" {...S} /><circle cx="16" cy="12" r="5" fill="currentColor" opacity=".55" /></>],
];

const STATS = [
  ['Active users', 10000, 0, '+'],
  ['Tasks automated', 2.4, 1, 'M+'],
  ['Uptime, last 12 months', 99.9, 1, '%'],
  ['Avg. hours saved / week', 11, 0, 'h'],
];

const fmt = (n, d) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function CountUp({ end, decimals, suffix }) {
  const [ref, seen] = useInView({ threshold: 0.6, rootMargin: '0px' });
  const [val, setVal] = useState(end);
  const raf = useRef();

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;
    const t0 = performance.now(), dur = 1600;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setVal(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    setVal(0);
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [seen, end]);

  return <span ref={ref}>{fmt(val, decimals)}{suffix}</span>;
}

export default function Proof() {
  return (
    <section className="proof" aria-labelledby="proof-t">
      <div className="container">
        <p className="eyebrow-sub" id="proof-t">Trusted by modern teams</p>
        <ul className="logos" aria-label="Customer logos">
          {LOGOS.map(([name, shape]) => (
            <li key={name}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">{shape}</svg>{name}</li>
          ))}
        </ul>
        <dl className="stats">
          {STATS.map(([label, end, d, suf]) => (
            <div className="stat" key={label}>
              <dt>{label}</dt>
              <dd><CountUp end={end} decimals={d} suffix={suf} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
