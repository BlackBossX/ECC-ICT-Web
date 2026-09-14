import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Users, Calendar, Zap, Star } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { EVENTS, STATS, BLOG_POSTS, CATEGORY_COLORS } from '../data';
import './Home.css';

// ── Animated stat counter ────────────────────────────────── */
function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 60;
    const inc = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Typewriter effect ────────────────────────────────────── */
const TYPEWRITER_WORDS = ['Engineers', 'Innovators', 'Builders', 'Leaders'];

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) { setDisplayed(TYPEWRITER_WORDS[0]); return; }
    const word = TYPEWRITER_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1800);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 50);
      } else {
        setWordIndex(i => (i + 1) % TYPEWRITER_WORDS.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex, shouldReduce]);

  return (
    <span className="hero__typewriter">
      <span className="text-gradient-accent">{displayed}</span>
      <span className="hero__cursor" aria-hidden="true">|</span>
    </span>
  );
}

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY       = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const shouldReduce = useReducedMotion();

  const upcomingEvents = EVENTS.filter(e => e.upcoming).slice(0, 3);
  const latestPosts    = BLOG_POSTS.slice(0, 3);

  return (
    <div className="home">
      {/* ────────────────── HERO ────────────────────────────── */}
      <section className="hero" ref={heroRef} aria-label="Hero">
        <motion.div
          className="hero__content"
          style={shouldReduce ? {} : { opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="accent" dot className="hero__badge">
              Applications Open for 2026–27
            </Badge>
          </motion.div>

          <motion.h1
            className="hero__headline"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gradient-white">Where Students Become</span>
            <br />
            <Typewriter />
          </motion.h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            ICT Society is the university's premier technology community. We host workshops,
            hackathons, and industry talks — giving every student the tools and network to thrive
            in the digital world.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/contact">
              <Button variant="primary" size="lg" icon={<ArrowRight />}>
                Join the Society
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="secondary" size="lg">
                Browse Events
              </Button>
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="hero__scroll-cue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            aria-hidden="true"
          >
            <ChevronDown size={20} className="hero__scroll-icon" />
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────────── STATS ───────────────────────────── */}
      <section className="stats section-sm" aria-label="Society statistics">
        <div className="container">
          <div className="divider-gradient" role="separator" />
          <div className="stats__grid">
            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08} variant="fade-up">
                <div className="stats__item">
                  <span className="stats__value">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="stats__label">{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="divider-gradient" role="separator" />
        </div>
      </section>

      {/* ────────────────── ABOUT TEASER ────────────────────── */}
      <section className="about-teaser section" aria-label="About ICT Society">
        <div className="container">
          <div className="about-teaser__grid">
            {/* Text */}
            <div className="about-teaser__text">
              <ScrollReveal>
                <SectionLabel>// About Us</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="about-teaser__headline text-gradient-white">
                  Built by students,<br />for students.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="about-teaser__body">
                  Founded in 2020, ICT Society has grown from a small study group into the
                  university's most active technology community — with over 340 members, 48 events
                  per year, and partnerships with leading tech companies.
                </p>
                <p className="about-teaser__body">
                  Whether you're a first-year curious about coding or a postgrad with years of
                  experience, there's a place for you here. We believe in learning by doing —
                  through projects, competitions, and connecting with people who share your passion.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <Link to="/about">
                  <Button variant="secondary" icon={<ArrowRight />}>
                    Our Story
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            {/* Bento mini-grid */}
            <div className="about-teaser__bento" aria-hidden="true">
              <ScrollReveal delay={0.15} variant="scale-in" className="bento-card bento-card--a">
                <Card variant="gradient" spotlight>
                  <div className="bento-inner">
                    <Users size={28} className="bento-icon" />
                    <span className="bento-num">340+</span>
                    <span className="bento-desc">Members</span>
                  </div>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={0.22} variant="scale-in" className="bento-card bento-card--b">
                <Card variant="default" spotlight>
                  <div className="bento-inner">
                    <Calendar size={28} className="bento-icon" />
                    <span className="bento-num">48</span>
                    <span className="bento-desc">Events/Year</span>
                  </div>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={0.28} variant="scale-in" className="bento-card bento-card--c">
                <Card variant="glass" spotlight>
                  <div className="bento-inner">
                    <Zap size={28} className="bento-icon" />
                    <span className="bento-num">12+</span>
                    <span className="bento-desc">Partners</span>
                  </div>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={0.34} variant="scale-in" className="bento-card bento-card--d">
                <Card variant="default" spotlight>
                  <div className="bento-inner">
                    <Star size={28} className="bento-icon" />
                    <span className="bento-num">6yrs</span>
                    <span className="bento-desc">Running</span>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── FEATURED EVENTS ─────────────────── */}
      <section className="events-preview section" aria-label="Upcoming events preview">
        <div className="container">
          <div className="divider-gradient" role="separator" style={{ marginBottom: '4rem' }} />
          <ScrollReveal>
            <div className="section-header">
              <div>
                <SectionLabel>// Events</SectionLabel>
                <h2 className="section-title text-gradient-white">What's coming up</h2>
              </div>
              <Link to="/events">
                <Button variant="ghost" size="sm" icon={<ArrowRight />}>
                  All events
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="events-preview__grid">
            {upcomingEvents.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.1}>
                <Card variant="default" spotlight className="event-card">
                  <div className="event-card__inner">
                    <div className="event-card__header">
                      <Badge variant={CATEGORY_COLORS[event.category] as 'accent' | 'default' | 'success' | 'warning' | 'category'}>
                        {event.category}
                      </Badge>
                      <span className="event-card__date">
                        {new Date(event.date).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="event-card__title">{event.title}</h3>
                    <p className="event-card__desc">{event.description}</p>
                    <div className="event-card__footer">
                      <span className="event-card__meta">
                        <Calendar size={13} />
                        {event.time}
                      </span>
                      <span className="event-card__meta">
                        {event.location}
                      </span>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── LATEST BLOG ─────────────────────── */}
      <section className="blog-preview section" aria-label="Latest blog posts">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div>
                <SectionLabel>// Blog</SectionLabel>
                <h2 className="section-title text-gradient-white">From the community</h2>
              </div>
              <Link to="/blog">
                <Button variant="ghost" size="sm" icon={<ArrowRight />}>
                  All posts
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="blog-preview__grid">
            {latestPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.08}>
                <Link to={`/blog/${post.id}`} className="blog-card-link">
                  <Card variant="default" spotlight className="blog-card">
                    <div className="blog-card__inner">
                      <div className="blog-card__header">
                        <Badge variant="category">{post.category}</Badge>
                        <span className="blog-card__read-time">{post.readTime}</span>
                      </div>
                      <h3 className="blog-card__title">{post.title}</h3>
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                      <div className="blog-card__footer">
                        <span className="blog-card__author">{post.author}</span>
                        <span className="blog-card__date">
                          {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── JOIN CTA ─────────────────────────── */}
      <section className="cta-section section" aria-label="Call to action — join the society">
        <div className="container">
          <ScrollReveal variant="scale-in">
            <Card variant="gradient" spotlight className="cta-card">
              <div className="cta-card__inner">
                <div className="cta-card__glow" aria-hidden="true" />
                <SectionLabel>// Join Us</SectionLabel>
                <h2 className="cta-card__headline text-gradient-white">
                  Ready to be part<br />of something bigger?
                </h2>
                <p className="cta-card__body">
                  Membership is free and open to all university students. Get access to workshops,
                  networking events, industry connections, and a community that helps you grow.
                </p>
                <div className="cta-card__actions">
                  <Link to="/contact">
                    <Button variant="primary" size="lg" icon={<ArrowRight />}>
                      Become a Member
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button variant="secondary" size="lg">
                      See Upcoming Events
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
