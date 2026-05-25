import { ScanSearch } from 'lucide-react';
import type { LoadedImage } from '../../types/image';

interface PreviewCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  image: LoadedImage | null;
}

export function PreviewCanvas({ canvasRef, image }: PreviewCanvasProps) {
  return (
    <div className="preview-wrap">
      <div className="preview-toolbar">
        <div>
          <strong>预览</strong>
          <span>{image ? `${image.width} x ${image.height}` : '等待导入图片'}</span>
        </div>
      </div>
      <div className="canvas-viewport">
        {image ? (
          <canvas ref={canvasRef} aria-label="印刷效果预览画布" />
        ) : (
          <div className="empty-state">
            <ScanSearch size={44} aria-hidden="true" />
            <p>导入图片后在这里查看基础调整与后续半调效果。</p>
          </div>
        )}
      </div>
    </div>
  );
}
