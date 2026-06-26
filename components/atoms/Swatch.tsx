import { YT, size as sz, radius } from '@/lib/theme';

export function Swatch({
  color,
  selected,
  title,
  label,
  onClick,
}: {
  color: string;
  selected?: boolean;
  title?: string;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="foco-swatch"
      title={title}
      aria-label={label ?? title}
      aria-pressed={selected}
      onClick={onClick}
      style={{
        width: sz.swatch,
        height: sz.swatch,
        padding: 0,
        borderRadius: radius.round,
        border: 'none',
        cursor: 'pointer',
        background: color,
        boxShadow: selected ? `0 0 0 2px ${YT.black}, 0 0 0 4px #fff` : 'none',
      }}
    />
  );
}
