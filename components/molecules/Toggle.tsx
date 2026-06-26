import { space } from '@/lib/theme';
import { Surface } from '../atoms/layout';
import { Switch } from '../atoms/Switch';
import { Text } from '../atoms/Text';

export function Toggle({
  label,
  hint,
  on,
  onChange,
}: {
  label: string;
  hint?: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Surface as="label" style={{ display: 'flex', alignItems: 'center', gap: space[6], cursor: 'pointer' }}>
      <span style={{ flex: 1, minWidth: 0 }}>
        <Text role="label">{label}</Text>
        {hint && (
          <Text role="caption" style={{ display: 'block', marginTop: 3 }}>
            {hint}
          </Text>
        )}
      </span>
      <Switch on={on} onClick={() => onChange(!on)} />
    </Surface>
  );
}
