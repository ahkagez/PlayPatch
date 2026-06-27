import { render } from 'preact';
import { browser } from '#imports';
import { SettingsApp } from '@/components/pages/SettingsApp';

const BTN_CLASS = 'playpatch-launch-btn';
const HOST_ID = 'playpatch-overlay-host';

const BAR_SELECTORS = [
  'ytd-masthead #end #buttons',
  'ytd-masthead #buttons',
  'ytd-masthead #end',
  '#masthead #end',
];

export class Launcher {
  private btn: HTMLElement | null = null;
  private host: HTMLElement | null = null;
  private mount: HTMLElement | null = null;
  private visible = true;

  setVisible(visible: boolean): void {
    this.visible = visible;
    if (visible) this.ensureButton();
    else this.removeButton();
  }

  private removeButton(): void {
    this.btn?.remove();
    this.btn = null;
  }

  ensureButton(): void {
    if (!this.visible) return;
    if (this.btn && this.btn.isConnected) return;
    let bar: Element | null = null;
    for (const sel of BAR_SELECTORS) {
      bar = document.querySelector(sel);
      if (bar) break;
    }
    if (!bar) return;
    this.btn = this.createButton();
    bar.insertBefore(this.btn, bar.firstChild);
  }

  private createButton(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = BTN_CLASS;
    btn.type = 'button';
    btn.title = 'PlayPatch';
    btn.setAttribute('aria-label', 'PlayPatch');
    Object.assign(btn.style, {
      width: '40px',
      height: '40px',
      margin: '0 4px',
      padding: '0',
      border: 'none',
      background: 'transparent',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'inline-grid',
      placeItems: 'center',
      flex: '0 0 auto',
      transition: 'background 0.12s ease',
    });
    const img = document.createElement('img');
    img.src = browser.runtime.getURL('/icon/32.png');
    img.alt = '';
    Object.assign(img.style, { width: '24px', height: '24px', display: 'block', pointerEvents: 'none' });
    btn.appendChild(img);
    btn.addEventListener('mouseenter', () => (btn.style.background = 'rgba(127,127,127,0.2)'));
    btn.addEventListener('mouseleave', () => (btn.style.background = 'transparent'));
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    });
    return btn;
  }

  toggle(): void {
    if (this.host) this.close();
    else this.open();
  }

  open(): void {
    if (this.host) return;
    const host = document.createElement('div');
    host.id = HOST_ID;
    host.style.cssText = 'all: initial;';
    const shadow = host.attachShadow({ mode: 'open' });
    const mount = document.createElement('div');
    shadow.appendChild(mount);
    (document.body || document.documentElement).appendChild(host);
    this.host = host;
    this.mount = mount;
    render(<Overlay onClose={() => this.close()} />, mount);
    document.addEventListener('keydown', this.onKey, true);
  }

  close(): void {
    if (!this.host) return;
    if (this.mount) render(null, this.mount);
    this.host.remove();
    this.host = null;
    this.mount = null;
    document.removeEventListener('keydown', this.onKey, true);
  }

  dispose(): void {
    this.close();
    document.querySelectorAll('.' + BTN_CLASS).forEach((b) => b.remove());
    this.btn = null;
  }

  private onKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.close();
  };
}

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483646,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(780px, 94vw)',
          height: 'min(560px, 88vh)',
          borderRadius: '14px',
          overflow: 'hidden',
          background: '#0f0f0f',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        }}
      >
        <button
          type="button"
          aria-label="Cerrar"
          title="Cerrar"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '13px',
            right: '14px',
            zIndex: 2,
            width: '30px',
            height: '30px',
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            background: 'rgba(0,0,0,0.4)',
            fontSize: '15px',
            lineHeight: '1',
          }}
        >
          ✕
        </button>
        <SettingsApp embedded />
      </div>
    </div>
  );
}
