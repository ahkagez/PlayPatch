import type { JSX, ComponentChildren } from 'preact';
import { YT, MONO, fontSize, fontWeight, lineHeight } from '@/lib/theme';

export type TextRole = 'title' | 'sub' | 'label' | 'body' | 'hint' | 'caption' | 'mono';

const ROLE: Record<TextRole, { tag: keyof JSX.IntrinsicElements; style: JSX.CSSProperties }> = {
  title: { tag: 'h1', style: { fontSize: fontSize.xxl, fontWeight: fontWeight.medium, margin: '0 0 16px', color: YT.text, letterSpacing: '-0.2px' } },
  sub: { tag: 'p', style: { fontSize: fontSize.md, fontWeight: fontWeight.medium, margin: '22px 0 8px', color: YT.text } },
  label: { tag: 'span', style: { fontSize: fontSize.md, color: YT.text } },
  body: { tag: 'span', style: { fontSize: fontSize.md, color: YT.text } },
  hint: { tag: 'p', style: { fontSize: fontSize.md, color: YT.text2, margin: '6px 0 0', lineHeight: lineHeight.normal } },
  caption: { tag: 'span', style: { fontSize: fontSize.xs, color: YT.text2, lineHeight: lineHeight.snug } },
  mono: { tag: 'span', style: { fontFamily: MONO, fontSize: fontSize.md, color: YT.text } },
};

export function Text({
  role = 'body',
  mono,
  children,
  style,
}: {
  role?: TextRole;
  mono?: boolean;
  children: ComponentChildren;
  style?: JSX.CSSProperties;
}) {
  const def = ROLE[role];
  const Tag = def.tag as 'span';
  return <Tag style={{ ...def.style, ...(mono ? { fontFamily: MONO } : {}), ...style }}>{children}</Tag>;
}
