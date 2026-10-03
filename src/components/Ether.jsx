import { useEffect, useState } from 'react';
import LiquidEther from './LiquidEther.jsx';
import { prefersReducedMotion } from '../hooks/useInView.js';

// Module-level so the array identity is stable (LiquidEther re-inits when `colors` changes).
const COLORS = ['#4f7cff', '#8b5cf6', '#c4b5fd'];

/** Decorative interactive fluid cursor effect that fills its positioned parent. */
export default function Ether() {
  // Phones/tablets get a cheaper simulation (lower resolution and solver iterations) to save battery and GPU.
  const [light, setLight] = useState(() => matchMedia('(max-width: 1024px), (pointer: coarse)').matches);
  useEffect(() => {
    const mq = matchMedia('(max-width: 1024px), (pointer: coarse)');
    const on = () => setLight(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  if (prefersReducedMotion()) return null;
  return (
    <div className="ether" aria-hidden="true">
      <LiquidEther
        colors={COLORS}
        mouseForce={20}
        cursorSize={100}
        resolution={light ? 0.28 : 0.5}
        iterationsPoisson={light ? 12 : 32}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  );
}
