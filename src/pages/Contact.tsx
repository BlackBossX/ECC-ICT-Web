import { useState, useId } from 'react';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '../components/ui/SocialIcons';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import './Contact.css';

export function Contact() {
  const uid = useId();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="page-hero section" aria-label="Contact page hero">
        <div className="container page-hero__container">
          <ScrollReveal><SectionLabel>// Contact & Join</SectionLabel></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="page-hero__headline text-gradient-white">
              Let's talk.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="page-hero__sub">
              Whether you want to join, collaborate, sponsor an event, or just say hello —
              we'd love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container contact-layout">
        {/* ── Form ──────────────────────────────────────────── */}
        <ScrollReveal className="contact-form-col">
          <Card variant="default" spotlight>
            <div className="contact-form-inner">
              <h2 className="contact-form-title">Send us a message</h2>

              {submitted ? (
                <div className="contact-success" role="status">
                  <CheckCircle size={40} className="contact-success__icon" />
                  <h3>Message sent!</h3>
                  <p>We'll get back to you within 48 hours. Thanks for reaching out!</p>
                  <Button variant="ghost" size="sm" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`${uid}-name`} className="form-label">Name</label>
                      <input
                        id={`${uid}-name`}
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="form-input focus-ring"
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`${uid}-email`} className="form-label">Email</label>
                      <input
                        id={`${uid}-email`}
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="form-input focus-ring"
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`${uid}-subject`} className="form-label">Subject</label>
                    <select
                      id={`${uid}-subject`}
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="form-input form-select focus-ring"
                      required
                    >
                      <option value="" disabled>Select a topic...</option>
                      <option value="join">Joining the Society</option>
                      <option value="committee">Committee Application</option>
                      <option value="sponsor">Sponsorship / Partnership</option>
                      <option value="event">Event Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`${uid}-message`} className="form-label">Message</label>
                    <textarea
                      id={`${uid}-message`}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="form-input form-textarea focus-ring"
                      placeholder="Tell us what's on your mind..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </Card>
        </ScrollReveal>

        {/* ── Info sidebar ──────────────────────────────────── */}
        <div className="contact-info-col">
          <ScrollReveal>
            <Card variant="gradient" spotlight className="contact-info-card">
              <div className="contact-info-inner">
                <h3 className="contact-info-title">Get in touch</h3>
                <ul className="contact-info-list">
                  <li>
                    <Mail size={16} className="contact-info-icon" aria-hidden="true" />
                    <a href="mailto:hello@ictsociety.ac.uk" className="contact-info-link">
                      hello@ictsociety.ac.uk
                    </a>
                  </li>
                  <li>
                    <MapPin size={16} className="contact-info-icon" aria-hidden="true" />
                    <span>CS Building, University Campus</span>
                  </li>
                  <li>
                    <Phone size={16} className="contact-info-icon" aria-hidden="true" />
                    <span>See us at the Student Union</span>
                  </li>
                </ul>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card variant="default" className="contact-info-card">
              <div className="contact-info-inner">
                <h3 className="contact-info-title">Follow us</h3>
                <div className="contact-socials">
                  {[
                    { href: '#', icon: <GithubIcon size={18} />,    label: 'GitHub' },
                    { href: '#', icon: <LinkedinIcon size={18} />,  label: 'LinkedIn' },
                    { href: '#', icon: <TwitterIcon size={18} />,   label: 'Twitter' },
                    { href: '#', icon: <InstagramIcon size={18} />, label: 'Instagram' },
                  ].map(({ href, icon, label }) => (
                    <a key={label} href={href} className="contact-social-link focus-ring" aria-label={label}>
                      {icon}
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Card variant="default" className="contact-info-card">
              <div className="contact-info-inner">
                <h3 className="contact-info-title">Membership</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-muted)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-3)' }}>
                  Membership is <strong style={{ color: 'var(--fg)' }}>free</strong> and open to all university students. Join to get access to:
                </p>
                <ul className="contact-membership-list">
                  {['All workshops and events', 'Mentorship programme', 'Job board & referrals', 'Community Discord', 'Exclusive hackathon invites'].map(item => (
                    <li key={item}>
                      <Badge variant="accent" dot>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
