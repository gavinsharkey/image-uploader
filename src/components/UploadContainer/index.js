import { useState, useEffect } from "react";
import { VALID_MIME_TYPES } from "./constants";
import Button from "../../common/Button"
import FileDropzone from "./components/FileDropzone";
import FilePicker from "./components/FilePicker";
import ContainerPhoto from "../ContainerPhoto";
import "./index.css";

const UploadContainer = ({ file, setFile, handleSubmit }) => {
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (!!file) {
      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        setFileUrl(reader.result);
      });

      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleSetFile = (file) => {
    if (VALID_MIME_TYPES.includes(file.type)) {
      setFile(file)
    }
  }

  const uploadTitle = <>
    <h3>Upload your image</h3>
    <p>Should be a JPEG, PNG.</p>
  </>

  const uploadActions = !!file ? (
    <Button onClick={handleSubmit}>Upload file</Button>
  ) : (
    <>
      <span>Or</span>
      <FilePicker setFile={handleSetFile} />
    </>
  )

  const dropzoneContent = file && fileUrl !== "" ? (
    <ContainerPhoto src={fileUrl} />
  ) : (
    <div className="drop-container">
      <img src="/image.svg" alt="file" />
      <span>Drag & Drop your image here</span>
    </div>
  )

  return (
    <div className="upload-container">
      {uploadTitle}
      <FileDropzone setFile={handleSetFile}>
        {dropzoneContent}
      </FileDropzone>
      {uploadActions}
    </div>
  );
};

export default UploadContainer;
