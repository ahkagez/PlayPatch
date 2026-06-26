import { storage } from '#imports';
import type { Settings } from './types';
import { DEFAULT_SETTINGS } from './defaults';
import { detectLocale, isLocale } from './i18n';

export const settingsStore = storage.defineItem<Settings>('local:settings', {
  fallback: DEFAULT_SETTINGS,
  version: 1,
});

function normalize(raw: any): Settings {
  const d = DEFAULT_SETTINGS;
  const r = raw ?? {};
  return {
    enabledOnYouTube: r.enabledOnYouTube ?? d.enabledOnYouTube,
    feed: { ...d.feed, ...(r.feed ?? {}) },
    appearance: {
      ...d.appearance,
      ...(r.appearance ?? {}),
      extras: { ...d.appearance.extras, ...(r.appearance?.extras ?? {}) },
    },
    player: { ...d.player, ...(r.player ?? {}) },
    channels: r.channels ?? d.channels,
    language: isLocale(r.language) ? r.language : detectLocale(),
  };
}

export async function loadSettings(): Promise<Settings> {
  return normalize(await settingsStore.getValue());
}

export function watchSettings(cb: (s: Settings) => void): () => void {
  return settingsStore.watch((v) => cb(normalize(v)));
}

export function saveSettings(s: Settings): Promise<void> {
  return settingsStore.setValue(s);
}

export const lastCategoryStore = storage.defineItem<string | null>('local:lastCategory', {
  fallback: null,
});
