import { defineUnlistedScript } from 'wxt/utils/define-unlisted-script';

const QUALITY_ATTR = 'data-pp-quality';
const QUALITY_ORDER = ['highres', 'hd2880', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny'];

function bestQualityAtMost(desired: string, available: string[]): string | null {
  const di = QUALITY_ORDER.indexOf(desired);
  if (di === -1) return null;
  let best: string | null = null;
  let bestIdx = Infinity;
  let lowest: string | null = null;
  let lowestIdx = -1;
  for (const q of available) {
    const i = QUALITY_ORDER.indexOf(q);
    if (i === -1) continue;
    if (i >= di && i < bestIdx) {
      bestIdx = i;
      best = q;
    }
    if (i > lowestIdx) {
      lowestIdx = i;
      lowest = q;
    }
  }
  return best ?? lowest;
}

interface MoviePlayer extends HTMLElement {
  getAvailableQualityLevels?: () => string[];
  setPlaybackQualityRange?: (min: string, max?: string) => void;
  setPlaybackQuality?: (quality: string) => void;
}

export default defineUnlistedScript(() => {
  let videoKey = '';
  let done = false;

  const apply = (): void => {
    const desired = document.documentElement.getAttribute(QUALITY_ATTR) ?? 'auto';
    const player = document.getElementById('movie_player') as MoviePlayer | null;
    if (!player?.getAvailableQualityLevels || !player.setPlaybackQualityRange) return;

    const videoId = new URLSearchParams(location.search).get('v') ?? location.pathname;
    if (videoId !== videoKey) {
      videoKey = videoId;
      done = false;
    }
    if (done) return;
    if (desired === 'auto') {
      done = true;
      return;
    }

    const levels = player.getAvailableQualityLevels() ?? [];
    const real = levels.filter((q) => q !== 'auto');
    if (real.length === 0) return;
    const best = bestQualityAtMost(desired, real);
    if (!best) return;

    try {
      player.setPlaybackQuality?.(best);
      player.setPlaybackQualityRange(best, best);
    } catch {}

    const video = document.querySelector<HTMLVideoElement>('video.html5-main-video');
    if (video && !video.paused && !video.ended && video.readyState >= 3) done = true;
  };

  const reset = (): void => {
    done = false;
    apply();
  };

  new MutationObserver(reset).observe(document.documentElement, {
    attributes: true,
    attributeFilter: [QUALITY_ATTR],
  });

  window.addEventListener('yt-navigate-finish', reset);

  const onVideoEvent = (e: Event): void => {
    if ((e.target as HTMLElement | null)?.tagName === 'VIDEO') apply();
  };
  document.addEventListener('loadeddata', onVideoEvent, true);
  document.addEventListener('canplay', onVideoEvent, true);
  document.addEventListener('playing', onVideoEvent, true);

  setInterval(apply, 1000);
});
