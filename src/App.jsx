import { ModalProvider } from './components/Modal.jsx';
import { Sprite } from './components/Icon.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Proof from './components/Proof.jsx';
import Features from './components/Features.jsx';
import Showcases from './components/Showcases.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Integrations from './components/Integrations.jsx';
import Testimonials from './components/Testimonials.jsx';
import Pricing from './components/Pricing.jsx';
import Resources from './components/Resources.jsx';
import FinalCta from './components/FinalCta.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <ModalProvider>
      <Sprite />
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <div id="top" />
        <Hero />
        <Proof />
        <Features />
        <Showcases />
        <HowItWorks />
        <Integrations />
        <Testimonials />
        <Pricing />
        <Resources />
        <FinalCta />
      </main>
      <Footer />
    </ModalProvider>
  );
}
