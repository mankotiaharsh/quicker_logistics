import type { ReactElement } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CallButton from './components/CallButton';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import Contact from './pages/Contact';
import { AboutPage, DrivePage, FaqPage, NotFound, ServicesPage } from './pages/InnerPages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { services } from './data/site';
import { Router, useRouter } from './router';
import { useScrollReveal } from './components/useScrollReveal';

const staticRoutes: Record<string, () => ReactElement> = {
  '/': () => <Home />,
  '/services': () => <ServicesPage />,
  '/about': () => <AboutPage />,
  '/drive-with-us': () => <DrivePage />,
  '/faq': () => <FaqPage />,
  '/contact': () => <Contact />,
  '/send-a-resume': () => (
    <Contact title="Send a Resume" intro="Tell us about your driving experience and we'll be in touch." topic="Driving Opportunities" />
  ),
  '/privacy-policy': () => <PrivacyPolicy />,
};

function resolve(path: string): ReactElement {
  if (staticRoutes[path]) return staticRoutes[path]();
  const slug = path.slice(1);
  const service = services.find((s) => s.slug === slug);
  if (service) return <ServicePage service={service} />;
  return <NotFound />;
}

function Routes() {
  const { path } = useRouter();
  useScrollReveal(path);
  return <main key={path}>{resolve(path)}</main>;
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
      <CallButton />
    </Router>
  );
}
