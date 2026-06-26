const SCOPE = 'html[data-foco-accent]';

export const ACCENT_VARS: readonly string[] = [
  '--yt-spec-static-brand-red',
  '--yt-spec-brand-button-background',
  '--yt-spec-red-50',
  '--yt-spec-red-60',
  '--yt-spec-red-70',
  '--yt-spec-red-80',
  '--ytd-searchbox-legacy-button-color',
  '--yt-sys-color-baseline--red-indicator',
];

export interface AccentRule {
  selectors: string[];
  props: string[];
  value?: string;
  confine?: string;
  group?: string;
}

export { ACCENT_GROUPS } from '@/lib/accent-groups';
export type { AccentGroup } from '@/lib/accent-groups';

export const ACCENT_RULES: readonly AccentRule[] = [
  {
    selectors: [
      '.ytp-play-progress',
      '.ytp-swatch-background-color',
      '.ytp-scrubber-button',
      '.ytp-volume-slider-handle',
      '.ytp-volume-slider-handle::before',
      '.ytp-progress-linear-live-buffer',
    ],
    props: ['background-color'],
  },
  {
    selectors: [
      '.ytProgressBarLineProgressBarPlayed',
      '.ytProgressBarPlayheadProgressBarPlayheadDot',
    ],
    props: ['background'],
  },
  {
    selectors: [
      'yt-page-navigation-progress .progress-bar',
      'yt-page-navigation-progress #progress',
    ],
    props: ['background'],
  },

  {
    selectors: ['#progress-bar'],
    props: [
      '--paper-slider-active-color',
      '--paper-slider-knob-color',
      '--paper-slider-knob-start-color',
      '--paper-slider-pin-color',
    ],
  },
  { selectors: ['#progress-bar #primaryProgress'], props: ['background-color'] },

  { selectors: ['.spinner-layer', '.spinner-layer .circle'], props: ['color', 'border-color'] },

  {
    selectors: [
      '[fill="#ff0000" i]',
      '[fill="#e1002d" i]',
      '[fill="#f03" i]',
      '[fill="#ff0033" i]',
      '[fill="#f00" i]',
      '[fill="red" i]',
    ],
    props: ['fill'],
  },
  {
    selectors: ['[stroke="#f03" i]', '[stroke="#ff0033" i]', '[stroke="#ff0000" i]'],
    props: ['stroke'],
  },

  {
    selectors: ['yt-icon.guide-entry-badge', '.guide-entry-badge'],
    props: ['color', 'fill', 'border-color'],
  },

  {
    selectors: [
      '.ytBadgeShapePremium',
      '.ytBadgeShapeLive',
      '.ytBadgeShapeThumbnailLive',
      '.badge-style-type-premium.ytd-badge-supported-renderer',
    ],
    props: ['background-color'],
  },
  {
    selectors: ['.ytBadgeShapeTimely .ytBadgeShapeIcon', '.ytBadgeShapeThumbnailSpecial .ytBadgeShapeIcon'],
    props: ['color'],
  },

  { selectors: ['.ytSpecButtonShapeNextBrandGradient.ytSpecButtonShapeNextFilled'], props: ['background'] },

  {
    selectors: [
      '.ytp-ad-persistent-progress-bar',
      '.ad-interrupting .ytp-scrubber-button.ytp-swatch-background-color',
      '.ytp-button[aria-pressed]::after',
      '.ytp-sb-subscribe .ytp-sb-text',
      '.ytp-autonav-live-stamp',
      '.ytp-ce-live-video-duration',
      '.iv-promo .iv-promo-contents .iv-promo-badge-live',
    ],
    props: ['background-color'],
    group: 'player',
  },
  { selectors: ['.ytp-video-menu-item-now-playing'], props: ['color'], group: 'player' },
  {
    selectors: [
      '.ytp-settings-button.ytp-hd-quality-badge::after',
      '.ytp-settings-button.ytp-hdr-quality-badge::after',
      '.ytp-settings-button.ytp-4k-quality-badge::after',
      '.ytp-settings-button.ytp-5k-quality-badge::after',
      '.ytp-settings-button.ytp-8k-quality-badge::after',
      '.ytp-settings-button.ytp-3d-badge::after',
      '.ytp-settings-button.ytp-3d-badge-grey::after',
    ],
    props: ['background-color'],
    group: 'player',
  },

  { selectors: ['ytd-guide-entry-renderer[active] .guide-icon.ytd-guide-entry-renderer'], props: ['color'], group: 'menus' },
  { selectors: ['#newness-dot.ytd-guide-entry-renderer'], props: ['background-color'], group: 'menus' },

  {
    selectors: [
      'tp-yt-paper-toggle-button[checked]:not([disabled]) .toggle-button.tp-yt-paper-toggle-button',
      '#checkbox.checked.tp-yt-paper-checkbox',
      '#onRadio.tp-yt-paper-radio-button',
    ],
    props: ['background-color'],
    group: 'menus',
  },

  { selectors: ['.yt-tab-shape-wiz__tab--tab-selected'], props: ['color'], group: 'menus' },
  { selectors: ['.yt-tab-group-shape-wiz__slider'], props: ['background-color'], group: 'menus' },
  { selectors: ['tp-yt-paper-tabs.ytd-tabbed-page-header'], props: ['--paper-tabs-selection-bar-color'], group: 'menus' },

  {
    selectors: [
      'ytd-macro-markers-list-renderer[panel-target-id*="chapters"] #time.ytd-macro-markers-list-item-renderer',
      '.segment-timestamp.ytd-transcript-segment-renderer',
    ],
    props: ['background-color'],
    group: 'comments',
  },

  { selectors: ['#hearted.ytd-creator-heart-renderer'], props: ['color'], group: 'comments' },

  {
    selectors: ['.yt-badge-shape--default', '.yt-badge-shape--commerce', 'yt-icon.ytd-badge-supported-renderer'],
    props: ['color'],
    group: 'badges',
  },
  {
    selectors: [
      '.yt-spec-avatar-shape--cairo-refresh .yt-spec-avatar-shape__live-badge',
      'ytd-author-comment-badge-renderer[creator]',
    ],
    props: ['background-color'],
    group: 'badges',
  },

  {
    selectors: [
      '#author-name.moderator.yt-live-chat-author-chip',
      'yt-live-chat-author-badge-renderer[type="moderator"]',
      '#author-name.member.yt-live-chat-author-chip',
    ],
    props: ['color'],
    group: 'liveChat',
  },
  {
    selectors: [
      '#author-name.owner.yt-live-chat-author-chip',
      '#card.yt-live-chat-paid-message-renderer',
      '#content.yt-live-chat-paid-message-renderer',
    ],
    props: ['background-color'],
    group: 'liveChat',
  },

  {
    selectors: ['#channel-title.ytd-channel-renderer', '#channel-name.ytd-watch-card-rich-header-renderer'],
    props: ['color'],
    group: 'links',
  },

  {
    selectors: [
      '.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--text',
      '.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--filled',
      '.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--outline',
      '.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--tonal',
      '.yt-core-attributed-string__link--call-to-action-color',
      '.yt-core-attributed-string__link--call-to-action-color:hover',
      '.yt-core-attributed-string__link--overlay-call-to-action-color',
      '.yt-core-attributed-string__link--overlay-call-to-action-color:hover',
    ],
    props: ['color'],
    confine: 'ytd-app',
    group: 'links',
  },

  {
    selectors: [
      'a.yt-simple-endpoint.yt-formatted-string:visited',
      'a.yt-simple-endpoint.yt-formatted-string:hover',
      'yt-formatted-string[has-link-only_]:not([force-default-style]) a.yt-simple-endpoint.yt-formatted-string',
      'yt-formatted-string[has-link-only_]:not([force-default-style]) a.yt-simple-endpoint.yt-formatted-string:visited',
      'yt-formatted-string[has-link-only_]:not([force-default-style]) a.yt-simple-endpoint.yt-formatted-string:hover',
    ],
    props: ['color'],
    confine: 'ytd-app',
    group: 'links',
  },

  {
    selectors: ['ytmusic-responsive-list-item-renderer a[href*="browse/MPRE"]'],
    props: ['--yt-endpoint-color', '--yt-endpoint-hover-color', '--yt-endpoint-visited-color'],
    group: 'musicAlbum',
  },
];

const STATIC_CSS = [
  `${SCOPE} .ytp-scrubber-button { box-shadow: none !important; }`,
  `${SCOPE} .ytp-play-progress, ${SCOPE} .ytp-swatch-background-color { background-image: none !important; }`,
].join('\n');

const PREMIUM_LOGO_CSS =
  `${SCOPE} linearGradient[id^="premium_standalone_cairo"] stop { stop-color: var(--foco-accent) !important; }`;

function parseHex(hex: string): { r: number; g: number; b: number } {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h || '0', 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function buildPalette(hex: string): string {
  const { r, g, b } = parseHex(hex);
  const lines = [`  --foco-accent: ${hex};`];
  for (let n = 10; n <= 90; n += 10) {
    const f = 1 - n / 100;
    lines.push(`  --foco-accent-a${n}: rgba(${r}, ${g}, ${b}, ${n / 100});`);
    lines.push(`  --foco-accent-d${n}: rgb(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)});`);
  }
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  lines.push(`  --foco-accent-text: ${luminance > 0.6 ? '#0f0f0f' : '#ffffff'};`);
  return `${SCOPE} {\n${lines.join('\n')}\n}`;
}

export function buildAccentCss(
  color: string,
  extras: Record<string, boolean> = {},
  vibrantPlay = false,
): string {
  const accent = 'var(--foco-accent)';
  const vars = `${SCOPE} {\n${ACCENT_VARS.map((v) => `  ${v}: ${accent} !important;`).join('\n')}\n}`;
  const rules = ACCENT_RULES
    .filter((rule) => !rule.group || extras[rule.group])
    .map((rule) => {
      const scope = rule.confine ? `${SCOPE} ${rule.confine}` : SCOPE;
      const selector = rule.selectors.map((s) => `${scope} ${s}`).join(',\n');
      const body = rule.props.map((p) => `${p}: ${rule.value ?? accent} !important;`).join(' ');
      return `${selector} { ${body} }`;
    });
  return [buildPalette(color), vars, ...rules, buildPlayButtonCss(vibrantPlay), PREMIUM_LOGO_CSS, STATIC_CSS].join('\n');
}

function buildPlayButtonCss(vibrant: boolean): string {
  const accent = 'var(--foco-accent)';
  const bg = `${SCOPE} .ytp-large-play-button-bg`;
  const hover =
    `${SCOPE} .ytp-large-play-button:hover .ytp-large-play-button-bg,\n` +
    `${SCOPE} .ytp-cued-thumbnail-overlay:hover .ytp-large-play-button-bg`;
  if (vibrant) {
    return (
      `${bg} { fill: ${accent} !important; transition: filter .12s ease; }\n` +
      `${hover} { fill: ${accent} !important; filter: brightness(1.18) saturate(1.25); }`
    );
  }
  return (
    `${bg} { fill: #212121 !important; filter: none; transition: fill .12s ease; }\n` +
    `${hover} { fill: ${accent} !important; }`
  );
}
