import { Link } from '../router';
import { brand, services, type Service } from '../data/site';
import { ContactCta, PageHero, Process, ServiceCard } from '../components/Sections';
import { Icon } from '../components/Icons';

export default function ServicePage({ service }: { service: Service }) {
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  return (
    <>
      <PageHero title={service.title} subtitle={service.short} image={service.image} />
      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">{brand.shortName} · {brand.serviceArea}</span>
            <h2>Dependable {service.title} Across the Border</h2>
            <p className="lead">{service.intro}</p>
            <ul className="checklist">
              {service.bullets.map((b) => (
                <li key={b}>
                  <Icon name="check" /> {b}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn--primary">
              Get a Quote
            </Link>
          </div>
          <div className="split__media">
            <img src={service.image} alt={service.title} />
          </div>
        </div>
      </section>
      <Process />
      <section className="section">
        <div className="container">
          <h2 className="center">Related Services</h2>
          <div className="services-grid mt">
            {related.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
