import { Brand } from './Icon.jsx';
import { ModalLink } from './Modal.jsx';

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2 };
const SOCIAL = [
  ['X (Twitter)', <path d="M4 4l16 16M20 4L4 20" {...P} strokeWidth="2.2" strokeLinecap="round" />],
  ['LinkedIn', <><rect x="3" y="3" width="18" height="18" rx="4" {...P} /><path d="M8 11v6M8 7.5v.1M12 17v-6m0 2.5c0-1.5 1-2.5 2.3-2.5S16 12 16 13.5V17" {...P} strokeLinecap="round" /></>],
  ['GitHub', <><circle cx="6" cy="18" r="2.2" {...P} /><circle cx="6" cy="6" r="2.2" {...P} /><circle cx="18" cy="9" r="2.2" {...P} /><path d="M6 8.2v7.6M18 11.2c0 4-8 2-12 5" {...P} /></>],
  ['YouTube', <><rect x="3" y="6" width="18" height="12" rx="4" {...P} /><path d="M10.5 9.5v5l4-2.5z" fill="currentColor" /></>],
];

// [label, href] → in-page anchor; [label, null, mode] → opens modal
const COLS = [
  ['Product', [['Features', '#features'], ['Pricing', '#pricing'], ['Integrations', '#integrations'], ['How it works', '#how']]],
  ['Solutions', [['Operations', '#solutions'], ['Product teams', '#solutions'], ['Engineering', '#solutions'], ['Agencies', '#solutions']]],
  ['Resources', [['Guides', '#resources'], ['Templates', '#resources'], ['Changelog', '#resources'], ['Help center', null, 'soon']]],
  ['Company', [['About', null, 'soon'], ['Careers', null, 'soon'], ['Contact', null, 'demo'], ['Customers', '#testimonials']]],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Brand />
            <p>FlowPilot is the AI-powered workspace that helps teams manage projects, automate repetitive work and collaborate in one place.</p>
            <ul className="social" aria-label="Social media">
              {SOCIAL.map(([label, art]) => (
                <li key={label}>
                  <ModalLink mode="soon" aria-label={label}><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">{art}</svg></ModalLink>
                </li>
              ))}
            </ul>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            {COLS.map(([title, links]) => (
              <div key={title}>
                <h4>{title}</h4>
                <ul>
                  {links.map(([label, href, mode]) => (
                    <li key={label}>{href ? <a href={href}>{label}</a> : <ModalLink mode={mode}>{label}</ModalLink>}</li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} FlowPilot, Inc. All rights reserved.</p>
          <ul>
            <li><ModalLink mode="soon">Privacy Policy</ModalLink></li>
            <li><ModalLink mode="soon">Terms of Service</ModalLink></li>
            <li><ModalLink mode="demo">Contact</ModalLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
