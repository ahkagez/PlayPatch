import { defineConfig } from 'wxt';
import preact from '@preact/preset-vite';

export default defineConfig({
  vite: () => ({
    plugins: [preact()],
  }),
  manifest: {
    name: 'PlayPatch',
    description:
      'Enhance YouTube: clean the feed, hide Shorts, upgrade the player, and recolor the interface. Everything local.',
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      128: 'icon/128.png',
    },
    permissions: ['storage'],
    host_permissions: ['*://*.youtube.com/*'],
    browser_specific_settings: {
      gecko: {
        id: 'playpatch@local.extension',
      },
    },
  },
});
