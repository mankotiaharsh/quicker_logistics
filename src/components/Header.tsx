import { useEffect, useState } from 'react';
import { Link, useRouter } from '../router';
import { brand, contact, images, nav, type NavItem } from '../data/site';
import { Icon } from './Icons';
import { Flags } from './Sections';

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__contact">
          <a href={contact.phoneHref}>
            <Icon name="phone" size={14} /> {contact.person}: {contact.phoneDisplay}
          </a>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="topbar__address">
            <Icon name="pin" size={14} /> {contact.address.city}, {contact.address.provinceCode}
          </a>
        </div>
        <div className="topbar__social">
          <Flags size={14} /> Cross-Border Trucking
        </div>
      </div>
    </div>
  );
}

function NavEntry({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const { path } = useRouter();
  const active = item.to === path || item.children?.some((c) => c.to === path);

  return (
    <li
      className={`nav__item ${item.children ? 'has-children' : ''} ${open ? 'is-open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="nav__row">
        {item.to ? (
          <Link to={item.to} className={`nav__link ${active ? 'is-active' : ''}`} onClick={onNavigate}>
            {item.label}
          </Link>
        ) : (
          <button type="button" className={`nav__link ${active ? 'is-active' : ''}`} onClick={() => setOpen((o) => !o)}>
            {item.label}
          </button>
        )}
        {item.children && (
          <button type="button" className="nav__toggle" aria-label={`Toggle ${item.label} menu`} onClick={() => setOpen((o) => !o)}>
            <Icon name="chevron" size={16} />
          </button>
        )}
      </div>
      {item.children && (
        <ul className="nav__dropdown">
          {item.children.map((c) => (
            <li key={c.label}>
              <Link to={c.to ?? '#'} onClick={onNavigate}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <TopBar />
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label={`${brand.name} home`}>
          <img src={images.logo} alt={brand.name} width={720} height={133} />
        </Link>
        <nav className={`nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main">
          <ul className="nav__list">
            {nav.map((item) => (
              <NavEntry key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
            ))}
          </ul>
          <Link to="/contact" className="btn btn--primary nav__cta" onClick={() => setMobileOpen(false)}>
            Get a Quote
          </Link>
        </nav>
        <button
          type="button"
          className={`burger ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
