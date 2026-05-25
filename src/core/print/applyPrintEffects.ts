import type { PrintEffectSettings } from '../../types/printEffects';

export function applyPrintEffects(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: PrintEffectSettings,
): void {
  if (settings.paperTexture) {
    context.save();
    context.globalAlpha = 0.18;
    context.fillStyle = '#7a5a35';

    for (let y = 0; y < height; y += 6) {
      const stripe = pseudoRandom(y) * 0.45;
      context.fillRect(0, y, width, stripe);
    }

    context.restore();
  }

  if (settings.grain <= 0) {
    return;
  }

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  const amount = settings.grain;

  for (let index = 0; index < data.length; index += 4) {
    const pixel = index / 4;
    const noise = (pseudoRandom(pixel) - 0.5) * amount;
    data[index] = clampByte(data[index] + noise);
    data[index + 1] = clampByte(data[index + 1] + noise);
    data[index + 2] = clampByte(data[index + 2] + noise);
  }

  context.putImageData(imageData, 0, 0);
}

function pseudoRandom(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, value));
}
