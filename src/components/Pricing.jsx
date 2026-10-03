import { useState } from 'react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import TrialButton from './TrialButton.jsx';

const PLANS = [
  { name: 'Starter', desc: 'For small teams getting organized.', m: 9, y: 7, cta: 'btn--ghost', features: ['Up to 5 users', '10 automated workflows', 'Basic analytics', 'Task management', 'Email support'] },
  { name: 'Pro', desc: 'For growing teams that automate everything.', m: 24, y: 19, cta: 'btn--primary', popular: true, features: ['Up to 20 users', 'Unlimited workflows', 'Advanced analytics', 'AI workflow builder', 'Custom integrations', 'Priority support'] },
  { name: 'Business', desc: 'For organizations that need scale and control.', m: 59, y: 47, cta: 'btn--ghost', features: ['Unlimited users & workflows', 'Advanced AI automation', 'Team analytics', 'Enterprise integrations', 'Dedicated support'] },
];

function Plan({ plan, yearly, delay }) {
  const price = yearly ? plan.y : plan.m;
  return (
    <Reveal as="article" className={`plan ${plan.popular ? 'plan--pop' : ''}`} delay={delay}>
      {plan.popular && <span className="plan__badge">Most Popular</span>}
      <h3>{plan.name}</h3>
      <p className="plan__d">{plan.desc}</p>
      <p className="price">
        <span className="cur">$</span>
        {/* key change remounts the number so the flip animation replays */}
        <span className="amt flip" key={price}>{price}</span>
        <span className="per">/user/mo</span>
      </p>
      <p className="bill">{yearly ? `Billed yearly · $${plan.y * 12}/user` : 'Billed monthly'}</p>
      <TrialButton size="md" block />
      <ul className="plan__f">
        {plan.features.map((f) => <li key={f}><Icon name="check" size={18} />{f}</li>)}
      </ul>
    </Reveal>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section className="section section--alt" id="pricing">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="eyebrow">Pricing</p>
          <h2>Simple pricing that scales with your team.</h2>
          <p>Start free for 14 days. Upgrade, downgrade or cancel anytime.</p>
        </Reveal>

        <Reveal className="toggle" role="group" aria-label="Billing period">
          <button type="button" className={`toggle__l ${!yearly ? 'is-on' : ''}`} onClick={() => setYearly(false)}>Monthly</button>
          <button
            type="button" className="switch" role="switch" aria-checked={yearly}
            aria-label="Bill yearly and save 20 percent" onClick={() => setYearly(!yearly)}
          ><span /></button>
          <button type="button" className={`toggle__l ${yearly ? 'is-on' : ''}`} onClick={() => setYearly(true)}>
            Yearly <em className="save">Save 20%</em>
          </button>
        </Reveal>

        <div className="plans">
          {PLANS.map((p, i) => <Plan key={p.name} plan={p} yearly={yearly} delay={`${i * 0.08}s`} />)}
        </div>
      </div>
    </section>
  );
}
