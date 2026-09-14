import { useState, useId } from 'react';
import {
  Zap, LogIn, LayoutDashboard, Calendar, Users, FileText,
  BarChart2, Settings, LogOut, TrendingUp, Eye,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EVENTS, BLOG_POSTS, STATS } from '../data';
import './Admin.css';

const DEMO_EMAIL    = 'admin@ictsociety.ac.uk';
const DEMO_PASSWORD = 'demo1234';

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
  { icon: <Calendar size={16} />,        label: 'Events' },
  { icon: <Users size={16} />,           label: 'Members' },
  { icon: <FileText size={16} />,        label: 'Blog' },
  { icon: <BarChart2 size={16} />,       label: 'Analytics' },
  { icon: <Settings size={16} />,        label: 'Settings' },
];

export function Admin() {
  const uid = useId();
  const [loggedIn, setLoggedIn]       = useState(false);
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [error, setError]             = useState('');
  const [activeNav, setActiveNav]     = useState('Dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setLoggedIn(true);
      setError('');
    } else {
      setError(`Demo credentials: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
    }
  };

  if (!loggedIn) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <div className="admin-login__logo" aria-hidden="true">
            <Zap size={20} />
          </div>
          <h1 className="admin-login__title">Member Portal</h1>
          <p className="admin-login__sub">Sign in to access the ICT Society admin dashboard.</p>

          <Badge variant="default" className="admin-login__demo-badge">
            Demo — UI prototype only
          </Badge>

          <form onSubmit={handleLogin} className="admin-login__form">
            <div className="form-group">
              <label htmlFor={`${uid}-email`} className="form-label">Email</label>
              <input
                id={`${uid}-email`}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input focus-ring"
                placeholder="admin@ictsociety.ac.uk"
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`${uid}-pass`} className="form-label">Password</label>
              <input
                id={`${uid}-pass`}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input focus-ring"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="admin-login__error" role="alert">{error}</p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth icon={<LogIn size={16} />}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="admin-sidebar__logo">
          <div className="admin-sidebar__logo-mark" aria-hidden="true"><Zap size={16} /></div>
          <span className="admin-sidebar__logo-text">ICT Admin</span>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin sections">
          {NAV_ITEMS.map(({ icon, label }) => (
            <button
              key={label}
              className={['admin-nav-item focus-ring', activeNav === label ? 'admin-nav-item--active' : ''].filter(Boolean).join(' ')}
              onClick={() => setActiveNav(label)}
              aria-current={activeNav === label ? 'page' : undefined}
            >
              <span className="admin-nav-item__icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <button
          className="admin-sidebar__logout focus-ring"
          onClick={() => { setLoggedIn(false); setEmail(''); setPassword(''); }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-main" aria-label="Dashboard content">
        <header className="admin-header">
          <div>
            <h1 className="admin-header__title">{activeNav}</h1>
            <p className="admin-header__sub">Welcome back, Admin</p>
          </div>
          <Badge variant="accent" dot>Demo Mode</Badge>
        </header>

        {activeNav === 'Dashboard' && (
          <div className="admin-content">
            {/* Stats row */}
            <div className="admin-stats">
              {STATS.map((stat, i) => (
                <Card key={stat.label} variant={i === 0 ? 'gradient' : 'default'} className="admin-stat-card">
                  <div className="admin-stat-inner">
                    <span className="admin-stat-label">{stat.label}</span>
                    <span className="admin-stat-value">{stat.value}{stat.suffix}</span>
                    <div className="admin-stat-trend">
                      <TrendingUp size={12} />
                      <span>+{Math.floor(Math.random() * 15 + 2)}% this month</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent events */}
            <Card variant="default" className="admin-table-card">
              <div className="admin-table-header">
                <h2 className="admin-table-title">Recent Events</h2>
                <Button variant="secondary" size="sm">View All</Button>
              </div>
              <table className="admin-table" aria-label="Recent events">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {EVENTS.slice(0, 5).map(event => (
                    <tr key={event.id}>
                      <td className="admin-table__primary">{event.title}</td>
                      <td>{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                      <td><Badge variant="category">{event.category}</Badge></td>
                      <td>
                        <Badge variant={event.upcoming ? 'success' : 'default'} dot>
                          {event.upcoming ? 'Upcoming' : 'Past'}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="ghost" size="sm" icon={<Eye size={12} />} iconPosition="left">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Recent posts */}
            <Card variant="default" className="admin-table-card">
              <div className="admin-table-header">
                <h2 className="admin-table-title">Recent Blog Posts</h2>
                <Button variant="secondary" size="sm">View All</Button>
              </div>
              <table className="admin-table" aria-label="Recent blog posts">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {BLOG_POSTS.map(post => (
                    <tr key={post.id}>
                      <td className="admin-table__primary">{post.title}</td>
                      <td>{post.author}</td>
                      <td><Badge variant="category">{post.category}</Badge></td>
                      <td>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {activeNav !== 'Dashboard' && (
          <div className="admin-placeholder" aria-label={`${activeNav} section placeholder`}>
            <div className="admin-placeholder__icon" aria-hidden="true">
              {NAV_ITEMS.find(n => n.label === activeNav)?.icon}
            </div>
            <h2>{activeNav}</h2>
            <p>This section is a UI prototype. Real data management coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
