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
  private hooked: HTMLElement | null = null;

  apply(settings: Settings): void {
    this.enabled = settings.player.wheelVolume;
    if (!this.enabled) {
      this.detach();
      return;
    }
    const player = document.querySelector<HTMLElement>('#movie_player');
    if (!player || player === this.hooked) return;
    this.detach();
    player.addEventListener('wheel', this.onWheel, { passive: false });
    this.hooked = player;
  }

  clear(): void {
    this.enabled = false;
    this.detach();
  }

  dispose(): void {
    this.detach();
  }

  private detach(): void {
    this.hooked?.removeEventListener('wheel', this.onWheel);
    this.hooked = null;
  }

  private onWheel = (e: WheelEvent): void => {
    const mp = document.querySelector('#movie_player') as MoviePlayer | null;
    if (!this.enabled || typeof mp?.getVolume !== 'function' || typeof mp.setVolume !== 'function') return;
    e.preventDefault();
    const next = Math.max(0, Math.min(100, Math.round(mp.getVolume()) + (e.deltaY < 0 ? STEP : -STEP)));
    if (next > 0 && mp.isMuted?.()) mp.unMute?.();
    mp.setVolume(next);
  };
}
