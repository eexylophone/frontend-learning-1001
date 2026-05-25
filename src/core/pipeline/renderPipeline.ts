import type { RenderPipelineInput } from '../../types/pipeline';
import { applyBaseAdjustments } from '../adjustments/applyBaseAdjustments';
import { renderHalftone } from '../halftone/renderHalftone';
import { applyPrintEffects } from '../print/applyPrintEffects';

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
  renderHalftone(context, adjustedImageData, input);
  applyPrintEffects(context, canvas.width, canvas.height, printEffects);
}
