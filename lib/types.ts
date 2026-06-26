import type { Locale } from './i18n';

export interface ChannelPrefs {
  channelId: string;
  channelName: string;
  speed?: number;
  volume?: number;
  quality?: string;
  captions?: boolean;
  theater?: boolean;
  autoApply: boolean;
}

export interface FeedSettings {
  hideShorts: boolean;
  hideWatched: boolean;
  hideLive: boolean;
  hideMixes: boolean;
  hideRadios: boolean;
  hideNews: boolean;
  hideDiscover: boolean;
  hideSubscriptions: boolean;
  compactGrid: boolean;
  convertShorts: boolean;
  fixShortsLoad: boolean;
}

export interface AppearanceSettings {
  accentColor: string | null;
  extras: Record<string, boolean>;
  vibrantPlay: boolean;
}

export interface PlayerSettings {
  volumeBoost: number;
  speed: number;
  rememberSpeed: boolean;
  defaultQuality: string;
  progressThickness: number;
  wheelVolume: boolean;
  newestComments: boolean;
}

export interface Settings {
  enabledOnYouTube: boolean;
  feed: FeedSettings;
  appearance: AppearanceSettings;
  player: PlayerSettings;
  channels: Record<string, ChannelPrefs>;
  language: Locale;
}
