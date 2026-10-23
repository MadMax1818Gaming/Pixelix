import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Actions sets this to the repository name, e.g. /pixelix/
  base: process.env.GITHUB_ACTIONS === 'true' ? '/pixelix/' : '/',
  build: { outDir: 'dist', sourcemap: true }
});
