import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { BLOG_POSTS } from '../data';
import './Blog.css';

const CATEGORIES = ['All', 'Engineering', 'Community', 'Events', 'Announcements'];

export function Blog() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');

  const featured = BLOG_POSTS.find(p => p.featured);
  const rest = BLOG_POSTS.filter(p => !p.featured).filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="blog-page">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="page-hero section" aria-label="Blog page hero">
        <div className="container page-hero__container">
          <ScrollReveal><SectionLabel>// Blog</SectionLabel></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="page-hero__headline text-gradient-white">
              Ideas, insights,<br />and project stories.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="page-hero__sub">
              Written by members, for members — and anyone curious about tech, community,
              and building things that matter.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container">
        {/* ── Featured post ──────────────────────────────── */}
        {featured && (
          <ScrollReveal className="blog-featured">
            <Link to={`/blog/${featured.id}`} className="blog-featured-link">
              <Card variant="gradient" spotlight className="blog-featured-card">
                <div className="blog-featured-inner">
                  <div className="blog-featured-meta">
                    <Badge variant="accent">{featured.category}</Badge>
                    <span className="blog-meta-text">Featured</span>
                  </div>
                  <h2 className="blog-featured-title text-gradient-white">{featured.title}</h2>
                  <p className="blog-featured-excerpt">{featured.excerpt}</p>
                  <div className="blog-featured-footer">
                    <div className="blog-author-row">
                      <span className="blog-author">{featured.author}</span>
                      <span className="blog-date">
                        {new Date(featured.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <span className="blog-read-time">{featured.readTime}</span>
                  </div>
                </div>
              </Card>
            </Link>
          </ScrollReveal>
        )}

        {/* ── Filters + grid ─────────────────────────────── */}
        <div className="blog-layout">
          {/* Main grid */}
          <div className="blog-main">
            {/* Category filter */}
            <div className="blog-cats" role="group" aria-label="Category filter">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={['blog-cat focus-ring', category === cat ? 'blog-cat--active' : ''].filter(Boolean).join(' ')}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="blog-grid">
              {rest.length === 0 && (
                <p style={{ color: 'var(--fg-muted)', gridColumn: 'span 2' }}>No posts match your search.</p>
              )}
              {rest.map((post, i) => (
                <ScrollReveal key={post.id} delay={(i % 2) * 0.08}>
                  <Link to={`/blog/${post.id}`} className="blog-card-link">
                    <Card variant="default" spotlight className="blog-card-page">
                      <div className="blog-card-page__inner">
                        <div className="blog-card-page__header">
                          <Badge variant="category">{post.category}</Badge>
                          <span className="blog-meta-text">{post.readTime}</span>
                        </div>
                        <h3 className="blog-card-page__title">{post.title}</h3>
                        <p className="blog-card-page__excerpt">{post.excerpt}</p>
                        <div className="blog-card-page__footer">
                          <span className="blog-author">{post.author}</span>
                          <span className="blog-date">
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

          {/* Sidebar */}
          <aside className="blog-sidebar" aria-label="Blog sidebar">
            {/* Search */}
            <Card variant="default" className="blog-sidebar-widget">
              <div className="blog-sidebar-widget__inner">
                <h3 className="blog-sidebar-title">Search</h3>
                <div className="blog-search">
                  <label htmlFor="blog-search" className="sr-only">Search posts</label>
                  <Search size={14} className="blog-search__icon" aria-hidden="true" />
                  <input
                    id="blog-search"
                    type="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search posts..."
                    className="blog-search__input"
                  />
                </div>
              </div>
            </Card>

            {/* Popular */}
            <Card variant="default" className="blog-sidebar-widget">
              <div className="blog-sidebar-widget__inner">
                <h3 className="blog-sidebar-title">Popular Posts</h3>
                <ul className="blog-popular">
                  {BLOG_POSTS.slice(0, 3).map(post => (
                    <li key={post.id}>
                      <Link to={`/blog/${post.id}`} className="blog-popular-link">
                        <span className="blog-popular-title">{post.title}</span>
                        <span className="blog-popular-meta">{post.readTime}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Write for us */}
            <Card variant="gradient" className="blog-sidebar-widget">
              <div className="blog-sidebar-widget__inner">
                <h3 className="blog-sidebar-title">Write for Us</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--fg-muted)', marginBottom: 'var(--space-4)', lineHeight: 'var(--leading-relaxed)' }}>
                  Have something to share? We'd love to publish your project write-up, tutorial, or opinion piece.
                </p>
                <Link to="/contact">
                  <Button variant="secondary" size="sm" fullWidth icon={<ArrowRight />}>Get in Touch</Button>
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
