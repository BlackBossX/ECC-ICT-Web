import { Link } from 'react-router-dom';
import { ArrowRight, Target, Heart, Globe, Code, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import './About.css';

const VALUES = [
  {
    icon: <Code size={24} />,
    title: 'Learn by Building',
    desc: 'Theory matters, but shipping real projects is where growth happens. Every workshop ends with something you can share.',
  },
  {
    icon: <Users size={24} />,
    title: 'Inclusive Community',
    desc: 'You don\'t need experience to join — just curiosity. Every skill level has a place in our society.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Passion Driven',
    desc: 'We\'re all here because we love technology. That energy is contagious and fuels everything we do.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Industry Connected',
    desc: 'Our partnerships with tech companies open doors to internships, mentorship, and real-world experience.',
  },
  {
    icon: <Target size={24} />,
    title: 'Purposeful Growth',
    desc: 'We design events that develop real skills — the kinds that show up in CVs and interviews.',
  },
];

const TIMELINE = [
  { year: '2020', title: 'Founded', desc: 'Started as a small study group of 12 CS students.' },
  { year: '2021', title: 'First Hackathon', desc: 'HackICT v1: 60 participants, 16 projects, 1 epic all-nighter.' },
  { year: '2022', title: 'Industry Partnerships', desc: 'First formal sponsorship. Began hosting industry speaker series.' },
  { year: '2023', title: '200 Members', desc: 'Crossed 200 active members. Launched the mentorship programme.' },
  { year: '2024', title: 'Scholarship Launch', desc: 'Awarded first £500 scholarships to three outstanding students.' },
  { year: '2025', title: 'Multi-Campus', desc: 'Expanded to two additional campus locations with local chapters.' },
  { year: '2026', title: 'Today', desc: 'Over 340 members, 12 corporate partners, and more events than ever.' },
];

export function About() {
  return (
    <div className="about-page">
      {/* ── Page Hero ──────────────────────────────────────── */}
      <section className="page-hero section" aria-label="About page hero">
        <div className="container page-hero__container">
          <ScrollReveal>
            <SectionLabel>// Our Story</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="page-hero__headline text-gradient-white">
              We exist to help<br />students thrive in tech.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="page-hero__sub">
              ICT Society was born from a simple idea: students learn better together. Six years
              later, we're the university's most active technology community — and we're just
              getting started.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider-gradient container" role="separator" />

      {/* ── Mission & Vision ──────────────────────────────── */}
      <section className="mission section" aria-label="Mission and vision">
        <div className="container mission__grid">
          <ScrollReveal className="mission__col">
            <Card variant="gradient" spotlight>
              <div className="mission__card-inner">
                <Target size={28} className="mission__icon" />
                <h2 className="mission__heading">Our Mission</h2>
                <p className="mission__text">
                  To bridge the gap between academic learning and industry practice by providing
                  students with hands-on experience, industry mentorship, and a peer community that
                  accelerates their growth.
                </p>
              </div>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="mission__col">
            <Card variant="default" spotlight>
              <div className="mission__card-inner">
                <Globe size={28} className="mission__icon" />
                <h2 className="mission__heading">Our Vision</h2>
                <p className="mission__text">
                  A world where every student, regardless of background or prior experience, has
                  access to the community, knowledge, and opportunities needed to build a meaningful
                  career in technology.
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Values Bento ──────────────────────────────────── */}
      <section className="values section" aria-label="Society values">
        <div className="container">
          <ScrollReveal>
            <div className="values__header">
              <SectionLabel>// What We Stand For</SectionLabel>
              <h2 className="section-title text-gradient-white">
                Five principles that guide everything
              </h2>
            </div>
          </ScrollReveal>

          <div className="values__bento">
            {VALUES.map((val, i) => (
              <ScrollReveal key={val.title} delay={i * 0.08} variant="scale-in" className={`values__bento-item values__bento-item--${i}`}>
                <Card variant={i === 0 ? 'gradient' : 'default'} spotlight>
                  <div className="values__card-inner">
                    <span className="values__icon">{val.icon}</span>
                    <h3 className="values__title">{val.title}</h3>
                    <p className="values__desc">{val.desc}</p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section className="timeline section" aria-label="ICT Society history timeline">
        <div className="container">
          <ScrollReveal>
            <div className="timeline__header">
              <SectionLabel>// Our Journey</SectionLabel>
              <h2 className="section-title text-gradient-white">How we got here</h2>
            </div>
          </ScrollReveal>

          <div className="timeline__track" role="list">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.06} variant="fade-up">
                <div className="timeline__item" role="listitem">
                  <div className="timeline__year-col">
                    <span className="timeline__year">{item.year}</span>
                  </div>
                  <div className="timeline__line-col" aria-hidden="true">
                    <div className="timeline__dot" />
                    {i < TIMELINE.length - 1 && <div className="timeline__connector" />}
                  </div>
                  <div className="timeline__content">
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__desc">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section" aria-label="Join call to action">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 className="section-title text-gradient-white" style={{ marginBottom: '1rem' }}>
              Be part of the next chapter.
            </h2>
            <p style={{ color: 'var(--fg-muted)', marginBottom: '2rem', fontSize: 'var(--text-lg)' }}>
              Applications for the 2026–27 committee are open.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={<ArrowRight />}>Join the Society</Button>
              </Link>
              <Link to="/team">
                <Button variant="secondary" size="lg">Meet the Team</Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
