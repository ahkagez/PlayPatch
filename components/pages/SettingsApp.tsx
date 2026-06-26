import { useEffect, useState } from 'preact/hooks';
import { loadSettings, watchSettings, saveSettings, lastCategoryStore } from '@/lib/storage';
import { writeThemeCache } from '@/lib/theme-cache';
import type { Settings } from '@/lib/types';
import { YT_RED } from '@/lib/theme';
import { I18nProvider } from '../i18n';
import { SettingsShell } from '../templates/SettingsShell';
import { CATEGORIES } from '../organisms/panels/registry';

export function SettingsApp({ embedded = false }: { embedded?: boolean } = {}) {
  const [s, setS] = useState<Settings | null>(null);
  const [cat, setCat] = useState<string>(CATEGORIES[0].id);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    Promise.all([loadSettings(), lastCategoryStore.getValue()]).then(([loaded, lastCat]) => {
      setS(loaded);
      writeThemeCache(loaded.theme);
      if (lastCat && CATEGORIES.some((c) => c.id === lastCat)) setCat(lastCat);
    });
    const unwatch = watchSettings(setS);
    return () => unwatch();
  }, []);

  if (!s) return null;

  const brandColor = s.appearance.accentColor ?? YT_RED;

  const save = (next: Settings) => {
    setS(next);
    saveSettings(next);
    writeThemeCache(next.theme);
  };

  const selectCat = (id: string) => {
    setCat(id);
    lastCategoryStore.setValue(id);
  };

  const active = CATEGORIES.find((c) => c.id === cat) ?? CATEGORIES[0];
  const Panel = active.Panel;

  return (
    <I18nProvider locale={s.language}>
      <SettingsShell
        brandColor={brandColor}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        items={CATEGORIES}
        activeId={cat}
        onSelect={selectCat}
        theme={s.theme}
        embedded={embedded}
      >
        <Panel s={s} save={save} />
      </SettingsShell>
    </I18nProvider>
  );
}
