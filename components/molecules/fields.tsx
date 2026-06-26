import type { ComponentChildren } from 'preact';
import { YT, space } from '@/lib/theme';
import { Surface, Row } from '../atoms/layout';
import { Text } from '../atoms/Text';
import { RangeInput, SelectInput } from '../atoms/controls';

export function Field({
  header,
  children,
  hint,
}: {
  header: ComponentChildren;
  children?: ComponentChildren;
  hint?: string;
}) {
  return (
    <Surface style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      {header}
      {children}
      {hint && <Text role="caption">{hint}</Text>}
    </Surface>
  );
}

export function SliderField({
  label,
  value,
  min,
  max,
  step,
  format,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  hint?: string;
  onChange: (v: number) => void;
}) {
  const header = (
    <Row justify="space-between" align="baseline">
      <Text role="label">{label}</Text>
      <Text role="label" mono style={{ color: YT.text2 }}>
        {format ? format(value) : String(value)}
      </Text>
    </Row>
  );
  return (
    <Field header={header} hint={hint}>
      <RangeInput value={value} min={min} max={max} step={step} onInput={onChange} />
    </Field>
  );
}

export function SelectField({
  label,
  value,
  options,
  hint,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  hint?: string;
  onChange: (v: string) => void;
}) {
  const header = (
    <Row justify="space-between" gap={space[6]}>
      <Text role="label">{label}</Text>
      <SelectInput value={value} options={options} onChange={onChange} />
    </Row>
  );
  return <Field header={header} hint={hint} />;
}
