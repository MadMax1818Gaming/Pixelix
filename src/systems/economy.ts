import type { GameState } from './gameState';

export type GameEvent =
  | { type: 'resource'; resource: 'energy' | 'scrap' | 'crystals'; amount: number; x?: number; y?: number }
  | { type: 'notice'; message: string }
  | { type: 'repair' }
  | { type: 'milestone'; message: string };

export type EventSink = (event: GameEvent) => void;

export const costs = {
  amplifier: (level: number) => Math.floor(15 * Math.pow(1.72, level)),
  tapper: (count: number) => Math.floor(35 * Math.pow(1.65, count)),
  tapperUpgrade: (level: number) => Math.floor(55 * Math.pow(1.8, level - 1)),
  stabilizer: 120,
  shell: 80,
  crystalMatrix: 45
};

export function clickCore(state: GameState, emit: EventSink, x?: number, y?: number): number {
  const gain = state.clickPower + state.amplifierLevel;
  state.energy += gain;
  state.totalEnergy += gain;
  state.totalClicks += 1;
  emit({ type: 'resource', resource: 'energy', amount: gain, x, y });
  checkMilestones(state, emit);
  return gain;
}

export function buyAmplifier(state: GameState, emit: EventSink): boolean {
  const cost = costs.amplifier(state.amplifierLevel);
  if (state.energy < cost) return false;
  state.energy -= cost;
  state.amplifierLevel += 1;
  emit({ type: 'notice', message: `Pulse Amplifier upgraded to level ${state.amplifierLevel}.` });
  return true;
}

export function buyTapper(state: GameState, emit: EventSink): boolean {
  const cost = costs.tapper(state.autoTappers);
  if (state.energy < cost) return false;
  state.energy -= cost;
  state.autoTappers += 1;
  emit({ type: 'notice', message: 'Auto-Tapper online. The Core is producing while you plan.' });
  return true;
}

export function upgradeTapper(state: GameState, emit: EventSink): boolean {
  const cost = costs.tapperUpgrade(state.tapperLevel);
  if (state.scrap < cost) return false;
  state.scrap -= cost;
  state.tapperLevel += 1;
  emit({ type: 'notice', message: `Auto-Tapper efficiency increased to level ${state.tapperLevel}.` });
  return true;
}

export function repairSubsystem(state: GameState, subsystem: 'stabilizer' | 'shell' | 'crystalMatrix', emit: EventSink): boolean {
  if (state.repaired[subsystem]) return false;
  const requirement = subsystem === 'stabilizer'
    ? { resource: 'energy' as const, amount: costs.stabilizer }
    : subsystem === 'shell'
      ? { resource: 'scrap' as const, amount: costs.shell }
      : { resource: 'crystals' as const, amount: costs.crystalMatrix };
  if (state[requirement.resource] < requirement.amount) return false;
  state[requirement.resource] -= requirement.amount;
  state.repaired[subsystem] = true;
  if (subsystem === 'stabilizer') {
    state.clickPower += 2;
    emit({ type: 'notice', message: 'Stabilizer repaired: click output permanently increased.' });
  } else if (subsystem === 'shell') {
    state.clickPower += 3;
    emit({ type: 'notice', message: 'Outer shell repaired: the Core is more stable.' });
  } else {
    state.clickPower += 5;
    emit({ type: 'notice', message: 'Crystal matrix restored: crystal-powered systems are unlocked.' });
  }
  emit({ type: 'repair' });
  checkMilestones(state, emit);
  return true;
}

export function tickEconomy(state: GameState, seconds: number, emit: EventSink): void {
  const energyRate = state.autoTappers * state.tapperLevel * (1 + state.amplifierLevel * 0.12);
  if (energyRate > 0) {
    const gain = energyRate * seconds;
    state.energy += gain;
    state.totalEnergy += gain;
  }
  // The repaired shell starts slowly recovering scrap automatically.
  if (state.repaired.stabilizer) state.scrap += state.autoTappers * state.tapperLevel * 0.5 * seconds;
  // Once the shell is restored, automated production begins recovering Crystals.
  if (state.repaired.shell) state.crystals += state.autoTappers * state.tapperLevel * 0.25 * seconds;
}

function checkMilestones(state: GameState, emit: EventSink): void {
  const milestones = [
    { id: 'first100', condition: state.totalEnergy >= 100, reward: 10, message: 'Milestone reached: 100 total Energy. +10 Energy.' },
    { id: 'first1000', condition: state.totalEnergy >= 1000, reward: 75, message: 'Milestone reached: 1,000 total Energy. +75 Energy.' },
    { id: 'click50', condition: state.totalClicks >= 50, reward: 20, message: 'Milestone reached: 50 Core taps. +20 Energy.' }
  ];
  for (const milestone of milestones) {
    if (milestone.condition && !state.milestonesClaimed.includes(milestone.id)) {
      state.milestonesClaimed.push(milestone.id);
      state.energy += milestone.reward;
      state.totalEnergy += milestone.reward;
      emit({ type: 'milestone', message: milestone.message });
    }
  }
}
