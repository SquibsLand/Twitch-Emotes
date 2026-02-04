import { useReducer, useRef, useState } from "react";
import { convertImage } from "../helpers";
import { exportSizes } from "../consts";

type EmojiPreviewParams = Exclude<
  React.ComponentProps<"img">,
  "src" & "ref"
> & {
  file: File;
  index?: number;
};
type BulkEmojiPreviewParams = React.ComponentProps<"div"> & {
  files: FileList | undefined;
};

function EmojiPreview({ file, key, index, ...rest }: EmojiPreviewParams) {
  console.log(index);
  const [processedImages, setProcessedImages] = useState<Blob[]>();
  const originalImageRef = useRef<HTMLImageElement>(null);
  const onProcess = async () => {
    const image = originalImageRef.current;
    if (!image) return;

    setProcessedImages(
      await Promise.all(
        exportSizes.map((size) => convertImage(image, { size })),
      ),
    );
  };
  return (
    <div key={key}>
      <h3>
        {index != undefined ? `#${index + 1} - ` : ""}
        {file.name}
      </h3>
      <img ref={originalImageRef} src={URL.createObjectURL(file)} {...rest} />
      <div>
        {processedImages?.map((item, index) => (
          <img src={URL.createObjectURL(item)} key={"processed-" + index} />
        ))}
      </div>
      <button onClick={onProcess}>
        Process{index != undefined ? `- #${index + 1}` : ""}
      </button>
    </div>
  );
}
export default EmojiPreview;

function BulkEmojiPreview({ files, ...rest }: BulkEmojiPreviewParams) {
  if (!files) return;
  const items = Array.from(files);
  return (
    <div {...rest}>
      {items.map((file, index) =>
        EmojiPreview({ file: file, key: "original-" + index, index: index }),
      )}
    </div>
  );
}

export { BulkEmojiPreview };
