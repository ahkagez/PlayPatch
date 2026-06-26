import type { PerformanceSettings } from '@/lib/types';
import { space } from '@/lib/theme';
import { useT } from '../../i18n';
import type { PanelProps } from './types';
import { Text } from '../../atoms/Text';
import { Grid2 } from '../../atoms/layout';
import { Toggle } from '../../molecules/Toggle';

const KEYS: (keyof PerformanceSettings)[] = ['ambientOff', 'noHoverPreview', 'noAnimations', 'preconnect'];

export function OptimizationPanel({ s, save }: PanelProps) {
  const t = useT();
  const toggle = (key: keyof PerformanceSettings) =>
    save({ ...s, performance: { ...s.performance, [key]: !s.performance[key] } });
  return (
    <>
      <Text role="title">{t('optimize.title')}</Text>
      <div style={{ marginTop: space[6] }}>
        <Grid2>
          {KEYS.map((key) => (
            <Toggle
              key={key}
              label={t(`optimize.${key}.label`)}
              hint={t(`optimize.${key}.hint`)}
              on={s.performance[key]}
              onChange={() => toggle(key)}
            />
          ))}
        </Grid2>
      </div>
    </>
  );
}
