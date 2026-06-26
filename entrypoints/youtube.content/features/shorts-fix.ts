import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';
import { qs, qsa } from '@/lib/dom';

const OVERLAY = 'ytd-reel-player-overlay-renderer';
const CONTENT = 'yt-reel-player-overlay-view-model';
const EMPTY_MS = 2000;

export class ShortsLoadFixFeature implements YouTubeFeature {
  readonly id = 'shortsFix';
  private timer: ReturnType<typeof setInterval> | null = null;
  private emptySince = 0;
  private watchedKey = '';
  private nudgedKey = '';

  apply(settings: Settings): void {
    if (settings.feed.fixShortsLoad && location.pathname.startsWith('/shorts/')) this.start();
    else this.stop();
  }

  clear(): void {
    this.stop();
  }

  dispose(): void {
    this.stop();
  }

  private start(): void {
    if (this.timer == null) this.timer = setInterval(() => this.check(), 700);
  }

  private stop(): void {
    if (this.timer != null) clearInterval(this.timer);
    this.timer = null;
    this.emptySince = 0;
    this.watchedKey = '';
  }

  private check(): void {
    const key = location.pathname;
    if (!key.startsWith('/shorts/')) {
      this.stop();
      return;
    }
    if (key !== this.watchedKey) {
      this.watchedKey = key;
      this.emptySince = 0;
    }

    const reel = activeReel();
    const overlay = reel ? qs(OVERLAY, reel) : null;
    if (!overlay) {
      this.emptySince = 0;
      return;
    }

    const hydrated = !!qs(CONTENT, overlay) && (overlay as HTMLElement).innerText.trim().length > 0;
    if (hydrated) {
      this.emptySince = 0;
      return;
    }

    const now = Date.now();
    if (this.emptySince === 0) {
      this.emptySince = now;
      return;
    }
    if (now - this.emptySince >= EMPTY_MS && this.nudgedKey !== key) {
      this.nudgedKey = key;
      nudge();
    }
  }
}

function activeReel(): Element | null {
  const reels = qsa('ytd-reel-video-renderer');
  const mid = window.innerHeight / 2;
  return (
    reels.find((r) => {
      const b = r.getBoundingClientRect();
      return b.top <= mid && b.bottom >= mid;
    }) ??
    reels[0] ??
    null
  );
}

function nudge(): void {
  const cont = qs<HTMLElement>('#shorts-container');
  if (!cont) return;
  const top = cont.scrollTop;
  cont.scrollTop = top + cont.clientHeight;
  setTimeout(() => {
    cont.scrollTop = top;
  }, 350);
}
