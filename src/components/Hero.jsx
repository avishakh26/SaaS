import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import TrialButton from './TrialButton.jsx';

const Av = ({ c, children }) => <i style={{ '--c': c }}>{children}</i>;

const SIDEBAR = [['tasks', 'My tasks', true], ['bolt', 'Automations'], ['chart', 'Analytics'], ['users', 'Team'], ['doc', 'Reports']];
const TASKS = [
  ['Finalize launch messaging', 'g', 'Done', true],
  ['Design review: onboarding flow', 'b', 'In review'],
  ['QA regression pass — v2.4', 'v', 'AI assigned'],
  ['Publish changelog & notify customers', 'o', 'Due today'],
];

export function AppMock({ className = '' }) {
  return (
    <Reveal className={`mock mock--hero ${className}`} delay=".25s" role="img" aria-label="FlowPilot dashboard showing tasks, an automation flow and team activity">
      <div className="mock__bar"><i /><i /><i /><span className="mock__url">app.flowpilot.io/workspace/launch-q4</span></div>
      <div className="app">
        <aside className="app__side">
          <div className="app__ws"><b>A</b><span>Acme Studio</span></div>
          <ul>
            {SIDEBAR.map(([icon, label, on]) => (
              <li key={label} className={on ? 'on' : undefined}><Icon name={icon} size={16} />{label}</li>
            ))}
          </ul>
          <div className="app__ai"><Icon name="spark" size={16} /><span>FlowPilot AI saved your team <b>14h</b> this week</span></div>
        </aside>
        <div className="app__main">
          <div className="app__head">
            <h4>Q4 Product Launch</h4>
            <div className="avatars"><Av c="#4f7cff">MR</Av><Av c="#8b5cf6">JL</Av><Av c="#10b981">SK</Av><i className="more">+5</i></div>
          </div>
          <div className="app__cols">
            <div className="panel">
              <div className="panel__t">Tasks <em>12 open</em></div>
              <ul className="tasks">
                {TASKS.map(([t, tone, tag, done]) => (
                  <li key={t} className={done ? 'done' : undefined}><span className="ck" />{t}<small className={`tag tag--${tone}`}>{tag}</small></li>
                ))}
              </ul>
              <div className="prog">
                <div><span>Sprint progress</span><b>68%</b></div>
                <div className="bar"><span style={{ '--w': '68%' }} /></div>
              </div>
            </div>
            <div className="panel panel--flow">
              <div className="panel__t">Active automation <em className="live">Running</em></div>
              <div className="miniflow">
                <div className="mf"><Icon name="bolt" size={14} />PR merged</div>
                <span className="mf__line" />
                <div className="mf mf--ai"><Icon name="spark" size={14} />Summarize changes</div>
                <span className="mf__line" />
                <div className="mf"><Icon name="doc" size={14} />Post to #releases</div>
              </div>
              <div className="panel__t panel__t--sp">Team activity</div>
              <ul className="feed">
                <li><Av c="#10b981">SK</Av><span><b>Sara</b> completed <u>API docs</u></span><small>2m</small></li>
                <li><Av c="#8b5cf6">JL</Av><span><b>Jon</b> commented on <u>Onboarding</u></span><small>6m</small></li>
                <li><Av c="#4f7cff"><Icon name="spark" size={12} /></Av><span><b>FlowPilot</b> sent weekly report</span><small>9m</small></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <Reveal as="a" className="badge" href="#features">
          <span className="badge__dot" />AI-powered workflows for modern teams<Icon name="arrow" size={14} />
        </Reveal>
        <Reveal as="h1" delay=".05s">Automate your work.<br /><span className="grad">Focus on what matters.</span></Reveal>
        <Reveal as="p" className="hero__sub" delay=".1s">
          FlowPilot connects your tools, learns how your team works and automates the busywork — from task routing to weekly reports — so every project keeps moving without another status meeting.
        </Reveal>
        <Reveal className="hero__ctas" delay=".15s">
          <TrialButton size="lg" />
          <a href="#features" className="btn btn--ghost btn--lg">Explore Features</a>
        </Reveal>
        <Reveal as="p" className="hero__note" delay=".2s"><Icon name="check" size={16} /> No credit card required · 14-day free trial</Reveal>
        <AppMock />
      </div>
    </section>
  );
}
