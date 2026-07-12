JAZZ ASSISTANT PWA — INSTALLATION GUIDE

IMPORTANT
A real PWA must be hosted on an HTTPS website. Opening index.html directly from the iPad Files app is not enough for the offline service worker and app installation to work reliably.

FILES INCLUDED
- index.html
- manifest.webmanifest
- sw.js
- icons/
- README.txt

EASIEST FREE HOSTING METHOD: GITHUB PAGES

1. Sign in to GitHub on a computer.
2. Create a new public repository, for example: jazz-assistant.
3. Upload every file and the icons folder from this package to the repository root.
4. Open the repository Settings.
5. Select Pages.
6. Under “Build and deployment”, choose “Deploy from a branch”.
7. Select the “main” branch and the “/(root)” folder, then save.
8. GitHub will show the HTTPS address after deployment.
9. Open that HTTPS address in Safari on the iPad.

INSTALL ON IPAD

1. Open the HTTPS address in Safari.
2. Tap the Share button.
3. Tap “Add to Home Screen”.
4. Keep the name “Jazz Assistant” and tap Add.
5. Open Jazz Assistant once while online so Safari can cache all files.
6. It can then be used offline from the Home Screen.

UPDATING THE APP

1. Edit or replace index.html in the GitHub repository.
2. In sw.js, change:
   jazz-assistant-v1
   to:
   jazz-assistant-v2
3. Upload the changed files.
4. Reopen the app online. The new version will be cached.

LOCAL TEST ON A MAC

Do not double-click index.html for PWA testing.
In Terminal, open the package folder and run:

python3 -m http.server 8000

Then open:
http://localhost:8000

Localhost is allowed for development, but the iPad installation should use the HTTPS GitHub Pages address.
