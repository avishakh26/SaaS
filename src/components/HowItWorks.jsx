import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';

const STEPS = [
  { title: 'Connect your tools', body: 'Link Slack, GitHub, Google Drive and more with one-click OAuth. FlowPilot maps your projects and people automatically.', pills: [['Slack ✓'], ['GitHub ✓'], ['Drive ✓']] },
  { title: 'Build your workflow', body: 'Describe what you want or start from a template. Preview every step with real data before going live.', pills: [['Describe it', 'ai'], ['Test run']] },
  { title: 'Let FlowPilot automate the work', body: 'Your workflow runs 24/7. Get alerts only when a human decision is needed — and a clear log of everything else.', pills: [['● Running', 'live'], ['1,204 runs']] },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="eyebrow">How it works</p>
          <h2>From setup to autopilot in three steps.</h2>
          <p>Most teams ship their first automation in under 15 minutes.</p>
        </Reveal>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" className="step" delay={`${i * 0.1}s`} key={s.title}>
              <span className="step__n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="step__vis">
                {s.pills.map(([label, tone]) => (
                  <span key={label} className={`pill ${tone ? `pill--${tone}` : ''}`}>
                    {tone === 'ai' && <Icon name="spark" size={12} />} {label}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
