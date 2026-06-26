import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';
import { matchShortsId, writeShortsCache } from '@/lib/shorts-cache';

export class ShortsRedirectFeature implements YouTubeFeature {
  readonly id = 'shortsRedirect';
  private on = false;
  private cached: boolean | undefined = undefined;

  redirect(pathOrUrl: string): boolean {
    if (!this.on) return false;
    const id = matchShortsId(pathOrUrl);
    if (!id) return false;
    location.replace(`/watch?v=${id}`);
    return true;
  }

  interceptClick(e: MouseEvent): void {
    if (!this.on) return;
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const target = e.target as Element | null;
    const a = target?.closest?.("a[href*='/shorts/'], a[data-foco-shorts]") as HTMLAnchorElement | null;
    if (!a) return;
    const id = matchShortsId(a.dataset.focoShorts || a.getAttribute('href') || '');
    if (!id) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    location.assign(`/watch?v=${id}`);
  }

  apply(settings: Settings): void {
    this.on = settings.feed.convertShorts;
    this.cache(this.on);
    if (this.on) {
      this.rewriteLinks();
      this.redirect(location.pathname);
    } else {
      this.restoreLinks();
    }
  }

  clear(): void {
    this.on = false;
    this.cache(false);
    this.restoreLinks();
  }

  private rewriteLinks(): void {
    document.querySelectorAll<HTMLAnchorElement>("a[href*='/shorts/']").forEach((a) => {
      const href = a.getAttribute('href') ?? '';
      const id = matchShortsId(href);
      if (!id) return;
      if (!a.dataset.focoShorts) a.dataset.focoShorts = href;
      a.setAttribute('href', `/watch?v=${id}`);
    });
  }

  private restoreLinks(): void {
    document.querySelectorAll<HTMLAnchorElement>('a[data-foco-shorts]').forEach((a) => {
      const orig = a.dataset.focoShorts;
      if (orig) a.setAttribute('href', orig);
      delete a.dataset.focoShorts;
    });
  }

  private cache(on: boolean): void {
    if (on === this.cached) return;
    this.cached = on;
    writeShortsCache(on);
  }
}
