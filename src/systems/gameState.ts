export type ResourceKey = 'energy' | 'scrap' | 'crystals';

export interface GameState {
  saveVersion: number;
  energy: number;
  totalEnergy: number;
  scrap: number;
  crystals: number;
  clickPower: number;
  autoTappers: number;
  tapperLevel: number;
  amplifierLevel: number;
  repaired: {
    stabilizer: boolean;
    shell: boolean;
    crystalMatrix: boolean;
  };
  lastSavedAt: number;
  totalClicks: number;
  milestonesClaimed: string[];
}

export const SAVE_VERSION = 1;

export function createNewGame(): GameState {
  return {
    saveVersion: SAVE_VERSION,
    energy: 0,
    totalEnergy: 0,
    scrap: 0,
    crystals: 0,
    clickPower: 1,
    autoTappers: 0,
    tapperLevel: 1,
    amplifierLevel: 0,
    repaired: { stabilizer: false, shell: false, crystalMatrix: false },
    lastSavedAt: Date.now(),
    totalClicks: 0,
    milestonesClaimed: []
  };
}
