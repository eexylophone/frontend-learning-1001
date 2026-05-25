import type { AdjustmentSettings } from '../../types/adjustments';
import { Field } from '../common/Field';
import { Section } from '../common/Section';

interface AdjustmentPanelProps {
  settings: AdjustmentSettings;
  onChange: (settings: Partial<AdjustmentSettings>) => void;
}

export function AdjustmentPanel({ settings, onChange }: AdjustmentPanelProps) {
  return (
    <Section title="基础调整">
      <label className="toggle-row">
        <span>灰度化</span>
        <input
          checked={settings.grayscale}
          type="checkbox"
          onChange={(event) => onChange({ grayscale: event.target.checked })}
        />
      </label>
      <Field label="亮度" value={settings.brightness}>
        <input
          max="100"
          min="-100"
          type="range"
          value={settings.brightness}
          onChange={(event) => onChange({ brightness: Number(event.target.value) })}
        />
      </Field>
      <Field label="对比度" value={settings.contrast}>
        <input
          max="100"
          min="-100"
          type="range"
          value={settings.contrast}
          onChange={(event) => onChange({ contrast: Number(event.target.value) })}
        />
      </Field>
      <Field label="阈值" value={settings.threshold}>
        <input
          max="100"
          min="0"
          type="range"
          value={settings.threshold}
          onChange={(event) => onChange({ threshold: Number(event.target.value) })}
        />
      </Field>
      <label className="toggle-row">
        <span>反相</span>
        <input
          checked={settings.invert}
          type="checkbox"
          onChange={(event) => onChange({ invert: event.target.checked })}
        />
      </label>
    </Section>
  );
}
