import { exportCanvasType, exportSizes } from "../consts";

type convertImageSettings = {
  size: (typeof exportSizes)[number];
  orientation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  scale?: number;
};
export function convertImage(
  image: HTMLImageElement,
  { size, orientation, scale }: convertImageSettings,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(image, 0, 0, size, size);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Failed to create blob"));
        else resolve(blob);
      },
      exportCanvasType,
      0.9,
    );
  });
}
