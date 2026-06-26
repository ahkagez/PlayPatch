import { size as sz, space } from '@/lib/theme';
import { Swatch } from '../atoms/Swatch';

export interface SwatchOption {
  color: string;
  name: string;
}

export function SwatchGrid({
  swatches,
  selectedColor,
  onSelect,
}: {
  swatches: readonly SwatchOption[];
  selectedColor?: string | null;
  onSelect: (color: string) => void;
}) {
  const sel = selectedColor?.toLowerCase();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, ${sz.swatch}px)`, gap: space[6], marginTop: space[6] }}>
      {swatches.map((s) => (
        <Swatch
          key={s.color}
          color={s.color}
          title={s.name}
          label={s.name}
          selected={sel === s.color.toLowerCase()}
          onClick={() => onSelect(s.color)}
        />
      ))}
    </div>
  );
}
