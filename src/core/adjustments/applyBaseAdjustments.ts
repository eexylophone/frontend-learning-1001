import type { AdjustmentSettings } from '../../types/adjustments';
import { clamp } from '../../utils/clamp';

export function applyBaseAdjustments(imageData: ImageData, settings: AdjustmentSettings): ImageData {
  const data = imageData.data;
  const contrastFactor = (259 * (settings.contrast + 255)) / (255 * (259 - settings.contrast));

  for (let index = 0; index < data.length; index += 4) {
    let red = data[index];
    let green = data[index + 1];
    let blue = data[index + 2];

    red = clamp(contrastFactor * (red - 128) + 128 + settings.brightness, 0, 255);
    green = clamp(contrastFactor * (green - 128) + 128 + settings.brightness, 0, 255);
    blue = clamp(contrastFactor * (blue - 128) + 128 + settings.brightness, 0, 255);

    if (settings.grayscale) {
      const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
      red = luminance;
      green = luminance;
      blue = luminance;
    }

    if (settings.threshold > 0) {
      const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;
      const threshold = 128 + settings.threshold;
      const value = luminance >= threshold ? 255 : 0;
      red = value;
      green = value;
      blue = value;
    }

    if (settings.invert) {
      red = 255 - red;
      green = 255 - green;
      blue = 255 - blue;
    }

    data[index] = red;
    data[index + 1] = green;
    data[index + 2] = blue;
  }

  return imageData;
}
