import { Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { Home }    from './pages/Home';
import { About }   from './pages/About';
import { Events }  from './pages/Events';
import { Team }    from './pages/Team';
import { Blog }    from './pages/Blog';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Admin }   from './pages/Admin';

function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>// 404</span>
      <h1 style={{ fontSize: 'var(--text-5xl)', fontWeight: 600, letterSpacing: '-0.03em', background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Page not found
      </h1>
      <p style={{ color: 'var(--fg-muted)', maxWidth: '360px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" style={{ marginTop: '1rem', color: 'var(--accent)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)' }}>← Back to home</a>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Admin is outside PageLayout — has its own full-screen layout */}
      <Route path="/admin" element={<Admin />} />

      {/* All other routes share the PageLayout (Navbar + AnimatedBackground + Footer) */}
      <Route element={<PageLayout><Routes>{/* placeholder */}</Routes></PageLayout>}>
        {/* This pattern requires nesting — use wrapper below */}
      </Route>

      {/* Flat routes with PageLayout wrapper */}
      <Route path="/" element={<PageLayout><Home /></PageLayout>} />
      <Route path="/about" element={<PageLayout><About /></PageLayout>} />
      <Route path="/events" element={<PageLayout><Events /></PageLayout>} />
      <Route path="/team" element={<PageLayout><Team /></PageLayout>} />
      <Route path="/blog" element={<PageLayout><Blog /></PageLayout>} />
      <Route path="/gallery" element={<PageLayout><Gallery /></PageLayout>} />
      <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
      <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
    </Routes>
  );
}
