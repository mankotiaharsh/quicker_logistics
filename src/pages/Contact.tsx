import { useState, type FormEvent } from 'react';
import { PageHero } from '../components/Sections';
import { Icon } from '../components/Icons';
import { contact } from '../data/site';

interface FormState {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

const emptyForm = (topic = 'Shipping Quote'): FormState => ({ name: '', email: '', phone: '', topic, message: '' });

export default function Contact({ title = 'Contact Us', intro, topic }: { title?: string; intro?: string; topic?: string }) {
  const [form, setForm] = useState<FormState>(() => emptyForm(topic));
  const [sent, setSent] = useState(false);

  const update = (k: keyof FormState) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: connect to your backend / form service (Formspree, EmailJS, API route…)
    console.log('Contact form submitted', form);
    setSent(true);
    setForm(emptyForm(topic));
  };

  return (
    <>
      <PageHero title={title} subtitle={intro ?? 'Need a cross-border quote? Call or send us a message.'} />
      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <h2>Get In Touch</h2>
            <ul>
              <li>
                <Icon name="phone" size={22} />
                <div>
                  <strong>{contact.person}</strong>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <Icon name="pin" size={22} />
                <div>
                  <strong>Service Area</strong>
                  <span>Cross-border only: Canada to USA and back</span>
                </div>
              </li>
            </ul>
          </div>
          <form className="form" onSubmit={onSubmit}>
            {sent && <div className="form__success">Thanks! Your message has been sent. We'll be in touch shortly.</div>}
            <div className="form__row">
              <label>
                Full Name*
                <input required value={form.name} onChange={update('name')} />
              </label>
              <label>
                Email*
                <input required type="email" value={form.email} onChange={update('email')} />
              </label>
            </div>
            <div className="form__row">
              <label>
                Phone
                <input type="tel" value={form.phone} onChange={update('phone')} />
              </label>
              <label>
                I'm interested in
                <select value={form.topic} onChange={update('topic')}>
                  <option>Shipping Quote</option>
                  <option>Driving Opportunities</option>
                  <option>Other</option>
                </select>
              </label>
            </div>
            <label>
              Message*
              <textarea required rows={6} value={form.message} onChange={update('message')} />
            </label>
            <button type="submit" className="btn btn--primary btn--lg">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
