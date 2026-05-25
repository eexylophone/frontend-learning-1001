import type { RenderPipelineInput } from '../../types/pipeline';
import { applyBaseAdjustments } from '../adjustments/applyBaseAdjustments';

export function renderPipeline(input: RenderPipelineInput): void {
  const { image, canvas, adjustments, halftone, printEffects } = input;
  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  canvas.width = image.width;
  canvas.height = image.height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image.element, 0, 0, image.width, image.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const adjustedImageData = applyBaseAdjustments(imageData, adjustments);

  if (!halftone.enabled) {
    context.putImageData(adjustedImageData, 0, 0);
    applyPrintEffects(context, canvas.width, canvas.height, printEffects);
    return;
  }

  context.fillStyle = printEffects.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawHalftone(context, adjustedImageData, input);
  applyPrintEffects(context, canvas.width, canvas.height, printEffects);
}

function drawHalftone(
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
  shape: RenderPipelineInput['halftone']['shape'],
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

function applyPrintEffects(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: RenderPipelineInput['printEffects'],
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
