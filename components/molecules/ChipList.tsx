import { useState } from 'preact/hooks';
import { YT, fontSize, fontWeight, space } from '@/lib/theme';
import { Row } from '../atoms/layout';
import { Text } from '../atoms/Text';
import { Chip } from '../atoms/Chip';
import { TextInput } from '../atoms/inputs';

export function ChipList({
  label,
  placeholder,
  items,
  onChange,
}: {
  label: string;
  placeholder: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (v && !items.includes(v)) onChange([...items, v]);
    setDraft('');
  };
  return (
    <div style={{ marginBottom: 18 }}>
      <Text role="label" style={{ display: 'block', fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: YT.text2, margin: '0 0 8px' }}>
        {label}
      </Text>
      <Row wrap gap={space[3]}>
        {items.map((it) => (
          <Chip key={it} onRemove={() => onChange(items.filter((x) => x !== it))}>
            {it}
          </Chip>
        ))}
        <TextInput value={draft} placeholder={placeholder} onInput={setDraft} onKeyDown={(e) => e.key === 'Enter' && add()} />
      </Row>
    </div>
  );
}
