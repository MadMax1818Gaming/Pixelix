# Pixelix — Core Awakening (Playable Foundation)

Pixelix is a browser-based incremental game foundation built with TypeScript and Vite. This version includes real, working gameplay rather than placeholder screens:

- Click the damaged Core to generate Pixel Energy.
- Purchase upgrades that improve click power and passive production.
- Repair Core subsystems to unlock Scrap and Crystals.
- Buy and upgrade an Auto-Tapper for automatic production.
- Earn milestone rewards and complete a short repair progression.
- Save locally in the browser, including offline production (capped at 8 hours).
- Responsive UI, floating click numbers, particle bursts, Core animation, and reduced-motion support.
- Modular systems designed for future factory, research, exploration, combat, evolution, and Supabase cloud-save modules.

## Run locally

Install Node.js 20 or newer, then open this folder in a terminal:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

To make a production build locally:

```bash
npm run build
npm run preview
```

## Publish on GitHub Pages

1. Create a GitHub repository named **pixelix** (or change the base path in `vite.config.ts` to match your repository name).
2. Upload the contents of this folder to the repository root and push them to the `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open the **Actions** tab and wait for “Deploy Pixelix to GitHub Pages” to finish successfully.
6. Open the published URL shown by the workflow. For a repository called `pixelix`, it is typically `https://YOUR-USERNAME.github.io/pixelix/`.

The workflow rebuilds and republishes the site after each push to `main`.

## Saving notes

Progress is saved in this browser using `localStorage`. It does **not** automatically sync between computers or browsers. Clearing browser storage removes that local save. A cloud-save adapter can be added later; never put a Supabase service-role key in browser code.

## Project map

```text
src/
  main.ts                 App entry point and update loop
  systems/
    gameState.ts          State model and default state
    economy.ts            Clicks, passive production, purchases, repairs
    saveSystem.ts         Versioned local save and offline progress
    progression.ts        Milestones and unlock rules
  ui/
    render.ts             Screen rendering and event binding
    effects.ts            Floating text and particle effects
  styles.css              Visual theme and responsive layout
public/assets/
  core.svg                Original Core illustration
.github/workflows/
  deploy.yml              GitHub Pages deployment workflow
```

## Next build stages

1. Factory grid, machines, recipes, and production simulation.
2. Research tree and exploration regions/secrets.
3. First boss encounter and combat choices.
4. Collectibles and Evolution with carefully defined carryover.
5. Optional Supabase authentication/cloud saves and online leaderboards.

These systems are extension points, not represented as already finished features in this build.
