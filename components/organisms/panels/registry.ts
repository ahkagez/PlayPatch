import type { ComponentType } from 'preact';
import type { IconName } from '../../atoms/Icon';
import type { PanelProps } from './types';
import { GeneralPanel } from './GeneralPanel';
import { FeedPanel } from './FeedPanel';
import { PlayerPanel } from './PlayerPanel';
import { OptimizationPanel } from './OptimizationPanel';
import { AppearancePanel } from './AppearancePanel';

export type { PanelProps };

export interface Category {
  id: string;
  label: string;
  icon: IconName;
  Panel: ComponentType<PanelProps>;
}

export const CATEGORIES: Category[] = [
  { id: 'general', label: 'cat.general', icon: 'general', Panel: GeneralPanel },
  { id: 'feed', label: 'cat.feed', icon: 'feed', Panel: FeedPanel },
  { id: 'speed', label: 'cat.player', icon: 'player', Panel: PlayerPanel },
  { id: 'optimize', label: 'cat.optimize', icon: 'optimize', Panel: OptimizationPanel },
  { id: 'appearance', label: 'cat.appearance', icon: 'appearance', Panel: AppearancePanel },
];
