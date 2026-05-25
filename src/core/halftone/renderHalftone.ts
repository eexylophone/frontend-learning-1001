import type { HalftoneShape } from '../../types/halftone';
import type { RenderPipelineInput } from '../../types/pipeline';

export function renderHalftone(
  context: CanvasRenderingContext2D,
  imageData: ImageData,
  input: RenderPipelineInput,
): void {
  const { halftone, printEffects } = input;
  const { width, height, data } = imageData;
  const cellSize = Math.max(4, halftone.cellSize);
  const minSize = Math.max(0, halftone.minDotSize);
  const maxSize = Math.max(minSize, halftone.maxDotSize + printEffects.inkSpread * 0.08);
  const angle = (halftone.angle * Math.PI) / 180;

  context.save();
  context.fillStyle = printEffects.foregroundColor;
  context.strokeStyle = printEffects.foregroundColor;
  context.lineCap = 'round';

  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      const sampleX = Math.min(width - 1, Math.floor(x + cellSize / 2));
      const sampleY = Math.min(height - 1, Math.floor(y + cellSize / 2));

      const luminance = getLuminance(data, width, sampleX, sampleY);
      const darkness = 1 - luminance / 255;
      const size = minSize + (maxSize - minSize) * darkness;

      if (size <= 0.2) {
        continue;
      }

      drawHalftoneShape(context, halftone.shape, sampleX, sampleY, size, cellSize, angle);
    }
  }

  context.restore();
}

function drawHalftoneShape(
  context: CanvasRenderingContext2D,
  shape: HalftoneShape,
  x: number,
  y: number,
  size: number,
  cellSize: number,
  angle: number,
): void {
  if (shape === 'square') {
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.fillRect(-size / 2, -size / 2, size, size);
    context.restore();
    return;
  }

  if (shape === 'line') {
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.lineWidth = Math.max(1, size);
    context.beginPath();
    context.moveTo(-cellSize * 0.42, 0);
    context.lineTo(cellSize * 0.42, 0);
    context.stroke();
    context.restore();
    return;
  }

  context.beginPath();
  context.arc(x, y, size / 2, 0, Math.PI * 2);
  context.fill();
}

function getLuminance(data: Uint8ClampedArray, width: number, x: number, y: number): number {
  const index = (y * width + x) * 4;
  return 0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2];
}
