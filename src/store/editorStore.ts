import type { AdjustmentSettings } from '../types/adjustments';
import type { HalftoneSettings } from '../types/halftone';
import type { LoadedImage } from '../types/image';
import type { PrintEffectSettings } from '../types/printEffects';
import type { WorkflowMode } from '../types/workflow';

export interface EditorState {
  workflowMode: WorkflowMode;
  image: LoadedImage | null;
  selectedPresetId: string | null;
  adjustments: AdjustmentSettings;
  halftone: HalftoneSettings;
  printEffects: PrintEffectSettings;
}

export const defaultAdjustments: AdjustmentSettings = {
  grayscale: true,
  brightness: 0,
  contrast: 0,
  threshold: 0,
  invert: false,
};

export const defaultHalftone: HalftoneSettings = {
  enabled: false,
  shape: 'circle',
  cellSize: 10,
  angle: 15,
  minDotSize: 1,
  maxDotSize: 9,
};

export const defaultPrintEffects: PrintEffectSettings = {
  paperTexture: false,
  grain: 0,
  inkSpread: 0,
  foregroundColor: '#12110f',
  backgroundColor: '#f5efe4',
};

export const defaultEditorState: EditorState = {
  workflowMode: 'build-scratch',
  image: null,
  selectedPresetId: null,
  adjustments: defaultAdjustments,
  halftone: defaultHalftone,
  printEffects: defaultPrintEffects,
};
