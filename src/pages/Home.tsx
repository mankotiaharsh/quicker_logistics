import { Careers, ContactCta, Faq, Hero, HistoryBand, Process, ServicesGrid, ShipperSection, Stats } from '../components/Sections';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ShipperSection />
      <ServicesGrid />
      <HistoryBand />
      <Process />
      <Careers />
      <Faq />
      <ContactCta />
    </>
  );
}
