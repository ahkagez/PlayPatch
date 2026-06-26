import { YT, space, size as sz, fontSize, fontWeight } from '@/lib/theme';
import { useT } from '../i18n';
import { IconButton } from '../atoms/IconButton';
import { MenuIcon } from '../atoms/Icon';

export function Masthead({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const t = useT();
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: space[4],
        height: sz.mastheadH,
        flex: 'none',
        padding: `0 ${space[8]}px`,
        background: YT.black,
        borderBottom: `1px solid ${YT.border}`,
      }}
    >
      <IconButton label={collapsed ? t('nav.showMenu') : t('nav.hideMenu')} title={t('nav.menu')} onClick={onToggle}>
        <MenuIcon />
      </IconButton>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingLeft: 4 }}>
        <span
          role="img"
          aria-label="PlayPatch"
          style={{
            width: 24,
            height: 24,
            display: 'block',
            background: YT.text,
            WebkitMask: 'url(/icon/48.png) center / contain no-repeat',
            mask: 'url(/icon/48.png) center / contain no-repeat',
          }}
        />
        <span style={{ fontSize: fontSize.xxl, fontWeight: fontWeight.medium, letterSpacing: '-1px', color: YT.text }}>PlayPatch</span>
      </div>
    </header>
  );
}
