import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { ModalLink } from './Modal.jsx';

const ITEMS = [
  ['doc', 'Automation playbook', '40 proven workflows for ops, product and engineering teams.', 'Read the guide'],
  ['bolt', 'Template library', 'Start from ready-made workflows and customize them in minutes.', 'Browse templates'],
  ['spark', "What's new", "Product updates, release notes and what we're building next.", 'View changelog'],
];

export default function Resources() {
  return (
    <section className="section section--tight" id="resources">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="eyebrow">Resources</p>
          <h2>Learn, borrow and get inspired.</h2>
        </Reveal>
        <div className="res">
          {ITEMS.map(([icon, title, body, cta], i) => (
            <Reveal key={title} delay={`${i * 0.08}s`}>
              <ModalLink mode="soon" className="res__c">
                <span className="ico"><Icon name={icon} size={22} /></span>
                <h3>{title}</h3>
                <p>{body}</p>
                <span className="more">{cta} <Icon name="arrow" size={14} /></span>
              </ModalLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
