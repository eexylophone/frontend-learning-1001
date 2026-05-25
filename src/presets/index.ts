import {
  defaultAdjustments,
  defaultHalftone,
  defaultPrintEffects,
} from '../store/editorStore';
import type { EffectPreset } from '../types/preset';

export const presets: EffectPreset[] = [
  {
    id: 'newspaper',
    name: 'Newspaper',
    description: '高对比黑白网点，适合照片转报纸风。',
    adjustments: { ...defaultAdjustments, contrast: 24, brightness: 4 },
    halftone: { ...defaultHalftone, enabled: true, shape: 'circle', cellSize: 9, angle: 15 },
    printEffects: { ...defaultPrintEffects, paperTexture: true, grain: 12 },
  },
  {
    id: 'comic',
    name: 'Comic',
    description: '更硬的阈值和较大的圆点，用于漫画海报感。',
    adjustments: { ...defaultAdjustments, contrast: 36, threshold: 24 },
    halftone: { ...defaultHalftone, enabled: true, shape: 'circle', cellSize: 13, angle: 0 },
    printEffects: { ...defaultPrintEffects, grain: 6, foregroundColor: '#1b1a18' },
  },
  {
    id: 'poster',
    name: 'Poster',
    description: '方点和暖纸色背景，偏向复古印刷海报。',
    adjustments: { ...defaultAdjustments, brightness: 8, contrast: 18 },
    halftone: { ...defaultHalftone, enabled: true, shape: 'square', cellSize: 12, angle: -10 },
    printEffects: { ...defaultPrintEffects, paperTexture: true, grain: 9 },
  },
];
