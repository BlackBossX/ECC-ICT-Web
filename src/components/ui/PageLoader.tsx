import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo');

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase('text'),  900);   // show tagline after logo lands
    const t2 = setTimeout(() => setPhase('exit'),  2200);  // start exit
    const t3 = setTimeout(() => onComplete(),      2900);  // unmount
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="page-loader"
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient cyan glow behind logo */}
          <div className="page-loader__glow" aria-hidden="true" />

          {/* Rotating orbit ring */}
          <div className="page-loader__orbit" aria-hidden="true">
            <div className="page-loader__orbit-ring" />
            <div className="page-loader__orbit-dot" />
          </div>

          {/* Logo */}
          <motion.div
            className="page-loader__logo-wrap"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/ICTnew.png"
              alt="ICT Society"
              className="page-loader__logo"
              draggable={false}
            />

            {/* Scan line sweep */}
            <div className="page-loader__scan" aria-hidden="true" />
          </motion.div>

          {/* Text block */}
          <motion.div
            className="page-loader__text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase === 'text' ? 1 : 0, y: phase === 'text' ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="page-loader__name">ICT Society</span>
            <span className="page-loader__tagline">Eheliyagoda National College</span>
          </motion.div>

          {/* Progress bar */}
          <div className="page-loader__bar-track" aria-hidden="true">
            <motion.div
              className="page-loader__bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
