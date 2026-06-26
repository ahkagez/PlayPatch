import type { JSX, ComponentChildren } from 'preact';
import { YT, radius, size as sz } from '@/lib/theme';

export function IconButton({
  onClick,
  label,
  title,
  shape = 'circle',
  size = sz.iconBtn,
  children,
  style,
}: {
  onClick?: () => void;
  label: string;
  title?: string;
  shape?: 'circle' | 'square';
  size?: number;
  children: ComponentChildren;
  style?: JSX.CSSProperties;
}) {
  return (
    <button
      className="foco-iconbtn"
      aria-label={label}
      title={title ?? label}
      onClick={onClick}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: size,
        height: size,
        border: 'none',
        borderRadius: shape === 'circle' ? radius.round : radius.sm,
        color: YT.text,
        cursor: 'pointer',
        flex: 'none',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
