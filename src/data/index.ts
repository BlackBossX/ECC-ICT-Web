// ============================================================
// Shared mock data for ICT Society website
// ============================================================

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'workshop' | 'talk' | 'hackathon' | 'social' | 'competition';
  description: string;
  image?: string;
  upcoming: boolean;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  committee: 'executive' | 'technical' | 'events' | 'media' | 'alumni';
  bio: string;
  avatar?: string;
  socials?: { github?: string; linkedin?: string; twitter?: string };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
  image?: string;
}

// ── Events ────────────────────────────────────────────────── */
export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'AI & Machine Learning Workshop',
    date: '2026-10-12',
    time: '14:00 – 17:00',
    location: 'CS Building, Lab 3',
    category: 'workshop',
    description:
      'Hands-on intro to ML fundamentals with Python and scikit-learn. No prior ML experience needed.',
    upcoming: true,
    featured: true,
  },
  {
    id: 'e2',
    title: '48-Hour HackICT Hackathon',
    date: '2026-10-24',
    time: '09:00 – 09:00 (48hr)',
    location: 'Student Union Hall',
    category: 'hackathon',
    description:
      'Build something incredible in 48 hours. $2,000 in prizes across three tracks: AI, Web, and Mobile.',
    upcoming: true,
    featured: true,
  },
  {
    id: 'e3',
    title: 'Web Dev Fundamentals Series — Part 2',
    date: '2026-10-05',
    time: '16:00 – 18:00',
    location: 'Room 204, Engineering Block',
    category: 'workshop',
    description: 'Continuing our web series: React hooks, state management, and deploying to Vercel.',
    upcoming: true,
    featured: false,
  },
  {
    id: 'e4',
    title: 'Industry Speaker: Open Source at Scale',
    date: '2026-09-20',
    time: '18:00 – 19:30',
    location: 'Auditorium A',
    category: 'talk',
    description:
      'A senior engineer from a FAANG company shares lessons learned maintaining million-line codebases.',
    upcoming: false,
    featured: false,
  },
  {
    id: 'e5',
    title: 'Cybersecurity CTF Challenge',
    date: '2026-09-08',
    time: '10:00 – 22:00',
    location: 'Online + Campus Lab',
    category: 'competition',
    description: 'Capture-the-flag competition. Individual or team of two. Beginner and advanced tracks.',
    upcoming: false,
    featured: false,
  },
  {
    id: 'e6',
    title: 'Welcome Social & LAN Party',
    date: '2026-09-01',
    time: '17:00 – 21:00',
    location: 'Common Room, Block D',
    category: 'social',
    description: 'Kick off the new semester. Meet committee members, play games, and grab some pizza.',
    upcoming: false,
    featured: false,
  },
];

// ── Team ──────────────────────────────────────────────────── */
export const TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Aisha Rahman',
    role: 'President',
    committee: 'executive',
    bio: 'Final year CS student passionate about AI ethics and open-source. Former Google STEP intern.',
    socials: { github: '#', linkedin: '#', twitter: '#' },
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'Vice President',
    committee: 'executive',
    bio: 'Full-stack developer and hackathon enthusiast. Runs a weekly code review stream on Twitch.',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: 't3',
    name: 'Priya Nair',
    role: 'Technical Lead',
    committee: 'executive',
    bio: 'Systems programmer with a love for Rust and distributed systems. Part-time open-source contributor.',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: 't4',
    name: 'James Okafor',
    role: 'Events Director',
    committee: 'executive',
    bio: 'Organising events since 2024. Believes the best learning happens over food and code.',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 't5',
    name: 'Sofia Morales',
    role: 'Media & Design',
    committee: 'media',
    bio: 'UX designer by day, digital artist by night. Obsessed with making tech beautiful.',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: 't6',
    name: 'Liam Patel',
    role: 'Workshop Coordinator',
    committee: 'events',
    bio: 'Python wizard who has taught over 400 students through our workshop series.',
    socials: { github: '#' },
  },
  {
    id: 't7',
    name: 'Yuki Tanaka',
    role: 'Secretary',
    committee: 'executive',
    bio: 'Keeps everything running smoothly. Data science enthusiast and avid conference speaker.',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: 't8',
    name: 'Daniel Amara',
    role: 'Sponsorship Lead',
    committee: 'events',
    bio: 'Business-minded coder securing partnerships that fund our events and scholarships.',
    socials: { linkedin: '#' },
  },
];

// ── Blog posts ────────────────────────────────────────────── */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How We Built a Real-Time Collaborative Code Editor in 48 Hours',
    excerpt:
      'Our hackathon-winning team shares the architecture decisions, trade-offs, and lessons learned building with WebSockets and CRDTs under pressure.',
    author: 'Marcus Chen',
    date: '2026-09-10',
    category: 'Engineering',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 'b2',
    title: 'A Beginner\'s Guide to Contributing to Open Source',
    excerpt:
      'First contribution anxiety is real. Here\'s a step-by-step guide to finding the right project, reading the codebase, and making your first PR.',
    author: 'Priya Nair',
    date: '2026-09-03',
    category: 'Community',
    readTime: '6 min read',
  },
  {
    id: 'b3',
    title: 'Recap: AI & Ethics Panel with Industry Leaders',
    excerpt:
      'Five speakers from Google, DeepMind, and local startups discussed the responsible deployment of AI systems — and where students fit in.',
    author: 'Aisha Rahman',
    date: '2026-08-28',
    category: 'Events',
    readTime: '5 min read',
  },
  {
    id: 'b4',
    title: 'The ICT Society Scholarship: Apply Before October 15',
    excerpt:
      'We\'re awarding three £500 scholarships to outstanding students in technology. Here\'s who is eligible and how to apply.',
    author: 'Daniel Amara',
    date: '2026-08-21',
    category: 'Announcements',
    readTime: '3 min read',
  },
  {
    id: 'b5',
    title: 'Getting Started with Rust: A Perspective from a Python Dev',
    excerpt:
      'I spent six weeks switching from Python to Rust for a systems project. This is what surprised me, what frustrated me, and what I\'d do differently.',
    author: 'Priya Nair',
    date: '2026-08-14',
    category: 'Engineering',
    readTime: '10 min read',
  },
];

// ── Stats ─────────────────────────────────────────────────── */
export const STATS = [
  { value: 340, label: 'Active Members', suffix: '+' },
  { value: 48,  label: 'Events per Year', suffix: '' },
  { value: 6,   label: 'Years Running', suffix: '' },
  { value: 12,  label: 'Partner Companies', suffix: '+' },
];

// ── Category colours ──────────────────────────────────────── */
export const CATEGORY_COLORS: Record<string, string> = {
  workshop:    'accent',
  talk:        'default',
  hackathon:   'success',
  social:      'warning',
  competition: 'category',
};
