import type { Settings } from '@/lib/types';
import { DEFAULT_SETTINGS } from '@/lib/defaults';
import { YT } from '@/lib/theme';
import { useT } from '../../i18n';
import type { PanelProps } from './types';
import { Text } from '../../atoms/Text';
import { Button, buttonBase } from '../../atoms/Button';
import { Toggle } from '../../molecules/Toggle';
import { ButtonRow } from '../../molecules/ButtonRow';

export function GeneralPanel({ s, save }: PanelProps) {
  const t = useT();
  return (
    <>
      <Text role="title">{t('general.title')}</Text>
      <Toggle
        label={t('general.enable')}
        hint={t('general.enableHint')}
        on={s.enabledOnYouTube}
        onChange={(v) => save({ ...s, enabledOnYouTube: v })}
      />
      <Text role="sub">{t('general.data')}</Text>
      <Text role="hint">{t('general.dataHint')}</Text>
      <ButtonRow>
        <Button onClick={() => exportJson(s)}>{t('general.export')}</Button>
        <ImportButton onImport={save} />
        <Button
          variant="danger"
          onClick={() => {
            if (confirm(t('general.resetConfirm'))) save({ ...structuredClone(DEFAULT_SETTINGS), language: s.language });
          }}
        >
          {t('general.reset')}
        </Button>
      </ButtonRow>
    </>
  );
}

function ImportButton({ onImport }: { onImport: (s: Settings) => void }) {
  const t = useT();
  return (
    <label className="foco-btn" style={{ ...buttonBase, color: YT.text, display: 'inline-flex', alignItems: 'center' }}>
      {t('general.import')}
      <input
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file) return;
          try {
            const parsed = JSON.parse(await file.text());
            onImport({ ...structuredClone(DEFAULT_SETTINGS), ...parsed });
          } catch {
            alert(t('general.invalidJson'));
          }
        }}
      />
    </label>
  );
}

function exportJson(s: Settings) {
  const blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'playpatch-ajustes.json';
  a.click();
  URL.revokeObjectURL(url);
}
