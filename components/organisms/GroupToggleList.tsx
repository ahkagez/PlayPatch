import { space } from '@/lib/theme';
import { ACCENT_GROUPS } from '@/lib/accent-groups';
import { useT } from '../i18n';
import { Grid2 } from '../atoms/layout';
import { Toggle } from '../molecules/Toggle';

export function GroupToggleList({
  extras,
  onChange,
  dimmed,
}: {
  extras: Record<string, boolean>;
  onChange: (id: string, v: boolean) => void;
  dimmed?: boolean;
}) {
  const t = useT();
  return (
    <div style={{ marginTop: space[6], opacity: dimmed ? 0.5 : 1 }}>
      <Grid2>
        {ACCENT_GROUPS.map((g) => (
          <Toggle
            key={g.id}
            label={t(`accent.${g.id}.label`)}
            hint={t(`accent.${g.id}.hint`)}
            on={!!extras[g.id]}
            onChange={(v) => onChange(g.id, v)}
          />
        ))}
      </Grid2>
    </div>
  );
}
