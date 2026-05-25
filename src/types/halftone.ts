export type HalftoneShape = 'circle' | 'square' | 'line';

export interface HalftoneSettings {
  enabled: boolean;
  shape: HalftoneShape;
  cellSize: number;
  angle: number;
  minDotSize: number;
  maxDotSize: number;
}
