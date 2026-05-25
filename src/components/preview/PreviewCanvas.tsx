import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { ScanSearch } from 'lucide-react';
import type { LoadedImage } from '../../types/image';

interface PreviewCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  image: LoadedImage | null;
  thumbnailUrl: string | null;
}

interface ViewportSize {
  width: number;
  height: number;
}

export function PreviewCanvas({ canvasRef, image, thumbnailUrl }: PreviewCanvasProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportSize, setViewportSize] = useState<ViewportSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const measureViewport = () => {
      const styles = window.getComputedStyle(viewport);
      const horizontalPadding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const verticalPadding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

      setViewportSize({
        width: Math.max(0, viewport.clientWidth - horizontalPadding),
        height: Math.max(0, viewport.clientHeight - verticalPadding),
      });
    };

    measureViewport();

    const observer = new ResizeObserver(measureViewport);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  const canvasStyle = useMemo<CSSProperties | undefined>(() => {
    if (!image || viewportSize.width <= 0 || viewportSize.height <= 0) {
      return undefined;
    }

    const scale = Math.min(viewportSize.width / image.width, viewportSize.height / image.height, 1);

    return {
      width: `${Math.max(1, Math.floor(image.width * scale))}px`,
      height: `${Math.max(1, Math.floor(image.height * scale))}px`,
    };
  }, [image, viewportSize]);

  return (
    <div className="preview-wrap">
      <div className="preview-toolbar">
        <div>
          <strong>预览</strong>
          <span>{image ? `${image.width} x ${image.height}` : '等待导入图片'}</span>
        </div>
      </div>
      <div className="canvas-viewport" ref={viewportRef}>
        {image ? (
          <canvas className="preview-canvas" ref={canvasRef} style={canvasStyle} aria-label="印刷效果预览画布" />
        ) : (
          <div className="empty-state">
            <ScanSearch size={44} aria-hidden="true" />
            <p>导入图片后在这里查看基础调整与半调印刷效果。</p>
          </div>
        )}
      </div>
      {image && thumbnailUrl ? (
        <figure className="preview-thumbnail" aria-label="当前效果缩略图">
          <img alt={`${image.fileName} 当前效果缩略图`} src={thumbnailUrl} />
        </figure>
      ) : null}
    </div>
  );
}
