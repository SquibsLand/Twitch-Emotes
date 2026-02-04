import JSZip from "jszip";
import {
  exportCanvasType,
  exportFileType,
  exportSizes,
  imageTypesArray,
} from "../consts";

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
export function removeFirstMatch(
  str: string,
  removals: string[] | readonly string[],
) {
  for (const r of removals) {
    if (str.includes(r)) {
      return str.replace(r, "");
    }
  }
  return str;
}

export async function exportEmoji(name: string, blobs: Blob[]) {
  const baseName = removeFirstMatch(name, imageTypesArray);
  const zip = new JSZip();
  blobs.forEach((item, index) => {
    zip.file(`${baseName}.x${exportSizes[index]}${exportFileType}`, item);
  });
  return await zip.generateAsync({ type: "blob" });
}
