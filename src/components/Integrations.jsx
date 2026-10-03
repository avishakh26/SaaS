import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';

const APPS = [
  ['Slack', <><rect x="10" y="20" width="10" height="5" rx="2.5" fill="#36c5f0" /><rect x="20" y="10" width="5" height="10" rx="2.5" fill="#2eb67d" /><rect x="28" y="20" width="10" height="5" rx="2.5" fill="#ecb22e" /><rect x="23" y="28" width="5" height="10" rx="2.5" fill="#e01e5a" /><circle cx="18" cy="28" r="2.5" fill="#36c5f0" /><circle cx="30" cy="17" r="2.5" fill="#ecb22e" /></>],
  ['Google Drive', <><path d="M17 8h14l12 21H29z" fill="#fbbc04" /><path d="M17 8L5 29l7 11 12-21z" fill="#0f9d58" /><path d="M12 40h24l7-11H19z" fill="#4285f4" /></>],
  ['Notion', <><rect x="8" y="7" width="32" height="34" rx="6" fill="#f5f5f5" /><path d="M17 33V15h3l8 12V15h3v18h-3l-8-12v12z" fill="#111" /></>],
  ['GitHub', <><circle cx="24" cy="24" r="17" fill="#e8ecf5" /><circle cx="18" cy="31" r="2.4" fill="#0b1020" /><circle cx="18" cy="17" r="2.4" fill="#0b1020" /><circle cx="30" cy="21" r="2.4" fill="#0b1020" /><path d="M18 19.5v9M30 23.4c0 4-6 3-12 5.6" fill="none" stroke="#0b1020" strokeWidth="2" /></>],
  ['Microsoft Teams', <><rect x="6" y="10" width="26" height="28" rx="6" fill="#5b5fc7" /><rect x="26" y="16" width="16" height="18" rx="5" fill="#7b83eb" /><path d="M13 19h12v3h-4.5v11h-3V22H13z" fill="#fff" /></>],
  ['Jira', <><path d="M24 6l14 14-7 7-7-7-7 7-7-7z" fill="#2684ff" /><path d="M24 20l7 7-7 7-7-7z" fill="#1d5fd0" /><path d="M24 30l7 7-7 5-7-5z" fill="#4c9aff" opacity=".9" /></>],
];

export default function Integrations() {
  return (
    <section className="section section--alt" id="integrations">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="eyebrow">Integrations</p>
          <h2>Works with the stack you already use.</h2>
          <p>No migrations, no rip-and-replace. FlowPilot plugs into your existing tools in minutes.</p>
        </Reveal>
        <Reveal as="ul" className="integ">
          {APPS.map(([name, art]) => (
            <li key={name}>
              <svg viewBox="0 0 48 48" width="40" height="40" role="img" aria-label={name}>{art}</svg>
              <span>{name}</span>
            </li>
          ))}
        </Reveal>
        <Reveal as="p" className="integ__more">
          + 120 more, including HubSpot, Linear, Salesforce, Zendesk and Zapier. <a href="#resources">Browse the full directory <Icon name="arrow" size={14} /></a>
        </Reveal>
      </div>
    </section>
  );
}
