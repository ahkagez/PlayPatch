const CACHE_KEY = 'foco-convert-shorts';

export function matchShortsId(pathOrUrl: string): string | null {
  return pathOrUrl.match(/\/shorts\/([^/?#]+)/)?.[1] ?? null;
}

export function primeShortsRedirect(): void {
  try {
    if (localStorage.getItem(CACHE_KEY) !== '1') return;
    const id = matchShortsId(location.pathname);
    if (id) location.replace(`/watch?v=${id}`);
  } catch {}
}

export function writeShortsCache(on: boolean): void {
  try {
    if (on) localStorage.setItem(CACHE_KEY, '1');
    else localStorage.removeItem(CACHE_KEY);
  } catch {}
}
