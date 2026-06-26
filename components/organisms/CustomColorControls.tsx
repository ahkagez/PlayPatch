import { YT, radius, space, size as sz } from '@/lib/theme';
import { useT } from '../i18n';
import { Row } from '../atoms/layout';
import { ColorInput, HexInput } from '../atoms/inputs';
import { Button } from '../atoms/Button';

export function CustomColorControls({
  hex,
  colorValue,
  canReset,
  onSwatchInput,
  onHexInput,
  onReset,
}: {
  hex: string;
  colorValue: string;
  canReset: boolean;
  onSwatchInput: (v: string) => void;
  onHexInput: (v: string) => void;
  onReset: () => void;
}) {
  const t = useT();
  const supportsEyedropper = typeof (window as { EyeDropper?: unknown }).EyeDropper === 'function';
  const pickColor = async () => {
    try {
      const ResEyeDropper = (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
      const res = await new ResEyeDropper().open();
      if (res?.sRGBHex) onSwatchInput(res.sRGBHex);
    } catch {
    }
  };
  return (
    <Row gap={space[5]} style={{ marginTop: space[5] }}>
      {supportsEyedropper && (
        <button
          className="foco-btn foco-btn--ghost"
          onClick={pickColor}
          aria-label={t('color.eyedropper')}
          title={t('color.eyedropperHint')}
          style={{ display: 'grid', placeItems: 'center', width: sz.ctrlH, height: sz.ctrlH, flex: 'none', borderRadius: radius.sm, color: YT.text, cursor: 'pointer' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m11 7 6 6" />
            <path d="M4 20l4-1 9.5-9.5a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
          </svg>
        </button>
      )}
      <ColorInput value={colorValue} onInput={onSwatchInput} label={t('color.pick')} />
      <HexInput value={hex} onInput={onHexInput} label={t('color.hex')} />
      {canReset && (
        <Button variant="ghost" onClick={onReset}>
          {t('color.resetRed')}
        </Button>
      )}
    </Row>
  );
}
