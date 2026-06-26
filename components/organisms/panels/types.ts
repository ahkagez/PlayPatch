import type { Settings } from '@/lib/types';

export interface PanelProps {
  s: Settings;
  save: (next: Settings) => void;
}
