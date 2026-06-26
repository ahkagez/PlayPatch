export const YT = {
  black: '#0f0f0f',
  raised: '#212121',
  card: 'rgba(255,255,255,0.05)',
  hover: 'rgba(255,255,255,0.1)',
  hoverSoft: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.1)',
  field: '#121212',
  text: '#f1f1f1',
  text2: '#aaaaaa',
  text3: '#717171',
} as const;

export const ACCENT = '#7f77dd';
export const ACCENT_SOFT = 'rgba(127,119,221,0.5)';
export const DANGER = '#f28b82';

export const YT_RED = '#FF0033';

export const FONT = "'Roboto', system-ui, Arial, sans-serif";
export const MONO = "'Roboto Mono', ui-monospace, monospace";

export const space = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 14,
  8: 16,
  10: 20,
  12: 24,
  14: 28,
} as const;

export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
  pill: 18,
  round: '50%',
} as const;

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 13,
  lg: 14,
  xl: 19,
  xxl: 20,
} as const;

export const fontWeight = { normal: 400, medium: 500, bold: 700 } as const;
export const lineHeight = { tight: 1, snug: 1.45, normal: 1.5 } as const;

export const shadow = {
  thumb: '0 1px 3px rgba(0,0,0,0.45)',
  ringInset: 'inset 0 0 0 1px rgba(255,255,255,0.16)',
} as const;

export const duration = {
  fast: '0.1s',
  base: '0.12s',
  slow: '0.15s',
  panel: '0.18s',
} as const;

export const transition = {
  bg: `background ${duration.base} ease`,
  width: `width ${duration.panel} ease`,
} as const;

export const size = {
  switchW: 36,
  switchH: 20,
  knob: 20,
  track: 14,
  iconBtn: 40,
  avatar: 30,
  swatch: 34,
  ball: 60,
  mastheadH: 56,
  guideOpen: 170,
  guideRail: 74,
  colorBox: 46,
  ctrlH: 36,
  sliderH: 18,
} as const;
