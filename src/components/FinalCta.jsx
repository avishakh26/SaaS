import Reveal from './Reveal.jsx';
import { ModalLink } from './Modal.jsx';
import TrialButton from './TrialButton.jsx';

export default function FinalCta() {
  return (
    <section className="cta">
      <div className="container">
        <Reveal className="cta__box">
          <div className="cta__bg" aria-hidden="true" />
          <h2>Ready to automate the way your team works?</h2>
          <p>Start building smarter workflows today. Set up in minutes, see results this week — no credit card required.</p>
          <div className="hero__ctas">
            <TrialButton size="lg" />
            <ModalLink mode="demo" className="btn btn--ghost btn--lg">Book a Demo</ModalLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
