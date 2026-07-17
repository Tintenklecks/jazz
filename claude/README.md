# Claude Prompt Fieldbook

An offline-first mobile PWA for students who use Claude Fable 5 and other current Claude models for programming work. It combines a searchable reference, a guided prompt builder, a troubleshooting decision guide, favorites, recent items, and global quick help.

## Run locally

Service workers require HTTP rather than opening `index.html` directly:

```sh
cd claude-prompting
python3 -m http.server 8080
```

Open `http://localhost:8080/`. Use the browser's install action to add the PWA. After one successful online load, reload once, stop the server or switch the browser offline, and confirm the app shell still loads.

## Checks

```sh
node --check app.js
node --check sw.js
python3 -m json.tool manifest.webmanifest
```

No build step, package manager, external font, external script, or runtime dependency is required. Favorites, recent items, and builder values use local storage and fail gracefully when storage is unavailable.

## Source scope

Content was verified against official Claude Platform documentation on 17 July 2026. The direct links are available in the app's Sources section. Model behavior and API availability can change; verify current model and migration documentation before deploying production integrations.
