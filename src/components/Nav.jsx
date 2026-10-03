import { useEffect, useMemo, useState } from 'react';
import { Brand } from './Icon.jsx';
import { ModalLink, useModal } from './Modal.jsx';
import PillNav from './PillNav.jsx';
import TrialButton from './TrialButton.jsx';

const LINKS = [
  ['Features', '#features'],
  ['Solutions', '#solutions'],
  ['Pricing', '#pricing'],
  ['Resources', '#resources'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openModal = useModal();
  const pillItems = useMemo(
    () => [
      ...LINKS.map(([label, href]) => ({ label, href })),
      { label: 'Login', href: '#login', onClick: () => openModal('login') },
    ],
    [openModal]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = matchMedia('(min-width: 861px)');
    const onMq = () => setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => { window.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq); };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="container nav__inner">
        <Brand />
        <PillNav
          items={pillItems}
          className="nav-pills"
          ease="power3.easeOut"
          baseColor="#f4f6fc"
          pillColor="transparent"
          pillTextColor="#c3cbe6"
          hoveredPillTextColor="#070b16"
        />
        <nav className="nav__links" id="nav-menu" aria-label="Primary">
          {LINKS.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
          <ModalLink mode="login" className="nav__login" onClick={close}>Login</ModalLink>
          <ModalLink mode="trial" className="btn btn--primary btn--sm nav__cta-mobile" onClick={close}>Start Free Trial</ModalLink>
        </nav>
        <div className="nav__actions">
          <span className="nav__cta"><TrialButton size="sm" /></span>
          <button
            className="burger" aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
