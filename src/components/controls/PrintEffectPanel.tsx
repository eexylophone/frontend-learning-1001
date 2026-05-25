import type { PrintEffectSettings } from '../../types/printEffects';
import { Field } from '../common/Field';
import { Section } from '../common/Section';

interface PrintEffectPanelProps {
  settings: PrintEffectSettings;
  onChange: (settings: Partial<PrintEffectSettings>) => void;
}

export function PrintEffectPanel({ settings, onChange }: PrintEffectPanelProps) {
  return (
    <Section title="印刷效果">
      <label className="toggle-row">
        <span>纸张纹理</span>
        <input
          checked={settings.paperTexture}
          type="checkbox"
          onChange={(event) => onChange({ paperTexture: event.target.checked })}
        />
      </label>
      <Field label="颗粒" value={settings.grain}>
        <input
          max="40"
          min="0"
          type="range"
          value={settings.grain}
          onChange={(event) => onChange({ grain: Number(event.target.value) })}
        />
      </Field>
      <Field label="油墨扩散" value={settings.inkSpread}>
        <input
          max="30"
          min="0"
          type="range"
          value={settings.inkSpread}
          onChange={(event) => onChange({ inkSpread: Number(event.target.value) })}
        />
      </Field>
      <div className="color-grid">
        <label>
          前景色
          <input
            type="color"
            value={settings.foregroundColor}
            onChange={(event) => onChange({ foregroundColor: event.target.value })}
          />
        </label>
        <label>
          背景色
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(event) => onChange({ backgroundColor: event.target.value })}
          />
        </label>
      </div>
    </Section>
  );
}
