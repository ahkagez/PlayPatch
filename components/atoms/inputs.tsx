import type { JSX } from 'preact';
import { YT, FONT, MONO, fontSize, radius, size as sz } from '@/lib/theme';

const inputBase: JSX.CSSProperties = {
  fontFamily: FONT,
  background: YT.field,
  color: YT.text,
  border: `1px solid ${YT.border}`,
  borderRadius: radius.sm,
  padding: '7px 11px',
  fontSize: fontSize.md,
  outline: 'none',
};

export function TextInput({
  value,
  onInput,
  placeholder,
  onKeyDown,
  mono,
  width,
  minWidth = 140,
  maxLength,
  ariaLabel,
  style,
}: {
  value: string;
  onInput: (v: string) => void;
  placeholder?: string;
  onKeyDown?: JSX.KeyboardEventHandler<HTMLInputElement>;
  mono?: boolean;
  width?: number;
  minWidth?: number;
  maxLength?: number;
  ariaLabel?: string;
  style?: JSX.CSSProperties;
}) {
  return (
    <input
      className="foco-input"
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      aria-label={ariaLabel}
      spellcheck={false}
      onInput={(e) => onInput((e.target as HTMLInputElement).value)}
      onKeyDown={onKeyDown}
      style={{ ...inputBase, ...(mono ? { fontFamily: MONO } : {}), ...(width != null ? { width, minWidth: 0 } : { minWidth }), ...style }}
    />
  );
}

export function HexInput({ value, onInput, label }: { value: string; onInput: (v: string) => void; label: string }) {
  return (
    <TextInput
      value={value}
      onInput={onInput}
      mono
      width={92}
      maxLength={7}
      ariaLabel={label}
      style={{ textAlign: 'center', letterSpacing: 0.5, height: sz.ctrlH, padding: '0 10px' }}
    />
  );
}

export function ColorInput({ value, onInput, label }: { value: string; onInput: (v: string) => void; label: string }) {
  return (
    <input
      type="color"
      className="foco-colorbox"
      value={value}
      aria-label={label}
      onInput={(e) => onInput((e.target as HTMLInputElement).value)}
      style={{ width: sz.colorBox, height: sz.ctrlH, flex: 'none' }}
    />
  );
}
