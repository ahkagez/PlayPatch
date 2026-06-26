export const ACCENT_STYLE_ID = 'foco-accent-style';
const CACHE_KEY = 'foco-accent-css';

export function primeAccentFromCache(): void {
  try {
    const css = localStorage.getItem(CACHE_KEY);
    if (!css) return;
    const el = document.createElement('style');
    el.id = ACCENT_STYLE_ID;
    el.textContent = css;
    document.documentElement.appendChild(el);
    document.documentElement.setAttribute('data-foco-accent', '');
  } catch {
  }
}

export function writeAccentCache(css: string | null): void {
  try {
    if (css) localStorage.setItem(CACHE_KEY, css);
    else localStorage.removeItem(CACHE_KEY);
  } catch {
  }
}
