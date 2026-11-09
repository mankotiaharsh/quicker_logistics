// Privacy Policy, written for Canada's federal private-sector privacy law (PIPEDA), which governs
// businesses in Saskatchewan. Keep it accurate: if the site starts using analytics, cookies, a form
// service or email marketing, update the matching section and the "Last updated" date.
import type { ReactNode } from 'react';
import { Link } from '../router';
import { PageHero } from '../components/Sections';
import { brand, contact } from '../data/site';

const LAST_UPDATED = 'November 9, 2026';

// The site's router uses the URL hash (#/contact), so plain "#section" links would change page.
// This scrolls to a section on this page instead.
function SectionLink({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {children}
    </a>
  );
}

const sections = [
  { id: 'who-we-are', title: 'Who we are' },
  { id: 'what-we-collect', title: 'Information we collect' },
  { id: 'how-we-use', title: 'How we use it' },
  { id: 'consent', title: 'Consent' },
  { id: 'sharing', title: 'Sharing your information' },
  { id: 'outside-canada', title: 'Information stored or processed outside Canada' },
  { id: 'cookies', title: 'Cookies and third-party services' },
  { id: 'retention', title: 'How long we keep it' },
  { id: 'security', title: 'How we protect it' },
  { id: 'your-rights', title: 'Your rights' },
  { id: 'children', title: 'Children' },
  { id: 'changes', title: 'Changes to this policy' },
  { id: 'contact', title: 'Contact us and complaints' },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle={`How ${brand.name} collects, uses and protects your personal information.`} />
      <section className="section">
        <div className="container container--narrow">
          <article className="policy">
            <p className="policy__updated">Last updated: {LAST_UPDATED}</p>
            <p className="lead">
              {brand.name} (“we”, “us”) respects your privacy. This policy explains what personal information we collect through this website
              and in the course of our cross-border trucking business, why we collect it, and the choices and rights you have. We follow the
              ten fair information principles of Canada’s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA).
            </p>

            <nav className="policy__toc" aria-label="Contents">
              <strong>Contents</strong>
              <ol>
                {sections.map((s) => (
                  <li key={s.id}>
                    <SectionLink id={s.id}>{s.title}</SectionLink>
                  </li>
                ))}
              </ol>
            </nav>

            <h2 id="who-we-are">1. Who we are</h2>
            <p>
              {brand.name} is a trucking company based in {contact.address.city}, {contact.address.province}, hauling freight between Canada and the
              United States. We are responsible for the personal information under our control and have designated a Privacy Officer who is
              accountable for our compliance with this policy (see <SectionLink id="contact">Contact us</SectionLink>).
            </p>

            <h2 id="what-we-collect">2. Information we collect</h2>
            <p>We collect only the information we need. Depending on how you deal with us, this may include:</p>
            <ul>
              <li>
                <strong>When you contact us or request a quote</strong> (by phone, email or our contact form): your name, email address, phone number,
                company, the subject of your enquiry and anything you include in your message, such as pickup and delivery locations and freight
                details.
              </li>
              <li>
                <strong>When you apply to drive with us</strong> (through the “Send a Resume” form or by phone): your contact details and the work
                history, licence and qualification information you choose to share with us.
              </li>
              <li>
                <strong>When we move your freight</strong>: names and contact details of shippers, consignees and their staff, and the shipment
                information required to transport goods across the border.
              </li>
              <li>
                <strong>When you visit this website</strong>: technical information that your browser sends automatically, such as your IP address,
                browser type and the pages requested. This website does not use analytics or advertising tools and does not ask you to create an
                account.
              </li>
            </ul>

            <h2 id="how-we-use">3. How we use it</h2>
            <p>We use personal information only for the purposes we collected it for, which are to:</p>
            <ul>
              <li>respond to your questions and prepare quotes;</li>
              <li>arrange, transport and deliver shipments, including clearing them through customs;</li>
              <li>assess driving applications and communicate with applicants;</li>
              <li>invoice, keep business records and meet our legal, regulatory, safety and tax obligations;</li>
              <li>keep this website secure and working properly.</li>
            </ul>
            <p>We do not sell, rent or trade your personal information, and we do not send marketing emails without your consent.</p>

            <h2 id="consent">4. Consent</h2>
            <p>
              We collect, use and disclose personal information with your knowledge and consent, except where the law allows otherwise. When you
              contact us, request a quote or send us your resume, you consent to us using that information for the purpose of your request. You may
              withdraw your consent at any time, subject to legal or contractual restrictions and reasonable notice; we will explain if withdrawing
              consent means we can no longer provide a service.
            </p>

            <h2 id="sharing">5. Sharing your information</h2>
            <p>We share personal information only as needed for the purposes above, with:</p>
            <ul>
              <li>
                <strong>Border and customs parties</strong>, such as customs brokers, the Canada Border Services Agency and U.S. Customs and Border
                Protection, as required to move freight across the border;
              </li>
              <li>
                <strong>Parties to your shipment</strong>, such as shippers, consignees and, where needed, permit and escort providers;
              </li>
              <li>
                <strong>Service providers</strong> who help us run our business and this website (for example web hosting). They may use the
                information only to provide services to us;
              </li>
              <li>
                <strong>Authorities</strong>, when required or permitted by law, such as to respond to a lawful request, a court order or a safety
                inspection.
              </li>
            </ul>

            <h2 id="outside-canada">6. Information stored or processed outside Canada</h2>
            <p>
              Because we haul freight between Canada and the United States, some personal information is shared with parties in the United States,
              including U.S. customs authorities and consignees. This website is also hosted by GitHub (GitHub Pages) and uses services from Google,
              which may store or process information in the United States or other countries. Information held outside Canada is subject to the laws
              of that country and may be accessible to its courts, law enforcement and national security authorities.
            </p>

            <h2 id="cookies">7. Cookies and third-party services</h2>
            <p>
              This website itself does not set cookies and does not use analytics or advertising trackers. It does load content from the following
              third-party services, which receive your IP address and basic browser information when they deliver that content to you:
            </p>
            <ul>
              <li>
                <strong>GitHub Pages</strong> hosts this website. GitHub logs visitors’ IP addresses for security purposes, as described in{' '}
                <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection" target="_blank" rel="noopener noreferrer">
                  GitHub’s Pages documentation
                </a>
                .
              </li>
              <li>
                <strong>Google Fonts</strong> provides the website’s fonts. According to Google, the Fonts service does not set cookies; see{' '}
                <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer">
                  Google Fonts privacy
                </a>
                .
              </li>
              <li>
                <strong>Google Maps</strong> shows our office location on the Contact page. Google may set cookies when the map loads; see the{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Google Privacy Policy
                </a>
                .
              </li>
            </ul>
            <p>You can block or delete cookies in your browser settings. The website will still work, although the embedded map may not load.</p>

            <h2 id="retention">8. How long we keep it</h2>
            <p>
              We keep personal information only as long as needed for the purposes described in this policy, or as long as the law requires (for
              example, for tax, customs and transportation records). After that, we securely destroy it or make it anonymous. If you have made a
              request to access your information, we keep it for as long as needed for you to use any recourse available to you.
            </p>

            <h2 id="security">9. How we protect it</h2>
            <p>
              We protect personal information with safeguards suited to its sensitivity, including limiting access to people who need it for their
              work, securing paper records, and using password-protected devices and accounts. This website is served over an encrypted (HTTPS)
              connection. No method of transmission or storage is completely secure, but if a breach of security safeguards creates a real risk of
              significant harm to you, we will notify you and the Office of the Privacy Commissioner of Canada as required by law.
            </p>

            <h2 id="your-rights">10. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>ask whether we hold personal information about you, and request access to it;</li>
              <li>ask us to correct information that is inaccurate or incomplete;</li>
              <li>withdraw your consent, as described above;</li>
              <li>ask questions about, or challenge, our compliance with this policy.</li>
            </ul>
            <p>
              To make a request, contact our Privacy Officer. We may ask you to confirm your identity. We will respond within 30 days, and if we need
              more time, or cannot provide some information, we will tell you why in writing. Requests are free unless we tell you the approximate
              cost in advance and you agree to proceed.
            </p>

            <h2 id="children">11. Children</h2>
            <p>This website is intended for businesses and job seekers. We do not knowingly collect personal information from children.</p>

            <h2 id="changes">12. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The latest version will always be posted on this page with its “Last updated” date.
            </p>

            <h2 id="contact">13. Contact us and complaints</h2>
            <p>For privacy questions, requests or concerns, please contact our Privacy Officer:</p>
            <address className="policy__contact">
              <strong>Privacy Officer: {contact.person}</strong>
              <br />
              {brand.name}
              <br />
              {contact.address.streetLine}
              <br />
              {contact.address.cityLine}, {contact.address.country}
              <br />
              Phone: <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </address>
            <p>
              If you are not satisfied with our response, you may file a complaint with the{' '}
              <a href="https://www.priv.gc.ca/en/report-a-concern/file-a-formal-privacy-complaint/file-a-complaint-about-a-business" target="_blank" rel="noopener noreferrer">
                Office of the Privacy Commissioner of Canada
              </a>
              , 30 Victoria Street, Gatineau, Quebec K1A 1H3, toll-free 1-800-282-1376.
            </p>
            <p>
              <Link to="/contact" className="btn btn--primary">
                Contact Us
              </Link>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
