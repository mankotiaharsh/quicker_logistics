import { Link } from '../router';
import { brand, contact, footerColumns } from '../data/site';
import { Icon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <span className="logo-text logo-text--light footer__logo-text">
            Quicker<span>Logistics</span>
          </span>
          <h3 className="footer__tagline">
            Canada <span>⇄</span> USA
          </h3>
          <ul className="footer__contact">
            <li>
              <Icon name="pin" /> Cross-border freight since {brand.founded}
            </li>
            <li>
              <Icon name="phone" /> {contact.person}: <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </li>
          </ul>
        </div>
        <div className="footer__cols">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to ?? '#'}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>
            © {new Date().getFullYear()} {brand.name.toUpperCase()}. All rights reserved.
          </span>
          <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
