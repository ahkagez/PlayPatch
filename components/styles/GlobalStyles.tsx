import { YT, DANGER, duration, radius } from '@/lib/theme';

export function GlobalStyles() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }

      .foco-guide-item { background: transparent; transition: background ${duration.base} ease; }
      .foco-guide-item:hover { background: ${YT.hoverSoft}; }
      .foco-guide-item[data-active="true"] { background: ${YT.hover}; }

      .foco-iconbtn { background: transparent; transition: background ${duration.base} ease; }
      .foco-iconbtn:hover { background: ${YT.hover}; }

      .foco-btn { background: ${YT.hover}; transition: background ${duration.base} ease; }
      .foco-btn:hover { background: rgba(255,255,255,0.18); }
      .foco-btn--ghost { background: transparent; border: 1px solid ${YT.border}; }
      .foco-btn--ghost:hover { background: ${YT.hoverSoft}; }
      .foco-btn--danger { background: transparent; color: ${DANGER}; }
      .foco-btn--danger:hover { background: rgba(242,139,130,0.12); }

      .foco-row { background: ${YT.card}; transition: background ${duration.base} ease; }
      .foco-row:hover { background: ${YT.hoverSoft}; }

      .foco-input { transition: outline ${duration.fast} ease; }
      .foco-input:focus { outline: 2px solid var(--foco-brand-soft); outline-offset: -1px; }

      .foco-colorbox {
        -webkit-appearance: none; -moz-appearance: none; appearance: none;
        padding: 0; border: none; border-radius: ${radius.sm}px; background: none; cursor: pointer;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
        transition: box-shadow ${duration.base} ease, transform ${duration.base} ease;
      }
      .foco-colorbox:hover { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.34); }
      .foco-colorbox::-webkit-color-swatch-wrapper { padding: 0; }
      .foco-colorbox::-webkit-color-swatch { border: none; border-radius: ${radius.sm}px; }
      .foco-colorbox::-moz-color-swatch { border: none; border-radius: ${radius.sm}px; }

      .foco-range {
        -webkit-appearance: none; appearance: none;
        width: 100%; height: 18px; margin: 0; padding: 0; border: none;
        background: transparent; cursor: pointer; outline: none;
      }
      .foco-range::-webkit-slider-runnable-track {
        height: 4px; border-radius: 999px;
        background: linear-gradient(to right,
          var(--foco-brand) 0%, var(--foco-brand) var(--foco-fill, 0%),
          rgba(255,255,255,0.22) var(--foco-fill, 0%), rgba(255,255,255,0.22) 100%);
      }
      .foco-range::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none; box-sizing: border-box;
        width: 16px; height: 16px; margin-top: -6px; border-radius: 50%;
        background: var(--foco-brand); border: 2px solid #fafafa;
        box-shadow: 0 1px 3px rgba(0,0,0,0.45); transition: transform ${duration.base} ease;
      }
      .foco-range:hover::-webkit-slider-thumb,
      .foco-range:active::-webkit-slider-thumb { transform: scale(1.12); }
      .foco-range:focus-visible::-webkit-slider-thumb { outline: 2px solid var(--foco-brand-soft); outline-offset: 2px; }
      .foco-range::-moz-range-track { height: 4px; border-radius: 999px; background: rgba(255,255,255,0.22); border: none; }
      .foco-range::-moz-range-progress { height: 4px; border-radius: 999px; background: var(--foco-brand); }
      .foco-range::-moz-range-thumb {
        box-sizing: border-box; width: 16px; height: 16px; border-radius: 50%;
        background: var(--foco-brand); border: 2px solid #fafafa; box-shadow: 0 1px 3px rgba(0,0,0,0.45);
      }
      .foco-range:focus-visible::-moz-range-thumb { outline: 2px solid var(--foco-brand-soft); outline-offset: 2px; }

      .foco-select {
        font-family: inherit; font-size: 13px; color: ${YT.text};
        background: ${YT.field}; border: 1px solid ${YT.border}; border-radius: ${radius.sm}px;
        padding: 7px 10px; cursor: pointer; outline: none;
      }
      .foco-select:focus { outline: 2px solid var(--foco-brand-soft); outline-offset: -1px; }

      .foco-chip { background: ${YT.hover}; }
      .foco-chipx:hover { color: ${YT.text}; }

      .foco-swatch { transition: transform ${duration.base} ease; }
      .foco-swatch:hover { transform: scale(1.12); }
      .foco-swatch:focus-visible { outline: 2px solid var(--foco-brand); outline-offset: 2px; }

      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: ${radius.sm}px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.28); }

      @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
    `}</style>
  );
}
