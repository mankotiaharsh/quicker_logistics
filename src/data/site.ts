// Central content & configuration for the whole site.
// Edit text, links and images here — components read from this file.

export const brand = {
  name: 'Quicker Logistics Inc',
  shortName: 'Quicker Logistics',
  founded: 2018,
  trucks: 10,
  serviceArea: 'Canada ⇄ USA',
};

// Photos live in /public/images (sources listed in public/images/CREDITS.md).
const img = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

export const images = {
  hero: img('hero.jpg'),
  general: img('freight-hauling.jpg'),
  machinery: img('machinery.jpg'),
  lumber: img('lumber.jpg'),
  wideLoad: img('wide-load.jpg'),
  specialized: img('specialized.jpg'),
  about: img('about.jpg'),
  fleet: img('fleet.jpg'),
  driver: img('driver.jpg'),
  flagCanada: img('flag-canada.svg'),
  flagUsa: img('flag-usa.svg'),
  logo: img('logo.png'),
};

// Flatbed photos that fade through the home page hero.
// Each lives in /public/images/hero as <name>-1600.webp (desktop) and <name>-900.webp (mobile).
// To use your own photos, export them as 1600px and 900px wide WebP files with the same names.
// Each photo also has a caption that links to the matching page, and a focal point:
// how far across the photo (0–100%) the truck is, so phones crop around the truck, not the empty road.
const heroSlide = (name: string, alt: string, caption: string, to: string, focusX: number) => ({
  src: img(`hero/${name}-1600.webp`),
  srcSet: `${img(`hero/${name}-900.webp`)} 900w, ${img(`hero/${name}-1600.webp`)} 1600w`,
  alt,
  caption,
  to,
  focus: `${focusX}% 50%`,
});

export const heroSlides = [
  heroSlide('slide-1', 'Kenworth flatbed truck on a wet highway', 'Freight Hauling', '/freight-hauling', 45),
  heroSlide('slide-2', 'Flatbed truck on an open highway', 'All Flatbed Services', '/services', 62),
  heroSlide('slide-3', 'Flatbed semi hauling a specialized load', 'Specialized Shipments', '/specialized-shipments', 68),
  heroSlide('slide-4', 'Freightliner flatbed truck on the road', 'Drive With Us', '/drive-with-us', 38),
];

// A 32px blurred copy of the first photo (~260 bytes), shown instantly while the real photo downloads.
// Regenerate it if you replace slide-1.
export const heroPlaceholder =
  'data:image/webp;base64,UklGRrwAAABXRUJQVlA4ILAAAAAQBQCdASogABUAPuFeqU2opSQiMAwBEBwJbACdMoADQH/HVEzcW1Z8OB81U65EPU3gAP7TVC6HBMfm0z9CF4mQLeeZ6shQcFyUwkFGauPn+4KHMQ4p9XMnyLMuYE3ZqMpn6HXXZxPZqImePfrG+moWRae2T1jnc4yxqV0ubV2oFA/btR62Djgc82rbY0v+sZyItJevPKf9+/TpYMtmsX5Jturd8+FLke+KakJF4SAAAA==';

// Words that rotate in the hero subheadline.
export const heroCargo = ['Machinery', 'Lumber', 'Steel', 'Oversize Loads', 'Specialized Freight'];

// Quick facts shown along the bottom of the hero.
export const heroFacts = [`Since ${brand.founded}`, `${brand.trucks}-Truck Fleet`, 'Canada ⇄ USA Only', 'Wide & Oversize Loads'];

const address = {
  street: '514 Cory Cres S',
  unit: 'Office No. 3',
  city: 'Saskatoon',
  province: 'Saskatchewan',
  provinceCode: 'SK',
  postalCode: 'S7K 3J7',
  country: 'Canada',
};
const streetLine = `${address.street}, ${address.unit}`;
const cityLine = `${address.city}, ${address.provinceCode} ${address.postalCode}`;
const addressFull = `${streetLine}, ${cityLine}, ${address.country}`;
// Map look-ups work best without the office number.
const mapsQuery = encodeURIComponent(`${address.street}, ${cityLine}, ${address.country}`);

export const contact = {
  person: 'Mandeep Singh',
  phone: '+1 306-514-1390',
  phoneDisplay: '+1 306-514-1390',
  phoneHref: 'tel:+13065141390',
  address: { ...address, streetLine, cityLine },
  addressFull,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${mapsQuery}&z=15&output=embed`,
};

export interface NavItem {
  label: string;
  to?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface Service {
  slug: string;
  title: string;
  short: string;
  image: string;
  intro: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    slug: 'freight-hauling',
    title: 'Freight Hauling',
    short: 'Dependable cross-border hauling between Canada and the USA.',
    image: images.general,
    intro:
      'We haul freight between Canada and the United States and back. Every load is handled by an experienced driver who knows the border crossing process.',
    bullets: ['Canada to USA and USA to Canada', 'Experienced cross-border drivers', 'Direct communication with dispatch', 'On-time pickup and delivery'],
  },
  {
    slug: 'machinery-transportation',
    title: 'Machinery Transportation',
    short: 'Industrial, construction and farm machinery moved safely across the border.',
    image: images.machinery,
    intro: 'Excavators, loaders, farm equipment and industrial machinery, matched to the right trailer and secured properly for the trip across the border.',
    bullets: ['Construction & farm equipment', 'Industrial machinery', 'Proper load securement', 'Cross-border paperwork coordination'],
  },
  {
    slug: 'lumber-hauling',
    title: 'Lumber Hauling',
    short: 'Dimensional lumber, panels and timber delivered between Canada and the USA.',
    image: images.lumber,
    intro: 'Lumber, panels and timber hauled on flatbed, then tarped and secured so they arrive in good condition.',
    bullets: ['Dimensional lumber & panels', 'Tarping & securement', 'Mill, yard and job-site delivery', 'Steady cross-border lanes'],
  },
  {
    slug: 'wide-oversize-shipments',
    title: 'Wide & Oversize Shipments',
    short: 'Over-width and over-dimensional loads with permits and routing handled.',
    image: images.wideLoad,
    intro: 'When freight is too wide or tall for a standard load, we plan the permits, routing and any escorts needed on both sides of the border.',
    bullets: ['Over-width & over-height loads', 'Permit coordination (CAN & USA)', 'Route planning', 'Escort coordination'],
  },
  {
    slug: 'specialized-shipments',
    title: 'Specialized Shipments',
    short: 'Freight that needs special equipment, handling or planning.',
    image: images.about,
    intro: 'For freight that doesn\'t fit a standard load, we work with you on equipment, securement and timing to get it across the border safely.',
    bullets: ['Custom load planning', 'Specialized securement', 'Careful handling', 'One point of contact'],
  },
  {
    slug: 'steel-building-materials',
    title: 'Steel & Building Materials',
    short: 'Structural steel, pipe, rebar and construction supplies on flatbed.',
    image: images.specialized,
    intro:
      'Beams, plate, pipe, rebar, roofing and other construction materials, chained and tarped on flatbed and delivered to yards and job sites on both sides of the border.',
    bullets: ['Structural steel, plate & pipe', 'Rebar, roofing & siding', 'Chains, straps & tarps', 'Yard and job-site delivery'],
  },
];

export const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Services',
    to: '/services',
    children: services.map((s) => ({ label: s.title, to: `/${s.slug}` })),
  },
  { label: 'About Us', to: '/about' },
  { label: 'Drive With Us', to: '/drive-with-us' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export const stats = [
  { value: String(brand.founded), label: 'Established' },
  { value: String(brand.trucks), label: 'Trucks In Our Fleet' },
  { value: 'CAN ⇄ USA', label: 'Cross-Border Lanes' },
  { value: String(services.length), label: 'Freight Specialties' },
];

export const processSteps = [
  { title: 'Call & Quote', text: 'Tell us about your freight, pickup and delivery locations, and timeline.' },
  { title: 'Equipment & Driver Assignment', text: 'The right trailer and an experienced driver are matched to your load.' },
  { title: 'Border Crossing', text: 'We coordinate the paperwork with you and your customs broker for a smooth crossing.' },
  { title: 'Delivery & POD Confirmation', text: 'Your freight is delivered and the proof of delivery is confirmed and shared.' },
];

export const faqs = [
  { q: `What does ${brand.name} haul?`, a: 'General freight, machinery, lumber, steel and building materials, wide/oversize shipments and specialized shipments.' },
  { q: 'Where do you operate?', a: 'We run cross-border only, from Canada to the USA and from the USA back to Canada.' },
  { q: 'Where is your office?', a: `Our office is at ${addressFull}.` },
  { q: 'Do you haul domestic loads?', a: 'No. We focus only on cross-border freight between Canada and the United States.' },
  { q: 'Can you move wide or oversize loads?', a: 'Yes. We handle over-width and over-dimensional shipments, including the permits and routing they need.' },
  { q: 'How long have you been in business?', a: `${brand.name} has been hauling freight since ${brand.founded}.` },
  { q: 'How big is your fleet?', a: `We run a fleet of ${brand.trucks} trucks.` },
  { q: 'How can I get a quote?', a: `Call ${contact.person} at ${contact.phone}, or use the form on our Contact page.` },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: 'Services',
    links: services.map((s) => ({ label: s.title, to: `/${s.slug}` })),
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Drive With Us', to: '/drive-with-us' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Contact', to: '/contact' },
      { label: 'Send a Resume', to: '/send-a-resume' },
    ],
  },
];

// Shown in the footer's bottom strip, next to the copyright.
export const legalLinks: NavItem[] = [{ label: 'Privacy Policy', to: '/privacy-policy' }];
