// Animates page content into place as it scrolls into view. Each kind of section
// gets its own entrance (see the .reveal--* styles in global.css), picked by selector
// so the section components don't need any extra markup.
import { useEffect } from 'react';

type Variant = 'fade-up' | 'from-left' | 'from-right' | 'zoom' | 'tilt' | 'blur' | 'pop' | 'drop' | 'unfold' | 'wipe' | 'late';

// First matching rule wins, so more specific selectors come first.
const RULES: [selector: string, variant: Variant][] = [
  ['.page-hero__inner', 'blur'], // page title banners come into focus
  ['.section--dark .center', 'pop'], // Canada / USA flags on the navy story band
  ['.section--dark .section-head', 'blur'],
  ['.stats__grid > *', 'zoom'],
  ['.split--reverse > .split__media', 'from-right'], // mirrored split: photo on the right
  ['.split--reverse > *', 'from-left'],
  ['.split > .split__media', 'from-left'],
  ['.split > *', 'from-right'],
  ['.split__note', 'pop'], // orange badge on the shipper photo
  ['.checklist > li', 'drop'],
  ['.services-grid > *', 'tilt'], // service cards tilt up like cards being dealt
  ['.process > li', 'from-left'], // steps drive in one after another
  ['.faq__item', 'unfold'],
  ['.cta-band', 'wipe'], // orange band wipes across...
  ['.cta-band__inner > *', 'late'], // ...then its text and button rise in
  ['.contact__info', 'from-left'],
  ['.form', 'from-right'],
  ['.section-head', 'fade-up'],
  ['.stats__title', 'fade-up'],
];

const ALL_SELECTORS = RULES.map(([selector]) => selector).join(',');
const STAGGER_MS = 110;
const MAX_STAGGER_STEPS = 6;

const variantFor = (el: Element) => RULES.find(([selector]) => el.matches(selector))?.[1] ?? 'fade-up';

export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    const root = document.querySelector('main');
    if (!root || !('IntersectionObserver' in window)) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(ALL_SELECTORS));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.classList.add('is-visible');
          // Once it has settled, drop the reveal classes so the element's own hover effects work again.
          const settle = (e: TransitionEvent) => {
            if (e.target !== el) return; // ignore transitions bubbling up from children
            el.removeEventListener('transitionend', settle);
            el.classList.remove('reveal', `reveal--${variantFor(el)}`, 'is-visible');
            el.style.removeProperty('--reveal-delay');
          };
          el.addEventListener('transitionend', settle);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    for (const el of elements) {
      // Items in the same grid/list come in one after another.
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(ALL_SELECTORS)) : [];
      const step = Math.min(Math.max(siblings.indexOf(el), 0), MAX_STAGGER_STEPS);
      el.style.setProperty('--reveal-delay', `${step * STAGGER_MS}ms`);
      el.classList.add('reveal', `reveal--${variantFor(el)}`);
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [routeKey]);
}
