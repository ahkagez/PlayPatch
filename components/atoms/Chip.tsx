import type { ComponentChildren } from 'preact';
import { YT, fontSize, radius } from '@/lib/theme';
import { useT } from '../i18n';

export function Chip({ children, onRemove }: { children: ComponentChildren; onRemove: () => void }) {
  const t = useT();
  return (
    <span
      className="foco-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: fontSize.md,
        color: YT.text,
        padding: '6px 10px 6px 12px',
        borderRadius: radius.sm,
      }}
    >
      {children}
      <button
        className="foco-chipx"
        aria-label={t('common.remove')}
        onClick={onRemove}
        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: YT.text2, fontSize: 15, padding: 0, lineHeight: 1 }}
      >
        ×
      </button>
    </span>
  );
}
