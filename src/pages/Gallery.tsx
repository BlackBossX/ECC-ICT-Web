import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import './Gallery.css';

type GalleryCategory = 'all' | 'hackathons' | 'workshops' | 'social' | 'talks';

const GALLERY_ITEMS = [
  { id: 'g1', cat: 'hackathons', title: 'HackICT 2025',      color: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #5e6ad2)' },
  { id: 'g2', cat: 'workshops',  title: 'ML Workshop',        color: 'linear-gradient(135deg, #0d1b2a, #1b4332, #34d399)' },
  { id: 'g3', cat: 'social',     title: 'Welcome Social',     color: 'linear-gradient(135deg, #1a0533, #6b21a8, #a855f7)' },
  { id: 'g4', cat: 'talks',      title: 'Industry Speaker',   color: 'linear-gradient(135deg, #0c1445, #1e3a8a, #3b82f6)' },
  { id: 'g5', cat: 'hackathons', title: 'Team Formation',     color: 'linear-gradient(135deg, #1c0a00, #7c2d12, #f97316)' },
  { id: 'g6', cat: 'workshops',  title: 'Web Dev Series',     color: 'linear-gradient(135deg, #052e16, #166534, #4ade80)' },
  { id: 'g7', cat: 'social',     title: 'LAN Party',          color: 'linear-gradient(135deg, #0f172a, #1e1b4b, #818cf8)' },
  { id: 'g8', cat: 'hackathons', title: 'Awards Ceremony',    color: 'linear-gradient(135deg, #1c1917, #292524, #d6d3d1)' },
  { id: 'g9', cat: 'talks',      title: 'AI Ethics Panel',    color: 'linear-gradient(135deg, #0a0a1a, #312e81, #6366f1)' },
];

const CATS: { value: GalleryCategory; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'hackathons', label: 'Hackathons' },
  { value: 'workshops',  label: 'Workshops' },
  { value: 'social',     label: 'Social' },
  { value: 'talks',      label: 'Talks' },
];

export function Gallery() {
  const [category, setCategory]   = useState<GalleryCategory>('all');
  const [selected, setSelected]   = useState<string | null>(null);

  const filtered = GALLERY_ITEMS.filter(i => category === 'all' || i.cat === category);
  const selectedItem = GALLERY_ITEMS.find(i => i.id === selected);

  return (
    <div className="gallery-page">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="page-hero section" aria-label="Gallery page hero">
        <div className="container page-hero__container">
          <ScrollReveal><SectionLabel>// Gallery</SectionLabel></ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="page-hero__headline text-gradient-white">
              Moments from<br />the community.
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <div className="container">
        {/* ── Filter ────────────────────────────────────────── */}
        <div className="gallery-filters" role="group" aria-label="Gallery category filter">
          {CATS.map(cat => (
            <button
              key={cat.value}
              className={['gallery-cat focus-ring', category === cat.value ? 'gallery-cat--active' : ''].filter(Boolean).join(' ')}
              onClick={() => setCategory(cat.value)}
              aria-pressed={category === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Masonry grid ──────────────────────────────────── */}
        <div className="gallery-masonry" role="list">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`gallery-item gallery-item--${(i % 3) + 1}`}
                role="listitem"
              >
                <button
                  className="gallery-item__btn focus-ring"
                  onClick={() => setSelected(item.id)}
                  aria-label={`View ${item.title}`}
                >
                  <div className="gallery-item__img" style={{ background: item.color }} />
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__title">{item.title}</span>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {selected && selectedItem && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="lightbox__inner"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="lightbox__img" style={{ background: selectedItem.color }} />
              <div className="lightbox__caption">{selectedItem.title}</div>
              <button
                className="lightbox__close focus-ring"
                onClick={() => setSelected(null)}
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
