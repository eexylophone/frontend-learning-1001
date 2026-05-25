import type { AdjustmentSettings } from './adjustments';
import type { HalftoneSettings } from './halftone';
import type { PrintEffectSettings } from './printEffects';

export interface EffectPreset {
  id: string;
  name: string;
  description: string;
  adjustments: AdjustmentSettings;
  halftone: HalftoneSettings;
  printEffects: PrintEffectSettings;
}
