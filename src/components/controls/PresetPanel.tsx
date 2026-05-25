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
            aria-label={`${preset.name}：${preset.description}`}
            key={preset.id}
            type="button"
            onClick={() => onApply(preset.id)}
          >
            <span className="preset-name">{preset.name}</span>
            <span className="preset-description">{preset.description}</span>
          </button>
        ))}
      </div>
    </Section>
  );
}
