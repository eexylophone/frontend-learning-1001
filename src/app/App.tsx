import { useCallback, useEffect, useRef, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { ControlsPanel } from '../components/controls/ControlsPanel';
import { PreviewCanvas } from '../components/preview/PreviewCanvas';
import { presets } from '../presets';
import { defaultEditorState, type EditorState } from '../store/editorStore';
import type { AdjustmentSettings } from '../types/adjustments';
import type { HalftoneSettings } from '../types/halftone';
import type { LoadedImage } from '../types/image';
import type { PrintEffectSettings } from '../types/printEffects';
import type { WorkflowMode } from '../types/workflow';
import { downloadCanvasAsPNG } from '../core/export/downloadCanvas';
import { renderPipeline } from '../core/pipeline/renderPipeline';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [editorState, setEditorState] = useState<EditorState>(defaultEditorState);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!editorState.image || !canvasRef.current) {
      setThumbnailUrl(null);
      return;
    }

    renderPipeline({
      image: editorState.image,
      canvas: canvasRef.current,
      adjustments: editorState.adjustments,
      halftone: editorState.halftone,
      printEffects: editorState.printEffects,
    });

    setThumbnailUrl(canvasRef.current.toDataURL('image/png'));
  }, [editorState]);

  const setWorkflowMode = useCallback((workflowMode: WorkflowMode) => {
    setEditorState((current) => ({ ...current, workflowMode }));
  }, []);

  const setImage = useCallback((image: LoadedImage) => {
    setEditorState((current) => {
      if (current.image?.objectUrl) {
        URL.revokeObjectURL(current.image.objectUrl);
      }

      return { ...current, image };
    });
  }, []);

  const updateAdjustments = useCallback((next: Partial<AdjustmentSettings>) => {
    setEditorState((current) => ({
      ...current,
      adjustments: { ...current.adjustments, ...next },
    }));
  }, []);

  const updateHalftone = useCallback((next: Partial<HalftoneSettings>) => {
    setEditorState((current) => ({
      ...current,
      halftone: { ...current.halftone, ...next },
    }));
  }, []);

  const updatePrintEffects = useCallback((next: Partial<PrintEffectSettings>) => {
    setEditorState((current) => ({
      ...current,
      printEffects: { ...current.printEffects, ...next },
    }));
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = presets.find((item) => item.id === presetId);

    if (!preset) {
      return;
    }

    setEditorState((current) => ({
      ...current,
      workflowMode: 'preset-tune',
      selectedPresetId: preset.id,
      adjustments: preset.adjustments,
      halftone: preset.halftone,
      printEffects: preset.printEffects,
    }));
  }, []);

  const resetParameters = useCallback(() => {
    setEditorState((current) => ({
      ...defaultEditorState,
      image: current.image,
      workflowMode: current.workflowMode,
    }));
  }, []);

  const exportPNG = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    downloadCanvasAsPNG(canvas, 'halftone-preview.png');
  }, []);

  return (
    <AppLayout
      controls={
        <ControlsPanel
          state={editorState}
          presets={presets}
          onWorkflowChange={setWorkflowMode}
          onImageLoad={setImage}
          onAdjustmentChange={updateAdjustments}
          onHalftoneChange={updateHalftone}
          onPrintEffectChange={updatePrintEffects}
          onPresetApply={applyPreset}
          onReset={resetParameters}
          onExport={exportPNG}
        />
      }
      preview={<PreviewCanvas canvasRef={canvasRef} image={editorState.image} thumbnailUrl={thumbnailUrl} />}
    />
  );
}
