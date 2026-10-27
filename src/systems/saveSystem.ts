import { createNewGame, SAVE_VERSION, type GameState } from './gameState';
import { tickEconomy } from './economy';

const SAVE_KEY = 'pixelix-save-v1';
const MAX_OFFLINE_SECONDS = 8 * 60 * 60;

export interface LoadResult {
  state: GameState;
  offlineSeconds: number;
  wasLoaded: boolean;
}

export function loadGame(): LoadResult {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { state: createNewGame(), offlineSeconds: 0, wasLoaded: false };
    const parsed = JSON.parse(raw) as Partial<GameState>;
    if (!parsed || typeof parsed !== 'object' || parsed.saveVersion !== SAVE_VERSION) {
      return { state: createNewGame(), offlineSeconds: 0, wasLoaded: false };
    }
    const fresh = createNewGame();
    const state = {
      ...fresh,
      ...parsed,
      repaired: { ...fresh.repaired, ...(parsed.repaired ?? {}) },
      milestonesClaimed: Array.isArray(parsed.milestonesClaimed) ? parsed.milestonesClaimed : []
    } as GameState;
    sanitize(state);
    const elapsed = Math.max(0, Math.min(MAX_OFFLINE_SECONDS, (Date.now() - Number(state.lastSavedAt || Date.now())) / 1000));
    tickEconomy(state, elapsed, () => {});
    state.lastSavedAt = Date.now();
    return { state, offlineSeconds: elapsed, wasLoaded: true };
  } catch {
    return { state: createNewGame(), offlineSeconds: 0, wasLoaded: false };
  }
}

export function saveGame(state: GameState): boolean {
  try {
    state.lastSavedAt = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function resetGame(): void {
  localStorage.removeItem(SAVE_KEY);
}

function sanitize(state: GameState): void {
  const keys: (keyof GameState)[] = [
    'energy', 'totalEnergy', 'scrap', 'crystals', 'clickPower', 'autoTappers',
    'tapperLevel', 'amplifierLevel', 'totalClicks'
  ];
  for (const key of keys) {
    const value = Number(state[key]);
    (state as unknown as Record<string, unknown>)[key] = Number.isFinite(value) ? Math.max(0, value) : 0;
  }
  state.clickPower = Math.max(1, state.clickPower);
  state.tapperLevel = Math.max(1, Math.floor(state.tapperLevel));
  state.autoTappers = Math.floor(state.autoTappers);
  state.amplifierLevel = Math.floor(state.amplifierLevel);
  state.totalClicks = Math.floor(state.totalClicks);
}
