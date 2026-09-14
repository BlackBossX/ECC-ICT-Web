import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import './PageLayout.css';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="page-layout">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="page-layout__main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
