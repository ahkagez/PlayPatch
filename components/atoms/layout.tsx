import type { JSX, ComponentChildren } from 'preact';
import { radius, space } from '@/lib/theme';

export function Surface({
  as = 'div',
  interactive = true,
  children,
  style,
}: {
  as?: 'div' | 'label';
  interactive?: boolean;
  children: ComponentChildren;
  style?: JSX.CSSProperties;
}) {
  const Tag = as;
  return (
    <Tag
      className={interactive ? 'foco-row' : undefined}
      style={{ borderRadius: radius.lg, padding: `${space[6]}px ${space[7]}px`, ...style }}
    >
      {children}
    </Tag>
  );
}

export function Stack({
  gap = space[4],
  children,
  style,
}: {
  gap?: number;
  children: ComponentChildren;
  style?: JSX.CSSProperties;
}) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>{children}</div>;
}

export function Row({
  gap = space[4],
  align = 'center',
  justify,
  wrap,
  children,
  style,
}: {
  gap?: number;
  align?: JSX.CSSProperties['alignItems'];
  justify?: JSX.CSSProperties['justifyContent'];
  wrap?: boolean;
  children: ComponentChildren;
  style?: JSX.CSSProperties;
}) {
  return (
    <div style={{ display: 'flex', alignItems: align, justifyContent: justify, flexWrap: wrap ? 'wrap' : undefined, gap, ...style }}>
      {children}
    </div>
  );
}

export function Grid2({ gap = space[4], children }: { gap?: number; children: ComponentChildren }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap }}>{children}</div>;
}

export function Divider() {
  return <div role="separator" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />;
}
