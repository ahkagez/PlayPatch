import { loadSettings, watchSettings, saveSettings } from '@/lib/storage';
import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';
import { FeedFeature } from './features/feed';
import { AppearanceFeature } from './features/appearance';
import { PlayerFeature } from './features/player';
import { ProgressBarFeature } from './features/progress-bar';
import { WheelVolumeFeature } from './features/wheel-volume';
import { CommentsSortFeature } from './features/comments-sort';
import { ShortsRedirectFeature } from './features/shorts-redirect';
import { ShortsLoadFixFeature } from './features/shorts-fix';
import { PerformanceFeature } from './features/performance';
import { Launcher } from './launcher';
import { primeAccentFromCache } from '@/lib/appearance-cache';
import { primeShortsRedirect } from '@/lib/shorts-cache';

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  runAt: 'document_start',

  async main(ctx) {
    primeAccentFromCache();
    primeShortsRedirect();

    const shortsRedirect = new ShortsRedirectFeature();
    const features: YouTubeFeature[] = [
      new FeedFeature(),
      new AppearanceFeature(),
      new ProgressBarFeature(),
      new PlayerFeature(saveSettings),
      new WheelVolumeFeature(),
      new CommentsSortFeature(),
      shortsRedirect,
      new ShortsLoadFixFeature(),
      new PerformanceFeature(),
    ];
    ctx.onInvalidated(() => features.forEach((f) => f.dispose?.()));

    const launcher = new Launcher();
    ctx.onInvalidated(() => launcher.dispose());

    let settings: Settings = await loadSettings();

    const applyAll = () => {
      if (settings.enabledOnYouTube) features.forEach((f) => f.apply(settings));
      else features.forEach((f) => f.clear());
    };

    applyAll();
    launcher.setVisible(settings.showLauncher);

    ctx.onInvalidated(
      watchSettings((next) => {
        settings = next;
        applyAll();
        launcher.setVisible(next.showLauncher);
      }),
    );

    ctx.addEventListener(document, 'visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      void loadSettings().then((next) => {
        settings = next;
        applyAll();
        launcher.setVisible(next.showLauncher);
      });
    });

    ctx.addEventListener(
      document,
      'click',
      (e: Event) => {
        if (!settings.enabledOnYouTube) return;
        shortsRedirect.interceptClick(e as MouseEvent);
      },
      { capture: true },
    );

    ctx.addEventListener(window, 'yt-navigate-start', (e: Event) => {
      if (!settings.enabledOnYouTube) return;
      const detail = (e as CustomEvent).detail as
        | { url?: string; endpoint?: { commandMetadata?: { webCommandMetadata?: { url?: string } } } }
        | undefined;
      const dest =
        detail?.url ?? detail?.endpoint?.commandMetadata?.webCommandMetadata?.url ?? '';
      shortsRedirect.redirect(dest);
    });

    ctx.addEventListener(window, 'yt-navigate-finish', () => {
      launcher.ensureButton();
      applyAll();
    });

    let scheduled = false;
    const observer = new MutationObserver(() => {
      launcher.ensureButton();
      if (!settings.enabledOnYouTube || scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        applyAll();
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    ctx.onInvalidated(() => observer.disconnect());
  },
});
