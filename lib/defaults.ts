import type { Settings } from './types';
import { ACCENT_GROUPS } from './accent-groups';

export const DEFAULT_SETTINGS: Settings = {
  enabledOnYouTube: true,
  feed: {
    hideShorts: false,
    hideWatched: false,
    hideLive: false,
    hideMixes: false,
    hideRadios: false,
    hideNews: false,
    hideDiscover: false,
    hideSubscriptions: false,
    compactGrid: false,
    convertShorts: false,
    fixShortsLoad: true,
  },
  appearance: {
    accentColor: null,
    extras: Object.fromEntries(ACCENT_GROUPS.map((g) => [g.id, g.default])),
    vibrantPlay: false,
  },
  player: {
    volumeBoost: 1,
    speed: 1,
    rememberSpeed: false,
    defaultQuality: 'hd1080',
    progressThickness: 5,
    wheelVolume: true,
    newestComments: false,
  },
  channels: {},
  language: 'en',
};
