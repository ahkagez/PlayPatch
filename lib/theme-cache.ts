import { themeVars, type ThemeMode } from './theme';

const KEY = 'foco-theme';

export function writeThemeCache(mode: ThemeMode): void {
  try {
    localStorage.setItem(KEY, mode);
  } catch {}
}

export function primeThemeFromCache(): void {
  try {
    const mode = (localStorage.getItem(KEY) as ThemeMode) || 'system';
    const vars = themeVars(mode);
    const root = document.documentElement;
    root.style.colorScheme = vars.colorScheme;
    root.style.background = vars['--yt-bg'];
    if (document.body) {
      document.body.style.background = vars['--yt-bg'];
      document.body.style.color = vars['--yt-text'];
    }
  } catch {}
}
