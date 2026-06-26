# PlayPatch

PlayPatch is a browser extension for Chrome, Edge and Firefox that cleans up and
extends YouTube. Everything runs locally, and the interface is available in 14
languages. It's in the same spirit as Enhancer for YouTube.

## Features

### Feed and Shorts

- Hide Shorts, including the shelves and the sidebar entry.
- Hide live streams by their LIVE badge rather than the word "live" in the title.
- Hide watched videos, playlists, mixes, radios, the news shelf, "Discover more
  topics" and the subscriptions list in the sidebar.
- Compact grid that fits more videos per row.
- Open Shorts in the normal watch page (`/shorts` to `/watch`). The click is
  intercepted, so the Shorts player never loads.

### Player

- Volume boost above YouTube's limit.
- Default playback speed and quality.
- Thicker progress bar, mouse-wheel volume, Picture-in-Picture and
  newest-comments-first.

### Appearance

- Replace YouTube's red with any color across youtube.com and YouTube Music,
  using a palette, a color picker or an eyedropper.
- Optional groups that control how far the accent color reaches.

Settings are stored locally and can be exported or imported as JSON.

## Development

```
npm install
npm run dev          # Chrome/Edge
npm run dev:firefox  # Firefox
```

## Build

```
npm run build
npm run zip          # Chromium package
npm run zip:firefox  # Firefox package and sources
```

## Architecture

Built with WXT, TypeScript and Preact, so a single codebase targets all three
browsers on Manifest V3.

In the content script, each enhancement is a small class with one responsibility
and the same interface (`apply`, `clear`, `dispose`). A single orchestrator runs
them in a list, so adding a feature means writing one class and registering it,
without touching the rest (SOLID). Shared helpers, the accent rules and the
translations live in `lib/` to avoid repetition (DRY). The popup UI follows
atomic design: atoms, molecules, organisms, templates and pages.

```
lib/         shared code: types, storage, i18n, accent rules, DOM helpers
  locales/   one file per language
components/  popup UI
entrypoints/
  youtube.content/  content script and its features
  popup, options    extension pages
```

## Privacy

There are no servers and no analytics. Everything is kept in the browser's local
storage and never leaves your machine.

## License

You can use, study and modify this project. If you publish a modified or
derivative version that reuses this code, please keep visible credit to the
original author (ahkagez) and a link back to this repository.

Copyright 2026 ahkagez.
