// Reusable page sections. The Home page composes all of them;
// inner pages reuse a subset.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from '../router';
import { brand, contact, faqs, heroFacts, heroSlides, images, processSteps, services, stats, type Service } from '../data/site';
import { Icon } from './Icons';

export function SectionHead({ eyebrow, title, text, center = false, light = false }: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`section-head ${center ? 'is-center' : ''} ${light ? 'is-light' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Flags({ size = 22 }: { size?: number }) {
  return (
    <span className="flags">
      <img src={images.flagCanada} alt="Canada" style={{ height: size }} />
      <span aria-hidden="true">⇄</span>
      <img src={images.flagUsa} alt="USA" style={{ height: size }} />
    </span>
  );
}

export function PageHero({ title, subtitle, image = images.hero }: { title: string; subtitle?: string; image?: string }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url("${image}")` }}>
      <div className="page-hero__overlay" />
      <div className="container page-hero__inner">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}

// How long each hero photo stays on screen (the progress bar under the active dot fills over this time).
const SLIDE_MS = 6500;

export function Hero() {
  const count = heroSlides.length;
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  // Only the first photos are mounted up front; the rest load just before they are shown.
  const [mounted, setMounted] = useState(Math.min(2, count));

  const goTo = (i: number) => {
    if (i === current) return;
    setPrev(current);
    setCurrent(i);
    setMounted((m) => Math.max(m, Math.min(i + 2, count)));
  };

  // Advance on a timer. Time left on the current photo is kept while paused (hover/focus),
  // so the slideshow resumes where it stopped, in step with the CSS progress bar.
  // On a slow connection it waits for the next photo to finish loading instead of showing a blank.
  const remaining = useRef({ slide: current, ms: SLIDE_MS });
  const loaded = useRef(new Set<number>());
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (paused || count < 2) return;
    if (remaining.current.slide !== current) remaining.current = { slide: current, ms: SLIDE_MS };
    const started = performance.now();
    let fired = false;
    const id = window.setTimeout(() => {
      fired = true;
      const next = (current + 1) % count;
      if (loaded.current.has(next)) {
        goTo(next);
      } else {
        remaining.current.ms = 400;
        setRetry((r) => r + 1);
      }
    }, remaining.current.ms);
    return () => {
      window.clearTimeout(id);
      // Paused or a dot was clicked before the timer fired: remember how much time was left.
      if (!fired && remaining.current.slide === current) remaining.current.ms -= performance.now() - started;
    };
  }, [current, paused, count, retry]);

  return (
    <section
      className={`hero ${paused ? 'is-paused' : ''}`}
      style={{ '--slide-ms': `${SLIDE_MS}ms` } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero__slides">
        {heroSlides.slice(0, mounted).map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            srcSet={slide.srcSet}
            sizes="100vw"
            alt={i === current ? slide.alt : ''}
            aria-hidden={i !== current}
            decoding="async"
            onLoad={() => loaded.current.add(i)}
            onError={() => loaded.current.add(i)}
            className={`hero__slide ${i === current ? 'is-active' : ''} ${i === prev ? 'is-prev' : ''}`}
          />
        ))}
      </div>
      <div className="hero__overlay" />

      <div className="container hero__inner">
        <span className="hero__badge">
          <Flags size={16} /> Cross-Border Flatbed Trucking
        </span>
        <h1>
          Canada to USA <span>&amp; Back Again</span>
        </h1>
        <p className="hero__sub">Machinery, lumber, wide and specialized loads, hauled across the border both ways.</p>
        <div className="hero__actions">
          <Link to="/contact" className="btn btn--primary btn--lg hero__quote">
            Get a Quote
          </Link>
          <a href={contact.phoneHref} className="btn btn--outline btn--lg hero__call">
            <Icon name="phone" size={18} /> Call {contact.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="hero__bar">
        <div className="container hero__bar-inner">
          <ul className="hero__facts">
            {heroFacts.map((f) => (
              <li key={f}>
                <Icon name="check" size={16} /> {f}
              </li>
            ))}
          </ul>
          {count > 1 && (
            <div className="hero__dots" role="group" aria-label="Hero photos">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  className={`hero__dot ${i === current ? 'is-active' : ''}`}
                  aria-label={`Show photo ${i + 1} of ${count}: ${slide.alt}`}
                  aria-current={i === current}
                  onClick={() => goTo(i)}
                >
                  <span className="hero__progress" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const COUNT_MS = 1800;

// A stat value that animates when it scrolls into view: plain numbers count up
// (years count up from 20 years earlier), and "⇄" arrows slide back and forth.
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const isNumber = /^\d+$/.test(value);
  const target = Number(value);
  const from = isNumber && target >= 1900 ? target - 20 : 0;
  const [shown, setShown] = useState(() =>
    isNumber && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? String(from) : value,
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finish = () => {
      setShown(value);
      setDone(true);
    };
    if (!('IntersectionObserver' in window)) {
      finish();
      return;
    }
    if (!isNumber || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Nothing to count (or motion is reduced): show the final value when it comes into view.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          finish();
        },
        { threshold: 0.6 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = () => {
          const t = Math.min((performance.now() - start) / COUNT_MS, 1);
          const eased = 1 - Math.pow(1 - t, 3); // fast start, gentle finish
          setShown(String(Math.round(from + (target - from) * eased)));
          if (t < 1) frame = requestAnimationFrame(tick);
          else finish();
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, isNumber, target, from]);

  const parts = shown.split('⇄');
  return (
    <strong ref={ref} className={`stat__value ${done ? 'is-done' : ''}`}>
      <span aria-hidden="true">
        {parts.length === 2 ? (
          <>
            {parts[0]}
            <span className="stat__arrows">⇄</span>
            {parts[1]}
          </>
        ) : (
          shown
        )}
      </span>
      <span className="sr-only">{value}</span>
    </strong>
  );
}

export function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <h2 className="stats__title">{brand.shortName} By The Numbers</h2>
        <div className="stats__grid">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <StatValue value={s.value} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Kept short so each item fits on one line in the two-column list.
const shipperChecks = [
  'Canada ⇄ USA lanes',
  'Experienced drivers',
  'Machinery & lumber',
  'Wide & oversize loads',
  'Safety-first fleet',
  'Direct line to owner',
];

export function ShipperSection() {
  return (
    <section className="section">
      <div className="container split">
        <div className="split__media">
          <img src={images.fleet} alt="Flatbed and semi trucks parked at a truck stop" loading="lazy" />
          <div className="split__note">
            <Flags size={18} /> Serving Canada ⇄ USA cross-border lanes
          </div>
        </div>
        <div>
          <SectionHead
            eyebrow="For Shippers"
            title="Cross-Border Freight, Handled With Care"
            text="We haul general freight, machinery, lumber, wide loads and specialized shipments from Canada to the USA and back. Cross-border freight is the only kind we run."
          />
          <ul className="checklist">
            {shipperChecks.map((c) => (
              <li key={c}>
                <Icon name="check" /> {c}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn--dark">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HistoryBand() {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className="center mb">
          <Flags size={40} />
        </div>
        <SectionHead
          light
          center
          eyebrow="Our Story"
          title={`Moving Freight Across the Border Since ${brand.founded}`}
          text={`${brand.name} was founded in ${brand.founded} to give shippers a reliable cross-border carrier. Today our ${brand.trucks}-truck fleet runs between Canada and the USA every week.`}
        />
      </div>
    </section>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="service-card">
      <div className="service-card__img">
        <img src={s.image} alt={s.title} loading="lazy" />
      </div>
      <div className="service-card__body">
        <h3>{s.title}</h3>
        <p>{s.short}</p>
        <Link to={`/${s.slug}`} className="link-arrow">
          Learn More <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
}

export function ServicesGrid({ limit }: { limit?: number }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead center eyebrow="What We Haul" title="Cross-Border Trucking Services" />
        <div className="services-grid">
          {services.slice(0, limit).map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHead center eyebrow="Our Process" title={`How Freight Moves With ${brand.shortName}`} />
        <ol className="process">
          {processSteps.map((p, i) => (
            <li key={p.title}>
              <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Careers() {
  return (
    <section className="section">
      <div className="container split split--reverse">
        <div className="split__media">
          <img src={images.driver} alt="Flatbed truck on the highway" loading="lazy" />
        </div>
        <div>
          <SectionHead
            eyebrow="Drive With Us"
            title="Looking for Cross-Border Drivers"
            text={`Are you an experienced Class 1 / CDL-A driver comfortable with Canada ⇄ USA runs? Call ${contact.person} to talk about joining our team.`}
          />
          <Link to="/drive-with-us" className="btn btn--primary">
            Learn More <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <h2>Need Freight Moved Across the Border? Call {contact.person}.</h2>
        <a href={contact.phoneHref} className="btn btn--dark btn--lg">
          {contact.phoneDisplay}
        </a>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container container--narrow">
        <SectionHead center eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="faq">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {f.q}
                <Icon name="chevron" />
              </button>
              <div className="faq__answer">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
