import { useRef, useState, type ReactNode } from 'react';
import './Card.css';

type CardVariant = 'default' | 'glass' | 'gradient';

interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
  onClick?: () => void;
}

export function Card({
  variant = 'default',
  children,
  className = '',
  spotlight = false,
  onClick,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={[
        'card',
        `card--${variant}`,
        onClick ? 'card--clickable' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Spotlight effect */}
      {spotlight && (
        <div
          className="card__spotlight"
          style={{
            background: `radial-gradient(300px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(94,106,210,0.15), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
          aria-hidden="true"
        />
      )}

      {/* Top inner glow line */}
      <div className="card__top-glow" aria-hidden="true" />

      <div className="card__content">{children}</div>
    </div>
  );
}
