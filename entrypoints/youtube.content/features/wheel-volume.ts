import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';

interface MoviePlayer extends HTMLElement {
  getVolume?: () => number;
  setVolume?: (v: number) => void;
  isMuted?: () => boolean;
  unMute?: () => void;
}

const STEP = 5;

export class WheelVolumeFeature implements YouTubeFeature {
  readonly id = 'wheelVolume';
  private enabled = false;
  private installed = false;

  apply(settings: Settings): void {
    this.enabled = settings.player.wheelVolume;
    this.install();
  }

  clear(): void {
    this.enabled = false;
    this.uninstall();
  }

  dispose(): void {
    this.uninstall();
  }

  private install(): void {
    if (this.installed) return;
    document.addEventListener('wheel', this.onWheel, { capture: true, passive: false });
    this.installed = true;
  }

  private uninstall(): void {
    if (!this.installed) return;
    document.removeEventListener('wheel', this.onWheel, { capture: true } as EventListenerOptions);
    this.installed = false;
  }

  private onWheel = (e: WheelEvent): void => {
    const player = (e.target as Element | null)?.closest?.('#movie_player') as MoviePlayer | null;
    if (!player) return;
    if (!this.enabled) {
      e.stopImmediatePropagation();
      return;
    }
    if (typeof player.getVolume !== 'function' || typeof player.setVolume !== 'function') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const next = Math.max(0, Math.min(100, Math.round(player.getVolume()) + (e.deltaY < 0 ? STEP : -STEP)));
    if (next > 0 && player.isMuted?.()) player.unMute?.();
    player.setVolume(next);
  };
}
