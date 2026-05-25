import type { LoadedImage } from '../../types/image';

export function loadImageFile(file: File): Promise<LoadedImage> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      resolve({
        fileName: file.name,
        width: image.naturalWidth,
        height: image.naturalHeight,
        element: image,
        objectUrl,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('图片加载失败'));
    };

    image.src = objectUrl;
  });
}
