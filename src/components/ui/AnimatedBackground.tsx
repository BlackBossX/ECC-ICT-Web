import { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty('--mouse-x', `${x}%`);
      el.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="animated-bg" ref={canvasRef} aria-hidden="true">
      {/* Base radial gradient */}
      <div className="animated-bg__base" />

      {/* Noise texture */}
      <div className="animated-bg__noise" />

      {/* Grid overlay */}
      <div className="animated-bg__grid" />

      {/* Ambient blobs */}
      <div className="animated-bg__blob animated-bg__blob--primary" />
      <div className="animated-bg__blob animated-bg__blob--secondary" />
      <div className="animated-bg__blob animated-bg__blob--tertiary" />
      <div className="animated-bg__blob animated-bg__blob--bottom" />

      {/* Global mouse spotlight */}
      <div className="animated-bg__spotlight" />
    </div>
  );
}
