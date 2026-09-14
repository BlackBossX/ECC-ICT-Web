import { type ReactNode } from 'react';
import './Badge.css';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'category';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span className={['badge', `badge--${variant}`, className].filter(Boolean).join(' ')}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
