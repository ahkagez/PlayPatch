import type { JSX } from 'preact';
import { ACCENT } from '@/lib/theme';

export type IconName = 'general' | 'feed' | 'speed' | 'player' | 'appearance';

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const p: JSX.SVGAttributes<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  switch (name) {
    case 'general':
      return (
        <svg {...p}>
          <line x1="4" y1="8" x2="20" y2="8" />
          <circle cx="9" cy="8" r="2" />
          <line x1="4" y1="16" x2="20" y2="16" />
          <circle cx="15" cy="16" r="2" />
        </svg>
      );
    case 'feed':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="7" height="7" rx="1" />
          <rect x="13" y="4" width="7" height="7" rx="1" />
          <rect x="4" y="13" width="7" height="7" rx="1" />
          <rect x="13" y="13" width="7" height="7" rx="1" />
        </svg>
      );
    case 'speed':
      return (
        <svg {...p}>
          <path d="M13 3 4 14h7l-1 7 9-11h-7z" />
        </svg>
      );
    case 'player':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 8.5 15.5 12 9.5 15.5 Z" />
        </svg>
      );
    case 'appearance':
      return (
        <svg {...p}>
          <path d="M12 3.5c0 0 5.5 5.4 5.5 9.4a5.5 5.5 0 0 1-11 0C6.5 8.9 12 3.5 12 3.5Z" />
          <path d="M9.4 13.6a2.6 2.6 0 0 0 2.6 2.4" />
        </svg>
      );
  }
}

export function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function PlayMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={(size * 28) / 20} height={size} viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" rx="5.5" fill={`var(--foco-brand, ${ACCENT})`} />
      <path d="M11 6 L20 10 L11 14 Z" fill="#fff" />
    </svg>
  );
}
