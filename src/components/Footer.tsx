import { Link } from '../router';
import { brand, contact, footerColumns, images, legalLinks } from '../data/site';
import { Icon } from './Icons';
import { Flags } from './Sections';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <img src={images.logo} alt={brand.name} className="footer__logo" width={720} height={133} />
          <p className="footer__about">
            Cross-border flatbed trucking between Canada and the USA since {brand.founded}. Machinery, lumber, steel, wide and specialized
            loads.
          </p>
          <p className="footer__tagline">
            <Flags size={20} /> Cross-Border Carrier
          </p>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} className="footer__col" aria-label={col.title}>
            <h4>{col.title}</h4>
            <ul className="footer__links">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to ?? '#'}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer__col footer__col--contact">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>
              <Icon name="pin" />
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                {contact.address.streetLine}
                <br />
                {contact.address.cityLine}, {contact.address.country}
              </a>
            </li>
            <li>
              <Icon name="phone" />
              <span>
                {contact.person}
                <br />
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              </span>
            </li>
          </ul>
          <Link to="/contact" className="btn btn--primary footer__cta">
            Get a Quote
          </Link>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <div className="footer__bottom-links">
            {legalLinks.map((l) => (
              <Link key={l.label} to={l.to ?? '#'}>
                {l.label}
              </Link>
            ))}
            <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
