import type { Settings } from './types';

export interface YouTubeFeature {
  readonly id: string;
  apply(settings: Settings): void;
  clear(): void;
  dispose?(): void;
}
