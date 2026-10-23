export function spawnFloat(text: string, x: number, y: number, className = 'float-energy'): void {
  const el = document.createElement('div');
  el.className = className;
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.append(el);
  window.setTimeout(() => el.remove(), 1050);
}

export function burst(container: HTMLElement, x: number, y: number, count = 12): void {
  const rect = container.getBoundingClientRect();
  const originX = x - rect.left;
  const originY = y - rect.top;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('i');
    particle.className = 'particle';
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.setProperty('--angle', `${(Math.PI * 2 * i) / count + Math.random() * 0.35}rad`);
    particle.style.setProperty('--distance', `${30 + Math.random() * 75}px`);
    container.append(particle);
    window.setTimeout(() => particle.remove(), 850);
  }
}
