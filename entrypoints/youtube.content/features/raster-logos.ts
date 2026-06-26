const SELECTOR = 'ytmusic-logo img, img[src*="on_platform_logo"]';

const RED_RE = /#(?:f03|ff0033|ff0000)\b/gi;

export class RasterLogoRecolorer {
  private readonly cache = new Map<string, string>();

  apply(color: string): void {
    document.querySelectorAll<HTMLImageElement>(SELECTOR).forEach((img) => {
      if (img.dataset.focoAccent === color && img.src.startsWith('data:')) return;

      const original = img.dataset.focoOriginalSrc ?? img.getAttribute('src') ?? '';
      if (!original || original.startsWith('data:')) return;
      img.dataset.focoOriginalSrc = original;

      const url = new URL(original, location.href).href;
      void this.fetchSvg(url).then((svg) => {
        if (!svg) return;
        const recolored = svg.replace(RED_RE, color);
        img.src = 'data:image/svg+xml,' + encodeURIComponent(recolored);
        img.dataset.focoAccent = color;
      });
    });
  }

  restore(): void {
    document.querySelectorAll<HTMLImageElement>('img[data-foco-original-src]').forEach((img) => {
      if (img.dataset.focoOriginalSrc) img.src = img.dataset.focoOriginalSrc;
      delete img.dataset.focoOriginalSrc;
      delete img.dataset.focoAccent;
    });
  }

  private async fetchSvg(url: string): Promise<string | null> {
    const cached = this.cache.get(url);
    if (cached !== undefined) return cached;
    try {
      const text = await fetch(url).then((r) => r.text());
      const svg = text.includes('<svg') ? text : null;
      if (svg) this.cache.set(url, svg);
      return svg;
    } catch {
      return null;
    }
  }
}
