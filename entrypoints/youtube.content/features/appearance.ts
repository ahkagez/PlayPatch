import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';
import { ManagedStyle, setHtmlFlag } from '@/lib/dom';
import { ACCENT_STYLE_ID, writeAccentCache } from '@/lib/appearance-cache';
import { buildAccentCss } from './accent-rules';
import { RasterLogoRecolorer } from './raster-logos';

export class AppearanceFeature implements YouTubeFeature {
  readonly id = 'appearance';
  private readonly style = new ManagedStyle(ACCENT_STYLE_ID);
  private readonly logos = new RasterLogoRecolorer();
  private cachedCss: string | null | undefined = undefined;

  apply(settings: Settings): void {
    const color = settings.appearance.accentColor;
    if (!color) {
      this.clear();
      return;
    }
    const css = buildAccentCss(color, settings.appearance.extras, settings.appearance.vibrantPlay);
    this.style.set(css);
    setHtmlFlag('data-foco-accent', true);
    this.logos.apply(color);
    this.cache(css);
  }

  clear(): void {
    this.style.remove();
    setHtmlFlag('data-foco-accent', false);
    this.logos.restore();
    this.cache(null);
  }

  private cache(css: string | null): void {
    if (css === this.cachedCss) return;
    this.cachedCss = css;
    writeAccentCache(css);
  }
}
