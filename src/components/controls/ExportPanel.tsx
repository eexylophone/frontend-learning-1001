import { Download, RotateCcw } from 'lucide-react';
import { Section } from '../common/Section';

interface ExportPanelProps {
  disabled: boolean;
  onReset: () => void;
  onExport: () => void;
}

export function ExportPanel({ disabled, onReset, onExport }: ExportPanelProps) {
  return (
    <Section title="输出">
      <div className="action-row">
        <button className="ghost-button" type="button" onClick={onReset}>
          <RotateCcw size={16} aria-hidden="true" />
          重置参数
        </button>
        <button className="primary-button" disabled={disabled} type="button" onClick={onExport}>
          <Download size={16} aria-hidden="true" />
          导出 PNG
        </button>
      </div>
    </Section>
  );
}
