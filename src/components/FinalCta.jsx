import Reveal from './Reveal.jsx';
import { ModalLink } from './Modal.jsx';
import TrialButton from './TrialButton.jsx';
import TiltedCard from './TiltedCard.jsx';
import { prefersReducedMotion } from '../hooks/useInView.js';

export default function FinalCta() {
  const still = prefersReducedMotion();
  return (
    <section className="cta">
      <div className="container">
        <Reveal className="cta-tilt">
          <TiltedCard
            containerHeight="auto"
            containerWidth="100%"
            imageWidth="100%"
            imageHeight="auto"
            rotateAmplitude={still ? 0 : 5}
            scaleOnHover={still ? 1 : 1.02}
            showMobileWarning={false}
            showTooltip={false}
            surface={<div className="cta__bg" aria-hidden="true" />}
            displayOverlayContent
            overlayContent={
              <div className="cta__content">
                <h2>Ready to automate the way your team works?</h2>
                <p>Start building smarter workflows today. Set up in minutes, see results this week — no credit card required.</p>
                <div className="hero__ctas">
                  <TrialButton size="lg" />
                  <ModalLink mode="demo" className="btn btn--ghost btn--lg">Book a Demo</ModalLink>
                </div>
              </div>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
