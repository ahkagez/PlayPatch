import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';
import { ManagedStyle } from '@/lib/dom';

const NOANIM = 'data-foco-noanim';
const PC_PREFIX = 'foco-pc-';
const PRECONNECT_HOSTS = ['https://i.ytimg.com', 'https://yt3.ggpht.com', 'https://fonts.gstatic.com'];

const AMBIENT_CSS = 'ytd-watch-flexy #cinematics { display: none !important; }';

const HOVER_CSS = [
  'ytd-video-preview, #video-preview { display: none !important; }',
  'ytd-moving-thumbnail-renderer { display: none !important; }',
].join('\n');

const NOANIM_CSS = [
  `html[${NOANIM}] *, html[${NOANIM}] *::before, html[${NOANIM}] *::after {`,
  '  animation-duration: 0s !important;',
  '  animation-delay: 0s !important;',
  '  transition-duration: 0s !important;',
  '  transition-delay: 0s !important;',
  '  scroll-behavior: auto !important;',
  '}',
].join('\n');

export class PerformanceFeature implements YouTubeFeature {
  readonly id = 'performance';
  private readonly style = new ManagedStyle('foco-perf');

  apply(settings: Settings): void {
    const p = settings.performance;
    const css = [p.ambientOff ? AMBIENT_CSS : '', p.noHoverPreview ? HOVER_CSS : '', NOANIM_CSS]
      .filter(Boolean)
      .join('\n');
    this.style.set(css);
    document.documentElement.toggleAttribute(NOANIM, p.noAnimations);
    if (p.preconnect) this.addPreconnect();
    else this.removePreconnect();
  }

  clear(): void {
    this.style.remove();
    document.documentElement.removeAttribute(NOANIM);
    this.removePreconnect();
  }

  private addPreconnect(): void {
    const head = document.head || document.documentElement;
    for (const host of PRECONNECT_HOSTS) {
      const id = PC_PREFIX + host.replace(/[^a-z]/gi, '');
      if (document.getElementById(id)) continue;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'preconnect';
      link.href = host;
      if (host.includes('fonts.gstatic')) link.crossOrigin = 'anonymous';
      head.appendChild(link);
    }
  }

  private removePreconnect(): void {
    document.querySelectorAll(`link[id^="${PC_PREFIX}"]`).forEach((l) => l.remove());
  }
}
