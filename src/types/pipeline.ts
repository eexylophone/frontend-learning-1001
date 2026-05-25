import type { AdjustmentSettings } from './adjustments';
import type { HalftoneSettings } from './halftone';
import type { LoadedImage } from './image';
import type { PrintEffectSettings } from './printEffects';

export interface RenderPipelineInput {
  image: LoadedImage;
  canvas: HTMLCanvasElement;
  adjustments: AdjustmentSettings;
  halftone: HalftoneSettings;
  printEffects: PrintEffectSettings;
}
