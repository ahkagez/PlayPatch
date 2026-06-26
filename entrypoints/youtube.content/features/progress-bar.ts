import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';
import { ManagedStyle, setHtmlFlag } from '@/lib/dom';

const STANDARD = 5;
const DOT = 13;

export class ProgressBarFeature implements YouTubeFeature {
  readonly id = 'progressBar';
  private readonly style = new ManagedStyle('foco-progress-style');

  apply(settings: Settings): void {
    const h = Math.round(settings.player.progressThickness ?? STANDARD);
    if (h <= STANDARD) {
      this.clear();
      return;
    }
    const S = 'html[data-foco-progress]';
    const offset = ((h - STANDARD) / 2).toFixed(1);
    const dot = Math.round(DOT + (h - STANDARD) * 0.6);
    const dotMargin = ((dot - DOT) / 2).toFixed(1);
    this.style.set(
      [
        `${S} .ytp-progress-bar-container,`,
        `${S} .ytp-progress-bar,`,
        `${S} .ytp-chapter-hover-container { height: ${h}px !important; }`,
        `${S} .ytp-scrubber-container { margin-top: ${offset}px !important; }`,
        `${S} .ytp-scrubber-button { width: ${dot}px !important; height: ${dot}px !important; margin: -${dotMargin}px !important; }`,
      ].join('\n'),
    );
    setHtmlFlag('data-foco-progress', true);
  }

  clear(): void {
    this.style.remove();
    setHtmlFlag('data-foco-progress', false);
  }
}
