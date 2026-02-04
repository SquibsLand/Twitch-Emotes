type EmojiPreviewParams = Exclude<React.ComponentProps<"img">, "src"> & {
  file: File;
};
type BulkEmojiPreviewParams = React.ComponentProps<"div"> & {
  files: FileList | undefined;
};

function EmojiPreview({ file, key, ...rest }: EmojiPreviewParams) {
  return (
    <div key={key}>
      <img src={URL.createObjectURL(file)} {...rest} />
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
        EmojiPreview({ file: file, key: "original-" + index })
      )}
    </div>
  );
}

export { BulkEmojiPreview };
