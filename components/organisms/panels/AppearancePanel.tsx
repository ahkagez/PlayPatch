import { useEffect, useState } from 'preact/hooks';
import { space, YT_RED } from '@/lib/theme';
import { useT } from '../../i18n';
import type { PanelProps } from './types';
import { Text } from '../../atoms/Text';
import { Toggle } from '../../molecules/Toggle';
import { SwatchGrid } from '../../molecules/SwatchGrid';
import { AccentPreview } from '../AccentPreview';
import { CustomColorControls } from '../CustomColorControls';
import { GroupToggleList } from '../GroupToggleList';

const PALETTE: { key: string; color: string }[] = [
  { key: 'color.cherryRed', color: '#E5322F' },
  { key: 'color.coral', color: '#F1592A' },
  { key: 'color.orange', color: '#F5821F' },
  { key: 'color.amber', color: '#F5A623' },
  { key: 'color.gold', color: '#E3B23C' },
  { key: 'color.yellow', color: '#E8C72E' },
  { key: 'color.lime', color: '#A3C644' },
  { key: 'color.chartreuse', color: '#7FBF3F' },
  { key: 'color.green', color: '#4CAF50' },
  { key: 'color.emerald', color: '#16A874' },
  { key: 'color.turquoise', color: '#1BC5BD' },
  { key: 'color.sky', color: '#38AEE8' },
  { key: 'color.blue', color: '#3B82F6' },
  { key: 'color.indigo', color: '#5560E0' },
  { key: 'color.violet', color: '#7F77DD' },
  { key: 'color.purple', color: '#9B5DE5' },
  { key: 'color.orchid', color: '#B14ACD' },
  { key: 'color.magenta', color: '#CC3FB0' },
  { key: 'color.fuchsia', color: '#E0408A' },
  { key: 'color.raspberry', color: '#D63864' },
];

const DEFAULT_RED = YT_RED;

function accentNameKey(value: string | null): string {
  if (!value) return 'appearance.defaultRed';
  const hit = PALETTE.find((p) => p.color.toLowerCase() === value.toLowerCase());
  return hit ? hit.key : 'appearance.custom';
}

export function AppearancePanel({ s, save }: PanelProps) {
  const t = useT();
  const current = s.appearance.accentColor;
  const swatch = current ?? DEFAULT_RED;
  const isDefault = !current;
  const [hex, setHex] = useState(swatch.toUpperCase());

  useEffect(() => setHex(swatch.toUpperCase()), [current]);

  const setAccent = (v: string | null) => save({ ...s, appearance: { ...s.appearance, accentColor: v } });

  const onSwatchInput = (value: string) => {
    setHex(value.toUpperCase());
    setAccent(value);
  };

  const onHexInput = (raw: string) => {
    const body = raw.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
    setHex('#' + body.toUpperCase());
    if (body.length === 6) setAccent('#' + body.toLowerCase());
  };

  const setExtra = (id: string, v: boolean) =>
    save({ ...s, appearance: { ...s.appearance, extras: { ...s.appearance.extras, [id]: v } } });

  const swatches = PALETTE.map((p) => ({ color: p.color, name: t(p.key) }));

  return (
    <>
      <Text role="title">{t('appearance.title')}</Text>

      <AccentPreview
        color={swatch}
        name={t(accentNameKey(current))}
        hex={isDefault ? `${DEFAULT_RED} · ${t('appearance.default')}` : swatch.toUpperCase()}
      />

      <Text role="sub">{t('appearance.palette')}</Text>
      <SwatchGrid swatches={swatches} selectedColor={isDefault ? null : swatch} onSelect={setAccent} />

      <Text role="sub">{t('appearance.custom')}</Text>
      <CustomColorControls
        hex={hex}
        colorValue={swatch.toLowerCase()}
        canReset={!!current}
        onSwatchInput={onSwatchInput}
        onHexInput={onHexInput}
        onReset={() => setAccent(null)}
      />

      <Text role="sub">{t('appearance.playButton')}</Text>
      <div style={{ marginTop: space[6], opacity: current ? 1 : 0.5 }}>
        <Toggle
          label={t('appearance.vibrant')}
          hint={t('appearance.vibrantHint')}
          on={s.appearance.vibrantPlay}
          onChange={(v) => save({ ...s, appearance: { ...s.appearance, vibrantPlay: v } })}
        />
      </div>

      <Text role="sub">{t('appearance.extended')}</Text>
      <GroupToggleList extras={s.appearance.extras} onChange={setExtra} dimmed={isDefault} />
    </>
  );
}
