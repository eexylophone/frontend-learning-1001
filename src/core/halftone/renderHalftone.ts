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
  const diagonal = Math.ceil(Math.sqrt(width * width + height * height));
  const offsetX = (diagonal - width) / 2;
  const offsetY = (diagonal - height) / 2;

  context.save();
  context.translate(width / 2, height / 2);
  context.rotate(angle);
  context.translate(-diagonal / 2, -diagonal / 2);
  context.fillStyle = printEffects.foregroundColor;
  context.strokeStyle = printEffects.foregroundColor;
  context.lineCap = 'round';

  for (let y = 0; y < diagonal; y += cellSize) {
    for (let x = 0; x < diagonal; x += cellSize) {
      const sample = rotatePoint(
        x + cellSize / 2 - offsetX,
        y + cellSize / 2 - offsetY,
        width / 2,
        height / 2,
        -angle,
      );

      if (sample.x < 0 || sample.x >= width || sample.y < 0 || sample.y >= height) {
        continue;
      }

      const luminance = getLuminance(data, width, Math.floor(sample.x), Math.floor(sample.y));
      const darkness = 1 - luminance / 255;
      const size = minSize + (maxSize - minSize) * darkness;

      if (size <= 0.2) {
        continue;
      }

      drawHalftoneShape(context, halftone.shape, x + cellSize / 2, y + cellSize / 2, size, cellSize);
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
): void {
  if (shape === 'square') {
    context.fillRect(x - size / 2, y - size / 2, size, size);
    return;
  }

  if (shape === 'line') {
    context.lineWidth = Math.max(1, size);
    context.beginPath();
    context.moveTo(x - cellSize * 0.42, y);
    context.lineTo(x + cellSize * 0.42, y);
    context.stroke();
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

function rotatePoint(x: number, y: number, cx: number, cy: number, angle: number) {
  const dx = x - cx;
  const dy = y - cy;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos,
  };
}
