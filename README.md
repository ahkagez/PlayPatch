# PlayPatch

> A local-first browser extension that makes YouTube yours — clean the feed, tame Shorts, supercharge the player, and recolor the whole interface. No servers, no tracking.

![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![Browsers](https://img.shields.io/badge/Chrome%20%7C%20Edge%20%7C%20Firefox-supported-success)
![Built with](https://img.shields.io/badge/WXT%20%2B%20Preact%20%2B%20TypeScript-673ab8)
![i18n](https://img.shields.io/badge/i18n-14%20languages-orange)
![Version](https://img.shields.io/badge/version-1.0.0-green)

PlayPatch is a cross-browser extension (Chrome, Edge, Firefox) in the spirit of
*Enhancer for YouTube*. Everything runs **locally** in your browser, and the
popup is translated into **14 languages**, switchable on the fly.

## Features

**Feed & Shorts**
- Hide Shorts (tiles, shelves, and the sidebar entry).
- Hide live streams by their real **LIVE badge** — not videos that merely have "live" in the title.
- Hide watched videos, playlists, mixes, radios, the news shelf, "Discover more topics", and the subscriptions list in the sidebar.
- **Compact grid** — more videos per row, responsive to window width.
- **Open Shorts as a normal video** (`/shorts` → `/watch`): the click is intercepted so the Shorts player never even loads.

**Player**
- Boost volume beyond YouTube's maximum (Web Audio gain).
- Default playback speed (past the usual 2× cap) and default quality.
- Thicker progress bar, mouse-wheel volume, Picture-in-Picture, and newest-comments-first.

**Theme**
- Replace YouTube's brand red with **any color** (20-color palette, free picker, on-screen eyedropper) across youtube.com **and** YouTube Music.
- Toggleable "extended accent" groups that decide how far the color spreads.

**Everything else**
- 14 UI languages, selectable from the popup.
- 100% local: settings live in `storage.local` and are exportable/importable as JSON.

## Install

Stores: *coming soon* (Chrome Web Store · Firefox Add-ons).

Run from source:

```bash
npm install
npm run dev          # Chrome/Edge with hot-reload
npm run dev:firefox  # Firefox
```

Build & package:

```bash
npm run build        # production build → .output/
npm run zip          # store-ready .zip (Chromium)
npm run zip:firefox  # Firefox .zip + sources .zip (required by AMO)
```

## Architecture

Built with **WXT + TypeScript + Preact** — one codebase, three browsers, Manifest V3. It rests on three ideas:

**SOLID.** Every enhancement is a small class behind a single `YouTubeFeature` interface (`apply(settings)` / `clear()` / optional `dispose()`).
- *Single responsibility*: one file per feature (feed, player, theme, Shorts redirect…).
- *Open/closed*: a thin orchestrator just iterates a `features[]` array — adding a feature means writing a class and registering it, never touching the others.
- *Dependency inversion*: a feature receives what it needs (e.g. the player gets a `saveSettings` callback) instead of reaching into storage itself.

**DRY.** Shared building blocks live in `lib/`: a `ManagedStyle` helper that injects and diffs a `<style>` tag, null-safe DOM utilities, the accent system expressed as **data** (a list of rules instead of hand-written CSS), and a single i18n dictionary. Recolor a new red spot = add one rule; add a UI string = add one key.

**Atomic Design.** The popup is composed bottom-up: `atoms/` (Button, Switch, Text…) → `molecules/` (Toggle, fields) → `organisms/` (Masthead, panels) → `templates/` (the shell layout) → `pages/` (the stateful app). Presentational pieces stay dumb; state lives at the page.

## Project structure

```
lib/                shared backbone (types, storage, i18n, accent data, DOM helpers)
  locales/          one dictionary per language (en.ts is the source of truth)
components/         popup UI — atoms → molecules → organisms → templates → pages
entrypoints/
  youtube.content/  content script: SPA lifecycle + one class per feature
  popup/ options/   extension UI entry points
```

## Privacy

No servers, no telemetry, no analytics. Settings are kept in `storage.local`
(not `sync`, so nothing leaves your machine) and can be exported/imported as JSON
from the General tab.

## Contributing

Issues and PRs are welcome. Keep features self-contained (one `YouTubeFeature`
per file), put shared logic in `lib/`, and add any new UI string to
`lib/locales/en.ts` (missing translations fall back to English automatically).

## 📜 License & attribution

© 2026 [ahkagez](https://github.com/ahkagez).

You're free to use, study, and build on this project. **If you publish a
modified, improved, or otherwise derivative version that reuses any part of this
code, you must keep clear and visible credit to the original author
([ahkagez](https://github.com/ahkagez)) with a link back to this repository.**
Please don't present the work as entirely your own.

---

Made by [ahkagez](https://github.com/ahkagez).
