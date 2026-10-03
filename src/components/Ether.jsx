import LiquidEther from './LiquidEther.jsx';
import { prefersReducedMotion } from '../hooks/useInView.js';

// Module-level so the array identity is stable (LiquidEther re-inits when `colors` changes).
const COLORS = ['#4f7cff', '#8b5cf6', '#c4b5fd'];

/** Decorative interactive fluid cursor effect that fills its positioned parent. */
export default function Ether() {
  if (prefersReducedMotion()) return null;
  return (
    <div className="ether" aria-hidden="true">
      <LiquidEther
        colors={COLORS}
        mouseForce={20}
        cursorSize={100}
        resolution={0.5}
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
