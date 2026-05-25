import type { EffectPreset } from '../../types/preset';
import { Section } from '../common/Section';

interface PresetPanelProps {
  presets: EffectPreset[];
  selectedPresetId: string | null;
  onApply: (presetId: string) => void;
}

export function PresetPanel({ presets, selectedPresetId, onApply }: PresetPanelProps) {
  return (
    <Section title="预设">
      <div className="preset-list">
        {presets.map((preset) => (
          <button
            className={selectedPresetId === preset.id ? 'preset-item is-active' : 'preset-item'}
            key={preset.id}
            type="button"
            onClick={() => onApply(preset.id)}
          >
            <span>{preset.name}</span>
            <small>{preset.description}</small>
          </button>
        ))}
      </div>
    </Section>
  );
}
