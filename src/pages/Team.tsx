import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/ui/SocialIcons';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { TEAM } from '../data';
import './Team.css';

const COMMITTEE_COLORS: Record<string, 'accent' | 'default' | 'success' | 'warning' | 'category'> = {
  executive: 'accent',
  technical: 'success',
  events:    'warning',
  media:     'category',
  alumni:    'default',
};

const INITIALS = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase();

const COLORS = [
  'linear-gradient(135deg, #5e6ad2, #818cf8)',
  'linear-gradient(135deg, #34d399, #10b981)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #ec4899, #db2777)',
  'linear-gradient(135deg, #60a5fa, #3b82f6)',
  'linear-gradient(135deg, #a78bfa, #7c3aed)',
  'linear-gradient(135deg, #f87171, #ef4444)',
  'linear-gradient(135deg, #fb923c, #ea580c)',
];

export function Team() {
  const executive = TEAM.filter(m => m.committee === 'executive');
  const other     = TEAM.filter(m => m.committee !== 'executive');

  return (
    <div className="team-page">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="page-hero section" aria-label="Team page hero">
        <div className="container page-hero__container">
          <ScrollReveal><SectionLabel>// The Team</SectionLabel></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="page-hero__headline text-gradient-white">
              Meet the people<br />making it happen.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="page-hero__sub">
              ICT Society is run entirely by students, for students. Every committee member
              volunteers their time because they believe in what we're building.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Executive Committee ───────────────────────────── */}
      <section className="section team-section" aria-label="Executive committee">
        <div className="container">
          <ScrollReveal>
            <SectionLabel>// Executive Committee</SectionLabel>
            <h2 className="section-title text-gradient-white" style={{ marginTop: 'var(--space-3)' }}>
              Leadership team
            </h2>
          </ScrollReveal>

          <div className="team-grid team-grid--exec">
            {executive.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.08}>
                <Card variant={i === 0 ? 'gradient' : 'default'} spotlight className="member-card">
                  <div className="member-card__inner">
                    <div
                      className="member-avatar"
                      style={{ background: COLORS[i % COLORS.length] }}
                      aria-hidden="true"
                    >
                      {INITIALS(member.name)}
                    </div>
                    <div className="member-card__body">
                      <div className="member-card__top">
                        <div>
                          <h3 className="member-name">{member.name}</h3>
                          <Badge variant={COMMITTEE_COLORS[member.committee]}>{member.role}</Badge>
                        </div>
                      </div>
                      <p className="member-bio">{member.bio}</p>
                      <div className="member-socials">
                        {member.socials?.github && (
                          <a href={member.socials.github} target="_blank" rel="noopener noreferrer"
                             className="member-social-link focus-ring" aria-label={`${member.name} GitHub`}>
                            <GithubIcon size={16} />
                          </a>
                        )}
                        {member.socials?.linkedin && (
                          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                             className="member-social-link focus-ring" aria-label={`${member.name} LinkedIn`}>
                            <LinkedinIcon size={16} />
                          </a>
                        )}
                        {member.socials?.twitter && (
                          <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"
                             className="member-social-link focus-ring" aria-label={`${member.name} Twitter`}>
                            <TwitterIcon size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sub-committee ─────────────────────────────────── */}
      <section className="section-sm team-section" aria-label="Sub-committee members">
        <div className="container">
          <div className="divider-gradient" style={{ marginBottom: 'var(--space-12)' }} />
          <ScrollReveal>
            <SectionLabel>// Sub-Committee</SectionLabel>
            <h2 className="section-title text-gradient-white" style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-10)' }}>
              The wider team
            </h2>
          </ScrollReveal>

          <div className="team-grid team-grid--sub">
            {other.map((member, i) => (
              <ScrollReveal key={member.id} delay={(i % 4) * 0.06}>
                <Card variant="default" spotlight className="member-card member-card--compact">
                  <div className="member-card__compact-inner">
                    <div
                      className="member-avatar member-avatar--sm"
                      style={{ background: COLORS[(i + executive.length) % COLORS.length] }}
                      aria-hidden="true"
                    >
                      {INITIALS(member.name)}
                    </div>
                    <div>
                      <h3 className="member-name member-name--sm">{member.name}</h3>
                      <p className="member-role-text">{member.role}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ──────────────────────────────────────── */}
      <section className="section" aria-label="Join the team call to action">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <SectionLabel>// Join Us</SectionLabel>
            <h2 className="section-title text-gradient-white" style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              Want to be on the committee?
            </h2>
            <p style={{ color: 'var(--fg-muted)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-lg)' }}>
              We recruit new committee members every academic year. Applications for 2026–27 are now open.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg" icon={<ArrowRight />}>Apply Now</Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
