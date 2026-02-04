import { useRef, useState } from "react";
import { BulkEmojiPreview } from "./elements/EmojiPreview";
import { imageTypes } from "./consts";

function App() {
  const uploadButton = useRef<HTMLInputElement | null>(null);
  const [originalFiles, setOriginalFiles] = useState<FileList>();
  const onUpload = () => {
    if (uploadButton.current == null) return;
    const files = uploadButton.current.files;
    if (files == null) return;
    setOriginalFiles(files);
  };
  return (
    <>
      <h1>Twitch Emote Creator</h1>
      <input
        ref={uploadButton}
        type="file"
        onChange={onUpload}
        multiple
        accept={imageTypes}
      ></input>
      <BulkEmojiPreview files={originalFiles} />
    </>
  );
}

export default App;
