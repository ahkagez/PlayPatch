import type { Settings } from '@/lib/types';
import { space } from '@/lib/theme';
import { useT } from '../../i18n';
import type { PanelProps } from './types';
import { Text } from '../../atoms/Text';
import { Stack } from '../../atoms/layout';
import { Toggle } from '../../molecules/Toggle';
import { SliderField, SelectField } from '../../molecules/fields';

export function PlayerPanel({ s, save }: PanelProps) {
  const t = useT();
  const setPlayer = (patch: Partial<Settings['player']>) => save({ ...s, player: { ...s.player, ...patch } });
  const qualityOptions = [
    { value: 'auto', label: t('player.qualityAuto') },
    { value: 'hd2160', label: '2160p (4K)' },
    { value: 'hd1440', label: '1440p' },
    { value: 'hd1080', label: '1080p' },
    { value: 'hd720', label: '720p' },
    { value: 'large', label: '480p' },
    { value: 'medium', label: '360p' },
  ];
  return (
    <>
      <Text role="title">{t('player.title')}</Text>
      <Stack gap={space[4]}>
        <SliderField
          label={t('player.volume')}
          value={s.player.volumeBoost}
          min={1}
          max={5}
          step={0.05}
          format={(v) => `${Math.round(v * 100)}%`}
          hint={t('player.volumeHint')}
          onChange={(v) => setPlayer({ volumeBoost: v })}
        />
        <SliderField
          label={t('player.speed')}
          value={s.player.speed}
          min={0.25}
          max={4}
          step={0.25}
          format={(v) => `${v}×`}
          hint={t('player.speedHint')}
          onChange={(v) => setPlayer({ speed: v })}
        />
        <Toggle
          label={t('player.rememberSpeed')}
          hint={t('player.rememberSpeedHint')}
          on={s.player.rememberSpeed}
          onChange={(v) => setPlayer({ rememberSpeed: v })}
        />
        <SelectField
          label={t('player.quality')}
          value={s.player.defaultQuality}
          options={qualityOptions}
          hint={t('player.qualityHint')}
          onChange={(v) => setPlayer({ defaultQuality: v })}
        />
        <SliderField
          label={t('player.thickness')}
          value={s.player.progressThickness ?? 5}
          min={5}
          max={16}
          step={1}
          format={(v) => (v <= 5 ? t('player.thicknessStandard') : `${v} px`)}
          hint={t('player.thicknessHint')}
          onChange={(v) => setPlayer({ progressThickness: v })}
        />
        <Toggle
          label={t('player.wheelVolume')}
          hint={t('player.wheelVolumeHint')}
          on={s.player.wheelVolume}
          onChange={(v) => setPlayer({ wheelVolume: v })}
        />
        <Toggle
          label={t('player.newestComments')}
          hint={t('player.newestCommentsHint')}
          on={s.player.newestComments}
          onChange={(v) => setPlayer({ newestComments: v })}
        />
      </Stack>
    </>
  );
}
