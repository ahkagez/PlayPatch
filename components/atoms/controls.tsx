import type { JSX } from 'preact';

export function RangeInput({
  value,
  min,
  max,
  step,
  onInput,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onInput: (v: number) => void;
}) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return (
    <input
      className="foco-range"
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      style={{ '--foco-fill': `${pct}%` } as unknown as JSX.CSSProperties}
      onInput={(e) => onInput(parseFloat((e.target as HTMLInputElement).value))}
    />
  );
}

export function SelectInput({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <select className="foco-select" value={value} onChange={(e) => onChange((e.target as HTMLSelectElement).value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
