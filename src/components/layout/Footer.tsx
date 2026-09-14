import { Link } from 'react-router-dom';
import { Zap, Mail } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from '../ui/SocialIcons';
import './Footer.css';

const LINKS = {
  society: [
    { to: '/about',   label: 'About Us' },
    { to: '/team',    label: 'Our Team' },
    { to: '/events',  label: 'Events' },
    { to: '/gallery', label: 'Gallery' },
  ],
  resources: [
    { to: '/blog',    label: 'Blog' },
    { to: '/contact', label: 'Contact' },
    { to: '/admin',   label: 'Member Portal' },
  ],
};

const SOCIALS = [
  { href: 'https://github.com',    icon: <GithubIcon size={18} />,    label: 'GitHub' },
  { href: 'https://twitter.com',   icon: <TwitterIcon size={18} />,   label: 'Twitter' },
  { href: 'https://linkedin.com',  icon: <LinkedinIcon size={18} />,  label: 'LinkedIn' },
  { href: 'https://instagram.com', icon: <InstagramIcon size={18} />, label: 'Instagram' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Grid overlay */}
      <div className="footer__grid" aria-hidden="true" />

      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="ICT Society home">
              <div className="footer__logo-mark" aria-hidden="true">
                <Zap size={18} />
              </div>
              <span>ICT<span className="footer__logo-accent">Society</span></span>
            </Link>
            <p className="footer__tagline">
              Connecting the next generation of technology leaders at university.
            </p>
            <div className="footer__socials">
              {SOCIALS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link focus-ring"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Society links */}
          <div className="footer__col">
            <h3 className="footer__col-title">Society</h3>
            <ul>
              {LINKS.society.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer__col">
            <h3 className="footer__col-title">Resources</h3>
            <ul>
              {LINKS.resources.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__col footer__newsletter">
            <h3 className="footer__col-title">Stay in the Loop</h3>
            <p className="footer__newsletter-desc">
              Get notified about upcoming events, workshops, and news.
            </p>
            <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                className="footer__newsletter-input"
                autoComplete="email"
              />
              <button type="submit" className="footer__newsletter-btn focus-ring" aria-label="Subscribe">
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <div className="divider-gradient" />
          <div className="footer__bottom-inner">
            <p className="footer__copy">
              © {year} ICT Society. Built with passion by students, for students.
            </p>
            <div className="footer__bottom-links">
              <a href="#" className="footer__link">Privacy</a>
              <a href="#" className="footer__link">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
