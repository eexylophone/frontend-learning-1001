import type { HalftoneSettings, HalftoneShape } from '../../types/halftone';
import { Field } from '../common/Field';
import { Section } from '../common/Section';

interface HalftonePanelProps {
  settings: HalftoneSettings;
  onChange: (settings: Partial<HalftoneSettings>) => void;
}

export function HalftonePanel({ settings, onChange }: HalftonePanelProps) {
  return (
    <Section title="半调网屏">
      <label className="toggle-row">
        <span>启用半调</span>
        <input
          checked={settings.enabled}
          type="checkbox"
          onChange={(event) => onChange({ enabled: event.target.checked })}
        />
      </label>
      <label className="select-row">
        <span>点形</span>
        <select
          value={settings.shape}
          onChange={(event) => onChange({ shape: event.target.value as HalftoneShape })}
        >
          <option value="circle">圆点</option>
          <option value="square">方点</option>
          <option value="line">线条</option>
        </select>
      </label>
      <Field label="网格尺寸" value={settings.cellSize}>
        <input
          max="36"
          min="4"
          type="range"
          value={settings.cellSize}
          onChange={(event) => onChange({ cellSize: Number(event.target.value) })}
        />
      </Field>
      <Field label="角度" value={settings.angle}>
        <input
          max="90"
          min="-90"
          type="range"
          value={settings.angle}
          onChange={(event) => onChange({ angle: Number(event.target.value) })}
        />
      </Field>
    </Section>
  );
}
