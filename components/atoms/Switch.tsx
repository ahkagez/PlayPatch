import { size, shadow, duration } from '@/lib/theme';

export function Switch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onClick}
      style={{
        position: 'relative',
        width: size.switchW,
        height: size.switchH,
        border: 'none',
        background: 'transparent',
        padding: 0,
        cursor: 'pointer',
        flex: 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: 1,
          width: size.switchW - 2,
          height: size.track,
          borderRadius: size.track / 2,
          background: on ? 'var(--foco-brand-soft)' : 'var(--yt-track)',
          transition: `background ${duration.slow}`,
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: on ? size.switchW - size.knob : 0,
          width: size.knob,
          height: size.knob,
          borderRadius: '50%',
          background: on ? 'var(--foco-brand)' : '#fafafa',
          boxShadow: shadow.thumb,
          transition: `left ${duration.slow}, background ${duration.slow}`,
        }}
      />
    </button>
  );
}
