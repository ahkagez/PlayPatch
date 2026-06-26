export class ManagedStyle {
  private el: HTMLStyleElement | null = null;

  constructor(private readonly id: string) {}

  set(css: string): void {
    if (!this.el) {
      this.el =
        (document.getElementById(this.id) as HTMLStyleElement | null) ??
        document.createElement('style');
      this.el.id = this.id;
      document.documentElement.appendChild(this.el);
    }
    if (this.el.textContent !== css) this.el.textContent = css;
  }

  remove(): void {
    this.el?.remove();
    this.el = null;
    document.getElementById(this.id)?.remove();
  }
}

export function setHtmlFlag(name: string, on: boolean): void {
  if (on) document.documentElement.setAttribute(name, '');
  else document.documentElement.removeAttribute(name);
}

export function qs<T extends Element = Element>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(selector);
}

export function qsa<T extends Element = Element>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}
