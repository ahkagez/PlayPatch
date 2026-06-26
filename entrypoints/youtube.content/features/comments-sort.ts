import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';

export class CommentsSortFeature implements YouTubeFeature {
  readonly id = 'commentsSort';
  private doneFor = '';

  apply(settings: Settings): void {
    if (!settings.player.newestComments) return;
    const videoId = new URLSearchParams(location.search).get('v') ?? '';
    if (!videoId || videoId === this.doneFor) return;
    const items = document.querySelectorAll<HTMLElement>(
      'ytd-comments-header-renderer yt-sort-filter-sub-menu-renderer a.yt-dropdown-menu',
    );
    if (items.length < 2) return;
    this.doneFor = videoId;
    const newest = items[1];
    if (newest.getAttribute('aria-selected') !== 'true') newest.click();
  }

  clear(): void {
    this.doneFor = '';
  }
}
