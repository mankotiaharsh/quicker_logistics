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
};

export const contact = {
  person: 'Mandeep Singh',
  phone: '306-514-1390',
  phoneDisplay: '(306) 514-1390',
  phoneHref: 'tel:+13065141390',
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
    short: 'Lumber and building materials delivered between Canada and the USA.',
    image: images.lumber,
    intro: 'Lumber, panels and building materials hauled on flatbed, then tarped and secured so they arrive in good condition.',
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
    image: images.specialized,
    intro: 'For freight that doesn\'t fit a standard load, we work with you on equipment, securement and timing to get it across the border safely.',
    bullets: ['Custom load planning', 'Specialized securement', 'Careful handling', 'One point of contact'],
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
  { value: '5', label: 'Freight Specialties' },
];

export const processSteps = [
  { title: 'Call & Quote', text: 'Tell us about your freight, pickup and delivery locations, and timeline.' },
  { title: 'Equipment & Driver Assignment', text: 'The right trailer and an experienced driver are matched to your load.' },
  { title: 'Border Crossing', text: 'We coordinate the paperwork with you and your customs broker for a smooth crossing.' },
  { title: 'Delivery & POD Confirmation', text: 'Your freight is delivered and the proof of delivery is confirmed and shared.' },
];

export const faqs = [
  { q: `What does ${brand.name} haul?`, a: 'General freight, machinery, lumber, wide/oversize shipments and specialized shipments.' },
  { q: 'Where do you operate?', a: 'We run cross-border only, from Canada to the USA and from the USA back to Canada.' },
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
    ],
  },
  {
    title: 'Legal',
    links: [{ label: 'Privacy Policy', to: '/privacy-policy' }],
  },
];
