import { VALID_MIME_TYPES } from "../../constants";
import "./index.css";

const FileDropzone = ({ children, setFile }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length) {
      setFile(files[0]);
    }
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} className="drop-area">
      {children}
      <div className="drop-overlay"></div>
    </div>
  );
};

export default FileDropzone;
