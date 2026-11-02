// Reusable page sections. The Home page composes all of them;
// inner pages reuse a subset.
import { useState, type ReactNode } from 'react';
import { Link } from '../router';
import { brand, contact, faqs, images, processSteps, services, stats, type Service } from '../data/site';
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

export function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url("${images.hero}")` }}>
      <div className="hero__overlay" />
      <div className="container hero__inner">
        <span className="hero__badge">
          <Flags size={16} /> Cross-Border Flatbed Trucking · Since {brand.founded}
        </span>
        <h1>
          Canada to USA <span>&amp; Back Again</span>
        </h1>
        <p className="hero__sub">Machinery, lumber, wide and specialized shipments, hauled across the border.</p>
        <p className="hero__text">
          {brand.name} runs a {brand.trucks}-truck fleet dedicated to cross-border freight between Canada and the United States.
        </p>
        <div className="hero__actions">
          <Link to="/contact" className="btn btn--primary btn--lg">
            Get a Quote
          </Link>
          <a href={contact.phoneHref} className="btn btn--outline btn--lg">
            Call {contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
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
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const shipperChecks = [
  'Canada ⇄ USA lanes',
  'Experienced cross-border drivers',
  'Machinery & lumber specialists',
  'Wide & oversize capable',
  'Safety-first operations',
  'Direct line to the owner',
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
