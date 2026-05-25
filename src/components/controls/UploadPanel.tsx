import { ImagePlus } from 'lucide-react';
import { loadImageFile } from '../../core/image/loadImage';
import type { LoadedImage } from '../../types/image';
import { Section } from '../common/Section';

interface UploadPanelProps {
  image: LoadedImage | null;
  onImageLoad: (image: LoadedImage) => void;
}

export function UploadPanel({ image, onImageLoad }: UploadPanelProps) {
  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const loadedImage = await loadImageFile(file);
    onImageLoad(loadedImage);
  }

  return (
    <Section title="图片">
      <label className="upload-button">
        <ImagePlus size={18} aria-hidden="true" />
        导入本地图片
        <input accept="image/*" type="file" onChange={handleFileChange} />
      </label>
      {image ? (
        <p className="image-meta">
          {image.fileName} · {image.width} x {image.height}
        </p>
      ) : (
        <p className="muted-copy">支持 JPG、PNG、WebP 等浏览器可读取格式。</p>
      )}
    </Section>
  );
}
