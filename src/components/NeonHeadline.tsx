import React from 'react';

interface NeonHeadlineProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
}

const NEON_PALETTE = [
  'neon-glow-emerald',
  'neon-glow-gold',
  'neon-glow-cyan',
  'neon-glow-rose',
  'neon-glow-purple',
  'neon-glow-amber',
  'neon-glow-teal',
  'neon-glow-lime',
  'neon-glow-blue'
];

export const NeonHeadline: React.FC<NeonHeadlineProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  size = 'lg'
}) => {
  const words = text.trim().split(/\s+/);

  const sizeClasses = {
    sm: 'text-lg md:text-xl font-bold tracking-wide',
    md: 'text-xl md:text-2xl font-extrabold tracking-wide',
    lg: 'text-2xl md:text-4xl font-black tracking-normal leading-tight',
    xl: 'text-3xl md:text-5xl font-black tracking-tight leading-tight',
    '2xl': 'text-4xl md:text-6xl font-black tracking-tight leading-none',
    hero: 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight'
  }[size];

  return (
    <Component className={`font-heading select-none ${sizeClasses} ${className}`}>
      {words.map((word, index) => {
        const neonColorClass = NEON_PALETTE[index % NEON_PALETTE.length];
        return (
          <span
            key={`${word}-${index}`}
            className={`inline-block mr-[0.3em] transition-transform duration-200 hover:scale-[1.03] ${neonColorClass}`}
          >
            {word}
          </span>
        );
      })}
    </Component>
  );
};
