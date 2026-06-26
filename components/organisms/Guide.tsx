import type { JSX } from 'preact';
import { browser } from '#imports';
import { YT, FONT, space, size as sz, fontSize, fontWeight, radius, transition } from '@/lib/theme';
import { useT } from '../i18n';
import { Icon, type IconName } from '../atoms/Icon';

export interface GuideItem {
  id: string;
  label: string;
  icon: IconName;
}

export function Guide({
  collapsed,
  items,
  activeId,
  onSelect,
}: {
  collapsed: boolean;
  items: readonly GuideItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const t = useT();
  const version = browser.runtime.getManifest().version;
  return (
    <nav style={{ ...guide, width: collapsed ? sz.guideRail : sz.guideOpen }}>
      <div style={{ flex: 1 }}>
        {items.map((c) => {
          const on = activeId === c.id;
          const label = t(c.label);
          return (
            <button
              key={c.id}
              className="foco-guide-item"
              data-active={on}
              onClick={() => onSelect(c.id)}
              title={label}
              style={collapsed ? railItem : rowItem}
            >
              <Icon name={c.icon} size={24} />
              {!collapsed && (
                <span style={{ fontSize: fontSize.lg, fontWeight: on ? fontWeight.medium : fontWeight.normal }}>{label}</span>
              )}
            </button>
          );
        })}
      </div>
      {!collapsed && <p style={guideFoot}>{t('footer.local')} · v{version}</p>}
    </nav>
  );
}

const guide: JSX.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 'none',
  padding: `${space[6]}px ${space[4]}px`,
  borderRight: '1px solid var(--yt-divider)',
  overflowY: 'auto',
  transition: transition.width,
};
const rowItem: JSX.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: space[8],
  width: '100%',
  height: 40,
  padding: `0 ${space[6]}px`,
  marginBottom: 2,
  border: 'none',
  borderRadius: radius.md,
  color: YT.text,
  cursor: 'pointer',
  textAlign: 'left',
  fontFamily: FONT,
};
const railItem: JSX.CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  height: 44,
  marginBottom: 4,
  border: 'none',
  borderRadius: radius.md,
  color: YT.text,
  cursor: 'pointer',
  fontFamily: FONT,
};
const guideFoot: JSX.CSSProperties = { margin: '8px 0 4px', padding: `0 ${space[6]}px`, fontSize: fontSize.xs, color: YT.text3 };
