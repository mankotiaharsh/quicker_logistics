// Inner pages built from shared sections.
import { Link } from '../router';
import { brand, contact, images } from '../data/site';
import { Careers, ContactCta, Faq, HistoryBand, PageHero, Process, SectionHead, ServicesGrid, Stats } from '../components/Sections';
import { Icon } from '../components/Icons';

export function ServicesPage() {
  return (
    <>
      <PageHero title="Our Services" subtitle="Freight, machinery, lumber, wide and specialized shipments between Canada and the USA." />
      <ServicesGrid />
      <Process />
      <ContactCta />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero title={`About ${brand.name}`} subtitle={`Cross-border trucking since ${brand.founded}.`} image={images.about} />
      <section className="section">
        <div className="container split">
          <div>
            <SectionHead
              eyebrow="Who We Are"
              title="A Cross-Border Carrier You Can Reach Directly"
              text={`${brand.name} was established in ${brand.founded}. We run a fleet of ${brand.trucks} trucks dedicated to hauling freight from Canada to the USA and back.`}
            />
            <p className="lead">
              We specialize in machinery, lumber, wide/oversize and specialized shipments. Because we're a smaller fleet, you deal directly with{' '}
              {contact.person}, with no call centre in between.
            </p>
            <a href={contact.phoneHref} className="btn btn--primary">
              Call {contact.phoneDisplay}
            </a>
          </div>
          <div className="split__media">
            <img src={images.about} alt="Flatbed semi truck hauling a specialized load" />
          </div>
        </div>
      </section>
      <Stats />
      <HistoryBand />
      <ContactCta />
    </>
  );
}

export function DrivePage() {
  return (
    <>
      <PageHero title="Drive With Us" subtitle="Cross-border driving opportunities between Canada and the USA." image={images.driver} />
      <Careers />
      <section className="section section--alt">
        <div className="container container--narrow">
          <SectionHead title="What We Look For" />
          <ul className="checklist">
            {['Valid Class 1 / CDL-A licence', 'Cross-border experience', 'Eligible to cross the Canada–USA border', 'Clean driving record', 'Flatbed / securement experience is an asset'].map(
              (x) => (
                <li key={x}>
                  <Icon name="check" /> {x}
                </li>
              ),
            )}
          </ul>
          <div className="hero__actions">
            <a href={contact.phoneHref} className="btn btn--primary">
              Call {contact.person}: {contact.phoneDisplay}
            </a>
            <Link to="/send-a-resume" className="btn btn--dark">
              Send a Resume
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function FaqPage() {
  return (
    <>
      <PageHero title="FAQ" subtitle="Answers to the questions we hear most." />
      <Faq />
      <ContactCta />
    </>
  );
}

export function LegalPage({ title }: { title: string }) {
  return (
    <>
      <PageHero title={title} />
      <section className="section">
        <div className="container container--narrow prose">
          <p>Replace this placeholder with your {title.toLowerCase()} content.</p>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <section className="section">
      <div className="container center">
        <h1>404</h1>
        <p className="lead">Sorry, that page could not be found.</p>
        <Link to="/" className="btn btn--primary">
          Back Home
        </Link>
      </div>
    </section>
  );
}
