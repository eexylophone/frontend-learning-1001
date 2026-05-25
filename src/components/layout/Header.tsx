import { CircleDot, Download, SlidersHorizontal } from 'lucide-react';

export function Header() {
  return (
    <header className="app-header">
      <div className="brand-mark">
        <CircleDot size={24} aria-hidden="true" />
      </div>
      <div>
        <h1>半调网屏与印刷效果生成器</h1>
        <p>Local-first canvas editor for halftone and print textures.</p>
      </div>
      <div className="header-tools" aria-label="编辑器能力">
        <span>
          <SlidersHorizontal size={16} aria-hidden="true" />
          参数化
        </span>
        <span>
          <Download size={16} aria-hidden="true" />
          本地导出
        </span>
      </div>
    </header>
  );
}
