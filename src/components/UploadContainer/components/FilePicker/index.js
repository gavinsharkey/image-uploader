import { useRef } from "react";
import { Button } from "../../../../common";
import "./index.css";

const FilePicker = ({ setFile }) => {
  const fileInputRef = useRef(null);

  const handleStartSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const { current: fileInput } = fileInputRef;

    if (fileInput && fileInput.files.length) {
      setFile(fileInput.files[0]);
    }
  };

  return (
    <>
      <input
        onChange={handleFileSelect}
        ref={fileInputRef}
        type="file"
        accept=".jpeg, .jpg, .png,"
        style={{ display: "none" }}
      />
      <Button onClick={handleStartSelect}>Choose a file</Button>
    </>
  );
};

export default FilePicker;
