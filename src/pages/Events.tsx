import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { EVENTS, CATEGORY_COLORS, type Event } from '../data';
import './Events.css';

type FilterTab = 'all' | 'upcoming' | 'past';
type Category = 'all' | Event['category'];

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all',         label: 'All' },
  { value: 'workshop',    label: 'Workshop' },
  { value: 'hackathon',   label: 'Hackathon' },
  { value: 'talk',        label: 'Talk' },
  { value: 'competition', label: 'Competition' },
  { value: 'social',      label: 'Social' },
];

export function Events() {
  const [tab, setTab]           = useState<FilterTab>('all');
  const [category, setCategory] = useState<Category>('all');

  const filtered = EVENTS.filter(e => {
    if (tab === 'upcoming' && !e.upcoming) return false;
    if (tab === 'past' && e.upcoming) return false;
    if (category !== 'all' && e.category !== category) return false;
    return true;
  });

  return (
    <div className="events-page">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="page-hero section" aria-label="Events page hero">
        <div className="container page-hero__container">
          <ScrollReveal><SectionLabel>// Events & Workshops</SectionLabel></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="page-hero__headline text-gradient-white">
              Something for everyone,<br />every week.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="page-hero__sub">
              From beginner-friendly workshops to competitive hackathons and industry talks —
              we run 48 events per year to keep your skills sharp and your network growing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────── */}
      <div className="events-filters container">
        {/* Tab filter */}
        <div className="events-filters__tabs" role="tablist" aria-label="Event time filter">
          {(['all', 'upcoming', 'past'] as FilterTab[]).map(t => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={['events-tab focus-ring', tab === t ? 'events-tab--active' : ''].filter(Boolean).join(' ')}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="events-filters__cats" role="group" aria-label="Event category filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={['events-cat focus-ring', category === cat.value ? 'events-cat--active' : ''].filter(Boolean).join(' ')}
              onClick={() => setCategory(cat.value)}
              aria-pressed={category === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Events grid ───────────────────────────────────── */}
      <section className="events-grid-section section-sm" aria-label="Events list">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="events-empty">
              <p>No events match your filters.</p>
              <Button variant="ghost" onClick={() => { setTab('all'); setCategory('all'); }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="events-grid">
              {filtered.map((event, i) => (
                <ScrollReveal key={event.id} delay={(i % 3) * 0.08}>
                  <Card variant={event.featured ? 'gradient' : 'default'} spotlight className="event-detail-card">
                    <div className="event-detail-card__inner">
                      {event.featured && (
                        <div className="event-detail-card__featured-bar" aria-label="Featured event" />
                      )}
                      <div className="event-detail-card__header">
                        <Badge variant={CATEGORY_COLORS[event.category] as 'accent' | 'default' | 'success' | 'warning' | 'category'}>
                          {event.category}
                        </Badge>
                        {event.upcoming ? (
                          <Badge variant="success" dot>Upcoming</Badge>
                        ) : (
                          <Badge variant="default">Past</Badge>
                        )}
                      </div>
                      <h2 className="event-detail-card__title">{event.title}</h2>
                      <p className="event-detail-card__desc">{event.description}</p>
                      <div className="event-detail-card__meta">
                        <span className="event-detail-card__meta-item">
                          <Calendar size={13} />
                          {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="event-detail-card__meta-item">
                          <Clock size={13} />
                          {event.time}
                        </span>
                        <span className="event-detail-card__meta-item">
                          <MapPin size={13} />
                          {event.location}
                        </span>
                      </div>
                      {event.upcoming && (
                        <Link to="/contact">
                          <Button variant={event.featured ? 'primary' : 'secondary'} size="sm" icon={<ArrowRight />}>
                            Register
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
