import type { EditorState } from '../../store/editorStore';
import type { AdjustmentSettings } from '../../types/adjustments';
import type { EffectPreset } from '../../types/preset';
import type { HalftoneSettings } from '../../types/halftone';
import type { LoadedImage } from '../../types/image';
import type { PrintEffectSettings } from '../../types/printEffects';
import type { WorkflowMode } from '../../types/workflow';
import { WorkflowEntry } from '../workflow/WorkflowEntry';
import { AdjustmentPanel } from './AdjustmentPanel';
import { ExportPanel } from './ExportPanel';
import { HalftonePanel } from './HalftonePanel';
import { PresetPanel } from './PresetPanel';
import { PrintEffectPanel } from './PrintEffectPanel';
import { UploadPanel } from './UploadPanel';

interface ControlsPanelProps {
  state: EditorState;
  presets: EffectPreset[];
  onWorkflowChange: (mode: WorkflowMode) => void;
  onImageLoad: (image: LoadedImage) => void;
  onAdjustmentChange: (settings: Partial<AdjustmentSettings>) => void;
  onHalftoneChange: (settings: Partial<HalftoneSettings>) => void;
  onPrintEffectChange: (settings: Partial<PrintEffectSettings>) => void;
  onPresetApply: (presetId: string) => void;
  onReset: () => void;
  onExport: () => void;
}

export function ControlsPanel({
  state,
  presets,
  onWorkflowChange,
  onImageLoad,
  onAdjustmentChange,
  onHalftoneChange,
  onPrintEffectChange,
  onPresetApply,
  onReset,
  onExport,
}: ControlsPanelProps) {
  return (
    <div className="controls-stack">
      <WorkflowEntry value={state.workflowMode} onChange={onWorkflowChange} />
      <UploadPanel image={state.image} onImageLoad={onImageLoad} />
      <PresetPanel
        presets={presets}
        selectedPresetId={state.selectedPresetId}
        onApply={onPresetApply}
      />
      <AdjustmentPanel settings={state.adjustments} onChange={onAdjustmentChange} />
      <HalftonePanel settings={state.halftone} onChange={onHalftoneChange} />
      <PrintEffectPanel settings={state.printEffects} onChange={onPrintEffectChange} />
      <ExportPanel disabled={!state.image} onReset={onReset} onExport={onExport} />
    </div>
  );
}
