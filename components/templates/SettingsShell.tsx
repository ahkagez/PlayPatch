import type { JSX, ComponentChildren } from 'preact';
import { YT, FONT, space, themeVars, type ThemeMode } from '@/lib/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Masthead } from '../organisms/Masthead';
import { Guide, type GuideItem } from '../organisms/Guide';

export function SettingsShell({
  brandColor,
  collapsed,
  onToggleCollapse,
  items,
  activeId,
  onSelect,
  theme,
  embedded,
  children,
}: {
  brandColor: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  items: readonly GuideItem[];
  activeId: string;
  onSelect: (id: string) => void;
  theme: ThemeMode;
  embedded?: boolean;
  children: ComponentChildren;
}) {
  return (
    <div style={{ ...shell, height: embedded ? '100%' : '100vh', ...themeVars(theme), '--foco-brand': brandColor, '--foco-brand-soft': `${brandColor}80` } as unknown as JSX.CSSProperties}>
      <GlobalStyles />
      <Masthead collapsed={collapsed} onToggle={onToggleCollapse} />
      <div style={body}>
        <Guide collapsed={collapsed} items={items} activeId={activeId} onSelect={onSelect} />
        <main style={mainStyle}>{children}</main>
      </div>
    </div>
  );
}

const shell: JSX.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  background: YT.black,
  color: YT.text,
  fontFamily: FONT,
};
const body: JSX.CSSProperties = { display: 'flex', flex: 1, minHeight: 0 };
const mainStyle: JSX.CSSProperties = { flex: 1, minWidth: 0, overflowY: 'auto', padding: `${space[10]}px ${space[14]}px` };
