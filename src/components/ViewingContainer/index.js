import { useState } from "react";
import ContainerPhoto from "../ContainerPhoto";
import { Button } from "../../common";
import "./index.css";

const ViewingContainer = ({ imageInfo }) => {
  const [isCopied, setIsCopied] = useState(false);
  const link = window.location.origin + imageInfo.path;

  const handleCopy = () => {
    copyToClipboard(link);
    setIsCopied(true);
  };

  return (
    <div className="viewing-container">
      <h2>Uploaded successfully!</h2>
      <ContainerPhoto src={imageInfo.src} />
      <div className="link-container">
        <span className="link">{link}</span>
        {isCopied ? (
          <Button
            style={{
              background: "#28a745",
            }}
            onClick={handleCopy}
          >
            Copied!
          </Button>
        ) : (
          <Button onClick={handleCopy}>Copy Link</Button>
        )}
      </div>
    </div>
  );
};

function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    return window.clipboardData.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    let textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

export default ViewingContainer;
