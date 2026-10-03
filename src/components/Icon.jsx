/** Shared SVG sprite — render <Sprite /> once, then use <Icon name="bolt" />. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="g-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f7cff" /><stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <symbol id="i-logo" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="9" fill="url(#g-brand)" />
          <path d="M9 22l5-12 3 7 2-4 4 9" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 20 20"><path d="M4 10.5l3.5 3.5L16 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></symbol>
        <symbol id="i-tasks" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M8.5 12.5l2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="9" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3.5 19c.5-3 2.7-4.8 5.5-4.8s5 1.8 5.5 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="17" cy="8" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M16.5 13.6c2.4.2 3.6 1.9 4 4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></symbol>
        <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V5M4 20h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M8 15l3.5-4 3 2.5L19 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-plug" viewBox="0 0 24 24"><path d="M9 3v5M15 3v5M6.5 8h11v3.5a5.5 5.5 0 01-11 0zM12 17v4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M14 3v5h5M10 13h6M10 17h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-arrow" viewBox="0 0 20 20"><path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" fill="currentColor" /></symbol>
      </defs>
    </svg>
  );
}

export default function Icon({ name, size = 18, className }) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#top" aria-label="FlowPilot home">
      <Icon name="logo" size={30} /><span>FlowPilot</span>
    </a>
  );
}
