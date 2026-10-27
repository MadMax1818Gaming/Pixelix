# Pixelix V7 — The Shattered Core

A single-player browser game built with plain HTML, CSS, and JavaScript. It requires no Node.js installation, package manager, API key, or administrator privileges.

## Features
- Factory grid with 8 machine types and automated production
- Five resources and production telemetry
- Research matrix with unlock progression
- Five exploration regions and rewards
- Three boss encounters
- Evolution/prestige with permanent Sparks and selectable paths
- Archive achievements, local autosave, export/import save
- Responsive UI for desktop and mobile
- GitHub Actions deployment workflow

## Publish to GitHub Pages
Upload the contents of this folder to the root of your existing `Pixelix` repository, including the hidden `.github` folder. Commit to `main`. In repository Settings → Pages, select **GitHub Actions** as the source. The workflow deploys the static files directly; no build step is required.

## Save and online features
The game automatically saves in the current browser using localStorage. Export a save file from Evolution → Local save controls to back it up. Local saves do not automatically sync between computers. Cloud saves and multiplayer are intentionally not implemented in V7 and can be added later.

## Note
This is a substantial playable V7 foundation. Machine recipes are represented by automated resource rates in this version; later updates can add physical conveyor routing, machine inventories, richer animations and expanded combat.
