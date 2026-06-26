import type { JSX, ComponentChildren } from 'preact';
import { YT, FONT, fontSize, fontWeight, radius, space } from '@/lib/theme';

export type ButtonVariant = 'solid' | 'ghost' | 'danger';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  solid: 'foco-btn',
  ghost: 'foco-btn foco-btn--ghost',
  danger: 'foco-btn foco-btn--danger',
};

export function Button({
  variant = 'solid',
  onClick,
  children,
  title,
  style,
}: {
  variant?: ButtonVariant;
  onClick?: () => void;
  children: ComponentChildren;
  title?: string;
  style?: JSX.CSSProperties;
}) {
  return (
    <button
      className={VARIANT_CLASS[variant]}
      title={title}
      onClick={onClick}
      style={{ ...buttonBase, ...(variant === 'danger' ? {} : { color: YT.text }), ...style }}
    >
      {children}
    </button>
  );
}

export const buttonBase: JSX.CSSProperties = {
  fontFamily: FONT,
  fontSize: fontSize.md,
  fontWeight: fontWeight.medium,
  border: 'none',
  borderRadius: radius.pill,
  padding: `${space[4]}px ${space[8]}px`,
  cursor: 'pointer',
};
