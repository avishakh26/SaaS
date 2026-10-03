import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import useInView, { prefersReducedMotion } from '../hooks/useInView.js';

const PROMPT = 'When a bug is labeled “critical”, alert #oncall and open a Jira ticket';

function TypingText({ text }) {
  const [ref, seen] = useInView({ threshold: 0.5, rootMargin: '0px' });
  const [n, setN] = useState(prefersReducedMotion() ? text.length : 0);

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return;
    let i = 0;
    const id = setInterval(() => {
      setN(++i);
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [seen, text]);

  return <span ref={ref} className="typing" aria-label={text}>{text.slice(0, n)}</span>;
}

/** Card with a cursor-following spotlight highlight. */
function Card({ className, delay, children }) {
  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return <Reveal as="article" className={`card ${className}`} delay={delay} onPointerMove={spot}>{children}</Reveal>;
}

const Ico = ({ name }) => <span className="ico"><Icon name={name} size={22} /></span>;

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="eyebrow">Features</p>
          <h2>Everything your team needs to move faster.</h2>
          <p>One workspace for planning, automating and shipping — with AI doing the repetitive parts in the background.</p>
        </Reveal>

        <div className="bento">
          <Card className="card--a">
            <div className="card__txt">
              <Ico name="bolt" />
              <h3>AI Workflow Automation</h3>
              <p>Describe a process in plain English and FlowPilot builds the trigger, conditions and actions for you. Refine it visually whenever you like.</p>
            </div>
            <div className="snip snip--prompt">
              <div className="prompt"><Icon name="spark" size={16} /><TypingText text={PROMPT} /></div>
              <div className="chips"><span>Trigger: GitHub label</span><span>Action: Slack</span><span>Action: Jira</span></div>
            </div>
          </Card>

          <Card className="card--b" delay=".06s">
            <Ico name="tasks" />
            <h3>Smart Task Management</h3>
            <p>Priorities, owners and due dates suggested automatically.</p>
            <ul className="snip snip--tasks">
              <li><span className="ck on" />Prep roadmap review<small>High</small></li>
              <li><span className="ck" />Update pricing page<small className="m">Med</small></li>
              <li><span className="ck" />Customer interview notes<small className="l">Low</small></li>
            </ul>
          </Card>

          <Card className="card--c">
            <Ico name="users" />
            <h3>Real-Time Team Collaboration</h3>
            <p>Comment, mention and co-edit without leaving the task.</p>
            <div className="snip snip--collab">
              <div className="avatars">
                <i style={{ '--c': '#4f7cff' }}>MR</i><i style={{ '--c': '#8b5cf6' }}>JL</i><i style={{ '--c': '#10b981' }}>SK</i>
              </div>
              <span className="cursor">Jon is typing<b>.</b><b>.</b><b>.</b></span>
            </div>
          </Card>

          <Card className="card--d" delay=".06s">
            <Ico name="chart" />
            <h3>Project Analytics</h3>
            <p>See velocity, bottlenecks and workload at a glance.</p>
            <div className="snip snip--bars" aria-hidden="true">
              {[38, 55, 44, 72, 60, 88, 80].map((h, i) => <i key={i} style={{ '--h': `${h}%` }} />)}
            </div>
          </Card>

          <Card className="card--e" delay=".12s">
            <Ico name="plug" />
            <h3>Custom Integrations</h3>
            <p>Connect 120+ apps or call our API and webhooks for the rest.</p>
            <div className="snip snip--code">
              <code><span className="k">POST</span> /v1/workflows/<span className="s">run</span><br /><span className="c">{'{ "trigger": "deploy.done" }'}</span></code>
            </div>
          </Card>

          <Card className="card--f">
            <div className="card__txt">
              <Ico name="doc" />
              <h3>Automated Reports</h3>
              <p>Weekly status updates, client summaries and exec dashboards — written, formatted and delivered on schedule, with the numbers already pulled in.</p>
            </div>
            <div className="snip snip--report">
              <div className="rep__h"><b>Weekly Summary</b><small>Mon 9:00 · Auto-sent to 14 people</small></div>
              <div className="rep__row"><span>Tasks completed</span><b>47 <em>▲ 12%</em></b></div>
              <div className="rep__row"><span>On-time delivery</span><b>94% <em>▲ 3%</em></b></div>
              <div className="rep__row"><span>Blocked items</span><b>2 <em className="dn">▼ 5</em></b></div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
