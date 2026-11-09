// Floating "Call" button shown on phones (most customers call rather than fill in a form).
// Hidden on larger screens by CSS, where the phone number is always visible in the top bar.
import { contact } from '../data/site';
import { Icon } from './Icons';

export default function CallButton() {
  return (
    <a href={contact.phoneHref} className="call-fab" aria-label={`Call ${contact.person} at ${contact.phoneDisplay}`}>
      <Icon name="phone" size={20} />
      <span>Call Now</span>
    </a>
  );
}
