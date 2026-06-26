export const YT = {
  black: 'var(--yt-bg)',
  raised: 'var(--yt-raised)',
  card: 'var(--yt-card)',
  hover: 'var(--yt-hover)',
  hoverSoft: 'var(--yt-hover-soft)',
  border: 'var(--yt-border)',
  field: 'var(--yt-field)',
  text: 'var(--yt-text)',
  text2: 'var(--yt-text2)',
  text3: 'var(--yt-text3)',
} as const;

export const ACCENT = '#7f77dd';
export const ACCENT_SOFT = 'rgba(127,119,221,0.5)';
export const DANGER = 'var(--yt-danger)';

export const YT_RED = '#FF0033';

export type ThemeMode = 'system' | 'dark' | 'light';

const PALETTES: Record<'dark' | 'light', Record<string, string>> = {
  dark: {
    '--yt-bg': '#0f0f0f',
    '--yt-raised': '#212121',
    '--yt-card': 'rgba(255,255,255,0.05)',
    '--yt-hover': 'rgba(255,255,255,0.1)',
    '--yt-hover-soft': 'rgba(255,255,255,0.08)',
    '--yt-hover-strong': 'rgba(255,255,255,0.18)',
    '--yt-border': 'rgba(255,255,255,0.1)',
    '--yt-field': '#121212',
    '--yt-text': '#f1f1f1',
    '--yt-text2': '#aaaaaa',
    '--yt-text3': '#717171',
    '--yt-ring': 'rgba(255,255,255,0.16)',
    '--yt-ring-strong': 'rgba(255,255,255,0.34)',
    '--yt-track': 'rgba(255,255,255,0.22)',
    '--yt-scrollbar': 'rgba(255,255,255,0.18)',
    '--yt-scrollbar-strong': 'rgba(255,255,255,0.28)',
    '--yt-divider': 'rgba(255,255,255,0.06)',
    '--yt-danger': '#f28b82',
  },
  light: {
    '--yt-bg': '#ffffff',
    '--yt-raised': '#f2f2f2',
    '--yt-card': 'rgba(0,0,0,0.04)',
    '--yt-hover': 'rgba(0,0,0,0.07)',
    '--yt-hover-soft': 'rgba(0,0,0,0.05)',
    '--yt-hover-strong': 'rgba(0,0,0,0.12)',
    '--yt-border': 'rgba(0,0,0,0.12)',
    '--yt-field': '#f2f2f2',
    '--yt-text': '#0f0f0f',
    '--yt-text2': '#606060',
    '--yt-text3': '#909090',
    '--yt-ring': 'rgba(0,0,0,0.18)',
    '--yt-ring-strong': 'rgba(0,0,0,0.34)',
    '--yt-track': 'rgba(0,0,0,0.14)',
    '--yt-scrollbar': 'rgba(0,0,0,0.22)',
    '--yt-scrollbar-strong': 'rgba(0,0,0,0.34)',
    '--yt-divider': 'rgba(0,0,0,0.08)',
    '--yt-danger': '#d22',
  },
};

export function themeVars(mode: ThemeMode): Record<string, string> {
  const resolved =
    mode === 'system'
      ? typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark'
      : mode;
  return { ...PALETTES[resolved], colorScheme: resolved };
}

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
