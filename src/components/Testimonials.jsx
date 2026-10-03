import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import Folder from './Folder.jsx';

const QUOTES = [
  { q: 'FlowPilot removed hours of repetitive work from our weekly process. Our team can finally focus on the work that actually moves projects forward.', name: 'Daniela Prieto', role: 'Head of Operations, Northwind', init: 'DP', c: '#4f7cff' },
  { q: 'We replaced three tools and a mountain of spreadsheets. Status reports now write themselves and our sprint reviews take half the time.', name: 'Marcus Okafor', role: 'VP Product, Lumina', init: 'MO', c: '#8b5cf6' },
  { q: 'The AI workflow builder is the real deal. I described our incident process in two sentences and it had a working automation ready to test.', name: 'Priya Nair', role: 'Engineering Manager, Aperture', init: 'PN', c: '#10b981' },
];

const Review = ({ t }) => (
  <figure className="review">
    <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote>“{t.q}”</blockquote>
    <figcaption>
      <i style={{ '--c': t.c }}>{t.init}</i>
      <div><b>{t.name}</b><span>{t.role}</span></div>
    </figcaption>
  </figure>
);

// Folder papers are far too small to read on phones, so narrow screens get plain cards.
function useNarrow(query = '(max-width: 900px)') {
  const [narrow, setNarrow] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return narrow;
}

// Left paper, right paper, then the centre paper that rises highest.
const PAPER_ORDER = [0, 1, 2];

export default function Testimonials() {
  const narrow = useNarrow();
  const [open, setOpen] = useState(false);

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="eyebrow">Customers</p>
          <h2>Teams ship more with FlowPilot.</h2>
          {!narrow && <p>Click the folder to read what teams are saying.</p>}
        </Reveal>

        {narrow ? (
          <div className="quotes">
            {QUOTES.map((t, i) => (
              <Reveal className="quote" delay={`${i * 0.08}s`} key={t.name}>
                <Review t={t} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className={`reviews-stage ${open ? 'is-open' : ''}`}>
            <Folder
              color="#4f7cff"
              className="reviews-folder"
              items={PAPER_ORDER.map((i) => <Review key={QUOTES[i].name} t={QUOTES[i]} />)}
              onOpenChange={setOpen}
            />
            <p className="reviews-hint" aria-hidden="true">{open ? 'Click to close' : '3 customer reviews · click to open'}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
