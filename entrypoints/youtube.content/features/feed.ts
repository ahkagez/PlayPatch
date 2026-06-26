import type { Settings } from '@/lib/types';
import type { YouTubeFeature } from '@/lib/feature';
import { ManagedStyle } from '@/lib/dom';

const HIDDEN = 'foco-hidden';
const COMPACT = 'foco-compact';

const CARD_SELECTOR = [
  'ytd-rich-item-renderer',
  'ytd-video-renderer',
  'ytd-grid-video-renderer',
  'ytd-compact-video-renderer',
  'ytd-playlist-video-renderer',
  'ytd-reel-item-renderer',
  'yt-lockup-view-model',
  'ytd-rich-shelf-renderer',
  'ytd-reel-shelf-renderer',
  'ytd-shelf-renderer',
  'ytm-shorts-lockup-view-model',
  'grid-shelf-view-model',
  'ytd-playlist-renderer',
  'ytd-radio-renderer',
  'ytd-rich-section-renderer',
].join(',');

const NAV_SELECTOR = [
  'ytd-guide-entry-renderer',
  'ytd-mini-guide-entry-renderer',
  "a[title='Shorts']",
  "a[aria-label='Shorts']",
].join(',');

const BASE_CSS = `
.${HIDDEN} { display: none !important; }
html.${COMPACT} ytd-rich-grid-renderer {
  --ytd-rich-grid-item-margin: 8px !important;
  --ytd-rich-grid-item-max-width: 700px !important;
  --ytd-rich-grid-items-per-row: 3 !important;
  --ytd-rich-grid-posts-per-row: 3 !important;
}
@media (min-width: 1000px) {
  html.${COMPACT} ytd-rich-grid-renderer {
    --ytd-rich-grid-items-per-row: 4 !important;
    --ytd-rich-grid-posts-per-row: 4 !important;
  }
}
@media (min-width: 1300px) {
  html.${COMPACT} ytd-rich-grid-renderer {
    --ytd-rich-grid-items-per-row: 5 !important;
    --ytd-rich-grid-posts-per-row: 5 !important;
  }
}
@media (min-width: 1700px) {
  html.${COMPACT} ytd-rich-grid-renderer {
    --ytd-rich-grid-items-per-row: 6 !important;
    --ytd-rich-grid-posts-per-row: 6 !important;
  }
}
@media (min-width: 2200px) {
  html.${COMPACT} ytd-rich-grid-renderer {
    --ytd-rich-grid-items-per-row: 7 !important;
    --ytd-rich-grid-posts-per-row: 7 !important;
  }
}`;

export class FeedFeature implements YouTubeFeature {
  readonly id = 'feed';
  private readonly base = new ManagedStyle('foco-feed-base');
  private sig = '';

  apply(settings: Settings): void {
    this.base.set(BASE_CSS);
    document.documentElement.classList.toggle(COMPACT, settings.feed.compactGrid);

    const sig = JSON.stringify(settings.feed);
    const reeval = sig !== this.sig;
    this.sig = sig;

    this.filterNav(settings.feed.hideShorts, reeval);
    this.filterCards(settings, reeval);
    this.filterSubscriptions(settings.feed.hideSubscriptions);
  }

  clear(): void {
    this.base.remove();
    this.sig = '';
    document.documentElement.classList.remove(COMPACT);
    document.querySelectorAll<HTMLElement>('.' + HIDDEN).forEach((n) => setHidden(n, false));
  }

  private filterNav(hideShorts: boolean, reeval: boolean): void {
    document.querySelectorAll<HTMLElement>(NAV_SELECTOR).forEach((node) => {
      if (!reeval && node.dataset.focoSeen === '1') return;
      node.dataset.focoSeen = '1';
      if (!hideShorts) {
        setHidden(node, false);
        return;
      }
      const label = `${node.getAttribute('title') ?? ''} ${node.getAttribute('aria-label') ?? ''} ${text(node)}`;
      const pointsToShorts =
        (node as HTMLAnchorElement).href?.includes('/shorts') ||
        Boolean(node.querySelector?.("a[href*='/shorts']"));
      setHidden(node, pointsToShorts || /\bshorts\b/i.test(label));
    });
  }

  private filterCards(s: Settings, reeval: boolean): void {
    document.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((node) => {
      if (!reeval && node.dataset.focoSeen === '1') return;

      const name = title(node);
      const hide =
        (s.feed.hideShorts && (hasShortsLink(node) || isShortsShelf(node))) ||
        (s.feed.hideWatched && hasWatchedProgress(node)) ||
        (s.feed.hideLive && isLive(node)) ||
        (s.feed.hideMixes && isListOrMix(node)) ||
        (s.feed.hideRadios && isRadio(node)) ||
        (s.feed.hideNews && isNews(node)) ||
        (s.feed.hideDiscover && isDiscover(node));

      setHidden(node, hide);
      if (hide || name) node.dataset.focoSeen = '1';
    });
  }

  private filterSubscriptions(hide: boolean): void {
    document.querySelectorAll<HTMLElement>('ytd-guide-section-renderer').forEach((sec) => {
      const channels = [...sec.querySelectorAll<HTMLElement>('ytd-guide-entry-renderer')].filter((e) =>
        isChannelLink(e.querySelector('a')?.getAttribute('href') ?? ''),
      );
      if (channels.length < 2) return;
      channels.forEach((e) => setHidden(e, hide));
      sec.querySelectorAll<HTMLElement>('ytd-guide-collapsible-entry-renderer').forEach((e) => setHidden(e, hide));
    });
  }
}

function text(node: Element | null | undefined): string {
  return ((node as HTMLElement)?.innerText || node?.textContent || '').replace(/\s+/g, ' ').trim();
}

function title(node: Element): string {
  const t = node.querySelector(
    '#video-title, #video-title-link, a#video-title, yt-formatted-string#video-title, h3 a, h3',
  );
  return text(t ?? node);
}

function hasShortsLink(node: Element): boolean {
  return Boolean(
    (node as HTMLElement).matches?.("a[href*='/shorts/'], a[href='/shorts']") ||
      node.querySelector?.("a[href*='/shorts/'], a[href='/shorts']"),
  );
}

function isShortsShelf(node: Element): boolean {
  const el = node as HTMLElement;
  if (el.matches?.('grid-shelf-view-model')) {
    return Boolean(node.querySelector('ytm-shorts-lockup-view-model')) || headerIsShorts(node);
  }
  if (el.matches?.('ytd-rich-shelf-renderer[is-shorts]')) return true;
  if (el.matches?.('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer, ytd-shelf-renderer')) {
    return headerIsShorts(node);
  }
  return false;
}

function headerIsShorts(node: Element): boolean {
  const headline = node.querySelector('#title, #title-text, h2, yt-formatted-string');
  return /\bshorts\b/i.test(text(headline ?? node));
}

function hasWatchedProgress(node: Element): boolean {
  return Boolean(
    node.querySelector(
      'ytd-thumbnail-overlay-resume-playback-renderer, ' +
        'yt-thumbnail-overlay-progress-bar-view-model, .ytThumbnailOverlayProgressBarHost',
    ),
  );
}

function isLive(node: Element): boolean {
  return Boolean(
    node.querySelector(
      '.ytBadgeShapeLive, .ytBadgeShapeThumbnailLive, ' +
        'ytd-thumbnail-overlay-time-status-renderer[overlay-style="LIVE"]',
    ),
  );
}

function isCollectionCard(node: Element): boolean {
  const OLD = 'ytd-playlist-renderer, ytd-radio-renderer, ytd-compact-radio-renderer, ytd-grid-playlist-renderer';
  return Boolean(
    (node as HTMLElement).matches?.(OLD) ||
      node.querySelector("a[href*='list='], a[href*='/playlist?']") ||
      node.querySelector('yt-collection-thumbnail-view-model') ||
      node.querySelector(OLD),
  );
}

function badgeText(node: Element): string {
  return text(
    node.querySelector(
      '.yt-collection-thumbnail-view-model, .ytThumbnailBadgeViewModelHost, .yt-thumbnail-badge-view-model, .badge-shape',
    ),
  );
}

function isRadio(node: Element): boolean {
  if (
    (node as HTMLElement).matches?.('ytd-radio-renderer, ytd-compact-radio-renderer') ||
    node.querySelector('ytd-radio-renderer, ytd-compact-radio-renderer')
  ) {
    return true;
  }
  return isCollectionCard(node) && /\b(radio|emisora)\b/i.test(badgeText(node));
}

function isListOrMix(node: Element): boolean {
  return isCollectionCard(node) && !isRadio(node);
}

function isNews(node: Element): boolean {
  if (!(node as HTMLElement).matches?.('ytd-rich-shelf-renderer, ytd-rich-section-renderer, ytd-shelf-renderer')) {
    return false;
  }
  const h = node.querySelector('#title, #title-text, h2, yt-formatted-string, .ytwShelfHeaderViewModelHost');
  return /\b(noticias?|news)\b/i.test(text(h ?? node));
}

function isDiscover(node: Element): boolean {
  if (!(node as HTMLElement).matches?.('ytd-rich-section-renderer, ytd-rich-shelf-renderer, ytd-shelf-renderer, grid-shelf-view-model')) {
    return false;
  }
  const h = node.querySelector('#title, #title-text, h2, h3, .ytwShelfHeaderViewModelHost, [role="heading"]');
  return /descubre más temas|discover more topics/i.test(h ? text(h) : text(node).slice(0, 80));
}

function isChannelLink(href: string): boolean {
  return /^\/(@|channel\/|c\/)/.test(href);
}

function setHidden(node: Element, hidden: boolean): void {
  node.classList.toggle(HIDDEN, hidden);
}
