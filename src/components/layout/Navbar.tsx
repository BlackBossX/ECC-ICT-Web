import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/about',   label: 'About' },
  { to: '/events',  label: 'Events' },
  { to: '/team',    label: 'Team' },
  { to: '/blog',    label: 'Blog' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={['navbar', scrolled ? 'navbar--scrolled' : ''].filter(Boolean).join(' ')}>
      <nav className="navbar__inner container" role="navigation" aria-label="Main navigation">

        {/* ── Logo ────────────────────────────────────────── */}
        <Link to="/" className="navbar__logo" aria-label="ICT Society home" onClick={() => setMenuOpen(false)}>
          <div className="navbar__logo-mark" aria-hidden="true">
            <Zap size={18} />
          </div>
          <span className="navbar__logo-text">
            ICT<span className="navbar__logo-accent">Society</span>
          </span>
        </Link>

        {/* ── Desktop links ────────────────────────────────── */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  ['navbar__link', isActive ? 'navbar__link--active' : ''].filter(Boolean).join(' ')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ──────────────────────────────────── */}
        <div className="navbar__cta">
          <Link to="/admin">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/contact">
            <Button variant="primary" size="sm">Join Us</Button>
          </Link>
        </div>

        {/* ── Mobile hamburger ─────────────────────────────── */}
        <button
          className="navbar__hamburger focus-ring"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile dropdown ──────────────────────────────────── */}
      {menuOpen && (
        <div id="mobile-menu" className="navbar__mobile" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <ul role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    ['navbar__mobile-link', isActive ? 'navbar__mobile-link--active' : ''].filter(Boolean).join(' ')
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-footer">
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              <Button variant="secondary" size="md" fullWidth>Sign In</Button>
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <Button variant="primary" size="md" fullWidth>Join the Society</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
