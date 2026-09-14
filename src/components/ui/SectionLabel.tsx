import './SectionLabel.css';

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={['section-label', className].filter(Boolean).join(' ')}>
      <span className="section-label__line" />
      <span className="section-label__text">{children}</span>
      <span className="section-label__line" />
    </div>
  );
}
