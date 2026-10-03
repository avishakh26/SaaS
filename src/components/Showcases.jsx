import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import BlurText from './BlurText.jsx';

const Av = ({ c, children }) => <i style={{ '--c': c }}>{children}</i>;

function Text({ eyebrow, title, body, points, delay }) {
  return (
    <div className="show__txt">
      <Reveal as="p" className="eyebrow" delay={delay}>{eyebrow}</Reveal>
      <BlurText as="h3" text={title} delay={110} animateBy="words" direction="top" stepDuration={0.4} />
      <BlurText as="p" text={body} startDelay={450} delay={35} animateBy="words" direction="top" stepDuration={0.35} />
      <ul className="ticks">
        {points.map((p, i) => (
          <li key={p}>
            <Icon name="check" size={18} />
            <BlurText as="span" text={p} startDelay={1000 + i * 220} delay={45} animateBy="words" direction="top" stepDuration={0.3} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const NODES = [
  { x: 12, y: 50, k: 'Trigger', t: 'New support email', cls: 'node--t' },
  { x: 38, y: 50, k: 'AI step', t: 'Classify urgency', cls: 'node--ai', ai: true },
  { x: 62, y: 25, k: 'If urgent', t: 'Alert #support' },
  { x: 62, y: 75, k: 'Otherwise', t: 'Create Jira ticket' },
  { x: 87, y: 25, k: 'Action', t: 'Assign on-call' },
  { x: 87, y: 75, k: 'Action', t: 'Log to Notion' },
];
const EDGES = [
  'M12 50 C 25 50, 25 50, 38 50', 'M38 50 C 50 50, 50 25, 62 25', 'M38 50 C 50 50, 50 75, 62 75',
  'M62 25 C 75 25, 75 25, 87 25', 'M62 75 C 75 75, 75 75, 87 75',
];

function WorkflowBuilder() {
  return (
    <Reveal className="mock" delay=".08s" role="img" aria-label="Visual workflow editor with connected automation steps">
      <div className="mock__bar"><i /><i /><i /><span className="mock__url">Workflow · Triage support requests</span><span className="pub">Publish</span></div>
      <div className="flow-wrap">
        <div className="flow">
          <svg className="flow__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {EDGES.map((d) => <path key={d} d={d} />)}
          </svg>
          {NODES.map((n) => (
            <div key={n.t} className={`node ${n.cls || ''}`} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <span className="node__k">{n.ai && <Icon name="spark" size={11} />} {n.k}</span>
              <b>{n.t}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="flow-foot"><span className="live">Test run passed</span><span>6 steps · avg. 1.8s</span></div>
    </Reveal>
  );
}

const KPIS = [['Productivity', '+23%', '▲ vs last month'], ['Tasks done', '312', '▲ 48 this week'], ['Hours saved', '186h', '▲ via automation']];
const PROJECTS = [['Website redesign', 82], ['Mobile app v2', 56, true], ['Partner portal', 31]];
const WORKFLOWS = [['g', 'Triage support requests', '1,204 runs'], ['g', 'Weekly exec report', 'Next: Mon 9:00'], ['y', 'Onboard new hires', 'Awaiting approval']];

function Dashboard() {
  return (
    <Reveal className="mock" delay=".08s" role="img" aria-label="Analytics dashboard with project progress, productivity metrics and workflow status">
      <div className="mock__bar"><i /><i /><i /><span className="mock__url">Dashboard · This month</span></div>
      <div className="dash">
        <div className="kpis">
          {KPIS.map(([s, b, e]) => <div className="kpi" key={s}><small>{s}</small><b>{b}</b><em>{e}</em></div>)}
        </div>
        <div className="dash__grid">
          <div className="panel">
            <div className="panel__t">Velocity <em>last 8 weeks</em></div>
            <svg className="chart" viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4f7cff" stopOpacity=".35" /><stop offset="1" stopColor="#4f7cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="chart__area" d="M0 95 L45 80 L91 86 L137 58 L183 66 L229 38 L275 44 L320 18 L320 120 L0 120Z" fill="url(#area)" />
              <path className="chart__line" d="M0 95 L45 80 L91 86 L137 58 L183 66 L229 38 L275 44 L320 18" fill="none" stroke="#6c93ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength="1" />
            </svg>
          </div>
          <div className="panel">
            <div className="panel__t">Projects</div>
            <ul className="projects">
              {PROJECTS.map(([n, v, violet]) => (
                <li key={n}><span>{n}</span><div className={`bar ${violet ? 'bar--v' : ''}`}><span style={{ '--w': `${v}%` }} /></div><b>{v}%</b></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="panel">
          <div className="panel__t">Active workflows <em>8 running</em></div>
          <ul className="wf">
            {WORKFLOWS.map(([c, n, s]) => <li key={n}><span className={`dot dot--${c}`} />{n}<small>{s}</small></li>)}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function Collaboration() {
  return (
    <Reveal className="mock" delay=".08s" role="img" aria-label="Task with assignments, comments and live team activity">
      <div className="mock__bar"><i /><i /><i /><span className="mock__url">Task · Redesign onboarding flow</span></div>
      <div className="collab">
        <div className="collab__main">
          <div className="collab__title"><span className="tag tag--b">In progress</span><h4>Redesign onboarding flow</h4></div>
          <div className="collab__meta">
            <span>Assignee <Av c="#8b5cf6">JL</Av></span><span>Due <b>Oct 14</b></span><span>Priority <b className="hi">High</b></span>
          </div>
          <div className="ai-sum"><Icon name="spark" size={14} /><span><b>AI summary:</b> Team agreed to cut onboarding from 6 steps to 4. Waiting on legal copy.</span></div>
          <ul className="comments">
            <li><Av c="#10b981">SK</Av><div><b>Sara Kim <small>10:24</small></b><p>Updated the empty states — can someone review the copy? <u>@Jon</u></p></div></li>
            <li><Av c="#8b5cf6">JL</Av><div><b>Jon Lee <small>10:31</small></b><p>On it. The 4-step version tests much better with new users.</p></div></li>
            <li><Av c="#4f7cff">MR</Av><div><b>Maya Reyes</b><p className="dots"><span /><span /><span /></p></div></li>
          </ul>
        </div>
        <aside className="collab__side">
          <div className="panel__t">Online now <em className="live">3</em></div>
          <ul className="presence">
            <li><Av c="#4f7cff">MR</Av>Maya<small>Editing</small></li>
            <li><Av c="#8b5cf6">JL</Av>Jon<small>Commenting</small></li>
            <li><Av c="#10b981">SK</Av>Sara<small>Viewing</small></li>
          </ul>
          <div className="panel__t panel__t--sp">Timeline</div>
          <ul className="timeline">
            <li>Sara completed 2 subtasks</li><li>FlowPilot reassigned QA</li><li>Jon changed due date</li>
          </ul>
        </aside>
      </div>
    </Reveal>
  );
}

export default function Showcases() {
  return (
    <section className="section section--alt" id="solutions">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="eyebrow">Solutions</p>
          <h2>See how FlowPilot works.</h2>
          <p>Built for operations, product and engineering teams that are tired of copy-pasting between tools.</p>
        </Reveal>

        <div className="show">
          <Text
            eyebrow="AI Workflow Builder" title="Turn a sentence into a working automation."
            body="Drag, drop or just describe it. FlowPilot suggests the next best step, tests the run before you publish and shows you exactly what happened on every execution."
            points={['Conditional branching and approvals', 'Built-in AI steps: classify, summarize, draft', 'Version history and one-click rollback']}
          />
          <WorkflowBuilder />
        </div>

        <div className="show show--rev">
          <Text
            eyebrow="Smart Dashboard" title="Know where every project stands — without asking."
            body="Live progress, workload and automation health in a single view. FlowPilot flags risks before deadlines slip and explains why in plain language."
            points={['Burn-up charts and forecasted delivery dates', 'Per-person workload balancing', 'Monitor every active workflow in real time']}
          />
          <Dashboard />
        </div>

        <div className="show">
          <Text
            eyebrow="Team Collaboration" title="Everyone on the same page, in real time."
            body="Assign work, discuss it where it lives and see who's doing what — live. Context stays attached to the task, so nothing gets lost in a chat thread."
            points={['@mentions, threads and file previews', 'Live presence and activity timeline', 'AI summaries for long discussions']}
          />
          <Collaboration />
        </div>
      </div>
    </section>
  );
}
