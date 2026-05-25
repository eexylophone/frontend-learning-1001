export function downloadCanvasAsPNG(canvas: HTMLCanvasElement, fileName: string): void {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
