import { createContext, useCallback, useContext, useRef, useState } from 'react';
import Icon from './Icon.jsx';

const ModalContext = createContext(() => {});
export const useModal = () => useContext(ModalContext);

const COPY = {
  trial: { t: 'Start your free trial', s: '14 days of Pro. No credit card required.', b: 'Start Free Trial', ot: "You're all set!", os: (e) => `We sent a magic link to ${e}. Click it to open your workspace.` },
  demo: { t: 'Book a demo', s: "Tell us where to reach you and we'll set up a 20-minute walkthrough.", b: 'Request Demo', ot: 'Demo requested', os: (e) => `Thanks! Someone from our team will email ${e} within one business day.` },
  login: { t: 'Welcome back', s: 'Log in to your FlowPilot workspace.', b: 'Log In', ot: 'Signed in (demo)', os: () => 'This is a demo site, so there is no real account behind this form.' },
  soon: { t: 'Coming soon', s: 'This page is part of the demo and is not live yet. Leave your email and we will let you know.', b: 'Notify Me', ot: "You're on the list", os: (e) => `We'll email ${e} when it's ready.` },
};

/** Anchor that opens the modal in a given mode (trial | demo | login | soon). */
export function ModalLink({ mode, className, children, onClick, ...rest }) {
  const open = useModal();
  return (
    <a href="#" className={className} onClick={(e) => { e.preventDefault(); onClick?.(); open(mode); }} {...rest}>
      {children}
    </a>
  );
}

export function ModalProvider({ children }) {
  const dialog = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const lastFocus = useRef(null);
  const [mode, setMode] = useState('trial');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState(null);
  const [done, setDone] = useState(false);
  const c = COPY[mode];

  const open = useCallback((m) => {
    setMode(m); setEmail(''); setPass(''); setError(''); setInvalid(null); setDone(false);
    lastFocus.current = document.activeElement;
    dialog.current.showModal();
    setTimeout(() => emailRef.current?.focus(), 50);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    const passOk = mode !== 'login' || pass.length > 0;
    if (!validEmail || !passOk) {
      setError(validEmail ? 'Please enter your password.' : 'Please enter a valid email address.');
      setInvalid(validEmail ? 'pass' : 'email');
      (validEmail ? passRef : emailRef).current?.focus();
      return;
    }
    setDone(true);
  };

  return (
    <ModalContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="modal-title"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        onClose={() => lastFocus.current?.focus?.()}
      >
        <form method="dialog" className="modal__close-wrap">
          <button className="modal__close" aria-label="Close dialog">×</button>
        </form>

        {!done ? (
          <div className="modal__body">
            <Icon name="logo" size={36} />
            <h2 id="modal-title">{c.t}</h2>
            <p>{c.s}</p>
            <form onSubmit={submit} noValidate>
              <label htmlFor="m-email">Work email</label>
              <input
                id="m-email" ref={emailRef} type="email" autoComplete="email" placeholder="you@company.com"
                value={email} aria-invalid={invalid === 'email' || undefined}
                onChange={(e) => { setEmail(e.target.value); setError(''); setInvalid(null); }}
              />
              {mode === 'login' && (
                <>
                  <label htmlFor="m-pass">Password</label>
                  <input
                    id="m-pass" ref={passRef} type="password" autoComplete="current-password" placeholder="••••••••"
                    value={pass} aria-invalid={invalid === 'pass' || undefined}
                    onChange={(e) => { setPass(e.target.value); setError(''); setInvalid(null); }}
                  />
                </>
              )}
              {error && <p className="err" role="alert">{error}</p>}
              <button type="submit" className="btn btn--primary btn--block">{c.b}</button>
            </form>
          </div>
        ) : (
          <div className="modal__body modal__ok">
            <span className="okc"><Icon name="check" size={26} /></span>
            <h2 id="modal-title">{c.ot}</h2>
            <p>{c.os(email.trim())}</p>
            <button className="btn btn--ghost btn--block" type="button" autoFocus onClick={() => dialog.current.close()}>Close</button>
          </div>
        )}
      </dialog>
    </ModalContext.Provider>
  );
}
