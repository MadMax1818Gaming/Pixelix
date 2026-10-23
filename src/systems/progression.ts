import type { GameState } from './gameState';

export interface ProgressionInfo {
  stage: number;
  title: string;
  description: string;
  next: string;
}

export function getProgression(state: GameState): ProgressionInfo {
  if (!state.repaired.stabilizer) {
    return { stage: 1, title: 'Wake the Core', description: 'Gather Energy and stabilize the pulse.', next: 'Repair the Core Stabilizer' };
  }
  if (!state.autoTappers) {
    return { stage: 2, title: 'Build Automation', description: 'Create your first Auto-Tapper to keep the Core alive.', next: 'Purchase an Auto-Tapper' };
  }
  if (!state.repaired.shell) {
    return { stage: 3, title: 'Recover the Shell', description: 'Your machines are producing. Gather Scrap and restore the shell.', next: 'Repair the Outer Shell with Scrap' };
  }
  if (!state.repaired.crystalMatrix) {
    return { stage: 4, title: 'Restore the Matrix', description: 'The shell is stable. Recover Crystals and reactivate the matrix.', next: 'Repair the Crystal Matrix' };
  }
  return { stage: 5, title: 'First Light', description: 'The Core is awake. New regions and factory systems are ready for the next update.', next: 'Foundation complete — more systems come in the next build' };
}

export function getCompletion(state: GameState): number {
  return (Number(state.repaired.stabilizer) + Number(state.autoTappers > 0) + Number(state.repaired.shell) + Number(state.repaired.crystalMatrix)) / 4 * 100;
}
