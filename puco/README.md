# Puco Cheat Sheet

A dependency-free, mobile-first Progressive Web App for beginners using PUCO on iPhone and iPad.

## Included features

- Guided five-step first-prompt workflow
- Search and difficulty filters
- Color-coded categories
- Expandable reference topics
- Favorites and recently viewed items stored locally
- Copy buttons for PUCO template syntax
- Global Quick Help dialog
- Light and dark system themes
- Keyboard focus states and ARIA labels
- PWA manifest, installability and offline service worker
- iPhone safe-area support
- Source and verification section

## Run locally

A service worker requires HTTP or HTTPS. Do not test by double-clicking `index.html`.

### Python

```bash
cd puco-cheat-sheet
python3 -m http.server 8080
```

Open `http://localhost:8080`.

### Node

```bash
npx serve .
```

## Install on iPhone or iPad

1. Host the folder over HTTPS.
2. Open the site in Safari.
3. Tap **Share**.
4. Choose **Add to Home Screen**.

The core guide works offline after the first successful load.

## Files

- `index.html` — semantic application shell
- `styles.css` — responsive, accessible visual design
- `app.js` — content, routing, search, favorites, workflow and UI logic
- `manifest.webmanifest` — PWA metadata
- `sw.js` — offline cache
- `icons/` — 192 px and 512 px app icons

## Verification notes

Current prices, prompt counts, subscriptions and release availability are controlled by the app or stores and should be checked there. The global hotkey is macOS-only; this guide intentionally focuses on iPhone and iPad.
