import { useEffect, useRef, useState } from 'react';
import SpecularButton from './SpecularButton.jsx';
import { useModal } from './Modal.jsx';
import { prefersReducedMotion } from '../hooks/useInView.js';

const SIZES = {
  sm: { radius: 10 },
  md: { radius: 12 },
  lg: { radius: 14 },
};

/**
 * "Start Free Trial" button with the SpecularButton rim light.
 * Each SpecularButton owns a WebGL context, so it only mounts while on screen;
 * off-screen (and reduced-motion) it renders the identical static button.
 */
export default function TrialButton({ size = 'md', block = false, mode = 'trial', children = 'Start Free Trial', onClick }) {
  const open = useModal();
  const wrap = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const click = () => { onClick?.(); open(mode); };
  const cls = `sb-brand${block ? ' sb-block' : ''}`;

  return (
    <span ref={wrap} className={`sb-wrap${block ? ' sb-wrap--block' : ''}`}>
      {live ? (
        <SpecularButton
          size={size} radius={SIZES[size].radius} className={cls} onClick={click}
          textColor="#ffffff" lineColor="#ffffff" baseColor="#b9c9ff"
          intensity={1} shineSize={14} shineFade={40} thickness={1} proximity={260}
        >
          {children}
        </SpecularButton>
      ) : (
        <button
          type="button" onClick={click}
          className={`specular-button specular-button--${size} ${cls}`}
          style={{ '--sb-radius': `${SIZES[size].radius}px`, '--sb-text-color': '#ffffff' }}
        >
          <span className="specular-button__label">{children}</span>
        </button>
      )}
    </span>
  );
}
