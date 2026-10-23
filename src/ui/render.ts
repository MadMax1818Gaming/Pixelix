import type { GameState } from '../systems/gameState';
import { costs } from '../systems/economy';
import { getCompletion, getProgression } from '../systems/progression';

export interface Actions {
  clickCore: (x: number, y: number) => void;
  buyAmplifier: () => void;
  buyTapper: () => void;
  upgradeTapper: () => void;
  repair: (which: 'stabilizer' | 'shell' | 'crystalMatrix') => void;
  reset: () => void;
}

export function renderApp(root: HTMLElement, state: GameState, actions: Actions, saved = true): void {
  const progression = getProgression(state);
  const fmt = (n: number) => {
    if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e4) return `${(n / 1e3).toFixed(1)}K`;
    return Math.floor(n).toLocaleString();
  };
  const can = (resource: 'energy' | 'scrap' | 'crystals', amount: number) => state[resource] >= amount;
  root.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand"><div class="brand-mark">P<span>✦</span></div><div><div class="brand-name">PIXELIX</div><div class="brand-sub">CORE AWAKENING / BUILD 0.1</div></div></div>
        <div class="top-actions"><span class="save-status ${saved ? 'is-saved' : 'not-saved'}"><i></i>${saved ? 'LOCAL SAVE READY' : 'SAVE UNAVAILABLE'}</span><button class="icon-button" id="settings-btn" title="Settings">⚙</button></div>
      </header>
      <section class="resource-bar">
        <div class="resource"><span class="resource-icon energy-icon">✦</span><div><small>PIXEL ENERGY</small><strong>${fmt(state.energy)}</strong><em>+${(state.autoTappers * state.tapperLevel * (1 + state.amplifierLevel * .12)).toFixed(1)}/sec</em></div></div>
        <div class="resource"><span class="resource-icon scrap-icon">▧</span><div><small>SCRAP</small><strong>${fmt(state.scrap)}</strong><em>${state.repaired.stabilizer ? `+${(state.autoTappers * state.tapperLevel * .5).toFixed(1)}/sec` : 'Stabilizer repair required'}</em></div></div>
        <div class="resource"><span class="resource-icon crystal-icon">◆</span><div><small>CRYSTALS</small><strong>${fmt(state.crystals)}</strong><em>${state.repaired.shell ? `+${(state.autoTappers * state.tapperLevel * .25).toFixed(2)}/sec` : 'Shell repair required'}</em></div></div>
      </section>
      <main class="main-grid">
        <section class="world-panel panel">
          <div class="panel-heading"><div><span class="eyebrow">SECTOR 00 / NULL ORBIT</span><h1>The Broken World</h1></div><span class="live-chip"><i></i> CORE SIGNAL DETECTED</span></div>
          <div class="world-scene">
            <div class="starfield"></div><div class="planet planet-back"></div><div class="planet planet-front"></div>
            <div class="world-label label-left">UNKNOWN<br><b>SECTOR 00</b></div><div class="world-label label-right">ATMOSPHERE<br><b>UNSTABLE</b></div>
            <div class="core-orbit orbit-one"></div><div class="core-orbit orbit-two"></div>
            <button id="core-button" class="core-button ${state.repaired.stabilizer ? 'stabilized' : ''}" aria-label="Tap the Core to generate Pixel Energy">
              <span class="core-aura"></span><span class="core-rune rune-one">✧</span><span class="core-rune rune-two">⌁</span>
              <img src="./assets/core.svg" alt="" class="core-art" draggable="false" />
              <span class="core-pulse"></span>
            </button>
            <div class="core-caption"><span class="core-status-dot"></span>${state.repaired.stabilizer ? 'STABILIZER ONLINE' : 'CORE CRITICAL'} <small>• TAP TO HARVEST</small></div>
            <div class="scene-bottom"><span>WORLD REPAIR <b>${Math.round(getCompletion(state))}%</b></span><div class="progress-track"><div style="width:${getCompletion(state)}%"></div></div></div>
          </div>
          <div class="core-controls"><div><strong>Core output</strong><span>${state.clickPower + state.amplifierLevel} Energy per tap</span></div><button id="tap-hint" class="primary-button">PULSE CORE <span>↗</span></button></div>
        </section>
        <aside class="side-column">
          <section class="panel mission-panel"><div class="panel-heading compact"><div><span class="eyebrow">DIRECTIVE ${String(progression.stage).padStart(2, '0')}</span><h2>${progression.title}</h2></div><span class="mission-symbol">⌖</span></div><p>${progression.description}</p><div class="next-objective"><span class="objective-dot"></span><div><small>NEXT OBJECTIVE</small><strong>${progression.next}</strong></div></div></section>
          <section class="panel upgrade-panel"><div class="panel-heading compact"><div><span class="eyebrow">CORE MODIFICATIONS</span><h2>Upgrades</h2></div><span class="panel-count">01—03</span></div>
            <button id="buy-amplifier" class="upgrade-card" ${state.energy < costs.amplifier(state.amplifierLevel) ? 'disabled' : ''}><span class="upgrade-icon amplifier-icon">ϟ</span><span class="upgrade-copy"><strong>Pulse Amplifier <small>LV ${state.amplifierLevel}</small></strong><em>Increase tap output and machine efficiency.</em><b>✦ ${fmt(costs.amplifier(state.amplifierLevel))} ENERGY</b></span><span class="buy-arrow">+</span></button>
            <button id="buy-tapper" class="upgrade-card" ${state.energy < costs.tapper(state.autoTappers) ? 'disabled' : ''}><span class="upgrade-icon tapper-icon">▤</span><span class="upgrade-copy"><strong>Auto-Tapper <small>× ${state.autoTappers}</small></strong><em>Harvests Energy automatically every second.</em><b>✦ ${fmt(costs.tapper(state.autoTappers))} ENERGY</b></span><span class="buy-arrow">+</span></button>
            <button id="upgrade-tapper" class="upgrade-card" ${state.scrap < costs.tapperUpgrade(state.tapperLevel) ? 'disabled' : ''}><span class="upgrade-icon scrap-icon">⌬</span><span class="upgrade-copy"><strong>Tapper Overclock <small>LV ${state.tapperLevel}</small></strong><em>Increase each Auto-Tapper's output.</em><b>▧ ${fmt(costs.tapperUpgrade(state.tapperLevel))} SCRAP</b></span><span class="buy-arrow">+</span></button>
          </section>
        </aside>
      </main>
      <section class="lower-grid">
        <section class="panel repair-panel"><div class="panel-heading compact"><div><span class="eyebrow">SYSTEMS DIAGNOSTIC</span><h2>Restore the Core</h2></div><span class="repair-count">${Object.values(state.repaired).filter(Boolean).length}/3</span></div>
          <div class="repair-list">
            ${repairRow('stabilizer','Core Stabilizer','Calm the pulse and improve direct output.',`✦ ${fmt(costs.stabilizer)} ENERGY`,state.repaired.stabilizer,can('energy',costs.stabilizer))}
            ${repairRow('shell','Outer Shell','Recover the frame to begin producing Scrap.',`▧ ${fmt(costs.shell)} SCRAP`,state.repaired.shell,can('scrap',costs.shell))}
            ${repairRow('crystalMatrix','Crystal Matrix','Unlock passive Crystal recovery.',`◆ ${fmt(costs.crystalMatrix)} CRYSTALS`,state.repaired.crystalMatrix,can('crystals',costs.crystalMatrix))}
          </div>
        </section>
        <section class="panel telemetry-panel"><div class="panel-heading compact"><div><span class="eyebrow">LIVE TELEMETRY</span><h2>Core telemetry</h2></div><span class="telemetry-live">● LIVE</span></div><div class="telemetry-stats"><div><small>TOTAL ENERGY MADE</small><strong>${fmt(state.totalEnergy)}</strong></div><div><small>CORE TAPS</small><strong>${fmt(state.totalClicks)}</strong></div><div><small>MACHINES ONLINE</small><strong>${state.autoTappers}</strong></div><div><small>CORE INTEGRITY</small><strong>${Math.round(getCompletion(state))}%</strong></div></div><div class="telemetry-chart"><div class="chart-lines"></div>${Array.from({length:24},(_,i)=>`<i style="height:${12+((i*17+state.totalClicks*3)%43)}%;animation-delay:${i*-0.07}s"></i>`).join('')}</div><p class="telemetry-note">Telemetry is generated from your current save. Factory and combat telemetry unlock in future builds.</p></section>
      </section>
      <footer class="footer"><span>PIXELIX © CORE REPAIR INITIATIVE</span><span>LOCAL-FIRST SAVE <b>•</b> CLOUD SYNC: NOT CONNECTED</span><button id="reset-save">RESET LOCAL SAVE</button></footer>
      <div id="toast-region" class="toast-region" aria-live="polite"></div>
      <dialog id="settings-dialog" class="settings-dialog"><form method="dialog"><button class="dialog-close" aria-label="Close">×</button><span class="eyebrow">SYSTEM SETTINGS</span><h2>Game settings</h2><p>Your progress is stored in this browser on this device. Cloud sync is not enabled in this version.</p><label class="setting-row"><span><b>Reduced motion</b><small>Reduce pulsing and moving effects.</small></span><input id="reduced-motion" type="checkbox"></label><button class="primary-button dialog-done">DONE</button></form></dialog>
    </div>`;
  bind(root, actions);
}

function repairRow(id: string, title: string, desc: string, cost: string, repaired: boolean, affordable: boolean): string {
  return `<div class="repair-row"><span class="repair-icon ${repaired ? 'done' : ''}">${repaired ? '✓' : '⌁'}</span><div class="repair-copy"><strong>${title}</strong><small>${desc}</small><em>${repaired ? 'SYSTEM RESTORED' : cost}</em></div><button data-repair="${id}" ${repaired || !affordable ? 'disabled' : ''}>${repaired ? 'ONLINE' : 'REPAIR'}</button></div>`;
}

function bind(root: HTMLElement, actions: Actions): void {
  const core = root.querySelector<HTMLButtonElement>('#core-button');
  const pulse = root.querySelector<HTMLButtonElement>('#tap-hint');
  const click = (event: MouseEvent) => {
    actions.clickCore(event.clientX, event.clientY);
    core?.classList.remove('hit');
    void core?.offsetWidth;
    core?.classList.add('hit');
  };
  core?.addEventListener('click', click);
  pulse?.addEventListener('click', () => {
    const rect = core?.getBoundingClientRect();
    actions.clickCore(rect ? rect.left + rect.width / 2 : window.innerWidth / 2, rect ? rect.top + rect.height / 2 : window.innerHeight / 2);
  });
  root.querySelector('#buy-amplifier')?.addEventListener('click', actions.buyAmplifier);
  root.querySelector('#buy-tapper')?.addEventListener('click', actions.buyTapper);
  root.querySelector('#upgrade-tapper')?.addEventListener('click', actions.upgradeTapper);
  root.querySelectorAll<HTMLButtonElement>('[data-repair]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.repair as 'stabilizer' | 'shell' | 'crystalMatrix';
      actions.repair(key);
    });
  });
  root.querySelector('#reset-save')?.addEventListener('click', () => {
    if (window.confirm('Reset all Pixelix progress in this browser? This cannot be undone.')) actions.reset();
  });
  const dialog = root.querySelector<HTMLDialogElement>('#settings-dialog');
  root.querySelector('#settings-btn')?.addEventListener('click', () => dialog?.showModal());
  root.querySelector('#reduced-motion')?.addEventListener('change', (event) => {
    document.documentElement.classList.toggle('reduce-motion', (event.target as HTMLInputElement).checked);
    try { localStorage.setItem('pixelix-reduced-motion', String((event.target as HTMLInputElement).checked)); } catch {}
  });
  root.querySelector('#tap-hint')?.setAttribute('aria-label', 'Tap Core');
  try {
    const reduced = localStorage.getItem('pixelix-reduced-motion') === 'true';
    document.documentElement.classList.toggle('reduce-motion', reduced);
    const checkbox = root.querySelector<HTMLInputElement>('#reduced-motion');
    if (checkbox) checkbox.checked = reduced;
  } catch {}
}
