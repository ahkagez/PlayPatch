import { size as sz } from '@/lib/theme';

export function ColorBall({ color, size = sz.ball }: { color: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flex: 'none',
        borderRadius: '50%',
        background: color,
        border: '1px solid var(--yt-ring)',
        boxShadow: `0 0 0 5px ${color}26`,
      }}
    />
  );
}
