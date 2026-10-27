import './styles.css';
import { createNewGame, type GameState } from './systems/gameState';
import {
  buyAmplifier, buyTapper, clickCore, repairSubsystem, tickEconomy, upgradeTapper,
  type GameEvent
} from './systems/economy';
import { loadGame, resetGame, saveGame } from './systems/saveSystem';
import { renderApp, type Actions } from './ui/render';
import { burst, spawnFloat } from './ui/effects';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Pixelix root element #app was not found.');

const loaded = loadGame();
let state: GameState = loaded.state;
let saved = true;
let lastFrame = performance.now();
let renderAccumulator = 0;
let saveAccumulator = 0;
let toastTimer = 0;

function toast(message: string): void {
  const region = root!.querySelector<HTMLElement>('#toast-region');
  if (!region) return;
  const item = document.createElement('div');
  item.className = 'toast';
  item.textContent = message;
  region.append(item);
  window.setTimeout(() => item.remove(), 3200);
}

function handleEvent(event: GameEvent): void {
  if (event.type === 'resource' && event.resource === 'energy' && event.x !== undefined && event.y !== undefined) {
    spawnFloat(`+${formatNumber(event.amount)} ✦`, event.x, event.y);
    const core = root!.querySelector<HTMLElement>('.world-scene');
    if (core) burst(core, event.x, event.y, 9);
  } else if (event.type === 'notice' || event.type === 'milestone') {
    toast(event.message);
  } else if (event.type === 'repair') {
    toast('SYSTEM REPAIR COMPLETE — Core output improved.');
  }
}

function formatNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${Number(n.toFixed(1))}`;
}

function rerender(): void {
  renderApp(root!, state, actions, saved);
}

const actions: Actions = {
  clickCore: (x, y) => {
    clickCore(state, handleEvent, x, y);
    rerender();
  },
  buyAmplifier: () => {
    if (!buyAmplifier(state, handleEvent)) toast('Not enough Energy for this upgrade.');
    changed();
  },
  buyTapper: () => {
    if (!buyTapper(state, handleEvent)) toast('Not enough Energy for an Auto-Tapper.');
    changed();
  },
  upgradeTapper: () => {
    if (!upgradeTapper(state, handleEvent)) toast('Not enough Scrap for this upgrade.');
    changed();
  },
  repair: (which) => {
    if (!repairSubsystem(state, which, handleEvent)) toast('You need more resources or this system is already repaired.');
    changed();
  },
  reset: () => {
    resetGame();
    state = createNewGame();
    saved = true;
    rerender();
    toast('Local save reset. A new Core awaits.');
  }
};

function changed(): void {
  saved = saveGame(state);
  rerender();
}

function frame(now: number): void {
  const delta = Math.min((now - lastFrame) / 1000, 1);
  lastFrame = now;
  tickEconomy(state, delta, handleEvent);
  renderAccumulator += delta;
  saveAccumulator += delta;
  if (renderAccumulator >= 0.5) {
    renderAccumulator = 0;
    rerender();
  }
  if (saveAccumulator >= 5) {
    saveAccumulator = 0;
    saved = saveGame(state);
  }
  requestAnimationFrame(frame);
}

rerender();
if (loaded.wasLoaded && loaded.offlineSeconds > 5) {
  const minutes = Math.floor(loaded.offlineSeconds / 60);
  toast(`Welcome back. Your machines worked for ${minutes} minutes while you were away.`);
}
if (loaded.offlineSeconds > 0) saveGame(state);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveGame(state);
});
window.addEventListener('beforeunload', () => saveGame(state));
requestAnimationFrame(frame);
