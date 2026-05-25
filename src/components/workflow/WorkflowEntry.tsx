import { Layers, WandSparkles } from 'lucide-react';
import type { WorkflowMode } from '../../types/workflow';
import { Section } from '../common/Section';

interface WorkflowEntryProps {
  value: WorkflowMode;
  onChange: (mode: WorkflowMode) => void;
}

export function WorkflowEntry({ value, onChange }: WorkflowEntryProps) {
  return (
    <Section title="工作流">
      <div className="segmented-control" role="group" aria-label="工作流选择">
        <button
          className={value === 'preset-tune' ? 'is-active' : ''}
          type="button"
          onClick={() => onChange('preset-tune')}
        >
          <WandSparkles size={16} aria-hidden="true" />
          预设后细调
        </button>
        <button
          className={value === 'build-scratch' ? 'is-active' : ''}
          type="button"
          onClick={() => onChange('build-scratch')}
        >
          <Layers size={16} aria-hidden="true" />
          从头搭建
        </button>
      </div>
    </Section>
  );
}
